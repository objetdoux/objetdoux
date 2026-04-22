import type { Metadata } from "next";
import Link from "next/link";
import { myPageAddresses } from "../../site-data";

export const metadata: Metadata = {
  title: "배송지 관리",
  description: "objetdoux 배송지 관리 페이지입니다.",
};

export default function MyPageAddressesPage() {
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
                자주 사용하는 배송지를 저장하고 관리하는 페이지입니다.
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
            {myPageAddresses.map((address) => (
              <article
                key={address.id}
                className="rounded-[1.5rem] bg-[#faf8f5] px-5 py-4 sm:px-6 sm:py-5"
              >
                <div className="flex min-h-[10rem] flex-col justify-between gap-4">
                  <div>
                    {address.label ? (
                      <p className="text-sm font-medium text-stone-500">
                        {address.label}
                      </p>
                    ) : null}
                    <p className="mt-2 text-lg font-semibold text-stone-950">
                      {address.recipient}
                    </p>
                    <p className="mt-1.5 text-sm text-stone-600">{address.phone}</p>
                    <p className="mt-1.5 text-sm leading-6 text-stone-600">
                      {address.address}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm">
                    {!address.label ? (
                      <button
                        type="button"
                        className="text-stone-700 transition hover:text-stone-950"
                      >
                        기본으로 설정
                      </button>
                    ) : null}
                    <Link
                      href={`/mypage/addresses/${address.id}`}
                      className="text-stone-700 transition hover:text-stone-950"
                    >
                      수정
                    </Link>
                    <button
                      type="button"
                      className="text-stone-500 transition hover:text-stone-700"
                    >
                      삭제
                    </button>
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
