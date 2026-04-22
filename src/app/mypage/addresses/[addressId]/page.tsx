import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAddressById, myPageAddresses } from "../../../site-data";

type AddressEditPageProps = {
  params: Promise<{ addressId: string }>;
};

export function generateStaticParams() {
  return myPageAddresses.map((address) => ({
    addressId: address.id,
  }));
}

export async function generateMetadata({
  params,
}: AddressEditPageProps): Promise<Metadata> {
  const { addressId } = await params;
  const address = getAddressById(addressId);

  return {
    title: address?.label ? `${address.label} 수정` : "배송지 수정",
    description: "objetdoux 배송지 수정 페이지입니다.",
  };
}

export default async function AddressEditPage({
  params,
}: AddressEditPageProps) {
  const { addressId } = await params;
  const address = getAddressById(addressId);

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

        <section className="mt-6 rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-stone-950">
                배송지 수정
              </h1>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                저장된 배송지 정보를 수정하는 목업 화면입니다.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-stone-950 px-5 text-sm font-medium text-white transition hover:bg-stone-800"
              >
                저장하기
              </button>
              <Link
                href="/mypage/addresses"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-black/8 bg-[#faf8f5] px-5 text-sm font-medium text-stone-700 transition hover:bg-white"
              >
                배송지 목록으로 돌아가기
              </Link>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <label className="block">
              <span className="text-sm text-stone-500">받는 분</span>
              <input
                type="text"
                defaultValue={address.recipient}
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
              />
            </label>

            <label className="block">
              <span className="text-sm text-stone-500">연락처</span>
              <input
                type="tel"
                defaultValue={address.phone}
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
              />
            </label>

            <div className="grid gap-6 sm:grid-cols-[160px_minmax(0,1fr)]">
              <label className="block">
                <span className="text-sm text-stone-500">우편번호</span>
                <input
                  type="text"
                  defaultValue={address.zoneCode}
                  className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
                />
              </label>

              <label className="block">
                <span className="text-sm text-stone-500">주소</span>
                <input
                  type="text"
                  defaultValue={address.address}
                  className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-stone-500">상세 메모</span>
              <input
                type="text"
                defaultValue={address.detailAddress}
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
              />
            </label>
          </div>
        </section>
      </div>
    </main>
  );
}
