import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
  description: "objetdoux 비밀번호 찾기 페이지입니다.",
};

export default function ResetPasswordPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-xl">
        <section className="rounded-[2rem] border border-black/6 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
              비밀번호 찾기
            </h1>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-black/8 bg-[#faf8f5] px-5 text-sm font-medium text-stone-700 transition hover:border-stone-900"
            >
              로그인으로 돌아가기
            </Link>
          </div>

          <div className="mt-8 space-y-6">
            <label className="block">
              <span className="text-sm text-stone-500">아이디 또는 이메일</span>
              <input
                type="text"
                placeholder="가입한 아이디 또는 이메일을 입력해주세요"
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
              />
            </label>

            <label className="block">
              <span className="text-sm text-stone-500">연락처</span>
              <input
                type="tel"
                placeholder="010-0000-0000"
                className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
              />
            </label>
          </div>

          <div className="mt-8">
            <Link
              href="/reset-password/new"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-stone-950 px-5 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              새로운 비밀번호 설정하기
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
