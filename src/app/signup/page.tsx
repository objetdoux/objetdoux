import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "회원가입",
  description: "objetdoux 회원가입 페이지입니다.",
};

export default function SignUpPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-xl">
        <section className="rounded-[2rem] border border-black/6 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
              회원가입
            </h1>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-black/8 bg-[#faf8f5] px-5 text-sm font-medium text-stone-700 transition hover:border-stone-900"
            >
              로그인으로 돌아가기
            </Link>
          </div>

          <SignupForm />
        </section>
      </div>
    </main>
  );
}
