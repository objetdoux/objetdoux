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
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  eventPrimaryTitle: string;
  eventPrimaryDescription: string;
  eventPrimaryImageUrl: string;
  eventSecondaryTitle: string;
  eventSecondaryDescription: string;
  eventSecondaryImageUrl: string;
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
  heroTitle: "부드러운 감성의 오브제,\n오브제두",
  heroSubtitle:
    "일상에 자연스럽게 스며드는 물건과 조용한 식탁의 분위기를 제안합니다.",
  heroImageUrl: "",
  eventPrimaryTitle: "첫 런칭 소식",
  eventPrimaryDescription:
    "오브제두의 첫 컬렉션 오픈 일정과 브랜드 소식을 안내하는 영역",
  eventPrimaryImageUrl: "",
  eventSecondaryTitle: "프로모션 안내",
  eventSecondaryDescription:
    "이벤트, 팝업, 온라인 스토어 공지 등 추후 바로 교체 가능한 블록",
  eventSecondaryImageUrl: "",
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
  heroTitle: "home_hero_title",
  heroSubtitle: "home_hero_subtitle",
  heroImageUrl: "home_hero_image_url",
  eventPrimaryTitle: "home_event_primary_title",
  eventPrimaryDescription: "home_event_primary_description",
  eventPrimaryImageUrl: "home_event_primary_image_url",
  eventSecondaryTitle: "home_event_secondary_title",
  eventSecondaryDescription: "home_event_secondary_description",
  eventSecondaryImageUrl: "home_event_secondary_image_url",
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
    heroTitle: getStringSetting(
      rows,
      settingKeys.heroTitle,
      defaultSiteSettings.heroTitle,
    ),
    heroSubtitle: getStringSetting(
      rows,
      settingKeys.heroSubtitle,
      defaultSiteSettings.heroSubtitle,
    ),
    heroImageUrl: getStringSetting(
      rows,
      settingKeys.heroImageUrl,
      defaultSiteSettings.heroImageUrl,
    ),
    eventPrimaryTitle: getStringSetting(
      rows,
      settingKeys.eventPrimaryTitle,
      defaultSiteSettings.eventPrimaryTitle,
    ),
    eventPrimaryDescription: getStringSetting(
      rows,
      settingKeys.eventPrimaryDescription,
      defaultSiteSettings.eventPrimaryDescription,
    ),
    eventPrimaryImageUrl: getStringSetting(
      rows,
      settingKeys.eventPrimaryImageUrl,
      defaultSiteSettings.eventPrimaryImageUrl,
    ),
    eventSecondaryTitle: getStringSetting(
      rows,
      settingKeys.eventSecondaryTitle,
      defaultSiteSettings.eventSecondaryTitle,
    ),
    eventSecondaryDescription: getStringSetting(
      rows,
      settingKeys.eventSecondaryDescription,
      defaultSiteSettings.eventSecondaryDescription,
    ),
    eventSecondaryImageUrl: getStringSetting(
      rows,
      settingKeys.eventSecondaryImageUrl,
      defaultSiteSettings.eventSecondaryImageUrl,
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
    {
      key: settingKeys.heroTitle,
      value: settings.heroTitle,
      updated_at: updatedAt,
    },
    {
      key: settingKeys.heroSubtitle,
      value: settings.heroSubtitle,
      updated_at: updatedAt,
    },
    {
      key: settingKeys.heroImageUrl,
      value: settings.heroImageUrl,
      updated_at: updatedAt,
    },
    {
      key: settingKeys.eventPrimaryTitle,
      value: settings.eventPrimaryTitle,
      updated_at: updatedAt,
    },
    {
      key: settingKeys.eventPrimaryDescription,
      value: settings.eventPrimaryDescription,
      updated_at: updatedAt,
    },
    {
      key: settingKeys.eventPrimaryImageUrl,
      value: settings.eventPrimaryImageUrl,
      updated_at: updatedAt,
    },
    {
      key: settingKeys.eventSecondaryTitle,
      value: settings.eventSecondaryTitle,
      updated_at: updatedAt,
    },
    {
      key: settingKeys.eventSecondaryDescription,
      value: settings.eventSecondaryDescription,
      updated_at: updatedAt,
    },
    {
      key: settingKeys.eventSecondaryImageUrl,
      value: settings.eventSecondaryImageUrl,
      updated_at: updatedAt,
    },
  ];
}
