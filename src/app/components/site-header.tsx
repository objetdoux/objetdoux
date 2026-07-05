"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  ["HOME", "/"],
  ["COLLECTION", "/collections/pastel-ceramic-bowl"],
  ["STORE", "/stores"],
];

export function SiteHeader() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="wordmark" aria-label="오브제두 홈">
          objetdoux
        </Link>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navItems.map(([label, href]) => (
            <Link key={label} href={href}>{label}</Link>
          ))}
        </nav>
        <a
          href="https://www.instagram.com/objetdoux/?utm_source=ig_web_button_share_sheet"
          target="_blank"
          rel="noreferrer"
          className="store-link"
        >
          INSTAGRAM <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
