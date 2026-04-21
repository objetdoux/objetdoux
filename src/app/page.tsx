const heroImage =
  "https://www.figma.com/api/mcp/asset/c21a4082-5ed3-4a7f-a548-47bbb6ae7b28";
const brandImage =
  "https://www.figma.com/api/mcp/asset/b8ca37a5-6f2d-4eb0-b547-28858f9887ad";
const collectionOneImage =
  "https://www.figma.com/api/mcp/asset/18a93cde-ad2a-437e-943a-0a10eaa3f0ec";
const collectionTwoImage =
  "https://www.figma.com/api/mcp/asset/f7dd8253-d2b4-43ce-af2a-78d89c89621c";
const collectionThreeImage =
  "https://www.figma.com/api/mcp/asset/3b201234-4f56-4ecc-8dc9-6d79eb7966fe";

const categories = [
  {
    title: "Plate",
    subtitle: "매일의 식탁을 정돈하는 기본 형태",
    description:
      "가장 자주 손이 가는 접시를 오브제두의 감도로 다시 해석합니다. 담백한 실루엣과 차분한 유약이 중심입니다.",
    image: collectionOneImage,
  },
  {
    title: "Cup",
    subtitle: "차와 커피가 머무는 작은 그릇",
    description:
      "머그와 찻잔은 손에 닿는 감각이 중요합니다. 가볍고 편안한 사용감, 오래 봐도 질리지 않는 균형을 제안합니다.",
    image: collectionTwoImage,
  },
  {
    title: "Bowl",
    subtitle: "한국 식탁에 자연스럽게 어울리는 깊이",
    description:
      "국물, 디저트, 작은 반찬까지 폭넓게 쓰일 수 있도록 깊이와 비율을 세심하게 설계한 시리즈입니다.",
    image: collectionThreeImage,
  },
];

export default function Home() {
  return (
    <main className="bg-[#f7f3ee] text-stone-900">
      <header className="sticky top-0 z-50 border-b border-black/6 bg-[rgba(247,243,238,0.88)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <a
            href="#top"
            className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-900"
          >
            objetdoux
          </a>
          <nav className="hidden items-center gap-8 text-sm text-stone-500 md:flex">
            <a href="#about" className="transition hover:text-stone-900">
              브랜드 소개
            </a>
            <a href="#collections" className="transition hover:text-stone-900">
              컬렉션
            </a>
            <a href="#contact" className="transition hover:text-stone-900">
              문의
            </a>
          </nav>
        </div>
      </header>

      <section id="top" className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_1.08fr] lg:items-center">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8a6b5f]">
              korean ceramic tableware brand
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.18] tracking-[-0.04em] text-stone-950 sm:text-5xl lg:text-6xl">
              오브제두는
              <br />
              일상의 식탁을 위한
              <br />
              조용한 도자기를 만듭니다.
            </h1>
            <p className="mt-7 text-base leading-8 text-stone-600 sm:text-lg">
              objetdoux, 오브제두는 한국의 젊은 세대를 위해 도자기 그릇, 컵,
              볼과 같은 식기류를 선보이는 브랜드입니다. 과하지 않은 형태와
              부드러운 색감으로 일상적인 식사 시간을 더 단정하고 아름답게
              만들어갑니다.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#collections"
                className="inline-flex items-center justify-center rounded-xl bg-stone-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
              >
                컬렉션 보기
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/60 px-6 py-3 text-sm font-medium text-stone-700 transition hover:bg-white"
              >
                브랜드 소개
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] bg-[#efe6db]">
            <img
              src={heroImage}
              alt="오브제두 대표 도자기 이미지"
              className="h-[28rem] w-full object-cover sm:h-[34rem]"
            />
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-y border-black/6 bg-[#f2ede6] px-6 py-16 lg:px-8 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="overflow-hidden rounded-[1.5rem] bg-white">
            <img
              src={brandImage}
              alt="도자기를 만드는 손"
              className="h-[24rem] w-full object-cover sm:h-[32rem]"
            />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8a6b5f]">
              brand story
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-4xl">
              브랜드 소개
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-stone-600">
              <p>
                오브제두는 식기가 단순한 생활용품이 아니라, 공간의 분위기와 식사의
                리듬을 만드는 중요한 오브제라고 생각합니다. 그래서 처음부터
                화려함보다 균형, 장식보다 촉감, 유행보다 오래 남는 인상을
                우선했습니다.
              </p>
              <p>
                한국의 식문화에 자연스럽게 어울리면서도 젊은 세대가 좋아할 만한
                미니멀한 감도를 담아, 매일의 그릇이 더 오래 곁에 두고 싶은
                물건이 되도록 만들고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="collections" className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8a6b5f]">
                collections
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-4xl">
                대표 제품 / 카테고리
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-stone-500">
              앞으로는 제품 상세와 구매까지 자연스럽게 이어질 수 있도록 확장할
              예정입니다.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {categories.map((category) => (
              <article
                key={category.title}
                className="overflow-hidden rounded-[1.5rem] border border-black/6 bg-white"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-64 w-full object-cover"
                />
                <div className="px-6 py-6">
                  <p className="text-sm font-medium text-[#8a6b5f]">
                    {category.title}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-stone-950">
                    {category.subtitle}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-stone-600">
                    {category.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-black/6 bg-[#f2ede6] px-6 py-16 lg:px-8 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-[1.75rem] border border-black/6 bg-white px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8a6b5f]">
              contact
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-4xl">
              오브제두와 함께할 이야기를 기다립니다.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-600">
              제품 문의, 협업 제안, 입점 관련 문의는 메일로 남겨주세요.
              인스타그램에서는 브랜드 소식과 제작 과정을 가장 먼저 공유할
              예정입니다.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="mailto:hello@objetdoux.com"
              className="rounded-[1.25rem] bg-stone-950 px-6 py-6 text-white transition hover:bg-stone-800"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-white/65">
                Email
              </p>
              <p className="mt-4 text-base font-medium">hello@objetdoux.com</p>
            </a>
            <a
              href="https://instagram.com/objetdoux"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[1.25rem] border border-black/8 bg-[#faf8f5] px-6 py-6 transition hover:bg-white"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                Instagram
              </p>
              <p className="mt-4 text-base font-medium text-stone-900">
                @objetdoux
              </p>
            </a>
          </div>
        </div>

        <footer className="mx-auto mt-8 flex w-full max-w-6xl flex-col gap-3 border-t border-black/6 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>objetdoux / 오브제두</p>
          <p>Simple ceramic tableware for everyday use.</p>
        </footer>
      </section>
    </main>
  );
}
