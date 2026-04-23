import type { Metadata } from "next";
import Link from "next/link";
import { AdminPageHeader, AdminShell, StatusPill } from "../admin-components";
import {
  adminOrderStatusOptions,
  adminPaymentStatusOptions,
  getAdminOrders,
} from "./order-data";

export const metadata: Metadata = {
  title: "주문 관리",
  description: "objetdoux 관리자 주문 관리 목업입니다.",
};

type AdminOrdersPageProps = {
  searchParams: Promise<{
    q?: string;
    paymentStatus?: string;
    orderStatus?: string;
  }>;
};

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
  const params = await searchParams;
  const orders = await getAdminOrders({
    query: params.q,
    paymentStatus: params.paymentStatus,
    orderStatus: params.orderStatus,
  });
  const hasFilters = Boolean(
    params.q || params.paymentStatus || params.orderStatus,
  );

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="ORDERS"
          title="주문 관리"
          description="결제 완료된 주문을 확인하고 주문 상태를 변경합니다."
        />

        <section className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
          <form
            action="/admin/orders"
            className="grid gap-3 md:grid-cols-[1fr_170px_170px_auto]"
          >
            <input
              name="q"
              defaultValue={params.q ?? ""}
              placeholder="주문번호, 주문자 검색"
              className="h-12 rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm outline-none transition focus:border-stone-900"
            />
            <select
              name="paymentStatus"
              defaultValue={params.paymentStatus ?? "all"}
              className="h-12 rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm outline-none transition focus:border-stone-900"
            >
              <option value="all">전체 결제 상태</option>
              {adminPaymentStatusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <select
              name="orderStatus"
              defaultValue={params.orderStatus ?? "all"}
              className="h-12 rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm outline-none transition focus:border-stone-900"
            >
              <option value="all">전체 주문 상태</option>
              {adminOrderStatusOptions.map((status) => (
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
            <p>검색 결과 {orders.length}건</p>
            {hasFilters ? (
              <Link href="/admin/orders" className="font-medium hover:text-stone-950">
                필터 초기화
              </Link>
            ) : null}
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-black/6">
            <div className="hidden grid-cols-[1fr_0.7fr_1.1fr_0.7fr_0.8fr_0.8fr] bg-[#faf8f5] px-5 py-3 text-xs font-medium text-stone-500 md:grid">
              <span>주문번호</span>
              <span>주문자</span>
              <span>상품</span>
              <span>금액</span>
              <span>상태</span>
              <span>관리</span>
            </div>
            <div className="divide-y divide-black/6">
              {orders.length === 0 ? (
                <div className="px-5 py-8 text-center text-sm text-stone-500">
                  {hasFilters
                    ? "조건에 맞는 주문이 없습니다."
                    : "아직 생성된 주문이 없습니다."}
                </div>
              ) : null}

              {orders.map((order) => (
                <div
                  key={order.orderNumber}
                  className="grid gap-3 px-5 py-4 text-sm md:grid-cols-[1fr_0.7fr_1.1fr_0.7fr_0.8fr_0.8fr] md:items-center"
                >
                  <div>
                    <p className="font-semibold text-stone-950">{order.orderNumber}</p>
                    <p className="mt-1 text-stone-500">{order.createdDate}</p>
                  </div>
                  <p className="text-stone-700">{order.buyerName}</p>
                  <p className="text-stone-700">{order.title}</p>
                  <p className="font-semibold text-stone-950">
                    ₩{order.total.toLocaleString("ko-KR")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <StatusPill>{order.orderStatusLabel}</StatusPill>
                    <StatusPill tone="muted">{order.paymentStatusLabel}</StatusPill>
                  </div>
                  <Link
                    href={`/admin/orders/${order.orderNumber}`}
                    className="text-sm font-medium text-stone-600 transition hover:text-stone-950"
                  >
                    상세
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
