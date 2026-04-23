"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "../auth/actions";

const links = [
  { href: "/brand", label: "BRAND" },
  { href: "/shop", label: "SHOP" },
  { href: "/social", label: "SOCIAL" },
];

export function SiteHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();
  const accountLinks = isLoggedIn
    ? [{ href: "/mypage", label: "MY PAGE" }]
    : [{ href: "/login", label: "LOGIN" }];
  const allLinks = [...links, ...accountLinks];

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
          {isLoggedIn ? (
            <form action={logout} className="shrink-0">
              <button className="text-[11px] tracking-[0.1em] text-stone-500 transition hover:text-stone-900 sm:text-xs">
                LOGOUT
              </button>
            </form>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
