import type { Metadata } from "next";
import Link from "next/link";
import {
  deleteAddress,
  setDefaultAddress,
} from "./actions";
import { getAccountAddresses } from "./address-data";

export const metadata: Metadata = {
  title: "배송지 관리",
  description: "objetdoux 배송지 관리 페이지입니다.",
};

export default async function MyPageAddressesPage() {
  const addresses = await getAccountAddresses();

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
          <span>ADDRESSES</span>
        </div>

        <section className="mt-6 rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-stone-950">
                배송지 관리
              </h1>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                자주 사용하는 배송지를 저장하고 관리합니다.
              </p>
            </div>
            <Link
              href="/mypage/addresses/new"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-stone-950 px-5 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              새 배송지 추가
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            {addresses.length === 0 ? (
              <div className="rounded-[1.5rem] bg-[#faf8f5] px-5 py-8 text-center sm:px-6">
                <p className="text-sm leading-6 text-stone-600">
                  아직 등록된 배송지가 없습니다.
                </p>
                <Link
                  href="/mypage/addresses/new"
                  className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-stone-950 px-5 text-sm font-medium text-white transition hover:bg-stone-800"
                >
                  첫 배송지 등록하기
                </Link>
              </div>
            ) : null}

            {addresses.map((address) => (
              <article
                key={address.id}
                className="rounded-[1.5rem] bg-[#faf8f5] px-5 py-4 sm:px-6 sm:py-5"
              >
                <div className="flex min-h-[10rem] flex-col justify-between gap-4">
                  <div>
                    {address.isDefault ? (
                      <p className="text-sm font-medium text-stone-500">
                        기본 배송지
                      </p>
                    ) : null}
                    <p className="mt-2 text-lg font-semibold text-stone-950">
                      {address.recipientName}
                    </p>
                    <p className="mt-1.5 text-sm text-stone-600">{address.phone}</p>
                    <p className="mt-1.5 text-sm leading-6 text-stone-600">
                      {address.address}
                      {address.detailAddress ? `, ${address.detailAddress}` : ""}
                    </p>
                    {address.deliveryMemo ? (
                      <p className="mt-1 text-sm leading-6 text-stone-500">
                        {address.deliveryMemo}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm">
                    {!address.isDefault ? (
                      <form action={setDefaultAddress}>
                        <input type="hidden" name="addressId" value={address.id} />
                        <button className="text-stone-700 transition hover:text-stone-950">
                          기본으로 설정
                        </button>
                      </form>
                    ) : null}
                    <Link
                      href={`/mypage/addresses/${address.id}`}
                      className="text-stone-700 transition hover:text-stone-950"
                    >
                      수정
                    </Link>
                    <form action={deleteAddress}>
                      <input type="hidden" name="addressId" value={address.id} />
                      <button className="text-stone-500 transition hover:text-stone-700">
                        삭제
                      </button>
                    </form>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
