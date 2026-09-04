const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M14 7l5 5-5 5" /></svg>
);

const BagIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5h11l1 11h-13l1-11Z" /><path d="M9 10V7a3 3 0 0 1 6 0v3" /></svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12M6 12h12M6 16h8" /></svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="5.5" /><path d="m15.5 15.5 3.5 3.5" /></svg>
);

const palette = [
  ["Milk White", "#F4EEE4"], ["Oat Ivory", "#E9DDCB"], ["Butter Cream", "#F0DDA8"], ["Vanilla Mist", "#F1D9A7"],
  ["Apricot Veil", "#EDC29F"], ["Blush Peach", "#E8B39D"], ["Petal Pink", "#E8D1C9"], ["Dusty Rose", "#D9AEAA"],
  ["Coral Milk", "#E4A69A"], ["Mauve Clay", "#C8AEAF"], ["Lilac Mist", "#CBC1CF"], ["Lilac Gray", "#C8C1CE"],
  ["Mint Milk", "#DCE4D7"], ["Soft Sage", "#C5C9AA"], ["Celadon Cream", "#D7DAB5"], ["Moss Beige", "#C0BEAA"],
  ["Sage Green", "#BAC7B1"], ["Fog Mint", "#D6DED5"], ["Powder Blue", "#C6D9E0"], ["Mist Sky", "#CAD3DB"],
  ["Periwinkle", "#BCC4D7"], ["Pebble Gray", "#D3CEC7"], ["Sand Beige", "#D4C1AF"], ["Cocoa Blush", "#C8AA99"],
];

export default function Home() {
  return (
    <main className="home" id="top">
      <section className="soft-stage" aria-labelledby="hero-title">
        <div className="soft-shell">
          <header className="soft-header">
            <a className="round-button menu-button" href="#story" aria-label="브랜드 이야기로 이동"><MenuIcon /></a>
            <a className="wordmark" href="#top" aria-label="오브제두 홈">objetdoux</a>
            <nav className="site-nav" aria-label="주요 메뉴">
              <a href="#object">Object 001</a><a href="#colors">24 Colors</a><a href="#story">Our story</a>
            </nav>
            <div className="header-search" aria-hidden="true"><SearchIcon /><span>Search objects</span></div>
            <a className="round-button bag-button" href="#object" aria-label="제품 보기"><BagIcon /><span>1</span></a>
          </header>

          <div className="hero-dashboard" id="object">
            <aside className="hero-side">
              <article className="intro-card soft-card">
                <span className="eyebrow">Objetdoux · Soft utility</span>
                <h2>부드러운 쓰임을<br />만드는 오브제.</h2>
                <p>한국의 일상에 자연스럽게 어울리는 형태와 색을 고민합니다.</p>
                <div className="mini-palette" aria-label="오브제두 컬러 팔레트"><span className="sage" /><span className="butter" /><span className="blue" /><span className="peach" /></div>
              </article>

              <article className="utility-card soft-card">
                <div className="lid-miniature" aria-hidden="true"><span /></div>
                <div>
                  <span className="eyebrow">One bowl, four moments</span>
                  <h3>담고, 즐기고,<br />그대로 보관하세요.</h3>
                  <a href="#colors">컬러 보기 <ArrowIcon /></a>
                </div>
              </article>
            </aside>

            <article className="product-card soft-card">
              <div className="product-copy">
                <span className="eyebrow">Object 001 · Daily bowl</span>
                <h1 id="hero-title">식탁에서<br />냉장고까지.</h1>
                <p>가벼운 도자기 볼과<br />냉장 보관용 전용 뚜껑</p>
                <a className="product-link" href="#colors">24가지 컬러 보기 <ArrowIcon /></a>
              </div>
              <div className="product-visual" role="img" aria-label="세이지, 버터, 블러시 색상의 데일리 볼과 전용 뚜껑">
                <span className="glow glow-one" aria-hidden="true" /><span className="glow glow-two" aria-hidden="true" />
                <div className="floating-lid" aria-hidden="true"><span /></div>
                <div className="ceramic-bowl bowl-peach" aria-hidden="true"><span /></div>
                <div className="ceramic-bowl bowl-butter" aria-hidden="true"><span /></div>
                <div className="ceramic-bowl bowl-sage" aria-hidden="true"><span /></div>
              </div>
              <div className="product-meta">
                <span>Made in Korea</span>
                <div className="pager" aria-label="제품 이미지 1번"><button type="button" aria-label="이전 이미지">←</button><span>01 / 04</span><button type="button" aria-label="다음 이미지">→</button></div>
              </div>
            </article>
          </div>
        </div>
        <p className="stage-caption">des objets doux, des jours heureux</p>
      </section>

      <section className="color-section" id="colors">
        <div className="palette-heading">
          <div><span className="eyebrow">Objetdoux color archive · 01—24</span><h2>Choose your<br />soft mood.</h2></div>
          <div className="palette-intro"><p>그날의 음식과 기분에 따라 고르는<br />24가지 저채도 세라믹 컬러.</p><span>Move your cursor over the colors</span></div>
        </div>
        <ol className="palette-grid" aria-label="오브제두 24색 컬러 팔레트">
          {palette.map(([name, hex], index) => (
            <li key={name} style={{ "--swatch": hex, "--index": index } as CSSProperties}>
              <button type="button" aria-label={`${index + 1}번 ${name} ${hex}`}>
                <span className="swatch-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="ceramic-swatch" aria-hidden="true"><i /></span>
                <span className="swatch-name">{name}</span>
                <span className="swatch-hex">{hex}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="palette-footer"><span>24 quiet colors</span><p>Color your everyday object.</p><a href="#top">Back to Object 001 <ArrowIcon /></a></div>
      </section>

      <section className="closing-section" id="story">
        <span className="closing-index">Objetdoux · Seoul</span>
        <h2>매일 쓰고 싶은,<br />부드러운 오브제.</h2>
        <p>보기 좋은 물건에서 자주 쓰이는 물건으로.</p>
        <a href="https://www.instagram.com/objetdoux/" target="_blank" rel="noreferrer">Instagram에서 소식 받기 <ArrowIcon /></a>
        <div className="closing-wordmark">objetdoux</div>
      </section>
    </main>
  );
}
import type { CSSProperties } from "react";
