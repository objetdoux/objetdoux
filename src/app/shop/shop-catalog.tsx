"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { shopMenu, shopProducts, shopSortOptions } from "../site-data";

export function ShopCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const visible = shopProducts.filter((product) => {
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
  }, [query, selectedCategory, sortBy]);

  return (
    <>
      <div className="mt-8 rounded-[1.5rem] border border-black/6 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-stone-900">상품 검색</p>
            <p className="mt-1 text-sm text-stone-500">
              현재는 목업 상품 기준으로 이름과 카테고리 검색이 가능합니다.
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
            {filteredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="overflow-hidden rounded-[1.5rem] border border-black/6 bg-white transition hover:border-black/12 hover:bg-[#fcfaf7]"
              >
                <div className="m-5 mb-0 h-64 rounded-[1rem] bg-[#e5e3de]" />
                <div className="px-6 py-6">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a6b5f]">
                    {product.category}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-stone-950">
                    {product.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {product.description}
                  </p>
                  <p className="mt-4 text-base font-semibold text-stone-900">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
