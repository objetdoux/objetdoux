import Link from "next/link";
import { cartItems, getProductBySlug } from "../site-data";

const shippingFee = 3000;

const paymentMethods = [
  "신용카드",
  "네이버페이",
  "카카오페이",
  "무통장 입금",
];

export default function CheckoutPage() {
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
          <Link href="/cart" className="hover:text-stone-900">
            CART
          </Link>
          <span>/</span>
          <span>CHECKOUT</span>
        </div>

        <div className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            주문서
          </h1>
          <p className="mt-3 text-base leading-6 text-stone-600">
            배송지와 결제 정보를 한 화면에서 확인할 수 있는 목업 단계의 주문서
            페이지입니다.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <section className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                  주문 상품
                </h2>
                <Link href="/cart" className="text-sm text-stone-500 hover:text-stone-900">
                  장바구니 수정
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <article
                    key={item.slug}
                    className="grid gap-4 border-t border-black/6 pt-4 first:border-t-0 first:pt-0 sm:grid-cols-[88px_minmax(0,1fr)_auto]"
                  >
                    <div className="aspect-square rounded-[1rem] bg-[#e5e3de]" />

                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-stone-600">
                        {item.summary}
                      </p>
                      <p className="mt-2 text-sm text-stone-500">
                        수량 {item.quantity}개
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-lg font-semibold text-stone-950">
                        ₩{item.total.toLocaleString("ko-KR")}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                주문자 정보
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-stone-500">이름</span>
                  <input
                    type="text"
                    defaultValue="홍길동"
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-stone-500">연락처</span>
                  <input
                    type="tel"
                    defaultValue="010-1234-5678"
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm text-stone-500">이메일</span>
                  <input
                    type="email"
                    defaultValue="hello@objetdoux.com"
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                배송 정보
              </h2>

              <div className="mt-6 grid gap-4">
                <label className="block">
                  <span className="text-sm text-stone-500">받는 분</span>
                  <input
                    type="text"
                    defaultValue="홍길동"
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-[140px_minmax(0,1fr)]">
                  <label className="block">
                    <span className="text-sm text-stone-500">우편번호</span>
                    <input
                      type="text"
                      defaultValue="04799"
                      className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-stone-500">주소</span>
                    <input
                      type="text"
                      defaultValue="서울 성동구 성수이로 00"
                      className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm text-stone-500">상세 주소</span>
                  <input
                    type="text"
                    defaultValue="00빌딩 3층"
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-stone-500">배송 메모</span>
                  <input
                    type="text"
                    placeholder="부재 시 문 앞에 놓아주세요"
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                결제 수단
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {paymentMethods.map((method, index) => (
                  <label
                    key={method}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-black/8 bg-[#faf8f5] px-4 py-4 text-sm text-stone-700 transition hover:border-stone-900"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      defaultChecked={index === 0}
                      className="h-4 w-4 accent-stone-950"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
              최종 결제 정보
            </h2>

            <div className="mt-6 space-y-4 text-sm text-stone-600">
              <div className="flex items-center justify-between gap-4 border-b border-black/6 pb-4">
                <p>상품 금액</p>
                <p className="text-stone-900">₩{subtotal.toLocaleString("ko-KR")}</p>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-black/6 pb-4">
                <p>배송비</p>
                <p className="text-stone-900">₩{shippingFee.toLocaleString("ko-KR")}</p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-stone-900">총 결제 예정 금액</p>
                <p className="text-xl font-semibold text-stone-950">
                  ₩{total.toLocaleString("ko-KR")}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[1.25rem] bg-[#faf8f5] px-5 py-5 text-sm leading-6 text-stone-600">
              실제 결제 연동 전 단계의 목업 화면입니다. 추후 PG사 연동, 약관 동의,
              주문 완료 페이지가 이어질 수 있습니다.
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/order-complete"
                className="rounded-xl bg-stone-950 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-stone-800"
              >
                결제하기
              </Link>
              <Link
                href="/cart"
                className="rounded-xl border border-black/8 bg-[#faf8f5] px-6 py-3 text-center text-sm font-medium text-stone-700 transition hover:bg-white"
              >
                장바구니로 돌아가기
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
