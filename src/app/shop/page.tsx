import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SHOP",
  description: "오브제두의 첫 번째 파스텔 세라믹 볼 컬렉션을 만나보세요.",
};

const products = [
  { name: "오트 아이보리", english: "Oat Ivory", image: "/product/shop-oat-ivory.png" },
  { name: "소프트 세이지", english: "Soft Sage", image: "/product/shop-soft-sage.png" },
  { name: "미스트 스카이", english: "Mist Sky", image: "/product/shop-mist-sky.png" },
  { name: "더스티 핑크", english: "Dusty Pink", image: "/product/shop-dusty-pink.png" },
  { name: "피치 베이지", english: "Peach Beige", image: "/product/shop-peach-beige.png" },
  { name: "라일락 그레이", english: "Lilac Gray", image: "/product/shop-lilac-gray.png" },
];

export default function ShopPage() {
  return (
    <main className="shop-page">
      <header className="shop-intro">
        <p className="brand-kicker">THE FIRST COLLECTION · 2026</p>
        <h1>SHOP</h1>
        <p>
          담는 순간부터, 남은 순간까지.
          <br />
          오브제두의 첫 번째 데일리 세라믹 볼입니다.
        </p>
      </header>

      <section className="shop-grid" aria-label="파스텔 세라믹 볼 컬러">
        {products.map((product, index) => (
          <Link
            href="/collections/pastel-ceramic-bowl"
            className="shop-card"
            key={product.english}
          >
            <div className="shop-image-wrap">
              <Image
                src={product.image}
                alt={`${product.name} 컬러 세라믹 볼과 반투명 실리콘 뚜껑`}
                fill
                loading={index < 3 ? "eager" : "lazy"}
                sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="shop-product-image"
              />
              <span className="shop-status">COMING SOON</span>
            </div>
            <div className="shop-card-copy">
              <div>
                <h2>{product.name}</h2>
                <p>{product.english}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </div>
          </Link>
        ))}
      </section>

      <div className="shop-note">
        <p>현재 제품 개발 중이며 색상과 세부 사양은 최종 생산 과정에서 달라질 수 있습니다.</p>
        <Link href="/collections/pastel-ceramic-bowl">컬렉션 이야기 보기 <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
}
