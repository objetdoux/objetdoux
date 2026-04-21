## Objet Doux

`Objet Doux` 브랜드 홈페이지를 위한 `Next.js` 프로젝트입니다.
Vercel 배포를 기준으로 `App Router`, `TypeScript`, `Tailwind CSS` 조합으로 구성했습니다.

## Local Development

개발 서버 실행:

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 됩니다.

주요 시작 파일:

- `src/app/page.tsx`: 메인 랜딩 페이지
- `src/app/layout.tsx`: 기본 메타데이터 및 공통 레이아웃
- `src/app/globals.css`: 전역 스타일

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Deploy

이 프로젝트는 Vercel에 바로 연결해서 배포할 수 있습니다.

1. Git 저장소를 Vercel에 연결합니다.
2. Framework Preset은 `Next.js`를 사용합니다.
3. 기본 설정 그대로 배포하면 됩니다.

## Next Step Ideas

- 실제 브랜드명과 슬로건 반영
- 제품 컬렉션 섹션 추가
- 룩북 또는 저널 페이지 확장
- 문의 폼과 뉴스레터 연결
