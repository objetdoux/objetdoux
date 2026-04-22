const socialSections = [
  {
    title: "Instagram Feed",
    description:
      "브랜드 무드, 제품 업데이트, 촬영 컷이 들어갈 대표 소셜 콘텐츠 영역입니다.",
  },
  {
    title: "Campaign Story",
    description:
      "시즌 메시지나 브랜드가 전달하고 싶은 장면을 가볍게 보여주는 영역입니다.",
  },
  {
    title: "Community",
    description:
      "리뷰, 태그 콘텐츠, 브랜드와 고객의 연결 지점을 확장할 수 있는 영역입니다.",
  },
];

export default function SocialPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8a6b5f]">
            social
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            브랜드의 분위기를 보여주는 SOCIAL 페이지
          </h1>
          <p className="mt-6 text-base leading-8 text-stone-600">
            SOCIAL은 인스타그램, 캠페인, 커뮤니티처럼 오브제두의 장면을 조금 더
            가볍고 자주 보여주는 공간입니다. 지금은 모든 비주얼을 연한 회색
            플레이스홀더로 정리해둔 상태입니다.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {socialSections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.5rem] border border-black/6 bg-white p-6"
            >
              <div className="h-60 rounded-[1rem] bg-[#e5e3de]" />
              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-stone-600">
                {section.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
