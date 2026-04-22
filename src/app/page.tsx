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
  "New Plate Series",
  "New Mug Series",
  "New Bowl Series",
  "Gift Package",
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
    <main className="bg-[#f7f3ee] px-6 py-16 lg:px-8 lg:py-24">
      <section className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="max-w-xl py-4">
            <h1 className="mt-5 text-4xl font-semibold leading-[1.18] tracking-[-0.04em] text-stone-950 sm:text-5xl lg:text-6xl">
              오브제두
              <br />
              메인 홈페이지
            </h1>
            <p className="mt-7 text-base leading-8 text-stone-600 sm:text-lg">
              메인 화면은 큰 배너를 중심으로 이벤트, 신제품, 매거진, 회사 정보가
              이어지는 구조로 정리했습니다. 실제 이미지 대신 지금은 모두 연한
              회색 플레이스홀더로만 배치해둔 상태입니다.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-black/6 bg-[#ece9e4] p-6 sm:p-8">
            <div className="flex min-h-[21rem] items-end rounded-[1.25rem] bg-[#e2dfda] p-6 sm:min-h-[29rem]">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone-500">
                  Main Banner
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-stone-800 sm:text-4xl">
                  큰 배너 영역
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-7 text-stone-500">
                  대표 비주얼, 시즌 캠페인, 주요 카피가 들어갈 자리입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl">
        <div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-4xl">
            EVENT
          </h2>
        </div>

        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {eventItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-black/6 bg-white p-6"
            >
              <div className="h-48 rounded-[1rem] bg-[#e5e3de]" />
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-stone-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl">
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
              key={item}
              className="rounded-[1.5rem] border border-black/6 bg-white p-4 sm:p-5"
            >
              <div className="aspect-square rounded-[1rem] bg-[#e5e3de]" />
              <p className="mt-3 text-base font-medium text-stone-900">{item}</p>
              <p className="mt-1.5 text-sm text-stone-500">
                추후 실제 상품 이미지와 가격 정보가 들어갈 예정입니다.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl">
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

        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {magazineItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-black/6 bg-white p-6"
            >
              <div className="h-52 rounded-[1rem] bg-[#e5e3de]" />
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-stone-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl">
        <div className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-8 sm:px-8 sm:py-10">
          <div className="max-w-xl">
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-4xl">
              COMPANY
            </h2>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-stone-900">ADDRESS</p>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                서울시 강남구
                <br />
                추후 실제 주소가 들어갈 자리
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">COMPANY</p>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                상호명, 대표자명, 사업자등록번호 등
                <br />
                기본 회사 정보가 들어갈 자리
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">CS</p>
              <p className="mt-3 text-sm leading-7 text-stone-600">
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
