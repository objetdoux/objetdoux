import { ShopCatalog } from "./shop-catalog";

export default function ShopPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            제품과 카테고리를 보여주는 공간
          </h1>
          <p className="mt-6 text-base leading-8 text-stone-600">
            실제 쇼핑몰처럼 왼쪽에는 카테고리, 오른쪽에는 상품 목록이 보이도록
            구조를 잡았습니다. 이후에는 필터, 정렬, 상세 페이지로 자연스럽게
            확장할 수 있습니다.
          </p>
        </div>

        <ShopCatalog />
      </div>
    </main>
  );
}
