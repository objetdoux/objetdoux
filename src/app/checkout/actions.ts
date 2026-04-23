"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentAccountProfile } from "../mypage/account-data";
import {
  getCurrentCartId,
  getCartLineItems,
  getUnavailableCartItems,
} from "../cart/cart-data";
import { calculateShippingFee, getSiteSettings } from "../site-settings";

type CreatedOrderRow = {
  id: string;
  order_number: string;
};

function createOrderNumber() {
  const now = new Date();
  const date = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(now)
    .replaceAll(". ", "")
    .replace(".", "");
  const suffix = now.getTime().toString().slice(-5);

  return `OD-${date}-${suffix}`;
}

export async function createOrder(formData: FormData) {
  const account = await getCurrentAccountProfile();
  const cartId = await getCurrentCartId();
  const items = await getCartLineItems();
  const settings = await getSiteSettings();

  if (items.length === 0) {
    redirect("/cart");
  }

  if (getUnavailableCartItems(items).length > 0) {
    revalidatePath("/cart");
    revalidatePath("/checkout");
    redirect("/cart?invalid=1");
  }

  const recipientName = String(formData.get("recipientName") ?? "").trim();
  const recipientPhone = String(formData.get("recipientPhone") ?? "").trim();
  const zoneCode = String(formData.get("zoneCode") ?? "").trim() || null;
  const recipientAddress = String(formData.get("recipientAddress") ?? "").trim();
  const recipientDetailAddress =
    String(formData.get("recipientDetailAddress") ?? "").trim() || null;
  const deliveryMemo = String(formData.get("deliveryMemo") ?? "").trim() || null;
  const paymentMethod = String(formData.get("paymentMethod") ?? "").trim();

  if (!recipientName || !recipientPhone || !recipientAddress || !paymentMethod) {
    redirect("/checkout");
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const appliedShippingFee = calculateShippingFee(subtotal, settings);
  const total = subtotal + appliedShippingFee;
  const admin = createAdminClient();

  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      order_number: createOrderNumber(),
      user_id: account.id,
      order_status: "order_received",
      payment_status: "pending",
      payment_method: paymentMethod,
      subtotal,
      shipping_fee: appliedShippingFee,
      total,
      recipient_name: recipientName,
      recipient_phone: recipientPhone,
      zone_code: zoneCode,
      recipient_address: recipientAddress,
      recipient_detail_address: recipientDetailAddress,
      delivery_memo: deliveryMemo,
    })
    .select("id, order_number")
    .single<CreatedOrderRow>();

  if (orderError || !order) {
    throw new Error(orderError?.message ?? "Failed to create order.");
  }

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_slug: item.slug,
    product_name: item.name,
    product_category: item.category,
    product_price: item.priceValue,
    quantity: item.quantity,
    line_total: item.total,
    product_image_url: item.thumbnailUrl ?? null,
  }));

  const { error: itemError } = await admin.from("order_items").insert(orderItems);

  if (itemError) {
    throw new Error(itemError.message);
  }

  for (const item of items.filter((cartItem) => cartItem.trackStock)) {
    const { error: stockError } = await admin.rpc("decrement_product_stock", {
      p_product_id: item.productId,
      p_quantity: item.quantity,
    });

    if (stockError) {
      revalidatePath("/cart");
      revalidatePath("/checkout");
      redirect("/cart?invalid=1");
    }
  }

  await admin.from("cart_items").delete().eq("cart_id", cartId);

  revalidatePath("/cart");
  revalidatePath("/checkout");
  revalidatePath("/mypage");
  revalidatePath("/mypage/orders");
  redirect(`/order-complete?orderNumber=${order.order_number}`);
}
