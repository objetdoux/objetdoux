import Link from "next/link";

export default function SocialPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">
            HOME
          </Link>
          <span>/</span>
          <span>SOCIAL</span>
        </div>

        <section className="mt-6 rounded-[2rem] border border-black/6 bg-white px-6 py-12 text-center sm:px-10 sm:py-16">
          <p className="text-sm tracking-[0.18em] text-stone-400">COMING SOON</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            SOCIAL 페이지 준비 중입니다
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-stone-600">
            오브제두의 소셜 콘텐츠와 브랜드 장면을 보여주는 공간은 현재 오픈
            준비 중입니다. 추후 인스타그램, 캠페인, 커뮤니티 콘텐츠가 정리되는
            시점에 업데이트될 예정입니다.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-stone-950 px-5 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              메인으로 돌아가기
            </Link>
            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-black/8 bg-[#faf8f5] px-5 text-sm font-medium text-stone-700 transition hover:border-stone-900"
            >
              상품 보러가기
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
