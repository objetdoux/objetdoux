import Link from "next/link";
import { getNewShopProducts } from "./shop/shop-data";
import { getSiteSettings } from "./site-settings";

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

export default async function Home() {
  const [newItems, settings] = await Promise.all([
    getNewShopProducts(4),
    getSiteSettings(),
  ]);
  const heroTitleLines = settings.heroTitle.split("\n");
  const eventItems = [
    {
      title: settings.eventPrimaryTitle,
      description: settings.eventPrimaryDescription,
      imageUrl: settings.eventPrimaryImageUrl,
    },
    {
      title: settings.eventSecondaryTitle,
      description: settings.eventSecondaryDescription,
      imageUrl: settings.eventSecondaryImageUrl,
    },
  ];

  return (
    <main className="bg-[#f7f3ee] py-16 lg:py-24">
      <section className="w-full">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#e2dfda] sm:aspect-[16/8] lg:aspect-[16/6]">
          {settings.heroImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={settings.heroImageUrl}
              alt=""
              className="absolute h-full w-full object-cover"
            />
          ) : null}
          <div className="relative mx-auto flex h-full w-full max-w-6xl items-end px-6 py-8 sm:px-8 sm:py-10 lg:px-8 lg:py-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-semibold leading-[1.15] tracking-[-0.04em] text-stone-900 sm:text-5xl lg:text-6xl">
                {heroTitleLines.map((line, index) => (
                  <span key={`${line}-${index}`}>
                    {line}
                    {index < heroTitleLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-6 text-stone-600 sm:text-base sm:leading-7">
                {settings.heroSubtitle}
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
              <div className="h-48 overflow-hidden rounded-[1rem] bg-[#e5e3de]">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
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
            <Link
              key={item.slug}
              href={`/shop/${item.slug}`}
              className="rounded-[1.5rem] border border-black/6 bg-white p-4 transition hover:border-black/12 hover:bg-[#fcfaf7] sm:p-5"
            >
              <div className="aspect-square overflow-hidden rounded-[1rem] bg-[#e5e3de]">
                {item.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.thumbnailUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <p className="mt-3 text-base font-medium text-stone-900">
                {item.name}
              </p>
              <p className="mt-1 text-sm leading-6 text-stone-500">
                {item.soldOut || (item.trackStock && item.stockQuantity <= 0)
                  ? "품절"
                  : item.price}
              </p>
            </Link>
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
                {settings.businessAddress}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">COMPANY</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {settings.companyName}
                <br />
                대표 {settings.ceoName}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">CS</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {settings.csPhone}
                <br />
                {settings.csEmail}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
