import type { Metadata } from "next";
import Link from "next/link";
import { getWishlistProducts } from "../../wishlist/wishlist-data";
import { WishlistButton } from "../../wishlist/wishlist-button";

export const metadata: Metadata = {
  title: "관심 상품",
  description: "objetdoux 관심 상품 페이지입니다.",
};

export default async function MyPageWishlistPage() {
  const products = await getWishlistProducts();

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
                좋아요로 저장한 상품을 모아볼 수 있습니다.
              </p>
            </div>
            <Link
              href="/shop"
              className="rounded-xl border border-black/8 bg-[#faf8f5] px-4 py-2 text-sm text-stone-700 transition hover:border-stone-900"
            >
              상품 더 보기
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.length === 0 ? (
              <div className="rounded-[1.5rem] bg-[#faf8f5] px-6 py-10 text-center sm:col-span-2 lg:col-span-3">
                <p className="text-sm leading-6 text-stone-600">
                  아직 관심 상품이 없습니다.
                </p>
                <Link
                  href="/shop"
                  className="mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-stone-950 px-6 text-sm font-medium text-white transition hover:bg-stone-800"
                >
                  상품 보러가기
                </Link>
              </div>
            ) : null}

            {products.map((product) => (
              <article
                key={product.slug}
                className="overflow-hidden rounded-[1.5rem] bg-[#faf8f5]"
              >
                <div className="block">
                  <Link
                    href={`/shop/${product.slug}`}
                    className="block aspect-square overflow-hidden bg-[#e5e3de]"
                  >
                    {product.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.thumbnailUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </Link>
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
                      <WishlistButton
                        productSlug={product.slug}
                        initialLiked
                        label="좋아요 취소"
                        size="lg"
                      />
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
