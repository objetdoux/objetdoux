import Image from "next/image";
import Link from "next/link";

const features = [
  {
    number: "01",
    title: "전자레인지 사용",
    description: "냉장고에서 꺼낸 음식을 다른 그릇에 옮기지 않고 간편하게 데워요.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="5" y="9" width="38" height="30" rx="3" />
        <rect x="10" y="14" width="24" height="20" rx="1" />
        <path d="M38.5 16.5h.01M38.5 22.5h.01M38.5 28.5h.01" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "식기세척기 사용",
    description: "매일 쓰는 그릇인 만큼, 식사 후의 정리까지 가볍게 만들었어요.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="8" y="5" width="32" height="38" rx="3" />
        <path d="M8 14h32M15 10h.01M20 10h.01M14 23c3 6 17 6 20 0M17 33h14" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "뚜껑으로 바로 보관",
    description: "남은 음식은 반투명 실리콘 뚜껑을 덮어 깔끔하게 냉장 보관해요.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 17h32M11 17l3 24h20l3-24M15 12h18l4 5H11l4-5Z" />
        <path d="M18 27h12" />
      </svg>
    ),
  },
];

const colors = [
  ["오트 아이보리", "#ded6c6"],
  ["소프트 세이지", "#adb09a"],
  ["미스트 스카이", "#aebfc2"],
  ["더스티 핑크", "#d7aaa1"],
  ["피치 베이지", "#d8ad84"],
  ["라일락 그레이", "#b4a9ad"],
];

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero" id="product">
        <Image
          src="/product/bowl-lifestyle.png"
          alt="파스텔 세라믹 볼과 반투명 뚜껑이 놓인 오브제두의 식탁"
          fill
          loading="eager"
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">OBJETDOUX · FIRST COLLECTION</p>
          <h1>
            담는 순간부터,
            <br />
            남은 순간까지.
          </h1>
          <p className="hero-copy">
            식탁에서는 다정한 그릇으로,
            <br />
            식사가 끝나면 그대로 덮어 보관하세요.
          </p>
          <Link href="#story" className="round-link">
            제품 이야기
            <span aria-hidden="true">↘</span>
          </Link>
        </div>
        <p className="hero-note">CERAMIC BOWL WITH SILICONE LID</p>
      </section>

      <section className="intro section-shell" id="story">
        <p className="eyebrow">A BOWL FOR THE WHOLE DAY</p>
        <div className="intro-grid">
          <h2>
            그릇과 보관 용기 사이,
            <br />
            일상을 위한 새로운 그릇.
          </h2>
          <div className="intro-copy">
            <p>
              예쁜 그릇에 담아 먹고도 남은 음식을 보관 용기로 옮겨 담던 번거로움.
              오브제두는 그 짧은 순간을 다정하게 바꾸고 싶었습니다.
            </p>
            <p>
              깊이 있는 세라믹 볼에 꼭 맞는 뚜껑을 더해, 한 끼의 처음부터 다음
              순간까지 자연스럽게 이어집니다.
            </p>
          </div>
        </div>
      </section>

      <section className="transition-story section-shell" aria-label="사용 흐름">
        <div className="story-card story-card-table">
          <div className="story-image-wrap">
            <Image
              src="/product/bowl-lifestyle.png"
              alt="샐러드를 담은 오브제두 세라믹 볼"
              fill
              sizes="(min-width: 900px) 50vw, 100vw"
              className="story-image table-crop"
            />
          </div>
          <div className="story-caption">
            <span>01</span>
            <div>
              <h3>예쁘게 담아 먹고</h3>
              <p>부드러운 곡선과 잔잔한 색감이 평범한 한 끼를 정돈해 줍니다.</p>
            </div>
          </div>
        </div>

        <div className="story-arrow" aria-hidden="true">→</div>

        <div className="story-card story-card-fridge">
          <div className="story-image-wrap">
            <Image
              src="/product/bowl-concept-board.png"
              alt="반투명 실리콘 뚜껑을 결합한 세라믹 볼"
              fill
              sizes="(min-width: 900px) 50vw, 100vw"
              className="story-image lid-crop"
            />
          </div>
          <div className="story-caption">
            <span>02</span>
            <div>
              <h3>그대로 덮어 보관하고</h3>
              <p>남은 음식은 옮겨 담지 않고, 뚜껑만 덮어 냉장고로 옮겨요.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section" id="features">
        <div className="section-shell">
          <div className="section-heading light-heading">
            <p className="eyebrow">MADE FOR EVERYDAY</p>
            <h2>매일 쓰기 편하도록.</h2>
            <p>보기 좋은 것과 쓰기 좋은 것 사이에서, 어느 하나도 놓치지 않았어요.</p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.number} className="feature-card">
                <div className="feature-top">
                  <span>{feature.number}</span>
                  <div className="feature-icon">{feature.icon}</div>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
          <p className="feature-disclaimer">* 세부 사용 범위와 취급 방법은 최종 제품 사양에 따라 안내될 예정입니다.</p>
        </div>
      </section>

      <section className="color-section section-shell" id="colors">
        <div className="section-heading color-heading">
          <div>
            <p className="eyebrow">SOFT COLOR PALETTE</p>
            <h2>당신의 식탁에 어울리는 색.</h2>
          </div>
          <p>
            음식이 가장 먼저 보이도록 채도를 낮춘 여섯 가지 색을 준비하고 있어요.
            어느 색을 함께 놓아도 자연스럽습니다.
          </p>
        </div>
        <div className="color-visual">
          <Image
            src="/product/bowl-colors.png"
            alt="오트 아이보리, 소프트 세이지, 미스트 스카이 블루, 더스티 핑크, 피치 베이지, 라일락 그레이 컬러 볼"
            fill
            sizes="(min-width: 1200px) 1200px, 100vw"
            className="color-image"
          />
        </div>
        <div className="swatch-grid">
          {colors.map(([name, color]) => (
            <div key={name} className="swatch-item">
              <span className="swatch" style={{ backgroundColor: color }} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <div className="detail-visual">
          <Image
            src="/product/bowl-concept-board.png"
            alt="오브제두 파스텔 세라믹 샐러드 볼 제품 콘셉트"
            fill
            sizes="(min-width: 900px) 54vw, 100vw"
            className="detail-image"
          />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">OBJECT 001</p>
          <h2>파스텔 세라믹 볼</h2>
          <p className="detail-lead">깊이 있는 형태와 부드러운 곡선, 반투명 실리콘 뚜껑까지.</p>
          <dl>
            <div><dt>소재</dt><dd>세라믹 · 실리콘 리드</dd></div>
            <div><dt>용량</dt><dd>약 1,300 ml</dd></div>
            <div><dt>크기</dt><dd>약 Ø 19 × H 8 cm</dd></div>
            <div><dt>용도</dt><dd>샐러드 · 과일 · 면 · 보관</dd></div>
          </dl>
          <p className="detail-note">* 이미지는 제품 개발 단계의 콘셉트 이미지이며, 실제 제품의 색상과 사양은 달라질 수 있습니다.</p>
        </div>
      </section>

      <section className="closing section-shell">
        <p className="eyebrow">COMING SOON</p>
        <h2>
          한 번 더 옮겨 담지 않아도,
          <br />
          충분히 아름다운 일상.
        </h2>
        <p>오브제두의 첫 번째 그릇을 준비하고 있습니다.</p>
        <div className="closing-actions">
          <a href="https://www.instagram.com/objetdoux/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noreferrer" className="primary-button">
            인스타그램에서 소식 받기 <span aria-hidden="true">↗</span>
          </a>
          <Link href="/stores" className="text-link">판매 채널 보기 <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
