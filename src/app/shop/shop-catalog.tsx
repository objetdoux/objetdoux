"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { shopMenu, shopSortOptions } from "../site-data";
import type { ShopProduct } from "./shop-data";
import { WishlistButton } from "../wishlist/wishlist-button";

export function ShopCatalog({
  products,
  likedProductSlugs,
}: {
  products: ShopProduct[];
  likedProductSlugs: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const visible = products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" || product.category === selectedCategory;
      const queryMatch =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery);

      return categoryMatch && queryMatch;
    });

    const sorted = [...visible];

    switch (sortBy) {
      case "price-high":
        sorted.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case "price-low":
        sorted.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return sorted;
  }, [products, query, selectedCategory, sortBy]);

  return (
    <>
      <div className="mt-8 rounded-[1.5rem] border border-black/6 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-stone-900">상품 검색</p>
            <p className="mt-1 text-sm text-stone-500">
              상품명과 카테고리 기준으로 검색할 수 있습니다.
            </p>
          </div>
          <div className="flex w-full gap-2 sm:w-auto sm:min-w-[320px]">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="상품명을 검색해보세요"
              className="min-w-0 flex-1 rounded-xl border border-black/8 bg-[#faf8f5] px-4 py-3 text-sm text-stone-700 outline-none placeholder:text-stone-400"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="rounded-[1.5rem] border border-black/6 bg-white p-6">
          <p className="text-sm font-semibold text-stone-900">CATEGORY</p>
          <div className="mt-5 space-y-3">
            {shopMenu.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSelectedCategory(item)}
                className={
                  item === selectedCategory
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
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm text-stone-500">
              총 {filteredProducts.length}개의 상품
            </p>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-xl border border-black/8 bg-white px-4 py-2 text-sm text-stone-700 outline-none"
            >
              {shopSortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => {
              const isLiked = likedProductSlugs.includes(product.slug);

              return (
                <article
                  key={product.slug}
                  className="overflow-hidden rounded-[1.5rem] border border-black/6 bg-white transition hover:border-black/12 hover:bg-[#fcfaf7]"
                >
                  <Link
                    href={`/shop/${product.slug}`}
                    className="m-5 mb-0 block h-64 overflow-hidden rounded-[1rem] bg-[#e5e3de]"
                  >
                    {product.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.thumbnailUrl}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                      />
                    ) : null}
                  </Link>
                  <div className="px-6 py-6">
                    <Link href={`/shop/${product.slug}`} className="block">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a6b5f]">
                        {product.category}
                      </p>
                      <div className="mt-3">
                        <h2 className="text-xl font-semibold tracking-[-0.02em] text-stone-950">
                          {product.name}
                        </h2>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-stone-600">
                        {product.description}
                      </p>
                    </Link>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <p className="text-base font-semibold text-stone-900">
                        {product.soldOut ||
                        (product.trackStock && product.stockQuantity <= 0)
                          ? "품절"
                          : product.price}
                      </p>
                      <WishlistButton
                        productSlug={product.slug}
                        initialLiked={isLiked}
                        label={isLiked ? "좋아요 취소" : "좋아요 추가"}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
