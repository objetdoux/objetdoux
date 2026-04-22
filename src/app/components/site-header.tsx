"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/brand", label: "BRAND" },
  { href: "/shop", label: "SHOP" },
  { href: "/social", label: "SOCIAL" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-[rgba(247,243,238,0.88)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-900"
        >
          objetdoux
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "text-stone-950"
                    : "text-stone-500 transition hover:text-stone-900"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
