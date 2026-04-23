"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { addCartItemInline } from "../../cart/actions";

type ProductPurchasePanelProps = {
  productSlug: string;
  priceValue: number;
  price: string;
  isPurchasable: boolean;
  maxQuantity?: number;
};

export function ProductPurchasePanel({
  productSlug,
  priceValue,
  price,
  isPurchasable,
  maxQuantity,
}: ProductPurchasePanelProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"neutral" | "error">("neutral");
  const [isPending, startTransition] = useTransition();
  const total = priceValue * quantity;

  function updateQuantity(nextQuantity: number) {
    const cappedQuantity = maxQuantity
      ? Math.min(nextQuantity, maxQuantity)
      : nextQuantity;

    setQuantity(Math.max(1, cappedQuantity));
    setMessage("");
  }

  function addToCart() {
    if (!isPurchasable) {
      return;
    }

    startTransition(async () => {
      const result = await addCartItemInline(productSlug, quantity);
      setMessage(result.message);
      setMessageTone(result.status === "success" ? "neutral" : "error");

      if (result.status === "success") {
        window.dispatchEvent(
          new CustomEvent("objetdoux:cart-count", {
            detail: { delta: quantity },
          }),
        );
        router.refresh();
      }
    });
  }

  return (
    <>
      <div className="mt-8 grid gap-4 border-t border-black/6 pt-6">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
            Quantity
          </p>
          <div className="mt-2 grid h-14 w-44 grid-cols-[3.5rem_1fr_3.5rem] items-center overflow-hidden rounded-xl border border-black/8 bg-[#faf8f5] text-sm text-stone-700">
            <button
              type="button"
              className="flex h-full items-center justify-center text-2xl leading-none text-stone-700 transition hover:bg-[#f0ece6] disabled:text-stone-300"
              disabled={quantity <= 1}
              onClick={() => updateQuantity(quantity - 1)}
              aria-label="수량 줄이기"
            >
              -
            </button>
            <span className="text-center text-base font-medium text-stone-900">
              {quantity}
            </span>
            <button
              type="button"
              className="flex h-full items-center justify-center text-2xl leading-none text-stone-700 transition hover:bg-[#f0ece6] disabled:text-stone-300"
              disabled={Boolean(maxQuantity && quantity >= maxQuantity)}
              onClick={() => updateQuantity(quantity + 1)}
              aria-label="수량 늘리기"
            >
              +
            </button>
          </div>
        </div>
        <div className="rounded-[1rem] bg-[#faf8f5] px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-stone-500">총 상품 금액</p>
            <p className="text-lg font-semibold text-stone-900">
              {quantity === 1 ? price : `₩${total.toLocaleString("ko-KR")}`}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="rounded-xl bg-stone-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
        >
          구매 문의
        </button>
        <button
          type="button"
          disabled={!isPurchasable || isPending}
          onClick={addToCart}
          className={
            isPurchasable
              ? "w-full rounded-xl border border-black/8 bg-[#faf8f5] px-6 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-900 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
              : "w-full cursor-not-allowed rounded-xl border border-black/8 bg-stone-200 px-6 py-3 text-sm font-medium text-stone-400 sm:w-auto"
          }
        >
          {isPurchasable ? (isPending ? "담는 중" : "장바구니 담기") : "품절"}
        </button>
      </div>

      {message ? (
        <div
          className={
            messageTone === "error"
              ? "mt-4 rounded-[1rem] bg-[#faf8f5] px-4 py-3 text-sm leading-6 text-red-600"
              : "mt-4 rounded-[1rem] bg-[#faf8f5] px-4 py-3 text-sm leading-6 text-stone-600"
          }
        >
          {messageTone === "error"
            ? message
            : "장바구니에 담았습니다. 우측 상단 장바구니에서 확인할 수 있어요."}
        </div>
      ) : null}
    </>
  );
}
