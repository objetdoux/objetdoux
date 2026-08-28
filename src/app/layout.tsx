import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://objetdoux.com"),
  title: "오브제두 | 매일 쓰고 싶은, 부드러운 오브제",
  description: "식탁에서 냉장고까지. 한국의 일상에 자연스럽게 어울리는 국내 생산 도자기 브랜드 오브제두입니다.",
  openGraph: {
    title: "오브제두 | 매일 쓰고 싶은, 부드러운 오브제",
    description: "담고, 즐기고, 그대로 보관하는 오브제두의 첫 번째 데일리 볼.",
    url: "https://objetdoux.com",
    siteName: "Objetdoux",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/product/collection-lifestyle-primary.png", width: 1672, height: 941, alt: "오브제두 파스텔 세라믹 볼" }],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
