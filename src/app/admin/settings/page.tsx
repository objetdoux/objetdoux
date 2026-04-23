import type { Metadata } from "next";
import {
  AdminPageHeader,
  AdminSelectField,
  AdminShell,
  AdminTextField,
  AdminTextarea,
} from "../admin-components";
import { updateSiteSettings } from "./actions";
import { getSiteSettings } from "../../site-settings";

export const metadata: Metadata = {
  title: "관리자 설정",
  description: "objetdoux 관리자 기본 설정입니다.",
};

type AdminSettingsPageProps = {
  searchParams: Promise<{ saved?: string }>;
};

export default async function AdminSettingsPage({
  searchParams,
}: AdminSettingsPageProps) {
  const [{ saved }, settings] = await Promise.all([
    searchParams,
    getSiteSettings(),
  ]);

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="SETTINGS"
          title="기본 설정"
          description="쇼핑몰 운영에 필요한 회사 정보와 배송 기본값을 관리합니다."
        />

        {saved ? (
          <div className="rounded-[1.25rem] border border-black/6 bg-white px-5 py-4 text-sm font-medium text-stone-700">
            설정이 저장되었습니다.
          </div>
        ) : null}

        <form action={updateSiteSettings} className="space-y-6">
          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                회사 정보
              </h2>
              <div className="mt-5 space-y-5">
                <AdminTextField
                  label="상호"
                  name="companyName"
                  value={settings.companyName}
                />
                <AdminTextField
                  label="대표자"
                  name="ceoName"
                  value={settings.ceoName}
                />
                <AdminTextField
                  label="고객센터"
                  name="csPhone"
                  value={settings.csPhone}
                />
                <AdminTextField
                  label="이메일"
                  name="csEmail"
                  value={settings.csEmail}
                />
                <AdminTextarea
                  label="주소"
                  name="businessAddress"
                  value={settings.businessAddress}
                />
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                배송/주문 설정
              </h2>
              <div className="mt-5 space-y-5">
                <AdminTextField
                  label="기본 배송비"
                  name="shippingFee"
                  value={settings.shippingFee}
                  type="number"
                />
                <AdminTextField
                  label="무료 배송 기준"
                  name="freeShippingMinimum"
                  value={settings.freeShippingMinimum}
                  type="number"
                />
                <AdminSelectField
                  label="주문 기본 상태"
                  name="defaultOrderStatus"
                  value={settings.defaultOrderStatus}
                  options={["상품 준비 중", "배송 준비", "배송 중"]}
                />
                <AdminTextarea
                  label="기본 배송 안내"
                  name="shippingNotice"
                  value={settings.shippingNotice}
                />
              </div>
            </div>
          </section>

          <button className="h-12 rounded-xl bg-stone-950 px-6 text-sm font-medium text-white transition hover:bg-stone-800">
            설정 저장
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
