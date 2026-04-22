import { ordinaryNotes } from "../site-data";

export default function OrdinaryPage() {
  return (
    <main className="bg-[#f7f3ee] px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8a6b5f]">
            ordinary
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            평범한 일상을 조금 더 좋아하게 만드는 장면
          </h1>
          <p className="mt-6 text-base leading-8 text-stone-600">
            ORDINARY는 제품 설명보다 더 넓은 생활의 맥락을 담는 페이지입니다.
            오브제두의 식기가 어떤 장면에서 쓰이고, 어떤 감정을 남기는지 보여줄
            수 있습니다.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ordinaryNotes.map((note) => (
            <article
              key={note.title}
              className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-7"
            >
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                {note.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-stone-600">
                {note.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
