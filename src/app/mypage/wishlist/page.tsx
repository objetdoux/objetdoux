import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug, wishlistSlugs } from "../../site-data";

export const metadata: Metadata = {
  title: "관심 상품",
  description: "objetdoux 관심 상품 페이지입니다.",
};

export default function MyPageWishlistPage() {
  const products = wishlistSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is NonNullable<typeof product> => product !== null);

  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">
            HOME
          </Link>
          <span>/</span>
          <Link href="/mypage" className="hover:text-stone-900">
            MY PAGE
          </Link>
          <span>/</span>
          <span>WISHLIST</span>
        </div>

        <section className="mt-6 rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-stone-950">
                관심 상품
              </h1>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                추후 찜 기능과 연결될 수 있는 관심 상품 목업 페이지입니다.
              </p>
            </div>
            <Link
              href="/shop"
              className="rounded-xl border border-black/8 bg-[#faf8f5] px-4 py-2 text-sm text-stone-700 transition hover:bg-white"
            >
              상품 더 보기
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.slug}
                className="overflow-hidden rounded-[1.5rem] bg-[#faf8f5]"
              >
                <div className="block">
                  <div className="aspect-square bg-[#e5e3de]" />
                  <div className="flex min-h-[13rem] flex-col px-5 py-5">
                    <div>
                      <p className="text-sm text-stone-500">{product.category}</p>
                      <Link href={`/shop/${product.slug}`} className="block">
                        <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-stone-950">
                          {product.name}
                        </h2>
                      </Link>
                    </div>
                    <p className="mt-2 min-h-[3.75rem] text-sm leading-6 text-stone-600">
                      {product.summary}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                      <Link
                        href={`/shop/${product.slug}`}
                        className="text-base font-semibold text-stone-950"
                      >
                        {product.price}
                      </Link>
                      <button
                        type="button"
                        aria-label="좋아요 취소"
                        className="flex h-14 w-14 shrink-0 items-center justify-center text-[2.1rem] leading-none text-stone-900 transition hover:scale-105"
                      >
                        ♥
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
