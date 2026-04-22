import { magazineArticles } from "../site-data";

export default function MagazinePage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8a6b5f]">
            magazine
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            브랜드의 시선과 식탁에 대한 기록
          </h1>
          <p className="mt-6 text-base leading-8 text-stone-600">
            MAGAZINE은 오브제두의 제품을 바로 판매하기보다, 브랜드가 어떤 태도로
            그릇을 만들고 어떤 장면을 제안하는지 보여주는 콘텐츠 공간입니다.
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          {magazineArticles.map((article) => (
            <article
              key={article.title}
              className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-7"
            >
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#8a6b5f]">
                {article.category}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                {article.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
                {article.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
