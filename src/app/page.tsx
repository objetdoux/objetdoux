const heroImage =
  "https://www.figma.com/api/mcp/asset/c21a4082-5ed3-4a7f-a548-47bbb6ae7b28";
const philosophyImage =
  "https://www.figma.com/api/mcp/asset/b8ca37a5-6f2d-4eb0-b547-28858f9887ad";
const philosophyDetailImage =
  "https://www.figma.com/api/mcp/asset/1607ee4e-5b1d-442d-89b1-b317bd3aebf5";
const earthyCollectionImage =
  "https://www.figma.com/api/mcp/asset/18a93cde-ad2a-437e-943a-0a10eaa3f0ec";
const timelessCollectionImage =
  "https://www.figma.com/api/mcp/asset/f7dd8253-d2b4-43ce-af2a-78d89c89621c";
const midnightCollectionImage =
  "https://www.figma.com/api/mcp/asset/3b201234-4f56-4ecc-8dc9-6d79eb7966fe";
const spotlightImage =
  "https://www.figma.com/api/mcp/asset/5679d42d-ec94-4ca7-9774-77ab5c828d28";
const journalOneImage =
  "https://www.figma.com/api/mcp/asset/b65745bd-f95c-43f0-877d-0c09a914fab1";
const journalTwoImage =
  "https://www.figma.com/api/mcp/asset/0aed8828-2205-4f40-ab1a-b7cd9b09df40";
const journalThreeImage =
  "https://www.figma.com/api/mcp/asset/1d76ac0d-16e8-4bf9-b9f1-cf7835135ca6";
const mapImage =
  "https://www.figma.com/api/mcp/asset/a0b84bcc-d38e-4b55-83a3-d0e8e1131596";

const journals = [
  {
    label: "PROCESS",
    title: "아틀리에의 아침 빛",
    description:
      "오브제두의 하루가 시작되는 첫 장면과 손끝에서 형태가 생겨나는 조용한 순간을 담았습니다.",
    image: journalOneImage,
  },
  {
    label: "RITUALS",
    title: "천천히 차리는 식탁",
    description:
      "식기 하나만 바뀌어도 식사의 리듬이 달라집니다. 작은 오브제가 만드는 분위기를 제안합니다.",
    image: journalTwoImage,
  },
  {
    label: "MATERIALS",
    title: "흙과 유약의 대화",
    description:
      "표면의 질감과 색의 깊이를 만드는 재료 연구를 통해 브랜드의 미감을 더 선명하게 완성합니다.",
    image: journalThreeImage,
  },
];

const footerLinks = {
  explore: ["Brand Story", "Journal", "Shipping", "Contact"],
  collections: ["Plates", "Bowls", "Cups", "Archived"],
};

