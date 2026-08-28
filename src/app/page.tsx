import Image from "next/image";

const steps = [
  {
    number: "01",
    english: "Fill",
    title: "담다",
    description: "샐러드와 파스타, 덮밥부터 과일까지 넉넉하게 담아요.",
    icon: <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 28c2 15 8 23 19 23s17-8 19-23H13Z" /><path d="M18 28c3-8 8-12 14-12s11 4 14 12" /></svg>,
  },
  {
    number: "02",
    english: "Enjoy",
    title: "즐기다",
    description: "가볍고 부드러운 곡선의 볼로 매일의 한 끼를 즐겨요.",
    icon: <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M11 32h42" /><path d="M17 32c1 12 6 18 15 18s14-6 15-18" /><path d="M24 22c0-4 2-7 5-10M34 22c0-4 2-7 5-10" /></svg>,
  },
  {
    number: "03",
    english: "Cover",
    title: "덮다",
    description: "식사가 끝나면 전용 뚜껑을 가볍게 덮어 주세요.",
    icon: <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 27c8-10 32-10 40 0" /><path d="M9 31h46M15 35c2 11 7 16 17 16s15-5 17-16" /><path d="M29 14h6" /></svg>,
  },
  {
    number: "04",
    english: "Keep",
    title: "보관하다",
    description: "다른 용기에 옮기지 않고 그대로 냉장 보관해요.",
    icon: <svg viewBox="0 0 64 64" aria-hidden="true"><rect x="16" y="9" width="32" height="46" rx="3" /><path d="M16 28h32M23 18v5M23 37v8" /></svg>,
  },
];

