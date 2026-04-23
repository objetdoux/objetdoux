"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { setCartItemQuantity } from "./actions";
import type { CartLineItem } from "./cart-data";

type CartContentProps = {
  initialItems: CartLineItem[];
  hasInitialWarning: boolean;
  shippingFee: number;
  freeShippingMinimum: number;
};

export function CartContent({
  initialItems,
  hasInitialWarning,
  shippingFee,
  freeShippingMinimum,
}: CartContentProps) {
  const [items, setItems] = useState(initialItems);
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [, startTransition] = useTransition();
  const hasUnavailableItems = items.some(
    (item) => !item.isVisible || item.isSoldOut || !isEnoughStock(item),
  );
  const canCheckout = items.length > 0 && !hasUnavailableItems;
  const subtotal = items.reduce(
    (sum, item) => sum + item.priceValue * item.quantity,
    0,
  );
  const appliedShippingFee =
    subtotal > 0 && freeShippingMinimum > 0 && subtotal >= freeShippingMinimum
      ? 0
      : subtotal > 0
        ? shippingFee
        : 0;
  const total = subtotal + appliedShippingFee;

  function updateHeaderCount(nextItems: CartLineItem[]) {
    window.dispatchEvent(
      new CustomEvent("objetdoux:cart-count", {
        detail: {
          count: nextItems.reduce((sum, item) => sum + item.quantity, 0),
        },
      }),
    );
  }

  function updateQuantity(item: CartLineItem, nextQuantity: number) {
    if (nextQuantity > 0 && item.trackStock && nextQuantity > item.stockQuantity) {
      setMessages((current) => ({
        ...current,
        [item.id]: `현재 재고는 ${item.stockQuantity}개입니다.`,
      }));
      return;
    }

    const previousItems = items;
    const nextItems =
      nextQuantity <= 0
        ? items.filter((currentItem) => currentItem.id !== item.id)
        : items.map((currentItem) =>
            currentItem.id === item.id
              ? {
                  ...currentItem,
                  quantity: nextQuantity,
                  total: currentItem.priceValue * nextQuantity,
                  hasEnoughStock:
                    !currentItem.trackStock ||
                    nextQuantity <= currentItem.stockQuantity,
                }
              : currentItem,
          );

    setMessages((current) => ({ ...current, [item.id]: "" }));
    setItems(nextItems);
    updateHeaderCount(nextItems);

    startTransition(async () => {
      const result = await setCartItemQuantity(item.id, nextQuantity);

      if (result.status === "error") {
        setItems(previousItems);
        updateHeaderCount(previousItems);
        setMessages((current) => ({ ...current, [item.id]: result.message }));
      }
    });
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="space-y-5">
        {hasInitialWarning || hasUnavailableItems ? (
          <div className="rounded-[1.25rem] border border-black/6 bg-white px-5 py-4 text-sm leading-6 text-stone-600">
            품절, 판매 중지 또는 재고 부족 상품이 장바구니에 있습니다. 해당
            상품을 확인한 뒤 주문을 진행해주세요.
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
                  {!item.isVisible || item.isSoldOut || !isEnoughStock(item) ? (
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
                    <div className="grid h-12 w-40 grid-cols-[3rem_1fr_3rem] items-center overflow-hidden rounded-xl border border-black/8 bg-[#faf8f5] text-sm text-stone-700">
                      <button
                        type="button"
                        className="flex h-full items-center justify-center text-2xl leading-none text-stone-700 transition hover:bg-[#f0ece6] disabled:text-stone-300"
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                        aria-label="수량 줄이기"
                      >
                        -
                      </button>
                      <span className="text-center text-base font-medium text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="flex h-full items-center justify-center text-2xl leading-none text-stone-700 transition hover:bg-[#f0ece6] disabled:text-stone-300"
                        disabled={item.trackStock && item.quantity >= item.stockQuantity}
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        aria-label="수량 늘리기"
                      >
                        +
                      </button>
                    </div>
                    {messages[item.id] ? (
                      <p className="mt-2 text-xs leading-5 text-red-600">
                        {messages[item.id]}
                      </p>
                    ) : null}
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-lg font-semibold text-stone-900">
                      ₩{(item.priceValue * item.quantity).toLocaleString("ko-KR")}
                    </p>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item, 0)}
                      className="mt-2 text-sm text-stone-400 transition hover:text-stone-700"
                    >
                      삭제
                    </button>
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
            ₩{freeShippingMinimum.toLocaleString("ko-KR")} 이상 구매 시 무료 배송
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
  );
}

function isEnoughStock(item: CartLineItem) {
  return !item.trackStock || item.quantity <= item.stockQuantity;
}
