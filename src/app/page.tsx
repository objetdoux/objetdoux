export default function Home() {
  return (
    <main className="bg-white">
      <section className="relative">
        <div className="h-[62vh] min-h-[28rem] w-full overflow-hidden bg-[#f6f4ef] sm:h-[72vh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ceramic-hero.svg"
            alt="오브제두 메인 비주얼"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs tracking-[0.22em] text-stone-400">objet doux</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-normal text-stone-950 sm:text-4xl">
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
              오브제두는 20~30대의 일상 속에서 과하지 않지만 분명한 취향을 보여주는
              식기와 오브제를 만들고자 합니다. 생활 속에 자연스럽게 놓였을 때 더
              아름다운 형태와 분위기를 중요하게 생각합니다.
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
    </main>
  );
}
