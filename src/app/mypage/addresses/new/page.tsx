import type { Metadata } from "next";
import Link from "next/link";
import { createAddress } from "../actions";
import { PendingButton } from "../../../components/pending-button";

export const metadata: Metadata = {
  title: "새 배송지 추가",
  description: "objetdoux 새 배송지 추가 페이지입니다.",
};

type NewAddressPageProps = {
  searchParams: Promise<{ returnTo?: string }>;
};

function getSafeReturnTo(returnTo?: string) {
  if (!returnTo || !returnTo.startsWith("/") || returnTo.startsWith("//")) {
    return "/mypage/addresses";
  }

  return returnTo;
}

export default async function NewAddressPage({
  searchParams,
}: NewAddressPageProps) {
  const { returnTo } = await searchParams;
  const safeReturnTo = getSafeReturnTo(returnTo);

  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">
            HOME
          </Link>
          <span>/</span>
          <Link href="/mypage" className="hover:text-stone-900">
            MY PAGE
          </Link>
          <span>/</span>
          <Link href="/mypage/addresses" className="hover:text-stone-900">
            ADDRESSES
          </Link>
          <span>/</span>
          <span>NEW</span>
        </div>

        <form
          action={createAddress}
          className="mt-6 rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8"
        >
          <input type="hidden" name="returnTo" value={safeReturnTo} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-stone-950">
                새 배송지 추가
              </h1>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                새로운 배송지를 등록합니다.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <PendingButton
                type="submit"
                pendingLabel="저장 중"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-stone-950 px-5 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-wait disabled:opacity-60"
              >
                저장하기
              </PendingButton>
              <Link
                href={safeReturnTo}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-black/8 bg-[#faf8f5] px-5 text-sm font-medium text-stone-700 transition hover:border-stone-900"
              >
                돌아가기
              </Link>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <label className="block">
              <span className="text-sm text-stone-500">받는 분</span>
              <input
                name="recipientName"
                type="text"
                placeholder="받는 분 이름을 입력해주세요"
                required
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
              />
            </label>

            <label className="block">
              <span className="text-sm text-stone-500">연락처</span>
              <input
                name="phone"
                type="tel"
                placeholder="010-0000-0000"
                required
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
              />
            </label>

            <input type="hidden" name="zoneCode" value="" />
            <label className="block">
              <span className="text-sm text-stone-500">주소</span>
              <input
                name="address"
                type="text"
                placeholder="주소를 입력해주세요"
                required
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
              />
            </label>

            <label className="block">
              <span className="text-sm text-stone-500">상세 메모</span>
              <input
                name="detailAddress"
                type="text"
                placeholder="동/호수 또는 상세 주소를 입력해주세요"
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
              />
            </label>

            <label className="block">
              <span className="text-sm text-stone-500">배송 메모</span>
              <input
                name="deliveryMemo"
                type="text"
                placeholder="공동현관 비밀번호 또는 배송 메모를 입력해주세요"
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
              />
            </label>

            <label className="flex items-center gap-3 text-sm text-stone-600">
              <input
                name="isDefault"
                type="checkbox"
                className="h-4 w-4 accent-stone-950"
              />
              <span>기본 배송지로 저장</span>
            </label>
          </div>
        </form>
      </div>
    </main>
  );
}
