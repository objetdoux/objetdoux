import type { Metadata } from "next";
import Link from "next/link";
import { myPageAddresses } from "../../site-data";

export const metadata: Metadata = {
  title: "배송지 관리",
  description: "objetdoux 배송지 관리 페이지입니다.",
};

export default function MyPageAddressesPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-16 lg:px-8 lg:py-24">
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

        <section className="mt-8 rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-stone-950">
                배송지 관리
              </h1>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                자주 사용하는 배송지를 저장하고 관리하는 페이지입니다.
              </p>
            </div>
            <button
              type="button"
              className="rounded-xl bg-stone-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              새 배송지 추가
            </button>
          </div>

          <div className="mt-8 space-y-4">
            {myPageAddresses.map((address) => (
              <article
                key={address.id}
                className="rounded-[1.5rem] bg-[#faf8f5] px-5 py-5 sm:px-6 sm:py-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    {address.label ? (
                      <p className="inline-flex h-8 items-center rounded-full bg-white px-3 text-xs font-medium text-stone-600">
                        {address.label}
                      </p>
                    ) : null}
                    <p className="mt-2 text-lg font-semibold text-stone-950">
                      {address.recipient}
                    </p>
                    <p className="mt-2 text-sm text-stone-600">{address.phone}</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {address.address}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    {!address.label ? (
                      <button
                        type="button"
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-black/8 bg-white px-4 text-sm font-medium text-stone-700 transition hover:bg-[#f3efe9]"
                      >
                        기본으로 설정
                      </button>
                    ) : null}
                    <Link
                      href={`/mypage/addresses/${address.id}`}
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-black/8 bg-white px-4 text-sm font-medium text-stone-700 transition hover:bg-[#f3efe9]"
                    >
                      수정
                    </Link>
                    <button
                      type="button"
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-black/8 bg-white px-4 text-sm font-medium text-stone-500 transition hover:bg-[#f3efe9] hover:text-stone-700"
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
