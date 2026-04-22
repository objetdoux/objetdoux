import type { Metadata } from "next";
import Link from "next/link";
import { myPageOrders } from "../../site-data";

export const metadata: Metadata = {
  title: "주문 내역",
  description: "objetdoux 주문 내역 페이지입니다.",
};

export default function MyPageOrdersPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">
            HOME
          </Link>
          <span>/</span>
          <Link href="/mypage" className="hover:text-stone-900">
            MY PAGE
          </Link>
          <span>/</span>
          <span>ORDERS</span>
        </div>

        <section className="mt-6 rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-stone-950">
                주문 내역
              </h1>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                주문 목록과 상태를 모아보는 페이지입니다.
              </p>
            </div>
            <Link
              href="/mypage"
              className="rounded-xl border border-black/8 bg-[#faf8f5] px-4 py-2 text-sm text-stone-700 transition hover:border-stone-900"
            >
              마이페이지로 돌아가기
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            {myPageOrders.map((order) => (
              <Link
                key={order.orderNumber}
                href={`/mypage/orders/${order.orderNumber}`}
                className="block rounded-[1.5rem] bg-[#faf8f5] px-5 py-5 transition hover:border-black/8 sm:px-6 sm:py-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-stone-500">{order.date}</p>
                    <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-stone-950">
                      {order.orderNumber}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {order.items}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-stone-500">{order.status}</p>
                    <p className="mt-2 text-lg font-semibold text-stone-950">
                      {order.total}
                    </p>
                    <p className="mt-2 text-sm text-stone-400">상세 보기</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
