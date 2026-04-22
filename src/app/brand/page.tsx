export default function BrandPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="rounded-[1.75rem] border border-black/6 bg-white p-5 sm:p-6">
          <div className="flex h-[24rem] items-end rounded-[1.25rem] bg-[#e5e3de] p-6 sm:h-[32rem]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone-500">
                Brand Visual
              </p>
              <p className="mt-3 text-base leading-7 text-stone-500">
                추후 브랜드 이미지, 캠페인 비주얼, 공방 사진 등이 들어갈 자리입니다.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            오브제두의 브랜드 이야기
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-700">
            오브제두는 일상에 자연스럽게 스며드는 부드러운 감성의 오브제를
            제안하는 브랜드입니다.
          </p>
          <div className="mt-7 space-y-5 text-base leading-7 text-stone-600">
            <p>
              프랑스어로 <strong>objet</strong>는 오브제, 물건을 의미하고,
              <strong> doux</strong>는 부드럽고 온화한 감성을 뜻합니다.
              오브제두는 이 두 단어에서 영감을 받아, 조용히 예쁘고 오래 곁에 두고
              싶은 물건의 감각을 이름 안에 담았습니다.
            </p>
            <p>
              오브제두는 20~30대의 일상 속에서 과하지 않지만 분명한 취향을
              보여주는 식기와 오브제를 만들고자 합니다. 생활 속에 자연스럽게
              놓였을 때 더 아름다운 형태와 분위기를 중요하게 생각합니다.
            </p>
            <p>
              우리가 제안하는 것은 단순한 제품이 아니라, 식탁과 공간의 분위기를
              조금 더 다정하고 정돈된 방향으로 바꾸는 감각의 경험입니다.
            </p>
          </div>
        </div>
      </div>

      <section className="mx-auto mt-16 w-full max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-4xl">
            브랜드 철학
          </h2>
          <p className="mt-5 text-base leading-7 text-stone-600">
            오브제두는 화려함보다 균형, 강한 인상보다 생활 속에 자연스럽게
            놓이는 분위기를 중요하게 생각합니다.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="rounded-[1.5rem] border border-black/6 bg-white p-6">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-stone-950">
              부드러운 형태
            </h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              오브제두는 강한 장식보다 편안한 인상을 남기는 실루엣을 지향합니다.
              오래 보아도 질리지 않는 균형이 가장 중요합니다.
            </p>
          </article>

          <article className="rounded-[1.5rem] border border-black/6 bg-white p-6">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-stone-950">
              조용한 감성
            </h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              잔잔한 색감, 차분한 표면, 생활에 자연스럽게 스며드는 분위기를
              통해 자극적이지 않은 아름다움을 전달하고자 합니다.
            </p>
          </article>

          <article className="rounded-[1.5rem] border border-black/6 bg-white p-6">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-stone-950">
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
