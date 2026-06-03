import Image from "next/image";

const heroImages = [
  {
    src: "/brand/ai-blush-fluted.png",
    alt: "Abstract blush fluted ceramic plate",
    className: "left-[6%] top-[12%] h-[34vh] w-[34vw] min-w-72",
    motion: "art-float-slow",
  },
  {
    src: "/brand/ai-sage-closeup.png",
    alt: "Abstract sage white ceramic plate closeup",
    className: "right-[8%] top-[7%] h-[48vh] w-[38vw] min-w-80",
    motion: "art-float-medium",
  },
  {
    src: "/brand/ai-tide-crop.png",
    alt: "Abstract tide blue ceramic plate crop",
    className: "bottom-[8%] left-[26%] h-[44vh] w-[46vw] min-w-96",
    motion: "art-float-fast",
  },
];

const galleryImages = [
  {
    src: "/brand/ai-sage-closeup.png",
    alt: "Sage glaze ceramic plate detail",
    span: "lg:col-span-5",
    height: "h-[34rem]",
  },
  {
    src: "/brand/ai-blush-fluted.png",
    alt: "Blush fluted ceramic plate detail",
    span: "lg:col-span-7",
    height: "h-[44rem]",
  },
  {
    src: "/brand/ai-tide-crop.png",
    alt: "Tide blue ceramic plate crop",
    span: "lg:col-span-7",
    height: "h-[38rem]",
  },
  {
    src: "/brand/pebble-mist.png",
    alt: "Pebble Mist ceramic plate mood board",
    span: "lg:col-span-5",
    height: "h-[30rem]",
  },
];

const railImages = [
  "/brand/ai-sage-closeup.png",
  "/brand/ai-tide-crop.png",
  "/brand/ai-blush-fluted.png",
  "/brand/petal-fold.png",
  "/brand/sea-mist.png",
  "/brand/pebble-mist.png",
];

const plateNames = [
  "Morning Dew",
  "Cloud Petal",
  "Sea Mist",
  "Pebble Mist",
  "Shell Dune",
  "River Fold",
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#FCFBF8] text-[#1E1E1C]">
      <section className="relative min-h-[calc(100vh-65px)] border-b border-[#E9E6DD]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8F7F3_58%,#FFFFFF_100%)]" />
        <div className="absolute inset-x-0 top-0 z-10 flex justify-between px-5 py-5 text-[0.68rem] uppercase tracking-[0.26em] text-[#6F6A62] sm:px-8 lg:px-10">
          <span>soft objects</span>
          <span>quiet days</span>
        </div>

        <div className="absolute inset-0 hidden md:block">
          {heroImages.map((image) => (
            <div
              key={image.src}
              className={`art-image-frame absolute overflow-hidden border border-white/80 bg-white shadow-[0_30px_100px_rgba(30,30,28,0.12)] ${image.className} ${image.motion}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="50vw"
                className="art-kenburns object-cover"
              />
            </div>
          ))}
        </div>

        <div className="relative z-20 mx-auto flex min-h-[calc(100vh-65px)] w-full max-w-7xl flex-col justify-center px-5 pb-10 pt-20 sm:px-8 lg:px-10">
          <div className="max-w-5xl">
            <h1 className="text-[4.5rem] font-normal leading-[0.88] tracking-normal sm:text-[8rem] lg:text-[12rem]">
              objetdoux
            </h1>
            <p className="mt-4 max-w-xl font-serif text-2xl italic leading-9 text-[#6A5B50] sm:text-4xl">
              des objets doux,
              <br />
              des jours heureux
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:hidden">
            {heroImages.map((image) => (
              <div
                key={image.src}
                className="relative h-72 overflow-hidden border border-[#E9E6DD] bg-white"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="art-marquee absolute bottom-0 left-0 right-0 z-30 border-y border-[#E9E6DD] bg-white/78 py-3 backdrop-blur">
          <div className="art-marquee-track text-sm uppercase tracking-[0.22em] text-[#6F6A62]">
            {[...plateNames, ...plateNames].map((name, index) => (
              <span key={`${name}-${index}`}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-[#E9E6DD] bg-white py-8">
        <div className="art-strip-track flex gap-4">
          {[...railImages, ...railImages].map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative h-52 w-80 shrink-0 overflow-hidden border border-[#E9E6DD] bg-[#F8F7F3] sm:h-72 sm:w-[28rem]"
            >
              <Image
                src={src}
                alt="오브제두 접시 이미지 흐름"
                fill
                loading="eager"
                sizes="28rem"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="relative bg-[#FCFBF8] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:pt-20">
            <p className="text-xs uppercase tracking-[0.24em] text-[#A63A3A]">
              plate as object
            </p>
            <h2 className="mt-5 text-4xl font-normal leading-tight sm:text-6xl">
              텍스트보다 먼저,
              <br />
              빛과 유약이 말하게.
            </h2>
          </div>

          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`art-reveal relative overflow-hidden border border-[#E9E6DD] bg-white ${image.span} ${image.height}`}
              style={{ animationDelay: `${index * 180}ms` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="art-hover-scale object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="relative grid min-h-screen overflow-hidden border-y border-[#E9E6DD] bg-[#F8F7F3] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative flex items-center px-5 py-16 sm:px-8 lg:px-10">
          <div className="relative z-10 max-w-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-[#6F6A62]">
              oem friendly, visually poetic
            </p>
            <h2 className="mt-5 text-5xl font-normal leading-[0.98] sm:text-7xl">
              조용히 움직이는
              <br />
              접시의 장면들.
            </h2>
            <p className="mt-8 max-w-md text-base leading-8 text-[#4F4B45]">
              기존 금형의 단순한 형태를 바탕으로, 자연에서 온 색이 아주 천천히
              번지는 제품군을 보여줍니다.
            </p>
            <div className="mt-10 flex gap-3">
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
        </div>

        <div className="relative min-h-[46rem] overflow-hidden border-t border-[#E9E6DD] bg-white lg:border-l lg:border-t-0">
          <div className="art-vertical-track absolute left-5 top-0 grid w-[42%] gap-5 sm:left-8">
            {[...railImages, ...railImages].map((src, index) => (
              <div
                key={`left-${src}-${index}`}
                className="relative h-72 overflow-hidden border border-[#E9E6DD]"
              >
                <Image
                  src={src}
                  alt="움직이는 오브제두 접시 이미지"
                  fill
                  loading="eager"
                  sizes="22rem"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="art-vertical-track-reverse absolute right-5 top-0 grid w-[48%] gap-5 sm:right-8">
            {[...railImages].reverse().concat(railImages).map((src, index) => (
              <div
                key={`right-${src}-${index}`}
                className="relative h-96 overflow-hidden border border-[#E9E6DD]"
              >
                <Image
                  src={src}
                  alt="움직이는 오브제두 접시 이미지"
                  fill
                  loading="eager"
                  sizes="26rem"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1E1E1C] px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="absolute inset-0 opacity-55">
          <Image
            src="/brand/ai-tide-crop.png"
            alt="Full bleed abstract ceramic plate mood"
            fill
            sizes="100vw"
            className="art-pulse-image object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#1E1E1C]/45" />
        <div className="relative z-10 max-w-5xl text-center">
          <p className="font-serif text-3xl italic leading-tight sm:text-6xl">
            soft objects, quiet days
          </p>
          <h2 className="mt-8 text-[3.7rem] font-normal leading-[0.9] sm:text-[8rem]">
            조용히 예쁜 것들
          </h2>
        </div>
      </section>
    </main>
  );
}
