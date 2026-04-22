import Link from "next/link";
import { cartItems, getProductBySlug } from "../site-data";

const shippingFee = 3000;
const orderNumber = "OD-20260422-001";

export default function OrderCompletePage() {
  const items = cartItems
    .map((item) => {
      const product = getProductBySlug(item.slug);

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: item.quantity,
        total: product.priceValue * item.quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const total = subtotal + shippingFee;

  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">
            HOME
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-stone-900">
            SHOP
          </Link>
          <span>/</span>
          <Link href="/checkout" className="hover:text-stone-900">
            CHECKOUT
          </Link>
          <span>/</span>
          <span>COMPLETE</span>
        </div>

        <section className="mt-6 rounded-[2rem] border border-black/6 bg-white px-6 py-10 sm:px-10 sm:py-12">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-950 text-lg text-white">
                ✓
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
                주문이 완료되었습니다
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-6 text-stone-600">
                오브제두의 첫 주문 흐름을 확인할 수 있는 완료 화면입니다. 실제
                결제 연동 전 단계이므로 주문 완료 후 안내 화면의 구조와 분위기를
                우선 정리해두었습니다.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.25rem] bg-[#faf8f5] px-5 py-5">
                  <p className="text-sm text-stone-500">주문번호</p>
                  <p className="mt-2 text-lg font-semibold text-stone-950">
                    {orderNumber}
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-[#faf8f5] px-5 py-5">
                  <p className="text-sm text-stone-500">결제 금액</p>
                  <p className="mt-2 text-lg font-semibold text-stone-950">
                    ₩{total.toLocaleString("ko-KR")}
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-[#faf8f5] px-5 py-5">
                  <p className="text-sm text-stone-500">배송 예정</p>
                  <p className="mt-2 text-lg font-semibold text-stone-950">
                    2-5일 소요
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-black/6 bg-[#faf8f5] px-6 py-6">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                  배송 안내
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
                  <p>주문 확인 후 순차적으로 발송되며, 기본 배송은 2-5일 정도 소요됩니다.</p>
                  <p>제주 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.</p>
                  <p>실제 운영 시에는 문자 또는 이메일 알림 흐름을 함께 연결하면 좋습니다.</p>
                </div>
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-black/6 bg-[#faf8f5] px-6 py-7 sm:px-8 sm:py-8">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                주문 요약
              </h2>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.slug}
                    className="grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3"
                  >
                    <div className="aspect-square rounded-[0.9rem] bg-[#e5e3de]" />
                    <div>
                      <p className="text-base font-medium text-stone-950">{item.name}</p>
                      <p className="mt-1 text-sm text-stone-500">수량 {item.quantity}개</p>
                    </div>
                    <p className="text-sm font-medium text-stone-900">
                      ₩{item.total.toLocaleString("ko-KR")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4 border-t border-black/6 pt-6 text-sm text-stone-600">
                <div className="flex items-center justify-between gap-4">
                  <p>상품 금액</p>
                  <p className="text-stone-900">₩{subtotal.toLocaleString("ko-KR")}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p>배송비</p>
                  <p className="text-stone-900">₩{shippingFee.toLocaleString("ko-KR")}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-stone-900">총 결제 금액</p>
                  <p className="text-xl font-semibold text-stone-950">
                    ₩{total.toLocaleString("ko-KR")}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/shop"
                  className="rounded-xl bg-stone-950 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-stone-800"
                >
                  계속 쇼핑하기
                </Link>
                <Link
                  href="/"
                  className="rounded-xl border border-black/8 bg-white px-6 py-3 text-center text-sm font-medium text-stone-700 transition hover:border-stone-900"
                >
                  메인으로 돌아가기
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
