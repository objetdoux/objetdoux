import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="brand-home">
      <Link
        href="/collections/pastel-ceramic-bowl"
        className="brand-hero"
        aria-label="오브제두 첫 번째 컬렉션 보기"
      >
        <Image
          src="/brand/objetdoux-top-view-hero.png"
          alt="오브제두의 파스텔 세라믹 테이블웨어를 위에서 바라본 모습"
          fill
          loading="eager"
          sizes="100vw"
          className="brand-hero-image"
        />
        <h1>objetdoux</h1>
      </Link>

      <section className="brand-introduction">
        <p className="brand-kicker">GENTLE OBJECTS FOR EVERYDAY LIVING</p>
        <h2>
          오래 곁에 두고 싶은 것들은
          <br />
          조용히 일상을 바꿉니다.
        </h2>
        <p>
          오브제두는 쓰임과 아름다움 사이의 작은 균형을 생각합니다.
          <br />
          매일의 공간에 자연스럽게 스며드는 다정한 오브제를 만듭니다.
        </p>
      </section>

      <section className="featured-collection">
        <div className="featured-image">
          <Image
            src="/product/bowl-lifestyle.png"
            alt="오브제두 첫 번째 세라믹 볼 컬렉션"
            fill
            sizes="(min-width: 900px) 62vw, 100vw"
            className="featured-photo"
          />
        </div>
        <div className="featured-copy">
          <p className="brand-kicker">THE FIRST COLLECTION · 2026</p>
          <h2>담는 순간부터,<br />남은 순간까지.</h2>
          <p>
            식탁에서는 부드러운 세라믹 볼로,
            식사가 끝나면 그대로 덮어 보관하는 첫 번째 오브제.
          </p>
          <Link href="/collections/pastel-ceramic-bowl" className="collection-link">
            컬렉션 보기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
