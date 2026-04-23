import { getWishlistProductSlugs } from "../wishlist/wishlist-data";
import { ShopCatalog } from "./shop-catalog";
import { getShopProducts } from "./shop-data";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getShopProducts();
  const likedProductSlugs = await getWishlistProductSlugs();

  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex min-h-[10.5rem] max-w-2xl flex-col">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            제품과 카테고리를 보여주는 공간
          </h1>
          <p className="mt-6 text-base leading-8 text-stone-600">
            실제 쇼핑몰처럼 왼쪽에는 카테고리, 오른쪽에는 상품 목록이 보이도록
            구조를 잡았습니다. 이후에는 필터, 정렬, 상세 페이지로 자연스럽게
            확장할 수 있습니다.
          </p>
        </div>

        <ShopCatalog products={products} likedProductSlugs={likedProductSlugs} />
      </div>
    </main>
  );
}
