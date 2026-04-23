"use client";

import { useRef, useState } from "react";
import { toggleWishlistItemInline } from "./actions";

type WishlistButtonProps = {
  productSlug: string;
  initialLiked: boolean;
  label?: string;
  size?: "sm" | "lg";
  onUnliked?: () => void;
};

export function WishlistButton({
  productSlug,
  initialLiked,
  label,
  size = "sm",
  onUnliked,
}: WishlistButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const mutationIdRef = useRef(0);
  const sizeClass =
    size === "lg"
      ? "h-12 w-12 rounded-xl"
      : "h-10 w-10 rounded-lg";
  const iconClass = size === "lg" ? "h-7 w-7" : "h-5 w-5";

  function toggleLiked() {
    const nextLiked = !liked;
    const mutationId = mutationIdRef.current + 1;
    mutationIdRef.current = mutationId;

    setLiked(nextLiked);

    if (!nextLiked) {
      onUnliked?.();
    }

    void toggleWishlistItemInline(productSlug, nextLiked).then((result) => {
      if (mutationId !== mutationIdRef.current) {
        return;
      }

      if (result.status === "error") {
        setLiked(result.liked);
      }
    });
  }

  return (
    <button
      type="button"
      aria-label={label ?? (liked ? "좋아요 취소" : "좋아요 추가")}
      aria-pressed={liked}
      onClick={toggleLiked}
      className={`relative flex shrink-0 items-center justify-center border border-black/8 bg-[#faf8f5] transition hover:border-stone-900 hover:bg-[#f2ede6] active:scale-95 ${sizeClass}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/favorite-outline.png"
        alt=""
        className={`${iconClass} transition-opacity duration-100 ${
          liked ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/favorite-filled.png"
        alt=""
        className={`absolute ${iconClass} transition-opacity duration-100 ${
          liked ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}
