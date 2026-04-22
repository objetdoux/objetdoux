import { shopMenu, shopProducts } from "../site-data";

export default function ShopPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8a6b5f]">
            shop
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            제품과 카테고리를 보여주는 공간
          </h1>
          <p className="mt-6 text-base leading-8 text-stone-600">
            실제 쇼핑몰처럼 왼쪽에는 카테고리, 오른쪽에는 상품 목록이 보이도록
            구조를 잡았습니다. 이후에는 필터, 정렬, 상세 페이지로 자연스럽게
            확장할 수 있습니다.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="rounded-[1.5rem] border border-black/6 bg-white p-6">
            <p className="text-sm font-semibold text-stone-900">CATEGORY</p>
            <div className="mt-5 space-y-3">
              {shopMenu.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={
                    index === 0
                      ? "flex w-full items-center justify-between rounded-xl bg-[#f2ede6] px-4 py-3 text-left text-sm font-medium text-stone-900"
                      : "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-stone-500 transition hover:bg-[#f8f5f1] hover:text-stone-900"
                  }
                >
                  <span>{item}</span>
                  <span className="text-xs text-stone-400">›</span>
                </button>
              ))}
            </div>
          </aside>

          <section>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-stone-500">
                총 {shopProducts.length}개의 상품
              </p>
              <p className="text-sm text-stone-500">최신순</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {shopProducts.map((product) => (
                <article
                  key={product.name}
                  className="overflow-hidden rounded-[1.5rem] border border-black/6 bg-white"
                >
                  <div className="m-5 mb-0 h-64 rounded-[1rem] bg-[#e5e3de]" />
                  <div className="px-6 py-6">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a6b5f]">
                      {product.category}
                    </p>
                    <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-stone-950">
                      {product.name}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-stone-600">
                      {product.description}
                    </p>
                    <p className="mt-5 text-base font-semibold text-stone-900">
                      {product.price}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