const colors = [
  { name: "Butter Cream", korean: "버터 크림", value: "#EEDDA9" },
  { name: "Sage Green", korean: "세이지 그린", value: "#BAC7B1" },
  { name: "Powder Blue", korean: "파우더 블루", value: "#B9CEDA" },
  { name: "Blush Peach", korean: "블러시 피치", value: "#E6C1B5" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="오브제두 홈으로 이동">objetdoux</a>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          <a href="#story">About</a>
          <a href="#object">Object 001</a>
          <a href="#colors">Colors</a>
          <a href="#making">Making</a>
        </nav>
        <a className="header-link" href="https://www.instagram.com/objetdoux/" target="_blank" rel="noreferrer">
          Instagram <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Soft utility for everyday</p>
          <h1>매일 쓰고 싶은,<br />부드러운 오브제.</h1>
          <p className="hero-description">식탁 위의 쓰임을 더 다정하게.<br />오브제두의 첫 번째 그릇을 소개합니다.</p>
          <a className="text-button" href="#object">첫 번째 오브제 보기 <span aria-hidden="true">↓</span></a>
        </div>
        <figure className="hero-visual">
          <Image src="/product/collection-lifestyle-primary.png" alt="따뜻한 자연광 아래 놓인 오브제두 파스텔 세라믹 볼" fill priority sizes="(max-width: 760px) 100vw, 62vw" className="cover-image" />
          <figcaption>Object 001 · Daily bowl with a lid</figcaption>
        </figure>
        <p className="hero-signature">des objets doux, des jours heureux</p>
      </section>

      <section className="brand-story section-shell" id="story">
        <div className="section-index"><span>01</span><span>Our story</span></div>
        <div className="story-heading">
          <p className="serif-label">objet + doux</p>
          <h2>오래 바라보기보다<br />오래 쓰고 싶은 것.</h2>
        </div>
        <div className="story-body">
          <p className="story-lead">오브제두는 ‘부드러운 오브제’라는 이름에서 시작한 국내 도자기 브랜드입니다.</p>
          <p>특정한 분위기를 흉내 내기보다 한국의 일상에 자연스럽게 어울리는 형태를 고민합니다. 손이 자주 가는 편안함, 매일 써도 질리지 않는 색, 작은 부분까지 세심하게 살핀 쓰임을 담습니다.</p>
          <ul className="value-list" aria-label="오브제두 브랜드 가치">
            <li>부드러움</li><li>실용성</li><li>세심함</li><li>신뢰</li><li>작은 기쁨</li>
          </ul>
        </div>
      </section>

      <section className="object-feature" id="object">
        <div className="object-image-wrap">
          <Image src="/product/bowl-lifestyle.png" alt="샐러드를 담은 오브제두 데일리 볼" fill sizes="(max-width: 760px) 100vw, 55vw" className="cover-image object-image" />
          <span className="image-note">For salad, pasta, rice and more</span>
        </div>
        <div className="object-copy">
          <div className="section-index light-index"><span>02</span><span>Object 001</span></div>
          <p className="eyebrow">Daily ceramic bowl</p>
          <h2>식탁에서<br />냉장고까지.</h2>
          <p className="object-lead">담고, 즐기고, 그대로 보관하세요.</p>
          <p className="object-description">한 끼를 기분 좋게 담아내는 세라믹 볼에 냉장 보관용 전용 뚜껑을 더했습니다. 남은 음식은 다른 용기로 옮기는 수고 없이 그대로 보관할 수 있어요.</p>
          <div className="product-points"><span>Lightweight ceramic</span><span>Storage lid included</span><span>Made in Korea</span></div>
          <p className="verification-note">* 전자레인지 등 상세 사용 조건은 볼과 뚜껑을 구분하여 최종 제품 검증 후 안내합니다.</p>
        </div>
      </section>

      <section className="use-section section-shell">
        <div className="section-heading-row">
          <div className="section-index"><span>03</span><span>How to use</span></div>
          <h2>한 번 담은 그대로,<br />하루의 다음 장면까지.</h2>
          <p>그릇과 보관 용기를 오가던 짧은 번거로움을 네 번의 간단한 움직임으로 바꾸었습니다.</p>
        </div>
        <div className="step-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <div className="step-top"><span>{step.number}</span><span>{step.english}</span></div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3><p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="color-section" id="colors">
        <div className="color-intro section-shell">
          <div className="section-index"><span>04</span><span>Soft colors</span></div>
          <h2>음식이 먼저 보이는<br />낮고 부드러운 색.</h2>
          <p>단독으로도, 서로 곁에 두어도 편안한 네 가지 색을 준비하고 있습니다.</p>
        </div>
        <figure className="color-image-wrap">
          <Image src="/product/collection-color-lineup.png" alt="다양한 파스텔 색상의 오브제두 세라믹 볼" fill sizes="100vw" className="cover-image" />
        </figure>
        <div className="palette section-shell">
          {colors.map((color, index) => (
            <article className="color-item" key={color.name}>
              <span className="color-swatch" style={{ backgroundColor: color.value }} aria-hidden="true" />
              <div><span>0{index + 1}</span><h3>{color.name}</h3><p>{color.korean}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="making-section section-shell" id="making">
        <div className="making-copy">
          <div className="section-index"><span>05</span><span>Made with care</span></div>
          <p className="serif-label">Thoughtfully made in Korea</p>
          <h2>가까이에서 만들고,<br />세심하게 확인합니다.</h2>
          <p>오브제두는 국내 생산을 바탕으로 형태와 무게, 유약의 색감, 뚜껑의 사용성을 차근차근 다듬습니다. 보기 좋은 첫인상만큼 매일 믿고 사용할 수 있는 기준을 중요하게 생각합니다.</p>
          <div className="making-values">
            <div><span>01</span><strong>국내 생산</strong><p>만드는 과정과 품질을 가까이에서 살핍니다.</p></div>
            <div><span>02</span><strong>사용 검증</strong><p>확인된 조건만 정확하고 구체적으로 안내합니다.</p></div>
          </div>
        </div>
        <figure className="making-visual">
          <Image src="/product/collection-storage-detail.png" alt="오브제두 볼과 냉장 보관용 뚜껑의 디테일" fill sizes="(max-width: 760px) 100vw, 47vw" className="cover-image" />
          <figcaption><span>Prototype note</span>최종 제품의 형태와 사용 범위는 테스트 후 확정됩니다.</figcaption>
        </figure>
      </section>

      <section className="gift-section">
        <figure className="gift-visual">
          <Image src="/product/collection-lifestyle-table.png" alt="파스텔 세라믹 볼로 차린 따뜻한 식탁" fill sizes="(max-width: 760px) 100vw, 58vw" className="cover-image" />
        </figure>
        <div className="gift-copy">
          <div className="section-index"><span>06</span><span>A gentle gift</span></div>
          <p className="serif-label">A small joy, shared</p>
          <h2>부드러운 하루를<br />선물하세요.</h2>
          <p>새로운 집에서 시작하는 친구에게, 고마운 마음을 전하고 싶은 사람에게, 그리고 오늘의 나에게. 자주 쓰이는 물건에 오래 남을 마음을 담아보세요.</p>
          <a className="text-button dark-button" href="https://www.instagram.com/objetdoux/" target="_blank" rel="noreferrer">출시 소식 받아보기 <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="closing-section">
        <p className="serif-label">Objetdoux</p>
        <h2>des objets doux,<br />des jours heureux</h2>
        <p>부드러운 오브제와 함께, 조금 더 기분 좋은 매일.</p>
      </section>

      <footer className="site-footer">
        <div className="footer-top"><a className="footer-wordmark" href="#top">objetdoux</a><p>매일 쓰고 싶은,<br />부드러운 오브제.</p></div>
        <div className="footer-bottom">
          <p>Objetdoux · 오브제두</p>
          <div><a href="mailto:hello@objetdoux.com">Email</a><a href="https://www.instagram.com/objetdoux/" target="_blank" rel="noreferrer">Instagram</a></div>
          <p>© 2026 Objetdoux. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
