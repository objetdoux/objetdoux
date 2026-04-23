-- 관리자 계정 등록 예시
-- 1. Supabase Dashboard > Authentication > Users 에서 관리자 이메일 계정을 먼저 생성합니다.
-- 2. 아래 email/name을 실제 관리자 정보로 바꿔 SQL Editor에서 실행합니다.

insert into public.admin_users (email, name, role, is_active)
values ('admin@objetdoux.com', '오브제두 관리자', 'admin', true)
on conflict (email)
do update set
  name = excluded.name,
  role = excluded.role,
  is_active = excluded.is_active,
  updated_at = now();
