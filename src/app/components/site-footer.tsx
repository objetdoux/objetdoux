export function SiteFooter() {
  return (
    <footer className="border-t border-black/6 bg-[#f2ede6]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-end sm:gap-6 lg:px-8">
        <a href="#" className="transition hover:text-stone-900">
          개인정보 처리방침
        </a>
        <a href="#" className="transition hover:text-stone-900">
          이용약관
        </a>
      </div>
    </footer>
  );
}
