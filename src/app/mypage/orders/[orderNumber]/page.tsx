import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatOrderDate,
  formatOrderStatus,
  formatPaymentStatus,
  getCurrentUserOrderByNumber,
} from "../../../orders/order-data";

type OrderDetailPageProps = {
  params: Promise<{ orderNumber: string }>;
};

export async function generateMetadata({
  params,
}: OrderDetailPageProps): Promise<Metadata> {
  const { orderNumber } = await params;

  return {
    title: `주문 ${orderNumber}`,
    description: "objetdoux 주문 상세 페이지입니다.",
  };
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { orderNumber } = await params;
  const order = await getCurrentUserOrderByNumber(orderNumber);

  if (!order) {
    notFound();
  }

  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">
            HOME
          </Link>
          <span>/</span>
          <Link href="/mypage" className="hover:text-stone-900">
            MY PAGE
          </Link>
          <span>/</span>
          <Link href="/mypage/orders" className="hover:text-stone-900">
            ORDERS
          </Link>
          <span>/</span>
          <span>{order.orderNumber}</span>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <section className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-stone-500">
                    {formatOrderDate(order.createdAt)}
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-stone-950">
                    {order.orderNumber}
                  </h1>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-stone-500">주문 상태</p>
                  <p className="mt-2 text-lg font-semibold text-stone-950">
                    {formatOrderStatus(order.orderStatus)}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                주문 상품
              </h2>

              <div className="mt-6 space-y-4">
                {order.items.map((product) => (
                  <div
                    key={product.id}
                    className="grid gap-4 border-t border-black/6 pt-4 first:border-t-0 first:pt-0 sm:grid-cols-[88px_minmax(0,1fr)_auto]"
                  >
                    <div className="aspect-square overflow-hidden rounded-[1rem] bg-[#e5e3de]">
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div>
                      <p className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                        {product.name}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {product.category}
                      </p>
                      <p className="mt-2 text-sm text-stone-500">
                        수량 {product.quantity}개
                      </p>
                    </div>
                    <p className="text-left text-lg font-semibold text-stone-950 sm:text-right">
                      ₩{product.total.toLocaleString("ko-KR")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                  배송 정보
                </h2>
                <div className="mt-6 space-y-4 text-sm leading-6 text-stone-600">
                  <p>받는 분: {order.recipientName}</p>
                  <p>연락처: {order.recipientPhone}</p>
                  <p>
                    주소: {order.recipientAddress}
                    {order.recipientDetailAddress
                      ? `, ${order.recipientDetailAddress}`
                      : ""}
                  </p>
                  <p>배송 메모: {order.deliveryMemo || "-"}</p>
                </div>
              </article>

              <article className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                  결제 정보
                </h2>
                <div className="mt-6 space-y-4 text-sm leading-6 text-stone-600">
                  <p>결제 수단: {order.paymentMethod}</p>
                  <p>결제 상태: {formatPaymentStatus(order.paymentStatus)}</p>
                  <p>상품 금액: ₩{order.subtotal.toLocaleString("ko-KR")}</p>
                  <p>배송비: ₩{order.shippingFee.toLocaleString("ko-KR")}</p>
                  <p className="font-medium text-stone-950">
                    총 결제 금액: ₩{order.total.toLocaleString("ko-KR")}
                  </p>
                </div>
              </article>
            </section>
          </div>

          <aside className="h-fit rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
              주문 요약
            </h2>

            <div className="mt-6 space-y-4 text-sm text-stone-600">
              <div className="flex items-center justify-between gap-4 border-b border-black/6 pb-4">
                <p>주문일</p>
                <p className="text-stone-900">{formatOrderDate(order.createdAt)}</p>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-black/6 pb-4">
                <p>주문 상태</p>
                <p className="text-stone-900">
                  {formatOrderStatus(order.orderStatus)}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-black/6 pb-4">
                <p>결제 상태</p>
                <p className="text-stone-900">
                  {formatPaymentStatus(order.paymentStatus)}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-stone-900">총 결제 금액</p>
                <p className="text-xl font-semibold text-stone-950">
                  ₩{order.total.toLocaleString("ko-KR")}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/mypage/orders"
                className="rounded-xl bg-stone-950 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-stone-800"
              >
                주문 목록으로 돌아가기
              </Link>
              <Link
                href="/shop"
                className="rounded-xl border border-black/8 bg-[#faf8f5] px-6 py-3 text-center text-sm font-medium text-stone-700 transition hover:border-stone-900"
              >
                쇼핑 계속하기
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
