import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "회원가입 안내",
  description: "objetdoux 회원가입 완료 안내 페이지입니다.",
};

export default async function SignupCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-xl">
        <section className="rounded-[2rem] border border-black/6 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-sm uppercase tracking-[0.22em] text-stone-400">
            SIGN UP
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-stone-950">
            이메일 인증을 확인해주세요
          </h1>
          <p className="mt-5 text-sm leading-6 text-stone-600">
            회원가입 요청이 접수되었습니다. Supabase 이메일 인증이 켜져 있는
            경우, 가입한 이메일로 전송된 인증 링크를 눌러야 로그인이 가능합니다.
          </p>

          {email ? (
            <div className="mt-6 rounded-[1.25rem] bg-[#faf8f5] px-5 py-4">
              <p className="text-xs text-stone-400">가입 이메일</p>
              <p className="mt-1 break-all text-base font-medium text-stone-950">
                {email}
              </p>
            </div>
          ) : null}

          <div className="mt-6 space-y-2 text-sm leading-6 text-stone-500">
            <p>메일이 보이지 않으면 스팸함이나 프로모션함을 확인해주세요.</p>
            <p>이메일 인증을 완료한 뒤 로그인 화면에서 다시 로그인하면 됩니다.</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-stone-950 px-5 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              로그인으로 이동
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-black/8 bg-[#faf8f5] px-5 text-sm font-medium text-stone-700 transition hover:border-stone-900"
            >
              홈으로 이동
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
