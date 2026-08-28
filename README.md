# Objetdoux

오브제두 공식 홈페이지를 새로 구축하기 위한 초기 프로젝트입니다.

기존 화면, 페이지, 이미지 자산은 제거했으며 현재는 브랜드명만 표시하는 최소
시작 화면입니다. Supabase 연결 모듈과 환경 설정, 데이터베이스 스키마는
그대로 유지되어 있습니다.

## Start

```bash
npm install
npm run dev
```

로컬 주소는 [http://localhost:3000](http://localhost:3000)입니다.

## Preserved backend files

- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/admin.ts`
- `.env.example`
- `supabase/schema.sql`
- `DATABASE_PLAN.md`
- `ADMIN_PLAN.md`

## Design direction

새 홈페이지의 브랜드 및 디자인 기준은 `PROJECT_PLAN.md`에 정리되어 있습니다.
