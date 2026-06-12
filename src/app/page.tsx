import Image from "next/image";

const products = [
  {
    src: "/brand/ai-sage-closeup.png",
    alt: "Sage glaze ceramic plate",
  },
  {
    src: "/brand/ai-blush-fluted.png",
    alt: "Blush fluted ceramic plate",
  },
  {
    src: "/brand/ai-tide-crop.png",
    alt: "Tide glaze ceramic plate",
  },
  {
    src: "/brand/ai-blush-fluted.png",
    alt: "Blush ceramic plate detail",
  },
  {
    src: "/brand/ai-sage-closeup.png",
    alt: "Sage ceramic plate detail",
  },
];

const menuItems = ["Shop", "Collection", "Lookbook", "About"];
const gridCells = Array.from({ length: 72 }, (_, index) => index);

export default function Home() {
  return (
    <main className="bg-[#AAA9A5] text-[#050505]">
      <header className="sticky top-0 z-50 border-b border-black bg-[#F8F7F3]">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-4 text-[0.72rem] font-medium uppercase tracking-[0.14em] sm:px-6 lg:px-8">
          <a
            href="/"
            className="justify-self-start text-[1.05rem] font-semibold normal-case tracking-[-0.04em]"
          >
            objetdoux
          </a>

          <nav className="hidden items-center justify-center gap-8 md:flex">
            {menuItems.map((item) => (
              <a
                key={item}
                href={item === "Shop" ? "/stores" : `#${item.toLowerCase()}`}
                className="transition hover:text-black/46"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              className="hidden transition hover:text-black/46 sm:block"
            >
              Search
            </button>
            <button type="button" className="transition hover:text-black/46">
              Cart 0
            </button>
            <button
              type="button"
              className="border border-black px-3 py-2 transition hover:bg-black hover:text-white md:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[#D8D8D3]">
        <div className="absolute inset-0">
          <Image
            src="/brand/ai-sage-closeup.png"
            alt="Objetdoux monochrome ceramic background"
            fill
            loading="eager"
            sizes="100vw"
            className="editorial-image object-cover opacity-[0.86]"
          />
        </div>
        <div className="absolute inset-0 bg-[#D8D8D3]/8" />
        <div className="editorial-grid absolute inset-0 z-10" />
        <div className="flip-grid absolute inset-0 z-20" aria-hidden="true">
          {gridCells.map((cell) => (
            <span key={cell} className="flip-cell" />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 z-40 border-[14px] border-black sm:border-[18px]" />

        <h1 className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(4rem,15vw,12rem)] font-black leading-none tracking-[-0.09em]">
          objetdoux
        </h1>
      </section>

      <section className="bg-[#050505] p-px">
        <div className="grid grid-cols-5 gap-px bg-white/14">
          {products.map((product, index) => (
            <div
              key={`${product.src}-${index}`}
              className="relative h-[8.5rem] overflow-hidden bg-black sm:h-[14rem] lg:h-[18rem]"
            >
              <Image
                src={product.src}
                alt={product.alt}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                className="editorial-image object-cover opacity-80 transition duration-700 hover:scale-[1.04] hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
