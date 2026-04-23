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
import { PendingButton } from "../../components/pending-button";

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
          <input
            type="hidden"
            name="currentHeroImageUrl"
            value={settings.heroImageUrl}
          />
          <input
            type="hidden"
            name="currentEventPrimaryImageUrl"
            value={settings.eventPrimaryImageUrl}
          />
          <input
            type="hidden"
            name="currentEventSecondaryImageUrl"
            value={settings.eventSecondaryImageUrl}
          />
          <section className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
              메인 화면 설정
            </h2>
            <div className="mt-5 grid gap-5 xl:grid-cols-2">
              <label className="block xl:col-span-2">
                <span className="text-sm font-medium text-stone-700">
                  메인 배너 이미지
                </span>
                <div className="mt-2 overflow-hidden rounded-xl bg-[#dedbd5] aspect-[16/6]">
                  {settings.heroImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={settings.heroImageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <p className="mt-2 text-xs font-medium leading-5 text-stone-700">
                  권장 사이즈: 1920 x 720px 이상, 가로형
                </p>
                <input
                  name="heroImage"
                  type="file"
                  accept="image/*"
                  className="mt-3 block w-full text-sm text-stone-600 file:mr-4 file:h-10 file:rounded-xl file:border-0 file:bg-stone-950 file:px-4 file:text-xs file:font-medium file:text-white"
                />
              </label>
              <AdminTextarea
                label="메인 배너 제목"
                name="heroTitle"
                value={settings.heroTitle}
              />
              <AdminTextarea
                label="메인 배너 설명"
                name="heroSubtitle"
                value={settings.heroSubtitle}
              />
              <AdminTextField
                label="이벤트 1 제목"
                name="eventPrimaryTitle"
                value={settings.eventPrimaryTitle}
              />
              <label className="block">
                <span className="text-sm font-medium text-stone-700">
                  이벤트 1 이미지
                </span>
                <div className="mt-2 overflow-hidden rounded-xl bg-[#dedbd5] aspect-[12/7]">
                  {settings.eventPrimaryImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={settings.eventPrimaryImageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <p className="mt-2 text-xs font-medium leading-5 text-stone-700">
                  권장 사이즈: 1200 x 700px 이상, 가로형
                </p>
                <input
                  name="eventPrimaryImage"
                  type="file"
                  accept="image/*"
                  className="mt-3 block w-full text-sm text-stone-600 file:mr-4 file:h-10 file:rounded-xl file:border-0 file:bg-stone-950 file:px-4 file:text-xs file:font-medium file:text-white"
                />
              </label>
              <AdminTextarea
                label="이벤트 1 설명"
                name="eventPrimaryDescription"
                value={settings.eventPrimaryDescription}
              />
              <AdminTextField
                label="이벤트 2 제목"
                name="eventSecondaryTitle"
                value={settings.eventSecondaryTitle}
              />
              <label className="block">
                <span className="text-sm font-medium text-stone-700">
                  이벤트 2 이미지
                </span>
                <div className="mt-2 overflow-hidden rounded-xl bg-[#dedbd5] aspect-[12/7]">
                  {settings.eventSecondaryImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={settings.eventSecondaryImageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <p className="mt-2 text-xs font-medium leading-5 text-stone-700">
                  권장 사이즈: 1200 x 700px 이상, 가로형
                </p>
                <input
                  name="eventSecondaryImage"
                  type="file"
                  accept="image/*"
                  className="mt-3 block w-full text-sm text-stone-600 file:mr-4 file:h-10 file:rounded-xl file:border-0 file:bg-stone-950 file:px-4 file:text-xs file:font-medium file:text-white"
                />
              </label>
              <AdminTextarea
                label="이벤트 2 설명"
                name="eventSecondaryDescription"
                value={settings.eventSecondaryDescription}
              />
            </div>
          </section>

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

          <PendingButton
            pendingLabel="저장 중"
            className="h-12 rounded-xl bg-stone-950 px-6 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-wait disabled:opacity-60"
          >
            설정 저장
          </PendingButton>
        </form>
      </div>
    </AdminShell>
  );
}
