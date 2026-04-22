export default function BrandPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="rounded-[1.75rem] border border-black/6 bg-white p-5 sm:p-6">
          <div className="flex h-[26rem] items-end rounded-[1.25rem] bg-[#e5e3de] p-6 sm:h-[34rem]">
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
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8a6b5f]">
            brand
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            오브제두의 브랜드 이야기
          </h1>
          <div className="mt-7 space-y-5 text-base leading-8 text-stone-600">
            <p>
              오브제두는 한국의 젊은 세대를 위한 도자기 식기 브랜드입니다.
              식사가 더 단정해지고, 식탁 위 분위기가 더 차분해지는 물건을
              만들고자 합니다.
            </p>
            <p>
              브랜드의 출발점은 단순합니다. 매일 쓰는 그릇도 충분히 아름다울 수
              있고, 오래 두고 써도 질리지 않는 형태는 결국 일상 속에서 더 오래
              사랑받는다는 믿음입니다.
            </p>
            <p>
              앞으로 이 페이지에는 브랜드 철학, 제작 방식, 소재에 대한 이야기,
              그리고 오브제두가 지향하는 식탁의 장면을 더 풍부하게 쌓아갈 수
              있습니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
