"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateAdminOrderStatus(formData: FormData) {
  const orderNumber = String(formData.get("orderNumber") ?? "").trim();
  const orderStatus = String(formData.get("orderStatus") ?? "").trim();

  if (!orderNumber || !orderStatus) {
    redirect("/admin/orders");
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("orders")
    .update({
      order_status: orderStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("order_number", orderNumber);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderNumber}`);
  revalidatePath("/mypage");
  revalidatePath("/mypage/orders");
  revalidatePath(`/mypage/orders/${orderNumber}`);
  redirect(`/admin/orders/${orderNumber}`);
}
