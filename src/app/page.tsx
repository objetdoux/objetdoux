import Link from "next/link";

const eventItems = [
  {
    title: "첫 런칭 소식",
    description: "오브제두의 첫 컬렉션 오픈 일정과 브랜드 소식을 안내하는 영역",
  },
  {
    title: "프로모션 안내",
    description: "이벤트, 팝업, 온라인 스토어 공지 등 추후 바로 교체 가능한 블록",
  },
];

const newItems = [
  { name: "New Plate Series", price: "₩38,000", isNew: true, soldOut: false },
  { name: "New Mug Series", price: "₩29,000", isNew: true, soldOut: false },
  { name: "New Bowl Series", price: "₩32,000", isNew: true, soldOut: true },
  { name: "Gift Package", price: "₩12,000", isNew: false, soldOut: false },
];

const magazineItems = [
  {
    title: "오브제두가 생각하는 일상의 그릇",
    description: "브랜드가 식기와 식탁을 바라보는 태도를 담는 콘텐츠 영역",
  },
  {
    title: "도자기 표면과 색의 균형",
    description: "제품 비하인드, 유약 이야기, 제작 노트를 쌓아갈 수 있는 영역",
  },
  {
    title: "식탁 위의 단정한 분위기",
    description: "라이프스타일과 테이블 무드를 보여주는 에디토리얼 콘텐츠 영역",
  },
];

export default function Home() {
  return (
    <main className="bg-[#f7f3ee] py-16 lg:py-24">
      <section className="w-full">
        <div className="aspect-[16/9] w-full bg-[#e2dfda] sm:aspect-[16/8] lg:aspect-[16/6]">
          <div className="mx-auto flex h-full w-full max-w-6xl items-end px-6 py-8 sm:px-8 sm:py-10 lg:px-8 lg:py-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-semibold leading-[1.15] tracking-[-0.04em] text-stone-900 sm:text-5xl lg:text-6xl">
                메인 배너 이미지 영역
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-6 text-stone-600 sm:text-base sm:leading-7">
                실제 대표 이미지가 들어갈 자리입니다. 좌우 여백 없이 화면을 크게
                사용하는 배너 형태로 먼저 비율만 잡아두었습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl px-6 lg:px-8">
        <div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-4xl">
            EVENT
          </h2>
        </div>

        <div className="-mx-6 mt-4 flex gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {eventItems.map((item) => (
            <article
              key={item.title}
              className="min-w-[84vw] rounded-[1.5rem] border border-black/6 bg-white p-6 md:min-w-0"
            >
              <div className="h-48 rounded-[1rem] bg-[#e5e3de]" />
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-stone-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-4xl">
              NEW ITEMS
            </h2>
          </div>
          <Link href="/shop" className="text-sm text-stone-500 hover:text-stone-900">
            SHOP 바로가기
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-5 xl:grid-cols-4">
          {newItems.map((item) => (
            <article
              key={item.name}
              className="rounded-[1.5rem] border border-black/6 bg-white p-4 sm:p-5"
            >
              <div className="aspect-square rounded-[1rem] bg-[#e5e3de]" />
              <div className="mt-3 flex flex-wrap gap-2">
                {item.isNew ? (
                  <span className="rounded-full bg-stone-950 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white">
                    New
                  </span>
                ) : null}
                {item.soldOut ? (
                  <span className="rounded-full border border-black/10 bg-[#f3eee8] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-stone-500">
                    Sold Out
                  </span>
                ) : null}
              </div>
              <p className="mt-2.5 text-base font-medium text-stone-900">
                {item.name}
              </p>
              <p className="mt-1 text-sm leading-6 text-stone-500">
                {item.price}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-4xl">
              MAGAZINE
            </h2>
          </div>
          <Link
            href="/magazine"
            className="text-sm text-stone-500 hover:text-stone-900"
          >
            MAGAZINE 바로가기
          </Link>
        </div>

        <div className="-mx-6 mt-4 flex gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {magazineItems.map((item) => (
            <article
              key={item.title}
              className="min-w-[84vw] rounded-[1.5rem] border border-black/6 bg-white p-6 md:min-w-0"
            >
              <div className="h-52 rounded-[1rem] bg-[#e5e3de]" />
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-stone-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl px-6 lg:px-8">
        <div className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-8 sm:px-8 sm:py-10">
          <div className="max-w-xl">
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-4xl">
              COMPANY
            </h2>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-stone-900">ADDRESS</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                서울시 강남구
                <br />
                추후 실제 주소가 들어갈 자리
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">COMPANY</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                상호명, 대표자명, 사업자등록번호 등
                <br />
                기본 회사 정보가 들어갈 자리
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">CS</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                평일 운영시간 / 문의 메일
                <br />
                hello@objetdoux.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
