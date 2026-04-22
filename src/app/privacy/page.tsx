import type { Metadata } from "next";
import Link from "next/link";
import { LegalContent, privacyDocument } from "../components/legal-content";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "objetdoux 개인정보 처리방침 안내 페이지입니다.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">
            HOME
          </Link>
          <span>/</span>
          <span>PRIVACY</span>
        </div>

        <div className="mt-6 rounded-[2rem] bg-white px-6 py-8 sm:px-10 sm:py-10">
          <LegalContent document={privacyDocument} />
        </div>
      </div>
    </main>
  );
}
