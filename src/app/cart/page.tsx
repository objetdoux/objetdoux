import Link from "next/link";
import { cartItems, getProductBySlug } from "../site-data";

const shippingFee = 3000;

export default function CartPage() {
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
          <span>CART</span>
        </div>

        <div className="mt-6 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            장바구니
          </h1>
          <p className="mt-5 text-base leading-7 text-stone-600">
            목업 기준 장바구니 페이지입니다. 상품, 수량, 예상 결제 금액 흐름을
            확인할 수 있도록 구성했습니다.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-5">
            {items.map((item) => (
              <article
                key={item.slug}
                className="rounded-[1.5rem] border border-black/6 bg-white p-5 sm:p-6"
              >
                <div className="grid items-center gap-5 sm:grid-cols-[120px_minmax(0,1fr)]">
                  <div className="aspect-square rounded-[1rem] bg-[#e5e3de]" />

                  <div className="flex flex-col justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                        {item.name}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <div className="flex w-32 items-center justify-between rounded-xl border border-black/8 bg-[#faf8f5] px-4 py-3 text-sm text-stone-700">
                          <span>-</span>
                          <span>{item.quantity}</span>
                          <span>+</span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-lg font-semibold text-stone-900">
                          ₩{item.total.toLocaleString("ko-KR")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
              주문 예상 금액
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
                <p className="font-medium text-stone-900">총 결제 예상 금액</p>
                <p className="text-xl font-semibold text-stone-950">
                  ₩{total.toLocaleString("ko-KR")}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/checkout"
                className="rounded-xl bg-stone-950 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-stone-800"
              >
                주문하기
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
