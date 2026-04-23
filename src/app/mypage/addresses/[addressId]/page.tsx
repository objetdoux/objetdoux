import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateAddress } from "../actions";
import { getAccountAddress } from "../address-data";
import { PendingButton } from "../../../components/pending-button";

type AddressEditPageProps = {
  params: Promise<{ addressId: string }>;
};

export async function generateMetadata({
  params: _params,
}: AddressEditPageProps): Promise<Metadata> {
  void _params;
  return {
    title: "배송지 수정",
    description: "objetdoux 배송지 수정 페이지입니다.",
  };
}

export default async function AddressEditPage({
  params,
}: AddressEditPageProps) {
  const { addressId } = await params;
  const address = await getAccountAddress(addressId);

  if (!address) {
    notFound();
  }

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
          <span>EDIT</span>
        </div>

        <form
          action={updateAddress}
          className="mt-6 rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8"
        >
          <input type="hidden" name="addressId" value={address.id} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-stone-950">
                배송지 수정
              </h1>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                저장된 배송지 정보를 수정합니다.
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
                href="/mypage/addresses"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-black/8 bg-[#faf8f5] px-5 text-sm font-medium text-stone-700 transition hover:border-stone-900"
              >
                배송지 목록으로 돌아가기
              </Link>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <label className="block">
              <span className="text-sm text-stone-500">받는 분</span>
              <input
                name="recipientName"
                type="text"
                defaultValue={address.recipientName}
                required
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
              />
            </label>

            <label className="block">
              <span className="text-sm text-stone-500">연락처</span>
              <input
                name="phone"
                type="tel"
                defaultValue={address.phone}
                required
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
              />
            </label>

            <input type="hidden" name="zoneCode" value={address.zoneCode} />
            <label className="block">
              <span className="text-sm text-stone-500">주소</span>
              <input
                name="address"
                type="text"
                defaultValue={address.address}
                required
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
              />
            </label>

            <label className="block">
              <span className="text-sm text-stone-500">상세 주소</span>
              <input
                name="detailAddress"
                type="text"
                defaultValue={address.detailAddress}
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
              />
            </label>

            <label className="block">
              <span className="text-sm text-stone-500">배송 메모</span>
              <input
                name="deliveryMemo"
                type="text"
                defaultValue={address.deliveryMemo}
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
              />
            </label>

            <label className="flex items-center gap-3 text-sm text-stone-600">
              <input
                name="isDefault"
                type="checkbox"
                defaultChecked={address.isDefault}
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
