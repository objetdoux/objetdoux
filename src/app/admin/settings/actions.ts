"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  defaultSiteSettings,
  type SiteSettings,
  toSiteSettingRows,
} from "../../site-settings";

function getText(formData: FormData, key: string, fallback: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function getNumber(formData: FormData, key: string, fallback: number) {
  const value = formData.get(key);
  const parsed = typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export async function updateSiteSettings(formData: FormData) {
  const settings: SiteSettings = {
    companyName: getText(
      formData,
      "companyName",
      defaultSiteSettings.companyName,
    ),
    ceoName: getText(formData, "ceoName", defaultSiteSettings.ceoName),
    csPhone: getText(formData, "csPhone", defaultSiteSettings.csPhone),
    csEmail: getText(formData, "csEmail", defaultSiteSettings.csEmail),
    businessAddress: getText(
      formData,
      "businessAddress",
      defaultSiteSettings.businessAddress,
    ),
    shippingFee: getNumber(
      formData,
      "shippingFee",
      defaultSiteSettings.shippingFee,
    ),
    freeShippingMinimum: getNumber(
      formData,
      "freeShippingMinimum",
      defaultSiteSettings.freeShippingMinimum,
    ),
    defaultOrderStatus: getText(
      formData,
      "defaultOrderStatus",
      defaultSiteSettings.defaultOrderStatus,
    ),
    shippingNotice: getText(
      formData,
      "shippingNotice",
      defaultSiteSettings.shippingNotice,
    ),
  };

  const admin = createAdminClient();
  const { error } = await admin
    .from("site_settings")
    .upsert(toSiteSettingRows(settings), { onConflict: "key" });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/cart");
  revalidatePath("/checkout");
  redirect("/admin/settings?saved=1");
}
