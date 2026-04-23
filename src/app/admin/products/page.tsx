import type { Metadata } from "next";
import Link from "next/link";
import {
  AdminPageHeader,
  AdminPrimaryLink,
  AdminShell,
  StatusPill,
} from "../admin-components";
import { getAdminProducts } from "./product-data";

export const metadata: Metadata = {
  title: "상품 관리",
  description: "objetdoux 관리자 상품 관리 목업입니다.",
};

export const dynamic = "force-dynamic";

type AdminProductsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    status?: string;
  }>;
};

const categoryOptions = ["Plate", "Cup", "Bowl", "Tea Ware", "Object"];
const statusOptions = [
  { value: "selling", label: "판매중" },
  { value: "sold_out", label: "품절" },
  { value: "hidden", label: "비노출" },
];

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const params = await searchParams;
  const products = await getAdminProducts({
    query: params.q,
    category: params.category,
    status: params.status,
  });
  const hasFilters = Boolean(params.q || params.category || params.status);

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="PRODUCTS"
          title="상품 관리"
          description="상품 등록, 수정, 노출 여부와 품절 상태를 관리합니다."
          action={<AdminPrimaryLink href="/admin/products/new">상품 등록</AdminPrimaryLink>}
        />

        <section className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
          <form
            action="/admin/products"
            className="grid gap-3 md:grid-cols-[1fr_180px_140px_auto]"
          >
            <input
              name="q"
              defaultValue={params.q ?? ""}
              placeholder="상품명 또는 카테고리 검색"
              className="h-12 rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm outline-none transition focus:border-stone-900"
            />
            <select
              name="category"
              defaultValue={params.category ?? "all"}
              className="h-12 rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm outline-none transition focus:border-stone-900"
            >
              <option value="all">전체 카테고리</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              name="status"
              defaultValue={params.status ?? "all"}
              className="h-12 rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm outline-none transition focus:border-stone-900"
            >
              <option value="all">전체 상태</option>
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <button className="h-12 rounded-xl bg-stone-950 px-5 text-sm font-medium text-white transition hover:bg-stone-800">
              검색
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-stone-500">
            <p>검색 결과 {products.length}개</p>
            {hasFilters ? (
              <Link href="/admin/products" className="font-medium hover:text-stone-950">
                필터 초기화
              </Link>
            ) : null}
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-black/6">
            <div className="hidden grid-cols-[80px_1.2fr_0.7fr_0.7fr_0.8fr_0.7fr] bg-[#faf8f5] px-5 py-3 text-xs font-medium text-stone-500 md:grid">
              <span>이미지</span>
              <span>상품명</span>
              <span>카테고리</span>
              <span>가격</span>
              <span>상태</span>
              <span>관리</span>
            </div>
            <div className="divide-y divide-black/6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid gap-4 px-5 py-4 text-sm md:grid-cols-[80px_1.2fr_0.7fr_0.7fr_0.8fr_0.7fr] md:items-center"
                >
                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-[#dedbd5]">
                    {product.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.thumbnailUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-950">{product.name}</p>
                    <p className="mt-1 text-stone-500">{product.description}</p>
                  </div>
                  <p className="text-stone-600">{product.category}</p>
                  <p className="font-semibold text-stone-950">{product.price}</p>
                  <div className="flex flex-wrap gap-2">
                    <StatusPill tone={product.soldOut ? "muted" : "default"}>
                      {product.soldOut ? "품절" : "판매중"}
                    </StatusPill>
                    <StatusPill tone={product.visible ? "dark" : "muted"}>
                      {product.visible ? "노출" : "비노출"}
                    </StatusPill>
                  </div>
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-sm font-medium text-stone-600 transition hover:text-stone-950"
                  >
                    수정
                  </Link>
                </div>
              ))}
              {products.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-stone-500">
                  {hasFilters
                    ? "조건에 맞는 상품이 없습니다."
                    : "아직 등록된 상품이 없습니다."}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
