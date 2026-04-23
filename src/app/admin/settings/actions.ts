"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  defaultSiteSettings,
  type SiteSettings,
  toSiteSettingRows,
} from "../../site-settings";

const SITE_IMAGES_BUCKET = "product-images";
const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

function getText(formData: FormData, key: string, fallback: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function getNumber(formData: FormData, key: string, fallback: number) {
  const value = formData.get(key);
  const parsed = typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function getFileExtension(fileName: string) {
  const extension = fileName.split(".").pop();
  return extension ? `.${extension.toLowerCase()}` : "";
}

function sanitizePathPart(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadSiteImage(formData: FormData, fieldName: string) {
  const file = formData.get(fieldName);

  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("이미지 파일만 업로드해주세요.");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("이미지는 8MB 이하로 업로드해주세요.");
  }

  const fileExtension = getFileExtension(file.name);
  const fileName = `${Date.now()}-${crypto.randomUUID()}${fileExtension}`;
  const filePath = `site/${sanitizePathPart(fieldName)}/${fileName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const admin = createAdminClient();

  const { error } = await admin.storage
    .from(SITE_IMAGES_BUCKET)
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = admin.storage.from(SITE_IMAGES_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

async function getImageUrl(
  formData: FormData,
  fileFieldName: string,
  currentUrlFieldName: string,
) {
  const uploadedUrl = await uploadSiteImage(formData, fileFieldName);
  return uploadedUrl ?? getText(formData, currentUrlFieldName, "");
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
    heroTitle: getText(formData, "heroTitle", defaultSiteSettings.heroTitle),
    heroSubtitle: getText(
      formData,
      "heroSubtitle",
      defaultSiteSettings.heroSubtitle,
    ),
    heroImageUrl: await getImageUrl(
      formData,
      "heroImage",
      "currentHeroImageUrl",
    ),
    eventPrimaryTitle: getText(
      formData,
      "eventPrimaryTitle",
      defaultSiteSettings.eventPrimaryTitle,
    ),
    eventPrimaryDescription: getText(
      formData,
      "eventPrimaryDescription",
      defaultSiteSettings.eventPrimaryDescription,
    ),
    eventPrimaryImageUrl: await getImageUrl(
      formData,
      "eventPrimaryImage",
      "currentEventPrimaryImageUrl",
    ),
    eventSecondaryTitle: getText(
      formData,
      "eventSecondaryTitle",
      defaultSiteSettings.eventSecondaryTitle,
    ),
    eventSecondaryDescription: getText(
      formData,
      "eventSecondaryDescription",
      defaultSiteSettings.eventSecondaryDescription,
    ),
    eventSecondaryImageUrl: await getImageUrl(
      formData,
      "eventSecondaryImage",
      "currentEventSecondaryImageUrl",
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