export default function Home() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/8 bg-[rgba(251,249,245,0.84)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1536px] items-center justify-between px-5 py-5 sm:px-8">
          <a
            href="#top"
            className="font-serif-display text-lg uppercase tracking-[0.45em] text-stone-950 sm:text-[1.7rem]"
          >
            objetdoux
          </a>

          <nav className="hidden items-center gap-8 text-sm text-stone-500 md:flex">
            <a href="#top" className="border-b border-[#77574d]/25 pb-1 text-stone-900">
              Home
            </a>
            <a href="#about" className="transition hover:text-stone-900">
              About
            </a>
            <a href="#shop" className="transition hover:text-stone-900">
              Shop
            </a>
          </nav>

          <div className="flex items-center gap-5 text-stone-700">
            <span className="text-sm">⌕</span>
            <span className="relative text-sm">
              ♡
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#77574d]" />
            </span>
          </div>
        </div>
      </header>

      <section
        id="top"
        className="relative flex min-h-[860px] items-center overflow-hidden pt-24 sm:min-h-[920px]"
      >
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="오브제두 대표 도자기 비주얼"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,249,245,0.78)_0%,rgba(251,249,245,0.46)_38%,rgba(251,249,245,0.08)_72%,rgba(251,249,245,0.02)_100%)]" />
        </div>

        <div className="absolute bottom-12 right-4 hidden origin-center rotate-90 text-[11px] uppercase tracking-[0.5em] text-stone-500 lg:block">
          verticality of form
        </div>

        <div className="relative mx-auto w-full max-w-[1536px] px-5 sm:px-8">
          <div className="max-w-[42rem] py-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[#77574d]">
              established mmxxiv
            </p>
            <h1 className="mt-6 font-serif-display text-[4rem] leading-[0.92] tracking-[-0.05em] text-stone-800 sm:text-[5.4rem] lg:text-[7.6rem]">
              The Silent
              <span className="block pl-8 italic sm:pl-24">Object.</span>
            </h1>
            <p className="mt-8 max-w-[28rem] text-base leading-8 text-stone-600 sm:text-xl sm:leading-9">
              오브제두는 한국의 도자기 그릇, 컵, 볼과 같은 식기류를 통해 일상의
              조용한 순간을 더 아름답게 채우는 브랜드입니다. 식탁 위에 오래
              머무는 감도와 형태를 제안합니다.
            </p>

            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <a
                href="#collections"
                className="inline-flex items-center justify-center rounded-xl bg-[#77574d] px-10 py-4 text-sm font-medium text-[#fff6f3] transition hover:bg-[#65473f]"
              >
                대표 컬렉션 보기
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-3 text-sm text-[#77574d] transition hover:text-[#5f433b]"
              >
                브랜드 소개
                <span className="h-px w-12 bg-[#77574d]/30" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#f5f4ef] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid w-full max-w-[1536px] gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
              <img
                src={philosophyImage}
                alt="도자기를 빚는 손"
                className="h-[34rem] w-full object-cover sm:h-[43rem]"
              />
            </div>
            <div className="absolute -bottom-10 right-0 w-[10rem] rounded-xl bg-white p-3 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] sm:-right-6 sm:w-[16rem]">
              <img
                src={philosophyDetailImage}
                alt="도자기 표면 질감"
                className="h-[9rem] w-full rounded-lg object-cover sm:h-[18rem]"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="font-serif-display text-[2.5rem] leading-[1.08] tracking-[-0.04em] text-stone-800 sm:text-[3.4rem]">
              Crafting the Beauty
              <br />
              of Silence
            </h2>
            <div className="mt-8 h-1 w-20 bg-[#77574d]/20" />
            <p className="mt-8 text-lg leading-8 text-stone-600">
              한국 도자기 전통에서 그릇은 단지 담는 도구가 아니라 공간과 여백을
              함께 품는 오브제입니다. 오브제두는 그 여백의 아름다움을 현대적인
              감각으로 번역해 젊은 세대의 식탁 위에 조용히 놓이도록 만듭니다.
            </p>
            <p className="mt-8 text-lg leading-8 text-stone-600">
              손으로 만졌을 때 전해지는 질감, 유약의 미세한 차이, 가마 안에서
              생겨나는 예측 불가능성까지 모두 하나의 개성으로 받아들입니다.
              그래서 오브제두의 식기는 쓰임과 감성을 함께 전달합니다.
            </p>
            <a
              href="#journal"
              className="mt-10 inline-flex w-fit border-b border-[#77574d]/20 pb-2 text-xs uppercase tracking-[0.18em] text-[#77574d]"
            >
              오브제두의 제작 이야기 보기
            </a>
          </div>
        </div>
      </section>

      <section id="collections" className="bg-[#fbf9f5] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-[1536px]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.14em] text-stone-500">
                curated series
              </p>
              <h2 className="mt-3 font-serif-display text-[2.5rem] tracking-[-0.04em] text-stone-800 sm:text-[3rem]">
                Selected Collections
              </h2>
            </div>
            <a href="#shop" className="text-sm text-[#77574d]">
              View All Series
            </a>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:grid-rows-[434px_434px]">
            <article className="group relative overflow-hidden rounded-xl lg:col-span-8 lg:row-span-1">
              <img
                src={earthyCollectionImage}
                alt="Earthy Collection"
                className="h-full min-h-[24rem] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-8 left-8 max-w-[26rem] text-white">
                <h3 className="font-serif-display text-[2rem] tracking-[-0.03em]">
                  The Earthy Collection
                </h3>
                <p className="mt-3 text-sm text-white/80 sm:text-base">
                  흙의 결, 무유의 표면, 차분한 온기가 느껴지는 오브제두의 대표
                  시리즈입니다.
                </p>
                <a
                  href="#shop"
                  className="mt-6 inline-flex rounded-full border border-white/30 bg-white/20 px-7 py-3 text-sm backdrop-blur-md"
                >
                  Shop Collection
                </a>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-xl lg:col-span-4 lg:row-span-1">
              <img
                src={timelessCollectionImage}
                alt="Timeless White"
                className="h-full min-h-[24rem] w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-serif-display text-[1.7rem] tracking-[-0.03em] text-stone-800">
                  Timeless White
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone-500">
                  minimalist purity
                </p>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-xl bg-[#1c1917] lg:col-span-4 lg:row-span-1">
              <img
                src={midnightCollectionImage}
                alt="Midnight Glaze"
                className="h-full min-h-[24rem] w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="font-serif-display text-[1.7rem] tracking-[-0.03em] text-stone-100">
                  Midnight Glaze
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone-400">
                  deep obsidian tones
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="shop" className="bg-[#f5f4ef] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid w-full max-w-[1536px] gap-12 lg:grid-cols-[minmax(0,1fr)_544px] lg:items-center lg:gap-32">
          <div>
            <p className="font-serif-display text-2xl italic text-[#77574d]">
              Object of the Month
            </p>
            <h2 className="mt-4 font-serif-display text-[2.9rem] leading-[1.02] tracking-[-0.05em] text-stone-800 sm:text-[4.4rem]">
              The Sculpted
              <br />
              Oasis Vase
            </h2>
            <p className="mt-8 max-w-[28rem] text-lg leading-8 text-stone-600">
              중앙을 장식하기 위해 만들어진 조형적 베이스입니다. 거친 질감의 외부
              표면과 매끈한 내부 마감이 대비를 이루며, 비어 있는 공간조차
              오브제로 느껴지도록 설계했습니다.
            </p>

            <div className="mt-8 flex items-baseline gap-4">
              <p className="font-serif-display text-[1.9rem] text-stone-800">$240</p>
              <p className="text-sm uppercase tracking-[0.14em] text-stone-500">
                hand formed / limited release
              </p>
            </div>

            <a
              href="mailto:hello@objetdoux.com"
              className="mt-8 inline-flex rounded-xl bg-[#77574d] px-10 py-4 text-sm font-medium text-[#fff6f3] transition hover:bg-[#65473f]"
            >
              Purchase Inquiry
            </a>
          </div>

          <div className="relative mx-auto flex h-[22rem] w-[22rem] items-center justify-center sm:h-[34rem] sm:w-[34rem]">
            <div className="absolute inset-0 rounded-full bg-[#e6ded2]" />
            <div className="absolute inset-6 rounded-full bg-[#111111]" />
            <img
              src={spotlightImage}
              alt="오아시스 베이스"
              className="relative z-10 h-[17rem] w-auto sm:h-[26rem]"
            />
          </div>
        </div>
      </section>

      <section id="journal" className="bg-[#fbf9f5] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-[1536px]">
          <div className="text-center">
            <h2 className="font-serif-display text-[2.2rem] tracking-[-0.04em] text-stone-800 sm:text-[2.8rem]">
              The Journal
            </h2>
            <p className="mt-3 text-sm text-stone-500">
              Studio moments, materials, and table styling
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {journals.map((entry) => (
              <article key={entry.title} className="group">
                <div className="overflow-hidden rounded-xl bg-[#f5f4ef]">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="h-[21rem] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#77574d]">
                  {entry.label}
                </p>
                <h3 className="mt-2 font-serif-display text-[1.45rem] tracking-[-0.03em] text-stone-800">
                  {entry.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  {entry.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[rgba(226,227,219,0.3)] px-5 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[576px] text-center">
          <h2 className="font-serif-display text-[2rem] italic tracking-[-0.03em] text-stone-800 sm:text-[2.4rem]">
            Stay in Touch
          </h2>
          <p className="mt-4 text-base leading-8 text-stone-600">
            새로운 컬렉션, 제작 스토리, 오브제두의 첫 출시 소식을 가장 먼저
            받아보세요.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Email Address"
              className="min-w-0 flex-1 rounded-xl border border-black/5 bg-white px-6 py-4 text-base text-stone-700 outline-none placeholder:text-stone-400"
            />
            <button className="rounded-xl bg-[#77574d] px-8 py-4 text-base text-[#fff6f3] transition hover:bg-[#65473f]">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-[#f5f4ef] px-5 pb-10 pt-20 sm:px-8">
        <div className="mx-auto grid w-full max-w-[1536px] gap-12 lg:grid-cols-3">
          <div>
            <h3 className="font-serif-display text-xl uppercase tracking-[0.2em] text-stone-900">
              objetdoux
            </h3>
            <p className="mt-6 max-w-[20rem] text-sm leading-7 text-stone-600">
              한국의 도자기 식기와 테이블웨어를 통해 조용한 아름다움과 식탁의
              감도를 전하는 브랜드입니다.
            </p>
            <div className="mt-6 flex gap-4 text-stone-500">
              <a
                href="https://instagram.com/objetdoux"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300"
              >
                ig
              </a>
              <a
                href="mailto:hello@objetdoux.com"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300"
              >
                @
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.14em] text-stone-900">
                Explore
              </p>
              <ul className="mt-6 space-y-4 text-sm text-stone-500">
                {footerLinks.explore.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.14em] text-stone-900">
                Collections
              </p>
              <ul className="mt-6 space-y-4 text-sm text-stone-500">
                {footerLinks.collections.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.14em] text-stone-900">
              Studio Location
            </p>
            <p className="mt-6 text-sm leading-7 text-stone-600">
              서울의 조용한 작업 공간에서 기획하고, 한국의 도자기 공방과 함께
              오브제두의 식기를 완성합니다.
            </p>
            <div className="mt-6 overflow-hidden rounded-lg bg-[#e8e9e2]">
              <img
                src={mapImage}
                alt="오브제두 스튜디오 위치 안내 이미지"
                className="h-32 w-full object-cover grayscale"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-[1536px] flex-col gap-4 border-t border-stone-200 pt-8 text-xs uppercase tracking-[0.12em] text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 objetdoux. crafted for quiet rituals.</p>
          <div className="flex gap-8">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
