import Link from "next/link";
import { notFound } from "next/navigation";
import { shopProducts } from "../../site-data";
import { getSiteSettings } from "../../site-settings";
import { getWishlistProductSlugs } from "../../wishlist/wishlist-data";
import { getShopProductBySlug, getShopProducts } from "../shop-data";
import { ProductPurchasePanel } from "./product-purchase-panel";
import { WishlistButton } from "../../wishlist/wishlist-button";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ cartError?: string }>;
};

export function generateStaticParams() {
  return shopProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const { cartError } = await searchParams;
  const product = await getShopProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [allProducts, settings] = await Promise.all([
    getShopProducts(),
    getSiteSettings(),
  ]);
  const relatedProducts = allProducts
    .filter(
      (item) => item.category === product.category && item.slug !== product.slug,
    )
    .slice(0, 3);
  const likedProductSlugs = await getWishlistProductSlugs();
  const isLiked = likedProductSlugs.includes(product.slug);
  const isPurchasable =
    !product.soldOut && (!product.trackStock || product.stockQuantity > 0);
  const previewImages = [product.thumbnailUrl, ...product.galleryUrls]
    .filter(Boolean)
    .slice(0, 3);
  const emptyPreviewCount = Math.max(0, 3 - previewImages.length);

  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">
            HOME
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-stone-900">
            SHOP
          </Link>
          <span>/</span>
          <span className="uppercase">{product.category}</span>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-black/6 bg-white p-5 sm:p-6">
            <div className="aspect-square overflow-hidden rounded-[1.25rem] bg-[#e5e3de]">
              {product.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.thumbnailUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {previewImages.map((url, index) => (
                <div
                  key={`${url}-${index}`}
                  className="aspect-square overflow-hidden rounded-[1rem] border border-black/8 bg-[#ece9e4]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
              {[...Array(emptyPreviewCount)].map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="aspect-square rounded-[1rem] bg-[#ece9e4]"
                />
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a6b5f]">
                  {product.category}
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-4xl">
                  {product.name}
                </h1>
                <p className="mt-4 text-lg font-semibold text-stone-900">
                  {product.price}
                </p>
                {product.trackStock ? (
                  <p className="mt-2 text-sm text-stone-500">
                    {isPurchasable ? `남은 수량 ${product.stockQuantity}개` : "품절"}
                  </p>
                ) : product.soldOut ? (
                  <p className="mt-2 text-sm text-stone-500">품절</p>
                ) : null}
              </div>

              <WishlistButton
                productSlug={product.slug}
                initialLiked={isLiked}
                label={isLiked ? "좋아요 취소" : "좋아요 추가"}
                size="lg"
              />
            </div>

            <p className="mt-6 text-base leading-7 text-stone-600">
              {product.summary}
            </p>

            <ProductPurchasePanel
              productSlug={product.slug}
              priceValue={product.priceValue}
              price={product.price}
              isPurchasable={isPurchasable}
              maxQuantity={product.trackStock ? product.stockQuantity : undefined}
            />

            {cartError === "stock" ? (
              <div className="mt-4 rounded-[1rem] bg-[#faf8f5] px-4 py-3 text-sm leading-6 text-red-600">
                현재 선택 가능한 재고 수량을 초과했습니다.
              </div>
            ) : null}

            <div className="mt-8 space-y-3 border-t border-black/6 pt-6 text-sm text-stone-600">
              <div className="grid gap-2 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-4">
                <p className="font-medium text-stone-900">배송 안내</p>
                <p className="sm:max-w-[32rem] sm:justify-self-end sm:text-right">
                  {settings.shippingNotice}
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-4">
                <p className="font-medium text-stone-900">교환 / 반품</p>
                <p className="sm:max-w-[32rem] sm:justify-self-end sm:text-right">
                  수령 후 7일 이내 가능 / 사용 흔적이 없는 경우에 한함
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-4">
                <p className="font-medium text-stone-900">안내</p>
                <p className="sm:max-w-[32rem] sm:justify-self-end sm:text-right">
                  수작업 공정 특성상 미세한 차이가 있을 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <div className="min-h-[32rem] bg-[#e5e3de] sm:min-h-[48rem] lg:min-h-[72rem]">
            {product.detailImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.detailImageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="p-6">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-800">
                  상세 이미지 영역
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-stone-500">
                  추후 와이프분이 넣을 긴 상세페이지 이미지를 위한 영역입니다.
                  카드나 패딩 없이 넓게 붙는 구조로 바꿔두었습니다.
                </p>
              </div>
            )}
          </div>
        </section>

        {relatedProducts.length > 0 ? (
          <section className="mt-16">
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-4xl">
                Related Items
              </h2>
              <Link href="/shop" className="text-sm text-stone-500 hover:text-stone-900">
                전체 상품 보기
              </Link>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/shop/${item.slug}`}
                  className="overflow-hidden rounded-[1.5rem] border border-black/6 bg-white transition hover:border-black/12 hover:bg-[#fcfaf7]"
                >
                  <div className="m-5 mb-0 h-60 overflow-hidden rounded-[1rem] bg-[#e5e3de]">
                    {item.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.thumbnailUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="px-6 py-6">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a6b5f]">
                      {item.category}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-stone-950">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {item.summary}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <p className="text-base font-semibold text-stone-900">
                        {item.price}
                      </p>
                      <span className="text-sm text-stone-400">자세히 보기</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
