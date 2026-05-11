import Link from "next/link";

const policyLinks = [
  { href: "/terms", label: "이용약관" },
  { href: "/privacy", label: "개인정보처리방침" },
];

const channelLinks = [
  {
    href: "https://www.instagram.com/objetdoux/?utm_source=ig_web_button_share_sheet",
    label: "INSTAGRAM",
    external: true,
  },
  {
    href: "https://smartstore.naver.com/objet_doux",
    label: "STORES",
    external: true,
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-[#17140d] text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-8 lg:py-12">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr_auto]">
          <div>
            <p className="text-sm font-semibold tracking-[0.08em] text-white/90">
              POLICY
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/78">
              {policyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.08em] text-white/90">
              SOCIAL
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/78">
              {channelLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-3xl font-semibold uppercase tracking-[0.18em] text-white/95 sm:text-4xl">
              objetdoux
            </p>
            <p className="mt-3 text-sm text-white/60">오브제두</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm leading-6 text-white/55">
          <p>조용히 예쁘고 오래 곁에 두고 싶은 물건의 감각을 전합니다.</p>
          <p className="mt-2">COPYRIGHT © OBJETDOUX ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
