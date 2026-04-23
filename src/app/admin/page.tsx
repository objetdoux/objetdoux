import type { Metadata } from "next";
import Link from "next/link";
import {
  AdminPageHeader,
  AdminPrimaryLink,
  AdminSecondaryLink,
  AdminShell,
  StatusPill,
} from "./admin-components";
import { getAdminOrderDashboardStats } from "./orders/order-data";
import { getAdminProductDashboardStats } from "./products/product-data";

export const metadata: Metadata = {
  title: "관리자 대시보드",
  description: "objetdoux 관리자 대시보드 목업입니다.",
};

export default async function AdminDashboardPage() {
  const [
    { orders, todayOrderCount, todaySales, pendingOrderCount },
    {
      totalProductCount,
      visibleProductCount,
      hiddenProductCount,
      soldOutProductCount,
      newProductCount,
    },
  ] = await Promise.all([
    getAdminOrderDashboardStats(),
    getAdminProductDashboardStats(),
  ]);
  const recentOrders = orders.slice(0, 5);
  const summaryCards = [
    { label: "오늘 주문", value: `${todayOrderCount}건` },
    { label: "오늘 매출", value: `₩${todaySales.toLocaleString("ko-KR")}` },
    { label: "처리 필요", value: `${pendingOrderCount}건` },
    { label: "품절 상품", value: `${soldOutProductCount}개` },
  ];

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="DASHBOARD"
          title="관리자 대시보드"
          description="상품, 주문, 회원 상태를 빠르게 확인하는 운영 화면입니다."
          action={
            <div className="flex flex-wrap gap-2">
              <AdminSecondaryLink href="/admin/orders">주문 관리</AdminSecondaryLink>
              <AdminPrimaryLink href="/admin/products/new">상품 등록</AdminPrimaryLink>
            </div>
          }
        />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-[1.25rem] border border-black/6 bg-white px-5 py-5"
            >
              <p className="text-sm text-stone-500">{card.label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <section className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                최근 주문
              </h2>
              <p className="mt-1 text-sm leading-5 text-stone-500">
                결제 완료 이후 처리해야 할 주문을 먼저 확인합니다.
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-sm font-medium text-stone-600 transition hover:text-stone-950"
            >
              전체 보기
            </Link>
          </div>

          <div className="mt-5 divide-y divide-black/6">
            {recentOrders.map((order) => (
              <Link
                key={order.orderNumber}
                href={`/admin/orders/${order.orderNumber}`}
                className="grid gap-3 py-4 text-sm transition hover:text-stone-950 md:grid-cols-[1.2fr_1fr_0.8fr_0.8fr]"
              >
                <div>
                  <p className="font-semibold text-stone-950">
                    {order.orderNumber}
                  </p>
                  <p className="mt-1 text-stone-500">{order.createdDate}</p>
                </div>
                <p className="text-stone-700">{order.title}</p>
                <p className="font-semibold text-stone-950">
                  ₩{order.total.toLocaleString("ko-KR")}
                </p>
                <StatusPill>{order.orderStatusLabel}</StatusPill>
              </Link>
            ))}
            {recentOrders.length === 0 ? (
              <div className="py-6 text-sm text-stone-500">
                아직 생성된 주문이 없습니다.
              </div>
            ) : null}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
              상품 운영 체크
            </h2>
            <div className="mt-5 space-y-3 text-sm text-stone-600">
              <p>전체 상품 {totalProductCount}개</p>
              <p>노출 상품 {visibleProductCount}개</p>
              <p>비노출 상품 {hiddenProductCount}개</p>
              <p>품절 상품 {soldOutProductCount}개</p>
              <p>신상품 표시 {newProductCount}개</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
              다음 연결 작업
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-5 text-stone-600">
              <p>관리자 기본 설정 DB 연결</p>
              <p>상품 검색/필터 실제 동작 연결</p>
              <p>결제사 결정 후 주문 상태값 연결</p>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
