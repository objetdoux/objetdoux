"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "../auth/actions";
import { PendingButton } from "./pending-button";

const links = [
  { href: "/brand", label: "BRAND" },
  { href: "/shop", label: "SHOP" },
  { href: "/social", label: "SOCIAL" },
];

export function SiteHeader({
  isLoggedIn,
  cartItemCount,
}: {
  isLoggedIn: boolean;
  cartItemCount: number;
}) {
  const pathname = usePathname();
  const [visibleCartItemCount, setVisibleCartItemCount] = useState(cartItemCount);
  const accountLinks = isLoggedIn
    ? [{ href: "/mypage", label: "MY PAGE" }]
    : [{ href: "/login", label: "LOGIN" }];
  const allLinks = [...links, ...accountLinks];

  useEffect(() => {
    function updateCartCount(event: Event) {
      const detail = (event as CustomEvent<{ count?: number; delta?: number }>).detail;

      if (typeof detail?.count === "number") {
        setVisibleCartItemCount(Math.max(0, detail.count));
        return;
      }

      const delta = detail?.delta;

      if (typeof delta === "number") {
        setVisibleCartItemCount((currentCount) =>
          Math.max(0, currentCount + delta),
        );
      }
    }

    window.addEventListener("objetdoux:cart-count", updateCartCount);
    return () =>
      window.removeEventListener("objetdoux:cart-count", updateCartCount);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-[rgba(247,243,238,0.88)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-5 lg:px-8">
        <div className="flex shrink-0 items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-stone-900"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-[#ece8e2] text-[10px] font-medium tracking-[0.12em] text-stone-500">
              LOGO
            </span>
            <span>objetdoux</span>
          </Link>
        </div>

        <nav className="scrollbar-none flex min-w-0 flex-1 justify-end gap-4 overflow-x-auto whitespace-nowrap text-[11px] tracking-[0.1em] sm:gap-5 sm:text-xs">
          {allLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "shrink-0 font-medium text-stone-950"
                    : "shrink-0 text-stone-500 transition hover:text-stone-900"
                }
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/cart"
            aria-label={`장바구니 ${visibleCartItemCount}개`}
            className={
              pathname === "/cart"
                ? "shrink-0 font-medium text-stone-950"
                : "shrink-0 text-stone-500 transition hover:text-stone-900"
            }
          >
            <span className="inline-flex items-center gap-1.5">
              <CartIcon />
              <span>CART</span>
              {visibleCartItemCount > 0 ? (
                <span className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-stone-950 px-1 text-[9px] font-semibold leading-none tracking-normal text-white">
                  {visibleCartItemCount > 99 ? "99+" : visibleCartItemCount}
                </span>
              ) : null}
            </span>
          </Link>
          {isLoggedIn ? (
            <form action={logout} className="shrink-0">
              <PendingButton
                pendingLabel="..."
                className="text-[11px] tracking-[0.1em] text-stone-500 transition hover:text-stone-900 disabled:cursor-wait disabled:opacity-60 sm:text-xs"
              >
                LOGOUT
              </PendingButton>
            </form>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      <path d="M6.5 8.5h11l-.8 10H7.3l-.8-10Z" />
      <path d="M9 8.5a3 3 0 0 1 6 0" />
    </svg>
  );
}
