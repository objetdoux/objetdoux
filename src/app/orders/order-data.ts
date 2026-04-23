import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentAccountProfile } from "../mypage/account-data";

type OrderItemRow = {
  id: string;
  product_slug: string;
  product_name: string;
  product_category: string | null;
  product_price: number;
  quantity: number;
  line_total: number;
  product_image_url: string | null;
};

type OrderRow = {
  id: string;
  order_number: string;
  order_status: string;
  payment_status: string;
  payment_method: string | null;
  subtotal: number;
  shipping_fee: number;
  total: number;
  recipient_name: string;
  recipient_phone: string;
  zone_code: string | null;
  recipient_address: string;
  recipient_detail_address: string | null;
  delivery_memo: string | null;
  created_at: string;
  order_items?: OrderItemRow[];
};

export type OrderDetail = {
  id: string;
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  recipientName: string;
  recipientPhone: string;
  zoneCode: string;
  recipientAddress: string;
  recipientDetailAddress: string;
  deliveryMemo: string;
  createdAt: string;
  items: Array<{
    id: string;
    slug: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    total: number;
    imageUrl?: string;
  }>;
};

export type OrderSummary = {
  id: string;
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  total: number;
  createdAt: string;
  title: string;
};

const orderDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function formatOrderDate(value: string) {
  return orderDateFormatter.format(new Date(value)).replaceAll(". ", ".");
}

export function formatOrderStatus(status: string) {
  const labels: Record<string, string> = {
    order_received: "주문 접수",
    payment_pending: "결제 대기",
    preparing: "상품 준비 중",
    shipping: "배송 중",
    delivered: "배송 완료",
    canceled: "주문 취소",
  };

  return labels[status] ?? status;
}

export function formatPaymentStatus(status: string) {
  const labels: Record<string, string> = {
    pending: "결제 대기",
    paid: "결제 완료",
    failed: "결제 실패",
    canceled: "결제 취소",
    refunded: "환불 완료",
  };

  return labels[status] ?? status;
}

function mapOrder(row: OrderRow): OrderDetail {
  return {
    id: row.id,
    orderNumber: row.order_number,
    orderStatus: row.order_status,
    paymentStatus: row.payment_status,
    paymentMethod: row.payment_method ?? "결제 대기",
    subtotal: row.subtotal,
    shippingFee: row.shipping_fee,
    total: row.total,
    recipientName: row.recipient_name,
    recipientPhone: row.recipient_phone,
    zoneCode: row.zone_code ?? "",
    recipientAddress: row.recipient_address,
    recipientDetailAddress: row.recipient_detail_address ?? "",
    deliveryMemo: row.delivery_memo ?? "",
    createdAt: row.created_at,
    items: (row.order_items ?? []).map((item) => ({
      id: item.id,
      slug: item.product_slug,
      name: item.product_name,
      category: item.product_category ?? "",
      price: item.product_price,
      quantity: item.quantity,
      total: item.line_total,
      imageUrl: item.product_image_url ?? undefined,
    })),
  };
}

function summarizeOrder(row: OrderRow): OrderSummary {
  const items = row.order_items ?? [];
  const firstItem = items[0];
  const extraCount = Math.max(0, items.length - 1);
  const title = firstItem
    ? `${firstItem.product_name}${extraCount > 0 ? ` 외 ${extraCount}건` : ""}`
    : "주문 상품";

  return {
    id: row.id,
    orderNumber: row.order_number,
    orderStatus: row.order_status,
    paymentStatus: row.payment_status,
    paymentMethod: row.payment_method ?? "결제 대기",
    total: row.total,
    createdAt: row.created_at,
    title,
  };
}

export async function getCurrentUserOrderSummaries(limit?: number) {
  const account = await getCurrentAccountProfile();
  const admin = createAdminClient();

  let query = admin
    .from("orders")
    .select(
      "id, order_number, order_status, payment_status, payment_method, subtotal, shipping_fee, total, recipient_name, recipient_phone, zone_code, recipient_address, recipient_detail_address, delivery_memo, created_at, order_items(id, product_slug, product_name, product_category, product_price, quantity, line_total, product_image_url)",
    )
    .eq("user_id", account.id)
    .order("created_at", { ascending: false });

  if (typeof limit === "number") {
    query = query.limit(limit);
  }

  const { data, error } = await query.returns<OrderRow[]>();

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(summarizeOrder);
}

export async function getCurrentUserOrderByNumber(orderNumber: string) {
  const account = await getCurrentAccountProfile();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("orders")
    .select(
      "id, order_number, order_status, payment_status, payment_method, subtotal, shipping_fee, total, recipient_name, recipient_phone, zone_code, recipient_address, recipient_detail_address, delivery_memo, created_at, order_items(id, product_slug, product_name, product_category, product_price, quantity, line_total, product_image_url)",
    )
    .eq("user_id", account.id)
    .eq("order_number", orderNumber)
    .maybeSingle<OrderRow>();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapOrder(data) : null;
}
