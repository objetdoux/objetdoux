"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsCompact(window.scrollY > 32);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={
        isCompact
          ? "sticky top-0 z-50 border-b border-black/8 bg-[rgba(255,255,255,0.96)] shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur transition-all duration-500 ease-out"
          : "sticky top-0 z-50 border-b border-black/8 bg-[rgba(255,255,255,0.96)] backdrop-blur transition-all duration-500 ease-out"
      }
    >
      <div
        className={
          isCompact
            ? "mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-3 lg:px-8"
            : "mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-5 lg:px-8"
        }
      >
        <Link
          href="/"
          className={
            isCompact
              ? "text-base font-semibold uppercase tracking-normal text-stone-900 transition-all duration-500 ease-out sm:text-lg"
              : "text-lg font-semibold uppercase tracking-normal text-stone-900 transition-all duration-500 ease-out sm:text-xl"
          }
        >
          <span>objetdoux</span>
        </Link>
      </div>
    </header>
  );
}
