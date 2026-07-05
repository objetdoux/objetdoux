import Image from "next/image";
import Link from "next/link";

const colors = [
  ["오트 아이보리", "Oat Ivory", "#ded6c6"],
  ["소프트 세이지", "Soft Sage", "#adb09a"],
  ["미스트 스카이", "Mist Sky", "#aebfc2"],
  ["더스티 핑크", "Dusty Pink", "#d7aaa1"],
  ["피치 베이지", "Peach Beige", "#d8ad84"],
  ["라일락 그레이", "Lilac Gray", "#b4a9ad"],
];

const goals = [
  {
    number: "01",
    title: "간편한 데우기",
    description: "전자레인지 사용을 고려해 도자기 소재와 유약 사양을 검토하고 있습니다.",
  },
  {
    number: "02",
    title: "편리한 세척",
    description: "매일 부담 없이 쓸 수 있도록 식기세척기 사용을 목표로 테스트할 예정입니다.",
  },
  {
    number: "03",
    title: "그대로 보관하기",
    description: "남은 음식은 다른 용기에 옮기지 않고 반투명 뚜껑을 덮어 보관합니다.",
  },
];

export default function CollectionPage() {
  return (
    <main className="collection-v2">
      <section className="collection-masthead">
        <p className="collection-label">OBJETDOUX · THE FIRST COLLECTION</p>
        <h1>Pastel Ceramic Bowl</h1>
        <p className="collection-subtitle">파스텔 세라믹 볼과 실리콘 리드</p>
      </section>

      <figure className="collection-wide-image collection-hero-photo">
        <Image
          src="/product/collection-lifestyle-primary.png"
          alt="샐러드를 담은 세이지 볼과 뚜껑을 덮은 아이보리 볼이 놓인 식탁"
          width={1672}
          height={941}
          loading="eager"
          sizes="100vw"
        />
      </figure>

      <section className="collection-statement">
        <p className="collection-label">A BOWL FOR THE WHOLE DAY</p>
        <h2>
          그릇과 보관 용기 사이,
          <br />
          일상을 위한 새로운 그릇.
        </h2>
        <div className="collection-statement-copy">
          <p>
            예쁜 그릇에 담아 먹고, 남은 음식은 다시 보관 용기로 옮겨 담던 일상.
            오브제두는 그 짧은 번거로움을 하나의 그릇으로 이어보고 싶었습니다.
          </p>
          <p>
            깊이 있는 세라믹 볼과 꼭 맞는 반투명 리드가 한 끼의 처음부터 다음
            순간까지 자연스럽게 함께합니다.
          </p>
        </div>
      </section>

      <section className="collection-use-flow">
        <div className="collection-use-copy">
          <p className="collection-step">01 · SERVE</p>
          <h2>예쁘게 담아 먹고</h2>
          <p>
            부드러운 곡선과 잔잔한 색감이 샐러드부터 면 요리, 과일까지
            평범한 한 끼를 정돈해 줍니다.
          </p>
          <div className="collection-use-divider" />
          <p className="collection-step">02 · KEEP</p>
          <h2>남으면 그대로 덮고</h2>
          <p>
            식사가 끝나면 다른 용기를 찾지 않아도 괜찮아요. 뚜껑을 덮어
            냉장고로 옮기면 됩니다.
          </p>
        </div>
        <figure className="collection-detail-photo">
          <Image
            src="/product/collection-storage-detail.png"
            alt="뚜껑을 옆에 둔 세이지 세라믹 볼과 적층된 보관 볼"
            width={1448}
            height={1086}
            sizes="(min-width: 900px) 56vw, 100vw"
          />
        </figure>
      </section>

      <section className="collection-goals">
        <div className="collection-goals-heading">
          <p className="collection-label">DEVELOPMENT GOALS</p>
          <h2>매일 쓰기 편하도록.</h2>
          <p>
            아래 내용은 현재 개발 목표입니다. 실제 사용 범위는 최종 샘플 테스트 후 확정해 안내드립니다.
          </p>
        </div>
        <div className="collection-goal-grid">
          {goals.map((goal) => (
            <article key={goal.number}>
              <span>{goal.number}</span>
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="collection-colors" id="colors">
        <div className="collection-section-heading">
          <div>
            <p className="collection-label">SOFT COLOR PALETTE</p>
            <h2>당신의 식탁에 어울리는 색.</h2>
          </div>
          <p>
            음식이 가장 먼저 보이도록 채도를 낮춘 여섯 가지 색을 준비하고 있습니다.
          </p>
        </div>
        <figure className="collection-wide-image">
          <Image
            src="/product/collection-color-lineup.png"
            alt="여섯 가지 파스텔 컬러 세라믹 볼 라인업"
            width={1672}
            height={941}
            sizes="100vw"
          />
        </figure>
        <div className="collection-swatches">
          {colors.map(([name, english, color]) => (
            <div key={english}>
              <span style={{ backgroundColor: color }} />
              <p>{name}</p>
              <small>{english}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="collection-lifestyle">
        <figure className="collection-wide-image">
          <Image
            src="/product/collection-lifestyle-table.png"
            alt="파스텔 세라믹 볼을 활용한 밝은 일상의 식탁"
            width={1672}
            height={941}
            sizes="100vw"
          />
        </figure>
        <div className="collection-lifestyle-copy">
          <p className="collection-label">OBJECT 001</p>
          <h2>담는 순간부터,<br />남은 순간까지.</h2>
          <dl>
            <div><dt>구성</dt><dd>세라믹 볼 · 실리콘 리드</dd></div>
            <div><dt>용량</dt><dd>약 1,300 ml</dd></div>
            <div><dt>크기</dt><dd>약 Ø 19 × H 8 cm</dd></div>
          </dl>
          <p className="collection-spec-note">
            * 현재 개발 단계의 예상 사양으로, 최종 제품은 달라질 수 있습니다.
          </p>
        </div>
      </section>

      <section className="collection-closing">
        <p className="collection-label">COMING SOON</p>
        <h2>오브제두의 첫 번째 그릇을<br />준비하고 있습니다.</h2>
        <div>
          <Link href="/shop" className="collection-primary-link">컬러 보러 가기 <span aria-hidden="true">→</span></Link>
          <a href="https://www.instagram.com/objetdoux/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noreferrer" className="collection-secondary-link">제작 과정 보기 <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}
