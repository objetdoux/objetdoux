import { redirect } from "next/navigation";
import Link from "next/link";
import { getCartLineItems, getUnavailableCartItems } from "../cart/cart-data";
import { getCurrentAccountProfile } from "../mypage/account-data";
import { getAccountAddresses } from "../mypage/addresses/address-data";
import { calculateShippingFee, getSiteSettings } from "../site-settings";
import { createOrder } from "./actions";

const paymentMethods = [
  "신용카드",
  "네이버페이",
  "카카오페이",
  "무통장 입금",
];

export default async function CheckoutPage() {
  const [account, addresses, settings] = await Promise.all([
    getCurrentAccountProfile(),
    getAccountAddresses(),
    getSiteSettings(),
  ]);
  const defaultAddress =
    addresses.find((address) => address.isDefault) ?? addresses[0] ?? null;
  const items = await getCartLineItems();
  const unavailableItems = getUnavailableCartItems(items);

  if (unavailableItems.length > 0) {
    redirect("/cart?invalid=1");
  }

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
            배송지와 결제 정보를 한 화면에서 확인합니다.
          </p>
        </div>

        <form
          action={createOrder}
          className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"
        >
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
                {items.length === 0 ? (
                  <div className="rounded-[1.25rem] bg-[#faf8f5] px-5 py-6 text-sm leading-6 text-stone-600">
                    장바구니에 담긴 상품이 없습니다.
                  </div>
                ) : null}

                {items.map((item) => (
                  <article
                    key={item.id}
                    className="grid gap-4 border-t border-black/6 pt-4 first:border-t-0 first:pt-0 sm:grid-cols-[88px_minmax(0,1fr)_auto]"
                  >
                    <div className="aspect-square overflow-hidden rounded-[1rem] bg-[#e5e3de]">
                      {item.thumbnailUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.thumbnailUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

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
                    name="ordererName"
                    type="text"
                    defaultValue={account.name}
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-stone-500">연락처</span>
                  <input
                    name="ordererPhone"
                    type="tel"
                    defaultValue={account.phone === "-" ? "" : account.phone}
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm text-stone-500">이메일</span>
                  <input
                    name="ordererEmail"
                    type="email"
                    defaultValue={account.email}
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                배송 정보
              </h2>
              {defaultAddress ? (
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  기본 배송지를 자동으로 불러왔습니다.
                </p>
              ) : (
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  등록된 배송지가 없습니다. 배송지를 직접 입력하거나 마이페이지에서
                  먼저 등록해주세요.
                </p>
              )}

              <div className="mt-6 grid gap-4">
                <label className="block">
                  <span className="text-sm text-stone-500">받는 분</span>
                  <input
                    name="recipientName"
                    type="text"
                    defaultValue={defaultAddress?.recipientName ?? account.name}
                    required
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-stone-500">받는 분 연락처</span>
                  <input
                    name="recipientPhone"
                    type="tel"
                    defaultValue={defaultAddress?.phone ?? account.phone}
                    required
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-[140px_minmax(0,1fr)]">
                  <label className="block">
                    <span className="text-sm text-stone-500">우편번호</span>
                    <input
                      name="zoneCode"
                      type="text"
                      defaultValue={defaultAddress?.zoneCode ?? ""}
                      className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-stone-500">주소</span>
                    <input
                      name="recipientAddress"
                      type="text"
                      defaultValue={defaultAddress?.address ?? ""}
                      required
                      className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm text-stone-500">상세 주소</span>
                  <input
                    name="recipientDetailAddress"
                    type="text"
                    defaultValue={defaultAddress?.detailAddress ?? ""}
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-stone-500">배송 메모</span>
                  <input
                    name="deliveryMemo"
                    type="text"
                    defaultValue={defaultAddress?.deliveryMemo ?? ""}
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
                <p className="text-stone-900">
                  ₩{appliedShippingFee.toLocaleString("ko-KR")}
                </p>
              </div>
              <p className="text-xs leading-5 text-stone-400">
                ₩{settings.freeShippingMinimum.toLocaleString("ko-KR")} 이상 구매 시
                무료 배송
              </p>
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-stone-900">총 결제 예정 금액</p>
                <p className="text-xl font-semibold text-stone-950">
                  ₩{total.toLocaleString("ko-KR")}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[1.25rem] bg-[#faf8f5] px-5 py-5 text-sm leading-6 text-stone-600">
              {settings.shippingNotice}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="submit"
                disabled={items.length === 0}
                className={
                  items.length > 0
                    ? "rounded-xl bg-stone-950 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-stone-800"
                    : "cursor-not-allowed rounded-xl bg-stone-300 px-6 py-3 text-center text-sm font-medium text-white"
                }
              >
                결제하기
              </button>
              <Link
                href="/cart"
                className="rounded-xl border border-black/8 bg-[#faf8f5] px-6 py-3 text-center text-sm font-medium text-stone-700 transition hover:border-stone-900"
              >
                장바구니로 돌아가기
              </Link>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
