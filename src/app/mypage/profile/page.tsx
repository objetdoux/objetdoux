import type { Metadata } from "next";
import Link from "next/link";
import { mockUser } from "../../site-data";

export const metadata: Metadata = {
  title: "회원 정보",
  description: "objetdoux 회원 정보 페이지입니다.",
};

export default function MyPageProfilePage() {
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
          <span>PROFILE</span>
        </div>

        <section className="mt-6 rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-stone-950">
                회원 정보
              </h1>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                계정 기본 정보와 연락처를 확인하는 페이지입니다.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-stone-950 px-5 text-sm font-medium text-white transition hover:bg-stone-800"
              >
                회원 정보 수정
              </button>
              <Link
                href="/mypage"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-black/8 bg-[#faf8f5] px-5 text-sm font-medium text-stone-700 transition hover:border-stone-900"
              >
                마이페이지로 돌아가기
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <div className="space-y-6">
                <label className="block">
                  <span className="text-sm text-stone-500">이름</span>
                  <input
                    type="text"
                    defaultValue={mockUser.name}
                    className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-stone-500">이메일</span>
                  <input
                    type="email"
                    defaultValue={mockUser.email}
                    className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-stone-500">연락처</span>
                  <input
                    type="tel"
                    defaultValue={mockUser.phone}
                    className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
