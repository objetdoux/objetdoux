import Link from "next/link";
import {
  changeCartItemQuantity,
  removeCartItem,
} from "./actions";
import { getCartLineItems, getUnavailableCartItems } from "./cart-data";
import { calculateShippingFee, getSiteSettings } from "../site-settings";

type CartPageProps = {
  searchParams: Promise<{ invalid?: string }>;
};

export default async function CartPage({ searchParams }: CartPageProps) {
  const [items, settings] = await Promise.all([
    getCartLineItems(),
    getSiteSettings(),
  ]);
  const { invalid } = await searchParams;
  const unavailableItems = getUnavailableCartItems(items);
  const canCheckout = items.length > 0 && unavailableItems.length === 0;
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const appliedShippingFee = calculateShippingFee(subtotal, settings);
  const total = subtotal + appliedShippingFee;

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
            담아둔 상품과 수량, 예상 결제 금액을 확인합니다.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-5">
            {invalid || unavailableItems.length > 0 ? (
              <div className="rounded-[1.25rem] border border-black/6 bg-white px-5 py-4 text-sm leading-6 text-stone-600">
                품절, 판매 중지 또는 재고 부족 상품이 장바구니에 있습니다.
                해당 상품을 확인한 뒤 주문을 진행해주세요.
              </div>
            ) : null}

            {items.length === 0 ? (
              <div className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-12 text-center">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                  장바구니가 비어 있습니다
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  마음에 드는 오브제두 상품을 장바구니에 담아보세요.
                </p>
                <Link
                  href="/shop"
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-stone-950 px-6 text-sm font-medium text-white transition hover:bg-stone-800"
                >
                  상품 보러가기
                </Link>
              </div>
            ) : null}

            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.5rem] border border-black/6 bg-white p-5 sm:p-6"
              >
                <div className="grid items-center gap-5 sm:grid-cols-[120px_minmax(0,1fr)]">
                  <Link
                    href={`/shop/${item.slug}`}
                    className="aspect-square overflow-hidden rounded-[1rem] bg-[#e5e3de]"
                  >
                    {item.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.thumbnailUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </Link>

                  <div className="flex flex-col justify-between gap-3">
                    <div>
                      <Link
                        href={`/shop/${item.slug}`}
                        className="text-2xl font-semibold tracking-[-0.03em] text-stone-950"
                      >
                        {item.name}
                      </Link>
                      {!item.isVisible || item.isSoldOut || !item.hasEnoughStock ? (
                        <p className="mt-2 inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500">
                          {item.isSoldOut
                            ? "품절"
                            : !item.isVisible
                              ? "판매 중지"
                              : `재고 ${item.stockQuantity}개`}
                        </p>
                      ) : null}
                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <div className="flex w-32 items-center justify-between rounded-xl border border-black/8 bg-[#faf8f5] px-4 py-3 text-sm text-stone-700">
                          <form action={changeCartItemQuantity}>
                            <input type="hidden" name="cartItemId" value={item.id} />
                            <input type="hidden" name="direction" value="decrease" />
                            <button
                              className="text-lg leading-none text-stone-700"
                              aria-label="수량 줄이기"
                            >
                              -
                            </button>
                          </form>
                          <span>{item.quantity}</span>
                          <form action={changeCartItemQuantity}>
                            <input type="hidden" name="cartItemId" value={item.id} />
                            <input type="hidden" name="direction" value="increase" />
                            <button
                              className="text-lg leading-none text-stone-700"
                              aria-label="수량 늘리기"
                            >
                              +
                            </button>
                          </form>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-lg font-semibold text-stone-900">
                          ₩{item.total.toLocaleString("ko-KR")}
                        </p>
                        <form action={removeCartItem} className="mt-2">
                          <input type="hidden" name="cartItemId" value={item.id} />
                          <button className="text-sm text-stone-400 transition hover:text-stone-700">
                            삭제
                          </button>
                        </form>
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
                <p className="text-stone-900">
                  ₩{appliedShippingFee.toLocaleString("ko-KR")}
                </p>
              </div>
              <p className="text-xs leading-5 text-stone-400">
                ₩{settings.freeShippingMinimum.toLocaleString("ko-KR")} 이상 구매 시
                무료 배송
              </p>
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
                className={
                  canCheckout
                    ? "rounded-xl bg-stone-950 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-stone-800"
                    : "pointer-events-none rounded-xl bg-stone-300 px-6 py-3 text-center text-sm font-medium text-white"
                }
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
