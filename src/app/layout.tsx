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
    "오브제두는 쓰임과 아름다움 사이의 작은 균형을 생각하며, 매일의 공간에 자연스럽게 스며드는 다정한 오브제를 만듭니다.",
  openGraph: {
    title: "오브제두",
    description:
      "gentle objects for everyday living. 일상에 자연스럽게 스며드는 다정한 오브제.",
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
