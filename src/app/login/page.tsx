import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "로그인",
  description: "objetdoux 로그인 페이지입니다.",
};

export default function LoginPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-xl">
        <section className="rounded-[2rem] border border-black/6 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <div>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                일반 로그인
              </h2>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="block">
                <span className="text-sm text-stone-500">아이디 또는 이메일</span>
                <input
                  type="text"
                  placeholder="objetdoux@example.com"
                  className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                />
              </label>
              <label className="block">
                <span className="text-sm text-stone-500">비밀번호</span>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                />
              </label>
            </div>

            <div className="mt-6">
              <Link
                href="/mypage"
                className="block rounded-xl bg-stone-950 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-stone-800"
              >
                로그인
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-stone-500">
              <a href="#" className="transition hover:text-stone-900">
                회원가입
              </a>
              <a href="#" className="transition hover:text-stone-900">
                아이디 찾기
              </a>
              <a href="#" className="transition hover:text-stone-900">
                비밀번호 찾기
              </a>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-stone-950">
                간편 로그인
              </h3>

              <div className="mt-4 grid gap-3">
                <button
                  type="button"
                  className="flex h-12 items-center justify-center rounded-xl bg-[#03c75a] px-4 text-sm font-medium text-white"
                >
                  네이버로 시작하기
                </button>
                <button
                  type="button"
                  className="flex h-12 items-center justify-center rounded-xl bg-[#fee500] px-4 text-sm font-medium text-stone-900"
                >
                  카카오로 시작하기
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
