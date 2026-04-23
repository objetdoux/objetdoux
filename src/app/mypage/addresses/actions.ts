"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentAccountId } from "./address-data";

function readAddressPayload(formData: FormData) {
  return {
    recipient_name: String(formData.get("recipientName") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    zone_code: String(formData.get("zoneCode") ?? "").trim() || null,
    address: String(formData.get("address") ?? "").trim(),
    detail_address:
      String(formData.get("detailAddress") ?? "").trim() || null,
    delivery_memo: String(formData.get("deliveryMemo") ?? "").trim() || null,
    is_default: formData.get("isDefault") === "on",
  };
}

async function unsetDefaultAddress(userId: string) {
  const admin = createAdminClient();

  await admin
    .from("addresses")
    .update({ is_default: false, updated_at: new Date().toISOString() })
    .eq("user_id", userId);
}

export async function createAddress(formData: FormData) {
  const userId = await getCurrentAccountId();
  const admin = createAdminClient();
  const payload = readAddressPayload(formData);

  if (!payload.recipient_name || !payload.phone || !payload.address) {
    redirect("/mypage/addresses/new");
  }

  const { count } = await admin
    .from("addresses")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  const shouldSetDefault = payload.is_default || count === 0;

  if (shouldSetDefault) {
    await unsetDefaultAddress(userId);
  }

  await admin.from("addresses").insert({
    ...payload,
    user_id: userId,
    is_default: shouldSetDefault,
  });

  revalidatePath("/mypage/addresses");
  redirect("/mypage/addresses");
}

export async function updateAddress(formData: FormData) {
  const userId = await getCurrentAccountId();
  const addressId = String(formData.get("addressId") ?? "").trim();
  const admin = createAdminClient();
  const payload = readAddressPayload(formData);

  if (!addressId || !payload.recipient_name || !payload.phone || !payload.address) {
    redirect("/mypage/addresses");
  }

  if (payload.is_default) {
    await unsetDefaultAddress(userId);
  }

  await admin
    .from("addresses")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", addressId)
    .eq("user_id", userId);

  revalidatePath("/mypage/addresses");
  revalidatePath(`/mypage/addresses/${addressId}`);
  redirect("/mypage/addresses");
}

export async function deleteAddress(formData: FormData) {
  const userId = await getCurrentAccountId();
  const addressId = String(formData.get("addressId") ?? "").trim();

  if (!addressId) {
    redirect("/mypage/addresses");
  }

  const admin = createAdminClient();

  await admin
    .from("addresses")
    .delete()
    .eq("id", addressId)
    .eq("user_id", userId);

  revalidatePath("/mypage/addresses");
  redirect("/mypage/addresses");
}

export async function setDefaultAddress(formData: FormData) {
  const userId = await getCurrentAccountId();
  const addressId = String(formData.get("addressId") ?? "").trim();

  if (!addressId) {
    redirect("/mypage/addresses");
  }

  const admin = createAdminClient();
  await unsetDefaultAddress(userId);
  await admin
    .from("addresses")
    .update({ is_default: true, updated_at: new Date().toISOString() })
    .eq("id", addressId)
    .eq("user_id", userId);

  revalidatePath("/mypage/addresses");
  redirect("/mypage/addresses");
}
