export default function Home() {
  return (
    <main className="bg-white">
      <section className="relative">
        <div className="aspect-[4/5] max-h-[78vh] min-h-[26rem] w-full overflow-hidden bg-[#f6f4ef] sm:aspect-[4/3] lg:aspect-[16/7] lg:min-h-[34rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ceramic-hero.svg"
            alt="오브제두 메인 비주얼"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h1 className="text-3xl font-semibold tracking-normal text-stone-950 sm:text-4xl">
              오브제두의 브랜드 이야기
            </h1>
          </div>

          <div className="space-y-5 text-base leading-7 text-stone-600">
            <p>
              프랑스어로 <strong>objet</strong>는 오브제, 물건을 의미하고,
              <strong> doux</strong>는 부드럽고 온화한 감성을 뜻합니다. 오브제두는
              이 두 단어에서 영감을 받아, 조용히 예쁘고 오래 곁에 두고 싶은 물건의
              감각을 이름 안에 담았습니다.
            </p>
            <p>
              오브제두는 과하지 않지만 분명한 취향을 보여주는 식기와 오브제를
              만들고자 합니다. 생활 속에 자연스럽게 놓였을 때 더 아름다운 형태와
              분위기를 중요하게 생각합니다.
            </p>
            <p>
              우리가 제안하는 것은 단순한 제품이 아니라, 식탁과 공간의 분위기를 조금
              더 다정하고 정돈된 방향으로 바꾸는 감각의 경험입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16 lg:px-8 lg:pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          <article>
            <h3 className="text-xl font-semibold tracking-normal text-stone-950">
              부드러운 형태
            </h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              강한 장식보다 편안한 인상을 남기는 실루엣을 지향합니다. 오래 보아도
              질리지 않는 균형을 가장 중요하게 생각합니다.
            </p>
          </article>

          <article>
            <h3 className="text-xl font-semibold tracking-normal text-stone-950">
              조용한 감성
            </h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              잔잔한 색감과 차분한 표면, 생활에 자연스럽게 스며드는 분위기를 통해
              자극적이지 않은 아름다움을 전달하고자 합니다.
            </p>
          </article>

          <article>
            <h3 className="text-xl font-semibold tracking-normal text-stone-950">
              오래 곁에 두는 물건
            </h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              순간의 유행보다 매일 손이 가는 쓰임을 중요하게 생각합니다. 좋은
              오브제는 결국 오래 함께하는 일상의 일부가 된다고 믿습니다.
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-black/8 bg-[#fbfaf8]">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
          <article>
            <h2 className="text-3xl font-semibold tracking-normal text-stone-950">
              오브제두가 발견한 물건
            </h2>
            <p className="mt-5 text-base leading-7 text-stone-600">
              처음부터 모든 것을 직접 만들기보다, 오브제두의 기준에 맞는 물건을 먼저
              발견하고 소개합니다. 은은한 색감, 심플한 형태, 동글동글한 인상처럼
              오브제두의 공간에 자연스럽게 놓일 수 있는 물건을 고릅니다.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold tracking-normal text-stone-950">
              오브제두가 만드는 물건
            </h2>
            <p className="mt-5 text-base leading-7 text-stone-600">
              장기적으로는 직접 기획하고 제작한 제품을 오브제두의 중심에 둡니다.
              처음에는 소수의 제품으로 시작하지만, 브랜드가 성장할수록 오브제두만의
              형태와 감도를 담은 제품을 천천히 늘려갑니다.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-normal text-stone-950 sm:text-4xl">
              첫 제품을 준비하고 있습니다
            </h2>
          </div>

          <div>
            <p className="text-base leading-7 text-stone-600">
              오브제두의 첫 제품은 수저받침대, 컵, 접시를 중심으로 시작됩니다. 가장 먼저
              공개되는 소식은 인스타그램과 스마트스토어를 통해 안내할 예정입니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/objetdoux/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noreferrer"
                className="border border-black/12 px-5 py-3 text-sm font-medium text-stone-900 transition hover:border-black/30"
              >
                INSTAGRAM
              </a>
              <a
                href="https://smartstore.naver.com/objet_doux"
                target="_blank"
                rel="noreferrer"
                className="border border-black/12 px-5 py-3 text-sm font-medium text-stone-900 transition hover:border-black/30"
              >
                STORES
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
