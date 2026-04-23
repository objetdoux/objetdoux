import { createAdminClient } from "@/lib/supabase/admin";
import {
  formatOrderDate,
  formatOrderStatus,
  formatPaymentStatus,
} from "../../orders/order-data";

type AdminOrderItemRow = {
  id: string;
  product_slug: string;
  product_name: string;
  product_category: string | null;
  product_price: number;
  quantity: number;
  line_total: number;
  product_image_url: string | null;
};

type AdminOrderUserRow = {
  name: string;
  email: string;
  phone: string | null;
};

type AdminOrderRow = {
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
  users?: AdminOrderUserRow | AdminOrderUserRow[] | null;
  order_items?: AdminOrderItemRow[];
};

export const adminOrderStatusOptions = [
  { value: "order_received", label: "주문 접수" },
  { value: "payment_pending", label: "결제 대기" },
  { value: "preparing", label: "상품 준비 중" },
  { value: "shipping", label: "배송 중" },
  { value: "delivered", label: "배송 완료" },
  { value: "canceled", label: "주문 취소" },
];

export const adminPaymentStatusOptions = [
  { value: "pending", label: "결제 대기" },
  { value: "paid", label: "결제 완료" },
  { value: "failed", label: "결제 실패" },
  { value: "canceled", label: "결제 취소" },
  { value: "refunded", label: "환불 완료" },
];

export type AdminOrder = {
  id: string;
  orderNumber: string;
  orderStatus: string;
  orderStatusLabel: string;
  paymentStatus: string;
  paymentStatusLabel: string;
  paymentMethod: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;
  createdDate: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  recipientName: string;
  recipientPhone: string;
  zoneCode: string;
  recipientAddress: string;
  recipientDetailAddress: string;
  deliveryMemo: string;
  title: string;
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

export type AdminOrderFilters = {
  query?: string;
  paymentStatus?: string;
  orderStatus?: string;
  limit?: number;
};

function getUser(row: AdminOrderRow) {
  return Array.isArray(row.users) ? row.users[0] : row.users;
}

function mapAdminOrder(row: AdminOrderRow): AdminOrder {
  const user = getUser(row);
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
    orderStatusLabel: formatOrderStatus(row.order_status),
    paymentStatus: row.payment_status,
    paymentStatusLabel: formatPaymentStatus(row.payment_status),
    paymentMethod: row.payment_method ?? "결제 대기",
    subtotal: row.subtotal,
    shippingFee: row.shipping_fee,
    total: row.total,
    createdAt: row.created_at,
    createdDate: formatOrderDate(row.created_at),
    buyerName: user?.name ?? "-",
    buyerEmail: user?.email ?? "-",
    buyerPhone: user?.phone ?? "-",
    recipientName: row.recipient_name,
    recipientPhone: row.recipient_phone,
    zoneCode: row.zone_code ?? "",
    recipientAddress: row.recipient_address,
    recipientDetailAddress: row.recipient_detail_address ?? "",
    deliveryMemo: row.delivery_memo ?? "",
    title,
    items: items.map((item) => ({
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

const adminOrderSelect =
  "id, order_number, order_status, payment_status, payment_method, subtotal, shipping_fee, total, recipient_name, recipient_phone, zone_code, recipient_address, recipient_detail_address, delivery_memo, created_at, users(name, email, phone), order_items(id, product_slug, product_name, product_category, product_price, quantity, line_total, product_image_url)";

function filterOrdersBySearch(orders: AdminOrder[], query?: string) {
  const keyword = query?.trim().toLowerCase();

  if (!keyword) {
    return orders;
  }

  return orders.filter((order) => {
    const searchableText = [
      order.orderNumber,
      order.buyerName,
      order.buyerEmail,
      order.buyerPhone,
      order.recipientName,
      order.recipientPhone,
      order.title,
      ...order.items.map((item) => item.name),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(keyword);
  });
}

export async function getAdminOrders(filters: AdminOrderFilters = {}) {
  const admin = createAdminClient();
  let query = admin
    .from("orders")
    .select(adminOrderSelect)
    .order("created_at", { ascending: false });

  if (filters.paymentStatus && filters.paymentStatus !== "all") {
    query = query.eq("payment_status", filters.paymentStatus);
  }

  if (filters.orderStatus && filters.orderStatus !== "all") {
    query = query.eq("order_status", filters.orderStatus);
  }

  if (typeof filters.limit === "number") {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const orders = ((data ?? []) as unknown as AdminOrderRow[]).map(mapAdminOrder);
  return filterOrdersBySearch(orders, filters.query);
}

export async function getAdminOrderByNumber(orderNumber: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("orders")
    .select(adminOrderSelect)
    .eq("order_number", orderNumber)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapAdminOrder(data as unknown as AdminOrderRow) : null;
}

export async function getAdminOrderDashboardStats() {
  const orders = await getAdminOrders();
  const today = formatOrderDate(new Date().toISOString());
  const todayOrders = orders.filter((order) => order.createdDate === today);
  const todaySales = todayOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(
    (order) => !["delivered", "canceled"].includes(order.orderStatus),
  );

  return {
    orders,
    todayOrderCount: todayOrders.length,
    todaySales,
    pendingOrderCount: pendingOrders.length,
  };
}
