const categories = [
  {
    name: "Table Objects",
    description:
      "식탁과 선반 위에 오래 남는 오브제. 조용한 곡선과 절제된 색감으로 공간의 온도를 바꿉니다.",
    note: "Ceramics, trays, serving pieces",
  },
  {
    name: "Soft Fragrance",
    description:
      "향이 공간을 채우기보다 머물도록. 차분한 우디 노트와 깨끗한 플로럴 계열을 중심으로 전개합니다.",
    note: "Candles, incense, room scent",
  },
  {
    name: "Daily Fabric",
    description:
      "일상에서 가장 자주 닿는 소재를 부드럽게 다시 해석합니다. 촉감과 사용감을 우선으로 설계합니다.",
    note: "Linen, pouch, table textile",
  },
];

const highlights = [
  "느리지만 오래 가는 감도",
  "군더더기 없는 미니멀한 디테일",
  "선물처럼 기억되는 패키지와 무드",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_32%),radial-gradient(circle_at_75%_20%,rgba(212,186,160,0.32),transparent_28%),linear-gradient(180deg,#fbf7f2_0%,#f3ebe1_50%,rgba(243,235,225,0.2)_100%)]" />
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-16 pt-8 sm:px-10 lg:px-16">
          <header className="flex items-center justify-between border-b border-black/10 pb-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.42em] text-black/45">
                objetdoux
              </p>
              <p className="mt-2 text-sm text-black/60">
                Minimal objects for a softer everyday scene
              </p>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-black/60 md:flex">
              <a href="#about" className="transition hover:text-black">
                About
              </a>
              <a href="#products" className="transition hover:text-black">
                Products
              </a>
              <a href="#contact" className="transition hover:text-black">
                Contact
              </a>
            </nav>
          </header>

          <div className="grid flex-1 items-center gap-12 py-14 md:py-18 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:py-24">
            <section className="max-w-3xl">
              <p className="inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-black/52 backdrop-blur">
                Designed to feel quiet, warm, lasting
              </p>
              <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-stone-950 sm:text-6xl lg:text-8xl">
                objetdoux
                <span className="block text-balance text-black/72">
                  makes everyday moments
                  <br className="hidden sm:block" /> feel a little more tender.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-8 text-black/67 sm:text-lg">
                objetdoux는 오브제, 향, 패브릭처럼 일상에 오래 머무는 요소들을
                미니멀하고 감성적인 시선으로 다시 제안하는 브랜드입니다. 과하지
                않은 형태와 부드러운 분위기로 공간의 결을 정돈합니다.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-stone-50 transition hover:bg-stone-800"
                >
                  대표 제품 보기
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-6 py-3 text-sm font-medium text-stone-900 transition hover:bg-white"
                >
                  문의 및 인스타 안내
                </a>
              </div>

              <div className="mt-12 grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-black/8 bg-white/65 px-4 py-4 text-sm leading-6 text-black/62 backdrop-blur"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="relative min-h-[440px] overflow-hidden rounded-[2rem] border border-white/50 bg-[linear-gradient(155deg,rgba(255,255,255,0.9)_0%,rgba(246,235,222,0.88)_52%,rgba(222,205,186,0.9)_100%)] p-5 shadow-[0_30px_80px_rgba(73,49,25,0.14)] sm:p-7">
              <div className="absolute -right-10 top-8 h-28 w-28 rounded-full bg-white/60 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[#c9a57a]/18 blur-3xl" />
              <div className="relative flex h-full flex-col justify-between rounded-[1.6rem] border border-black/6 bg-white/42 p-6 backdrop-blur sm:p-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-black/42">
                    Seasonal Edit
                  </p>
                  <div className="mt-6 grid gap-4">
                    <div className="rounded-[1.5rem] bg-[#f7efe7] p-5">
                      <p className="text-sm text-black/45">Signature Mood</p>
                      <p className="mt-2 text-2xl font-medium tracking-[-0.03em] text-stone-950">
                        Soft texture,
                        <br />
                        calm silhouette
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.5rem] bg-black/5 p-5">
                        <p className="text-sm text-black/45">Palette</p>
                        <p className="mt-2 text-base font-medium text-stone-950">
                          Cream, sand, warm stone
                        </p>
                      </div>
                      <div className="rounded-[1.5rem] bg-black/5 p-5">
                        <p className="text-sm text-black/45">Direction</p>
                        <p className="mt-2 text-base font-medium text-stone-950">
                          Minimal and refined
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-[1.5rem] bg-stone-950 px-6 py-6 text-stone-100">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-stone-300">
                    Brand Note
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-200">
                    형태보다 분위기, 장식보다 질감, 유행보다 오래 남는 감각을
                    중심으로 브랜드의 첫 장면을 설계합니다.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-y border-black/8 bg-white/58 px-6 py-20 backdrop-blur sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">
              Brand Story
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-4xl">
              브랜드 소개
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[1.75rem] border border-black/8 bg-[#fcfaf7] p-7 shadow-[0_18px_50px_rgba(31,22,16,0.06)]">
              <p className="text-sm leading-7 text-black/68">
                objetdoux는 일상 속 작은 사물들이 주는 감정의 여운에 주목합니다.
                눈에 띄기보다 자연스럽게 스며드는 아름다움, 손에 닿았을 때
                편안한 촉감, 오래 두어도 질리지 않는 균형을 중요하게 생각합니다.
              </p>
            </article>
            <article className="rounded-[1.75rem] border border-black/8 bg-white/75 p-7 shadow-[0_18px_50px_rgba(31,22,16,0.05)]">
              <p className="text-sm leading-7 text-black/68">
                홈페이지 역시 같은 태도를 담아 구성했습니다. 충분한 여백과
                절제된 타이포그래피, 부드러운 색감 위에 브랜드의 세계관과 대표
                제품군이 차분하게 드러나도록 설계했습니다.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">
              Featured Categories
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-stone-950 sm:text-4xl">
              대표 제품과 카테고리
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-black/60">
            첫 런칭 단계에서는 대표 제품을 바로 모두 보여주기보다, 브랜드를
            상징하는 카테고리 중심으로 감도를 전달하는 구성이 효과적입니다.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {categories.map((category, index) => (
            <article
              key={category.name}
              className="group overflow-hidden rounded-[2rem] border border-black/8 bg-white/78 shadow-[0_20px_60px_rgba(28,20,14,0.06)] transition hover:-translate-y-1"
            >
              <div
                className={`h-52 w-full ${
                  index === 0
                    ? "bg-[linear-gradient(180deg,#f7efe7_0%,#ebddcf_100%)]"
                    : index === 1
                      ? "bg-[linear-gradient(180deg,#f4efe8_0%,#d9c5b0_100%)]"
                      : "bg-[linear-gradient(180deg,#f8f3ed_0%,#ddd0c1_100%)]"
                }`}
              >
                <div className="flex h-full items-end p-6">
                  <div className="rounded-full border border-white/45 bg-white/45 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-black/48 backdrop-blur">
                    objetdoux edit
                  </div>
                </div>
              </div>
              <div className="px-6 py-7">
                <p className="text-[11px] uppercase tracking-[0.3em] text-black/38">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-stone-950">
                  {category.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-black/65">
                  {category.description}
                </p>
                <p className="mt-5 text-sm text-black/45">{category.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="px-6 pb-16 pt-4 sm:px-10 lg:px-16 lg:pb-24"
      >
        <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(246,238,230,0.92)_100%)] p-7 shadow-[0_24px_70px_rgba(30,22,16,0.08)] sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-black/45">
                Contact & Instagram
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-stone-950 sm:text-4xl">
                문의와 인스타그램에서
                <br className="hidden sm:block" /> objetdoux를 더 가까이 만나보세요.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-black/65 sm:text-base">
                협업, 입점, 제품 관련 문의는 메일로 남겨주세요. 브랜드의 무드와
                업데이트는 인스타그램을 중심으로 가장 먼저 공유할 수 있습니다.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="mailto:hello@objetdoux.com"
                className="rounded-[1.75rem] bg-stone-950 px-6 py-7 text-stone-50 transition hover:bg-stone-800"
              >
                <p className="text-[11px] uppercase tracking-[0.3em] text-stone-300">
                  Email
                </p>
                <p className="mt-4 text-lg font-medium">hello@objetdoux.com</p>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  제품, 협업, 입점 문의
                </p>
              </a>
              <a
                href="https://instagram.com/objetdoux"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[1.75rem] border border-black/8 bg-white/82 px-6 py-7 transition hover:bg-white"
              >
                <p className="text-[11px] uppercase tracking-[0.3em] text-black/40">
                  Instagram
                </p>
                <p className="mt-4 text-lg font-medium text-stone-950">
                  @objetdoux
                </p>
                <p className="mt-2 text-sm leading-6 text-black/58">
                  무드보드, 신제품, 브랜드 소식
                </p>
              </a>
            </div>
          </div>
        </div>

        <footer className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-black/8 pt-6 text-sm text-black/50 sm:flex-row sm:items-center sm:justify-between">
          <p>objetdoux</p>
          <p>Minimal, emotional, refined.</p>
        </footer>
      </section>
    </main>
  );
}
