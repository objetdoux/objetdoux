"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { setCartItemQuantity } from "./actions";

type CartLineControlsProps = {
  cartItemId: string;
  initialQuantity: number;
  priceValue: number;
  maxQuantity?: number;
};

export function CartLineControls({
  cartItemId,
  initialQuantity,
  priceValue,
  maxQuantity,
}: CartLineControlsProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const total = priceValue * quantity;

  function updateQuantity(nextQuantity: number) {
    if (nextQuantity > 0 && maxQuantity && nextQuantity > maxQuantity) {
      setMessage(`현재 재고는 ${maxQuantity}개입니다.`);
      return;
    }

    setMessage("");
    setQuantity(Math.max(0, nextQuantity));

    startTransition(async () => {
      const result = await setCartItemQuantity(cartItemId, nextQuantity);

      if (result.status === "error") {
        setQuantity(initialQuantity);
        setMessage(result.message);
      }

      router.refresh();
    });
  }

  if (quantity <= 0) {
    return (
      <div className="text-sm text-stone-400">
        삭제 중
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex w-32 items-center justify-between rounded-xl border border-black/8 bg-[#faf8f5] px-4 py-3 text-sm text-stone-700">
          <button
            type="button"
            className="text-lg leading-none text-stone-700 disabled:text-stone-300"
            disabled={isPending && quantity <= 1}
            onClick={() => updateQuantity(quantity - 1)}
            aria-label="수량 줄이기"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            className="text-lg leading-none text-stone-700 disabled:text-stone-300"
            disabled={Boolean(maxQuantity && quantity >= maxQuantity)}
            onClick={() => updateQuantity(quantity + 1)}
            aria-label="수량 늘리기"
          >
            +
          </button>
        </div>
        {message ? (
          <p className="mt-2 text-xs leading-5 text-red-600">{message}</p>
        ) : null}
      </div>

      <div className="text-left sm:text-right">
        <p className="text-lg font-semibold text-stone-900">
          ₩{total.toLocaleString("ko-KR")}
        </p>
        <button
          type="button"
          onClick={() => updateQuantity(0)}
          className="mt-2 text-sm text-stone-400 transition hover:text-stone-700"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
