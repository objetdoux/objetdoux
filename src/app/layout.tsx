import type { Metadata } from "next";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://objetdoux.com"),
  title: {
    default: "오브제두",
    template: "%s | 오브제두",
  },
  description:
    "오브제두는 일상에 자연스럽게 스며들어, 공간의 분위기를 다정하게 정돈하는 오브제 브랜드입니다.",
  openGraph: {
    title: "오브제두",
    description:
      "조용히 예쁜 것들. soft objects, quiet days.",
    url: "https://objetdoux.com",
    siteName: "오브제두",
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
