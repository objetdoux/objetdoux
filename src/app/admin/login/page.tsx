import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getAdminSession } from "../admin-auth";
import { AdminLoginForm } from "./admin-login-form";

export const metadata: Metadata = {
  title: "관리자 로그인",
  description: "objetdoux 관리자 로그인입니다.",
};

export default async function AdminLoginPage() {
  const adminSession = await getAdminSession();

  if (adminSession) {
    redirect("/admin");
  }

  return (
    <main className="bg-[#f7f3ee] px-6 py-12 lg:px-8 lg:py-16">
      <section className="mx-auto w-full max-w-md rounded-[1.75rem] border border-black/6 bg-white px-6 py-8 sm:px-8">
        <p className="text-xs font-medium tracking-[0.24em] text-stone-400">
          ADMIN ONLY
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-stone-950">
          관리자 로그인
        </h1>
        <p className="mt-2 text-sm leading-5 text-stone-600">
          상품과 주문을 관리하는 내부 운영 페이지입니다.
        </p>

        <Suspense fallback={null}>
          <AdminLoginForm />
        </Suspense>

        <Link
          href="/"
          className="mt-5 inline-flex text-sm text-stone-500 transition hover:text-stone-950"
        >
          사이트로 돌아가기
        </Link>
      </section>
    </main>
  );
}
