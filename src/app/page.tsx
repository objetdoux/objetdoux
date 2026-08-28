const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M14 7l5 5-5 5" />
  </svg>
);

export default function Home() {
  return (
    <main className="home" id="top">
      <div className="announcement">
        <p>Objetdoux · 첫 번째 오브제를 준비하고 있습니다.</p>
        <span>Coming soon</span>
      </div>

      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="오브제두 홈">
          objetdoux
        </a>

        <nav className="site-nav" aria-label="주요 메뉴">
          <a href="#brand">Brand</a>
          <a href="#object">Object 001</a>
          <a href="#note">Our note</a>
        </nav>

        <a
          className="instagram-link"
          href="https://www.instagram.com/objetdoux/"
          target="_blank"
          rel="noreferrer"
        >
          Instagram <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="object">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span>Soft utility</span>
            <span aria-hidden="true" />
            <span>Made in Korea</span>
          </div>

          <h1>
            매일 쓰고 싶은,
            <br />
            부드러운 오브제.
          </h1>

          <p className="hero-description">
            식탁 위에서는 다정한 그릇으로,
            <br />
            식사가 끝나면 그대로 냉장고까지.
          </p>

          <a className="hero-cta" href="#brand">
            <span>오브제두 이야기</span>
            <ArrowIcon />
          </a>

          <p className="signature">des objets doux, des jours heureux</p>
        </div>

        <div className="hero-art" aria-label="파스텔 데일리 볼 콘셉트 이미지" role="img">
          <div className="art-label">
            <span>Object 001</span>
            <strong>Daily bowl</strong>
          </div>

          <div className="object-scene" aria-hidden="true">
            <div className="lid lid-back">
              <span />
            </div>
            <div className="bowl bowl-sage">
              <div className="bowl-rim" />
            </div>
            <div className="bowl bowl-butter">
              <div className="bowl-rim" />
            </div>
            <div className="lid lid-front">
              <span />
            </div>
          </div>

          <p className="art-note">Bowl + refrigerator storage lid</p>
          <span className="art-number">01</span>
        </div>
      </section>

      <section className="brand-intro" id="brand">
        <p className="intro-index">01 · Our beginning</p>
        <h2>
          보기 좋은 물건에서
          <br />
          자주 쓰이는 물건으로.
        </h2>
        <p>
          오브제두는 한국의 일상에 자연스럽게 어울리는 형태와 쓰임을
          고민합니다. 부드러운 색과 세심한 기능으로 평범한 하루에 작은
          기쁨을 더합니다.
        </p>
      </section>

      <footer className="preview-footer" id="note">
        <span>Objetdoux · 오브제두</span>
        <span>Soft objects, happy days.</span>
      </footer>
    </main>
  );
}
