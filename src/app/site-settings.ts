import { createAdminClient } from "@/lib/supabase/admin";

export type SiteSettings = {
  companyName: string;
  ceoName: string;
  csPhone: string;
  csEmail: string;
  businessAddress: string;
  shippingFee: number;
  freeShippingMinimum: number;
  defaultOrderStatus: string;
  shippingNotice: string;
};

type SiteSettingRow = {
  key: string;
  value: unknown;
};

export const defaultSiteSettings: SiteSettings = {
  companyName: "objetdoux / 오브제두",
  ceoName: "김오브제",
  csPhone: "010-1234-5678",
  csEmail: "hello@objetdoux.com",
  businessAddress: "서울 성동구 성수이로 00, 00빌딩 3층",
  shippingFee: 3000,
  freeShippingMinimum: 70000,
  defaultOrderStatus: "상품 준비 중",
  shippingNotice: "기본 배송 2-5일 소요 / 제주 및 도서산간 추가 배송비 별도",
};

const settingKeys = {
  companyName: "company_name",
  ceoName: "ceo_name",
  csPhone: "cs_phone",
  csEmail: "cs_email",
  businessAddress: "business_address",
  shippingFee: "shipping_fee",
  freeShippingMinimum: "free_shipping_minimum",
  defaultOrderStatus: "default_order_status",
  shippingNotice: "shipping_notice",
} as const;

function getStringSetting(
  rows: Map<string, unknown>,
  key: string,
  fallback: string,
) {
  const value = rows.get(key);
  return typeof value === "string" && value.trim() ? value : fallback;
}

function getNumberSetting(
  rows: Map<string, unknown>,
  key: string,
  fallback: number,
) {
  const value = rows.get(key);

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}

export function calculateShippingFee(
  subtotal: number,
  settings: Pick<SiteSettings, "shippingFee" | "freeShippingMinimum">,
) {
  if (subtotal <= 0) {
    return 0;
  }

  if (
    settings.freeShippingMinimum > 0 &&
    subtotal >= settings.freeShippingMinimum
  ) {
    return 0;
  }

  return settings.shippingFee;
}

export async function getSiteSettings() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("site_settings")
    .select("key, value")
    .in("key", Object.values(settingKeys))
    .returns<SiteSettingRow[]>();

  if (error) {
    throw new Error(error.message);
  }

  const rows = new Map((data ?? []).map((row) => [row.key, row.value]));

  return {
    companyName: getStringSetting(
      rows,
      settingKeys.companyName,
      defaultSiteSettings.companyName,
    ),
    ceoName: getStringSetting(
      rows,
      settingKeys.ceoName,
      defaultSiteSettings.ceoName,
    ),
    csPhone: getStringSetting(
      rows,
      settingKeys.csPhone,
      defaultSiteSettings.csPhone,
    ),
    csEmail: getStringSetting(
      rows,
      settingKeys.csEmail,
      defaultSiteSettings.csEmail,
    ),
    businessAddress: getStringSetting(
      rows,
      settingKeys.businessAddress,
      defaultSiteSettings.businessAddress,
    ),
    shippingFee: getNumberSetting(
      rows,
      settingKeys.shippingFee,
      defaultSiteSettings.shippingFee,
    ),
    freeShippingMinimum: getNumberSetting(
      rows,
      settingKeys.freeShippingMinimum,
      defaultSiteSettings.freeShippingMinimum,
    ),
    defaultOrderStatus: getStringSetting(
      rows,
      settingKeys.defaultOrderStatus,
      defaultSiteSettings.defaultOrderStatus,
    ),
    shippingNotice: getStringSetting(
      rows,
      settingKeys.shippingNotice,
      defaultSiteSettings.shippingNotice,
    ),
  } satisfies SiteSettings;
}

export function toSiteSettingRows(settings: SiteSettings) {
  const updatedAt = new Date().toISOString();

  return [
    {
      key: settingKeys.companyName,
      value: settings.companyName,
      updated_at: updatedAt,
    },
    { key: settingKeys.ceoName, value: settings.ceoName, updated_at: updatedAt },
    { key: settingKeys.csPhone, value: settings.csPhone, updated_at: updatedAt },
    { key: settingKeys.csEmail, value: settings.csEmail, updated_at: updatedAt },
    {
      key: settingKeys.businessAddress,
      value: settings.businessAddress,
      updated_at: updatedAt,
    },
    {
      key: settingKeys.shippingFee,
      value: settings.shippingFee,
      updated_at: updatedAt,
    },
    {
      key: settingKeys.freeShippingMinimum,
      value: settings.freeShippingMinimum,
      updated_at: updatedAt,
    },
    {
      key: settingKeys.defaultOrderStatus,
      value: settings.defaultOrderStatus,
      updated_at: updatedAt,
    },
    {
      key: settingKeys.shippingNotice,
      value: settings.shippingNotice,
      updated_at: updatedAt,
    },
  ];
}
