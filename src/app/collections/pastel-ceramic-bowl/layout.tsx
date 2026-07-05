import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "파스텔 세라믹 볼",
  description:
    "식탁에서는 예쁜 도자기 그릇으로, 식사 후에는 그대로 덮어 보관하는 오브제두의 첫 번째 세라믹 볼 컬렉션.",
};

export default function CollectionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
