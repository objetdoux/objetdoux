import Image from "next/image";

const featuredObjects = [
  {
    name: "Spoon Rest",
    label: "수저받침대",
    copy: "작은 식탁 위에 조용한 포인트가 되는 오브제.",
    shape: "h-12 w-24 rounded-[48%]",
  },
  {
    name: "Cup",
    label: "컵",
    copy: "손에 자주 닿는 물건일수록 더 섬세하게.",
    shape: "h-24 w-16 rounded-b-3xl rounded-t-lg",
  },
  {
    name: "Plate",
    label: "접시",
    copy: "여백과 불규칙한 림이 만드는 부드러운 장면.",
    shape: "h-20 w-32 rounded-[50%]",
  },
];

const values = [
  "화이트 중심의 깨끗한 도자기",
  "손맛이 느껴지는 자연스러운 형태",
  "얇고 섬세한 라인",
  "작은 타이포그래피와 일러스트",
  "선물하고 싶은 분위기",
  "매일 쓰기 편한 사용성",
];

const moments = [
  "밝은 자연광",
  "흰 식탁",
  "유리의 투명감",
  "실버 커트러리",
  "꽃 한 송이",
  "종이 카드",
];

export default function Home() {
  return (
    <main className="bg-white text-[#1E1E1C]">
      <section className="relative overflow-hidden border-b border-[#E9E6DD] bg-[#F8F7F3]">
        <div className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-10 lg:py-12">
          <div className="relative z-10 max-w-xl">
            <p className="text-sm font-medium uppercase text-[#6F6A62]">
              soft objects, quiet days
            </p>
            <h1 className="mt-6 text-[3.85rem] font-normal leading-none text-[#1E1E1C] sm:text-[6.5rem] lg:text-[7.5rem]">
              objetdoux
            </h1>
            <p className="mt-5 text-2xl text-[#1E1E1C] sm:text-3xl">
              조용히 예쁜 것들
            </p>
            <p className="mt-4 max-w-sm font-serif text-lg italic leading-8 text-[#1E1E1C] sm:text-2xl">
              des objets doux, des jours heureux
            </p>
            <div className="mt-8 h-px w-20 bg-[#1E1E1C]" />
            <p className="mt-8 text-lg leading-9 text-[#4F4B45]">
              오브제두는 일상에 자연스럽게 스며들어, 공간의 분위기를
              다정하게 정돈하는 오브제 브랜드다.
            </p>
            <p className="mt-5 text-base leading-8 text-[#6F6A62]">
              하얀 식탁 위에 조용히 놓인, 섬세하고 시적인 오브제. 작은 물건
              하나가 평범한 하루의 분위기를 부드럽게 바꿉니다.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/objetdoux/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noreferrer"
                className="border border-[#1E1E1C] bg-[#1E1E1C] px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[#1E1E1C]"
              >
                INSTAGRAM
              </a>
              <a
                href="https://smartstore.naver.com/objet_doux"
                target="_blank"
                rel="noreferrer"
                className="border border-[#D8D8D3] bg-white px-5 py-3 text-sm font-medium text-[#1E1E1C] transition hover:border-[#1E1E1C]"
              >
                STORES
              </a>
            </div>
          </div>

          <div className="relative min-h-[26rem] overflow-hidden border border-[#D8D8D3] bg-white sm:min-h-[34rem] lg:min-h-[40rem]">
            <Image
              src="/ceramic-hero.svg"
              alt="하얀 식탁 위 오브제두 무드 비주얼"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-28">
        <div>
          <p className="text-sm font-medium uppercase text-[#A63A3A]">
            Brand Mood
          </p>
          <h2 className="mt-4 max-w-lg text-4xl font-normal leading-tight text-[#1E1E1C] sm:text-5xl">
            하얀 식탁 위에 조용히 놓이는 물건.
          </h2>
        </div>
        <div className="space-y-6 text-base leading-8 text-[#4F4B45]">
          <p>
            오브제두는 과하게 꾸미기보다 오래 보고 싶은 여백을 남깁니다.
            화이트 도자기, 작은 문구, 얇은 선, 손으로 빚은 듯한 형태를 통해
            조용하지만 기억에 남는 분위기를 만듭니다.
          </p>
          <p>
            제품은 예쁜 장식품에 머무르지 않습니다. 자주 꺼내 쓰고, 선물하고
            싶고, 사진으로도 감도가 전해지는 물건을 오브제두다운 기준으로
            고르고 만듭니다.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E9E6DD] bg-[#F8F7F3]">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-5 py-16 sm:px-8 md:grid-cols-3 lg:px-10">
          {featuredObjects.map((object) => (
            <article
              key={object.name}
              className="group border border-[#D8D8D3] bg-white p-6 transition hover:border-[#BDB5A8]"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-[#F8F7F3]">
                <div
                  className={`${object.shape} border border-[#D8D8D3] bg-white shadow-[0_18px_50px_rgba(30,30,28,0.08)] transition group-hover:border-[#A7B19A]`}
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-normal text-[#1E1E1C]">
                    {object.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#6F6A62]">{object.label}</p>
                </div>
                <span className="mt-1 h-2 w-2 rounded-full bg-[#A63A3A]" />
              </div>
              <p className="mt-5 text-sm leading-7 text-[#4F4B45]">
                {object.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-28">
        <div className="border-t border-[#1E1E1C] pt-8">
          <p className="text-sm font-medium uppercase text-[#1D3A68]">Found</p>
          <h2 className="mt-5 text-3xl font-normal text-[#1E1E1C]">
            발견하고 선택한 물건
          </h2>
          <p className="mt-5 text-base leading-8 text-[#4F4B45]">
            Found는 오브제두가 직접 고른 셀렉션입니다. 기성품이더라도 흰
            식탁 위에서 오브제처럼 보이는지, 사진으로 감도가 살아나는지,
            선물하고 싶은 분위기와 실제 사용성이 있는지를 함께 봅니다.
          </p>
        </div>

        <div className="border-t border-[#1E1E1C] pt-8">
          <p className="text-sm font-medium uppercase text-[#A63A3A]">Made</p>
          <h2 className="mt-5 text-3xl font-normal text-[#1E1E1C]">
            직접 기획하고 만드는 물건
          </h2>
          <p className="mt-5 text-base leading-8 text-[#4F4B45]">
            Made는 오브제두의 핵심이 될 라인입니다. 형태, 질감, 작은 문구와
            일러스트, 로고 위치, 포장 경험, 손에 잡히는 감각까지 하나의
            작은 오브제로 남도록 다듬습니다.
          </p>
        </div>
      </section>

      <section className="bg-[#1E1E1C] text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-28">
          <div>
            <p className="font-serif text-3xl italic text-white">
              des objets doux, des jours heureux
            </p>
            <h2 className="mt-6 max-w-md text-4xl font-normal leading-tight sm:text-5xl">
              선물하고 싶은 물건에는 작은 이유가 있어요.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value}
                className="border border-white/14 bg-white/[0.04] px-5 py-4 text-sm leading-6 text-white/78"
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-28">
        <div className="relative min-h-[28rem] overflow-hidden border border-[#D8D8D3] bg-[#F8F7F3]">
          <div className="absolute left-8 top-8 h-40 w-32 border border-[#D8D8D3] bg-white shadow-[0_24px_70px_rgba(30,30,28,0.08)]" />
          <div className="absolute right-10 top-16 h-24 w-24 rounded-full border border-[#E9E6DD] bg-white" />
          <div className="absolute bottom-12 left-1/2 h-28 w-44 -translate-x-1/2 rounded-[50%] border border-[#D8D8D3] bg-white shadow-[0_24px_70px_rgba(30,30,28,0.08)]" />
          <div className="absolute bottom-8 right-8 h-32 w-20 rounded-b-3xl rounded-t-lg border border-[#D8D8D3] bg-white" />
          <div className="absolute left-10 top-56 h-px w-44 bg-[#BDB5A8]" />
          <p className="absolute bottom-8 left-8 font-serif text-xl italic text-[#1E1E1C]">
            soft objects, quiet days
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium uppercase text-[#6F6A62]">
            Photo & Styling
          </p>
          <h2 className="mt-5 text-4xl font-normal leading-tight text-[#1E1E1C]">
            빛, 여백, 그리고 아주 작은 포인트.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#4F4B45]">
            사진은 밝은 자연광과 흰 식탁을 중심으로 합니다. 배경보다 제품이
            먼저 보이고, 작은 소품은 분위기를 돕는 정도로만 둡니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {moments.map((moment) => (
              <span
                key={moment}
                className="border border-[#D8D8D3] px-4 py-2 text-sm text-[#4F4B45]"
              >
                {moment}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E9E6DD] bg-[#F8F7F3]">
        <div className="mx-auto w-full max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
          <p className="font-serif text-3xl italic text-[#1E1E1C]">
            des objets doux, des jours heureux
          </p>
          <h2 className="mt-6 text-4xl font-normal leading-tight text-[#1E1E1C] sm:text-5xl">
            일상에 스며드는 부드러운 오브제
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#4F4B45]">
            오브제두다운 제품은 조용하고, 섬세하며, 하얀 식탁 위에 자연스럽게
            놓이고, 선물하고 싶어지는 물건입니다.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.instagram.com/objetdoux/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              rel="noreferrer"
              className="border border-[#1E1E1C] bg-[#1E1E1C] px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[#1E1E1C]"
            >
              INSTAGRAM
            </a>
            <a
              href="https://smartstore.naver.com/objet_doux"
              target="_blank"
              rel="noreferrer"
              className="border border-[#D8D8D3] bg-white px-5 py-3 text-sm font-medium text-[#1E1E1C] transition hover:border-[#1E1E1C]"
            >
              STORES
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
