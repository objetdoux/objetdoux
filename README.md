# Objetdoux

오브제두 공식 홈페이지 프로젝트입니다. `Soft Utility — 부드러운 실용성`을
기준으로 브랜드와 첫 번째 데일리 볼을 소개하는 모바일 우선 에디토리얼
홈페이지로 구성되어 있습니다.

## Start

```bash
npm install
npm run dev
```

로컬 주소는 [http://localhost:3000](http://localhost:3000)입니다.

## Main files

- `src/app/page.tsx`: 홈페이지 콘텐츠와 정보 구조
- `src/app/globals.css`: 디자인 토큰과 반응형 스타일
- `src/app/layout.tsx`: 메타데이터와 루트 레이아웃
- `src/lib/supabase`: 유지 중인 Supabase 연결 모듈
- `PROJECT_PLAN.md`: 브랜드 및 홈페이지 디자인 가이드

## Verification

```bash
npm run lint
npm run build
```

현재 홈페이지는 정적 페이지로 빌드되며, 향후 제품 데이터나 알림 신청 기능을
Supabase와 연결할 수 있습니다.
