import type { Metadata } from "next";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "objetdoux",
    template: "%s | objetdoux",
  },
  description:
    "objetdoux 브랜드의 감도와 이야기를 담아내는 공식 홈페이지입니다.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteHeader isLoggedIn={Boolean(user)} />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
