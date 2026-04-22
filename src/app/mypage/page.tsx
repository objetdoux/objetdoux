import type { Metadata } from "next";
import Link from "next/link";
import { mockUser, myPageOrders, myPageSections } from "../site-data";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "objetdoux 마이페이지입니다.",
};

export default function MyPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">
            HOME
          </Link>
          <span>/</span>
          <span>MY PAGE</span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
            <p className="text-sm tracking-[0.18em] text-stone-400">MY ACCOUNT</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-stone-950">
              {mockUser.name}
            </h1>

            <div className="mt-6 space-y-4 text-sm leading-6 text-stone-600">
              <p>{mockUser.email}</p>
              <p>{mockUser.phone}</p>
              <p>가입일 {mockUser.joinedAt}</p>
            </div>

            <div className="mt-8 space-y-3">
              {myPageSections.map((section) => (
                <Link
                  key={section.title}
                  href={section.href}
                  className="block rounded-[1.25rem] bg-[#faf8f5] px-4 py-4 transition hover:bg-white"
                >
                  <p className="text-base font-medium text-stone-950">{section.title}</p>
                  <p className="mt-1 text-sm leading-6 text-stone-500">
                    {section.description}
                  </p>
                </Link>
              ))}
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-3xl font-semibold tracking-[-0.03em] text-stone-950">
                    주문 내역
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    최근 주문 상태와 결제 정보를 확인할 수 있는 목업 영역입니다.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="rounded-xl border border-black/8 bg-[#faf8f5] px-4 py-2 text-sm text-stone-700 transition hover:bg-white"
                >
                  쇼핑 계속하기
                </Link>
              </div>

              <div className="mt-8 space-y-4">
                {myPageOrders.map((order) => (
                  <Link
                    key={order.orderNumber}
                    href={`/mypage/orders/${order.orderNumber}`}
                    className="block rounded-[1.5rem] bg-[#faf8f5] px-5 py-5 transition hover:bg-white sm:px-6 sm:py-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm text-stone-500">{order.date}</p>
                        <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-stone-950">
                          {order.orderNumber}
                        </h3>
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
        </div>
      </div>
    </main>
  );
}
