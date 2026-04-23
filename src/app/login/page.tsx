import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "로그인",
  description: "objetdoux 로그인 페이지입니다.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ joined?: string; verified?: string; authError?: string }>;
}) {
  const { joined, verified, authError } = await searchParams;

  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-xl">
        <section className="rounded-[2rem] border border-black/6 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <div>
            <LoginForm
              joined={joined === "1"}
              verified={verified === "1"}
              authError={authError === "1"}
            />

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
