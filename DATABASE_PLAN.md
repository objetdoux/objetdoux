# objetdoux Database Design Plan

## 1. 설계 목적

이 문서는 오브제두 쇼핑몰을 실제 DB/CMS와 연결하기 전, 데이터 구조와 저장 원칙을 정리하기 위한 설계 문서입니다.

현재 화면 목업은 정적 데이터로 구성되어 있지만, 실제 구축 시에는 아래 데이터를 DB에 저장하고 사용자 화면과 관리자 화면에서 함께 사용합니다.

- 상품
- 상품 이미지
- 회원
- 배송지
- 장바구니
- 주문
- 주문 상품
- 관심 상품
- 관리자 계정
- 기본 설정

## 2. 기본 결정 사항

- 상품 데이터는 DB/CMS 기반으로 관리합니다.
- 관리자는 별도 로그인 후 `/admin` 페이지에 접근합니다.
- 일반 회원은 Supabase Auth 기반 일반 이메일/비밀번호 로그인, 네이버 로그인, 카카오 로그인을 지원할 예정입니다.
- 비회원 주문은 받지 않습니다.
- 결제 방식은 마지막에 결정합니다.
- 주문 시점의 상품명, 가격, 수량은 주문 상품 테이블에 스냅샷으로 저장합니다.

## 3. 추천 테이블 목록

초기 MVP 기준 추천 테이블은 다음과 같습니다.

- `users`
- `admin_users`
- `products`
- `product_images`
- `addresses`
- `carts`
- `cart_items`
- `orders`
- `order_items`
- `wishlist_items`
- `site_settings`

추후 확장 시 고려할 테이블은 다음과 같습니다.

- `categories`
- `reviews`
- `coupons`
- `payments`
- `refunds`
- `order_status_histories`
- `banners`
- `content_posts`

## 4. users

회원 정보를 저장합니다. 비회원 주문은 받지 않기 때문에 모든 주문은 `users`와 연결됩니다.

```text
users
- id
- auth_user_id
- email
- password_hash
- name
- phone
- provider
- provider_id
- is_active
- created_at
- updated_at
```

### 필드 설명

- `email`: 일반 로그인 ID로 사용합니다.
- `auth_user_id`: Supabase Auth의 사용자 ID와 연결합니다.
- `password_hash`: 자체 인증 전환 가능성을 위한 예비 필드입니다. 현재 일반 로그인 비밀번호는 Supabase Auth가 관리합니다.
- `provider`: `email`, `naver`, `kakao` 중 하나입니다.
- `provider_id`: 네이버/카카오 로그인 시 외부 provider의 고유 ID입니다.
- `is_active`: 탈퇴/정지 상태를 구분하기 위한 값입니다.

### 정책

- 같은 이메일로 중복 가입을 막을지, 소셜 계정 연결을 허용할지는 실제 인증 설계 때 결정합니다.
- 비밀번호 원문은 절대 저장하지 않습니다.
- 현재 구현은 `/signup`에서 Supabase Auth 계정을 생성하고, `users` 테이블에는 이름/이메일/연락처 등 프로필 정보를 저장합니다.
- 현재 구현은 `/login`에서 Supabase Auth 세션을 생성하고, 헤더 로그인 상태 표시와 `/mypage` 이동까지 연결되어 있습니다.
- 현재 구현은 `/mypage`, `/mypage/profile`에서 로그인한 사용자의 `auth_user_id` 기준으로 `users` 프로필을 조회합니다.
- 현재 구현은 `/mypage/addresses` 계열에서 로그인한 사용자의 `addresses` 목록 조회, 추가, 수정, 삭제, 기본 배송지 설정까지 연결되어 있습니다.
- 현재 구현은 `/checkout`에서 로그인 회원의 `users` 프로필과 기본 `addresses` 정보를 주문자/배송 정보 기본값으로 불러옵니다.
- 현재 구현은 상품 상세의 장바구니 담기, `/cart` 상품 조회, 수량 변경, 삭제, `/checkout` 주문 상품 표시를 Supabase `carts`, `cart_items` 기준으로 연결합니다.
- 현재 구현은 SHOP 목록, 상품 상세, `/mypage/wishlist`의 좋아요 추가/취소와 목록 조회를 Supabase `wishlist_items` 기준으로 연결합니다.
- 현재 구현은 `/checkout` 결제하기 시 장바구니 기준으로 `orders`, `order_items`를 생성하고, 주문 생성 후 `cart_items`를 비웁니다.
- 현재 구현은 `/order-complete?orderNumber=...`에서 로그인 회원의 주문번호 기준으로 주문 완료 정보를 조회합니다.
- 현재 구현은 `/mypage`, `/mypage/orders`, `/mypage/orders/[orderNumber]`에서 로그인 회원 기준 `orders`, `order_items`를 조회합니다.

## 5. admin_users

관리자 계정을 저장합니다.

```text
admin_users
- id
- email
- password_hash
- name
- role
- is_active
- last_login_at
- created_at
- updated_at
```

### 필드 설명

- `role`: 초기에는 `admin` 하나만 사용합니다.
- `is_active`: 관리자 계정 비활성화에 사용합니다.
- `last_login_at`: 마지막 로그인 시간입니다.

### 정책

- 현재 구현은 Supabase Auth 이메일/비밀번호 로그인 후 `admin_users`에 등록된 활성 이메일인지 확인합니다.
- `supabase/admin-user.example.sql`은 관리자 이메일 allowlist 등록 예시입니다.
- `AdminShell`은 서버에서 관리자 권한을 확인하고, 권한이 없으면 `/admin/login`으로 이동합니다.
- 관리자 로그인은 일반 회원 로그인과 분리합니다.
- 현재 구현은 `/admin/members`에서 `users` 회원 목록과 `orders` 기반 주문 수, 최근 주문일, 누적 주문 금액을 조회합니다. 회원 이름, 이메일, 연락처 검색과 최근 가입순/주문 많은순/구매 금액순/최근 주문순 정렬을 지원합니다.

## 6. products

상품의 기본 정보를 저장합니다.

```text
products
- id
- slug
- name
- category
- price
- summary
- description
- material
- size
- track_stock
- stock_quantity
- is_visible
- is_sold_out
- is_new
- sort_order
- created_at
- updated_at
```

### 필드 설명

- `slug`: `/shop/[slug]`와 관리자 상품 수정 경로에 사용합니다.
- `category`: 초기에는 문자열로 관리합니다. 예: `Plate`, `Cup`, `Bowl`, `Tea Ware`, `Object`
- `price`: 판매가입니다.
- `summary`: 상품 상세 상단 요약입니다.
- `description`: 상품 목록 카드에 보일 짧은 설명입니다.
- `track_stock`: 재고 수량을 실제 주문과 연결해 관리할지 여부입니다.
- `stock_quantity`: 현재 판매 가능한 재고 수량입니다.
- `is_visible`: SHOP에 노출할지 여부입니다.
- `is_sold_out`: 품절 표시 여부입니다.
- `is_new`: 메인 NEW ITEMS 노출 여부입니다.
- `sort_order`: 관리자 지정 노출 순서입니다.

### 정책

- 상품 삭제는 실제 삭제보다 `is_visible = false` 또는 별도 `deleted_at` 방식이 안전합니다.
- 주문된 상품은 삭제해도 과거 주문 내역이 깨지지 않아야 합니다.
- `track_stock = true`인 상품은 장바구니 담기, 수량 변경, 주문 생성 시 `stock_quantity`를 확인합니다.
- 주문 생성 후에는 DB 함수 `decrement_product_stock`으로 재고 행을 잠근 뒤 주문 수량만큼 `stock_quantity`를 차감하고, 0개가 되면 `is_sold_out = true`로 자동 전환합니다.

## 7. product_images

상품 이미지를 저장합니다.

```text
product_images
- id
- product_id
- image_type
- image_url
- alt_text
- sort_order
- created_at
```

### image_type 예시

- `thumbnail`
  대표 이미지
- `gallery`
  상세 상단 추가 이미지
- `detail`
  상세페이지 긴 이미지

### 정책

- 실제 파일은 DB가 아니라 이미지 저장소에 저장하고, DB에는 URL을 저장합니다.
- 초기에는 대표 이미지 1장, 추가 이미지 여러 장, 상세페이지 긴 이미지 1장을 기준으로 설계합니다.
- 현재 화면에서는 실제 이미지 대신 연한 회색 플레이스홀더를 사용합니다.

## 8. addresses

회원 배송지를 저장합니다.

```text
addresses
- id
- user_id
- recipient_name
- phone
- zone_code
- address
- detail_address
- delivery_memo
- is_default
- created_at
- updated_at
```

### 정책

- 회원당 기본 배송지는 1개만 허용합니다.
- 새 기본 배송지를 설정하면 기존 기본 배송지는 해제합니다.
- 주문 시에는 배송지 정보를 `orders`에도 스냅샷으로 저장합니다.

## 9. carts

회원의 장바구니 본체를 저장합니다.

```text
carts
- id
- user_id
- created_at
- updated_at
```

### 정책

- 회원 1명당 활성 장바구니 1개를 기본으로 합니다.
- 비회원 주문을 받지 않기 때문에 비회원 장바구니는 1차에서 제외합니다.

## 10. cart_items

장바구니에 담긴 상품을 저장합니다.

```text
cart_items
- id
- cart_id
- product_id
- quantity
- created_at
- updated_at
```

### 정책

- 같은 상품을 다시 담으면 새 row를 만들기보다 `quantity`를 증가시킵니다.
- 품절 또는 비노출 상품은 주문 단계에서 다시 검증합니다.

## 11. orders

주문 본체 정보를 저장합니다.

```text
orders
- id
- order_number
- user_id
- order_status
- payment_status
- payment_method
- subtotal
- shipping_fee
- total
- recipient_name
- recipient_phone
- zone_code
- recipient_address
- recipient_detail_address
- delivery_memo
- admin_memo
- created_at
- updated_at
```

### order_status 추천

- `payment_pending`
- `paid`
- `preparing`
- `shipping`
- `delivered`
- `cancelled`

### payment_status 추천

- `pending`
- `paid`
- `failed`
- `cancelled`
- `refunded`

### 정책

- 결제 방식은 추후 결정하되, 주문 테이블은 결제 상태를 받을 수 있게 미리 분리합니다.
- 배송지 정보는 주문 시점 스냅샷으로 저장합니다.
- 관리자 주문 상세에서 주문 상태, 운송장 번호, 관리자 메모를 관리할 수 있게 확장합니다.

## 12. order_items

주문 당시 상품 정보를 저장합니다.

```text
order_items
- id
- order_id
- product_id
- product_slug
- product_name
- product_category
- product_price
- quantity
- line_total
- product_image_url
- created_at
```

### 정책

- 주문 상품은 반드시 스냅샷으로 저장합니다.
- 상품명이나 가격이 나중에 바뀌어도 과거 주문 내역은 당시 정보가 유지되어야 합니다.
- `product_id`는 원상품 참조용이고, 화면 표시에는 스냅샷 필드를 우선 사용합니다.

## 13. wishlist_items

관심 상품을 저장합니다.

```text
wishlist_items
- id
- user_id
- product_id
- created_at
```

### 정책

- `user_id + product_id` 조합은 중복되지 않게 합니다.
- SHOP 목록, 상품 상세, 마이페이지 관심 상품에서 같은 데이터를 사용합니다.
- 관심 상품 페이지에서 하트를 누르면 해당 row를 삭제하는 방식으로 처리합니다.

## 14. site_settings

회사 정보와 배송 기본 설정을 저장합니다.

```text
site_settings
- id
- key
- value
- created_at
- updated_at
```

### key 예시

- `company_name`
- `ceo_name`
- `business_address`
- `cs_email`
- `cs_phone`
- `shipping_fee`
- `free_shipping_minimum`
- `shipping_notice`
- `return_notice`
- `home_hero_title`
- `home_hero_subtitle`
- `home_hero_image_url`
- `home_event_primary_title`
- `home_event_primary_description`
- `home_event_primary_image_url`
- `home_event_secondary_title`
- `home_event_secondary_description`
- `home_event_secondary_image_url`

### 정책

- 초기에는 관리자 설정 화면에 보이는 값만 저장합니다.
- 값 구조가 복잡해지면 `value`를 JSON 형태로 저장할 수 있습니다.
- 현재 구현은 `/admin/settings`에서 메인 배너, 이벤트 문구/이미지, 회사 정보, 배송비, 무료 배송 기준, 기본 배송 안내를 key/value 형태로 조회하고 저장합니다.

## 15. 주요 관계

```text
users 1:N addresses
users 1:1 carts
carts 1:N cart_items
products 1:N product_images
products 1:N cart_items
users 1:N orders
orders 1:N order_items
users 1:N wishlist_items
products 1:N wishlist_items
```

## 16. 사용자 화면 데이터 흐름

### SHOP

1. `products`에서 `is_visible = true` 상품 조회
2. 카테고리, 검색어, 정렬 조건 적용
3. 대표 이미지는 `product_images.image_type = thumbnail`에서 조회
4. 로그인 사용자의 관심 여부는 `wishlist_items`로 확인

### 상품 상세

1. `products.slug`로 상품 조회
2. `product_images`에서 대표, 추가, 상세페이지 긴 이미지 조회
3. 관련 상품은 같은 카테고리 상품에서 조회
4. 장바구니 담기 시 `cart_items`에 저장
5. 좋아요 클릭 시 `wishlist_items` 생성/삭제

### 장바구니

1. 로그인 사용자 기준 `carts` 조회
2. `cart_items`와 `products`를 함께 조회
3. 품절/비노출/재고 부족 여부 재검증
4. 주문서로 이동

### 주문 생성

1. 장바구니 상품 검증
2. 배송지 정보 확인
3. 결제 진행
4. `orders` 생성
5. `order_items`에 주문 상품 스냅샷 저장
6. 재고 관리 상품은 `decrement_product_stock` DB 함수로 주문 수량만큼 `products.stock_quantity` 차감
7. 재고가 0개가 된 상품은 `is_sold_out = true` 처리
8. 장바구니 비우기

## 17. 관리자 화면 데이터 흐름

### 상품 등록

1. 관리자 로그인 확인
2. `products` 생성
3. 대표 이미지, 추가 이미지, 상세페이지 긴 이미지 업로드
4. `product_images` 생성
5. `is_visible`, `is_sold_out`, `is_new`, `track_stock`, `stock_quantity` 값 저장

### 상품 수정

1. `products.id` 또는 `slug`로 상품 조회
2. 상품 기본 정보 수정
3. 이미지 추가/삭제/순서 변경
4. 노출/품절/신상품/재고 관리 상태 수정

### 주문 관리

1. `orders` 목록 조회
2. 주문 상세에서 `order_items` 조회
3. 배송지, 결제 상태, 주문 상태 확인
4. 주문 상태 또는 관리자 메모 업데이트

## 18. MVP에서 제외할 것

초기 오픈에서는 아래 기능을 DB 구조만 고려하고 실제 구현은 보류합니다.

- 쿠폰
- 포인트
- 리뷰
- 재입고 알림
- 교환/반품 자동화
- 정산 관리
- 복잡한 관리자 권한
- 콘텐츠 CMS
- 배너 CMS

## 19. 실제 구축 시 우선순위

1. `users`, `admin_users` 인증 구조 확정
2. `products`, `product_images` 연결
3. 사용자 SHOP과 상품 상세를 DB 데이터로 교체
4. `carts`, `cart_items` 연결
5. `orders`, `order_items` 연결
6. 관리자 주문 상태 변경 연결
7. 결제사 확정 후 결제 데이터 연결

## 20. 다음 결정 필요 사항

- 사용할 DB/CMS 선택: Supabase로 결정
- 이미지 저장소 선택: Supabase Storage 우선 사용
- 결제사 선택
- 네이버/카카오 로그인 앱 생성 여부
- 관리자 계정 생성 방식
- 상품 카테고리를 문자열로 둘지 별도 테이블로 분리할지 여부

## 21. Supabase 적용 상태

현재 프로젝트에는 Supabase 연결을 위한 기본 준비가 추가되어 있습니다.

- `.env.example`
  Supabase URL, anon key, service role key 환경변수 예시
- `src/lib/supabase/client.ts`
  브라우저 컴포넌트용 Supabase 클라이언트
- `src/lib/supabase/server.ts`
  서버 컴포넌트/서버 액션용 Supabase 클라이언트
- `supabase/schema.sql`
  초기 테이블과 일부 RLS 정책 SQL
- `src/lib/supabase/admin.ts`
  서버 전용 secret key 기반 Supabase 관리자 클라이언트
- `src/app/admin/products/actions.ts`
  `product-images` bucket으로 상품 이미지를 업로드하는 서버 액션
- `src/app/admin/products/product-image-upload-box.tsx`
  관리자 상품 등록/수정 화면의 이미지 선택, 미리보기, 업로드 UI

실제 연결 순서는 다음과 같습니다.

1. Supabase 프로젝트 생성
2. `.env.local`에 Supabase URL과 anon key 입력
3. Supabase SQL Editor에서 `supabase/schema.sql` 실행
4. Supabase Storage에 상품 이미지 bucket 생성
5. 사용자 로그인과 관리자 로그인 로직을 Supabase Auth/DB 기반으로 교체

현재 관리자 상품 등록/수정은 `products` 테이블 저장까지 연결된 상태입니다. 관리자 상품 목록과 상품 수정 화면도 Supabase DB 데이터를 우선 조회합니다. 관리자 상품 목록 검색어, 카테고리, 판매 상태 필터는 Supabase 조회 조건으로 적용합니다.

현재 관리자 대시보드는 `products` 기준 전체 상품, 노출 상품, 비노출 상품, 품절 상품, 신상품 표시 수를 집계합니다.

현재 상품 이미지 업로드는 Storage 업로드 후 `product_images` 테이블 저장까지 연결된 상태입니다. 새 상품은 먼저 상품 정보를 저장한 뒤, 생성된 수정 화면에서 이미지를 업로드하는 흐름으로 사용합니다.

현재 SHOP 목록과 상품 상세 페이지도 Supabase `products`, `product_images` 데이터를 우선 조회합니다. DB에 상품이 없을 때만 기존 목업 상품 데이터를 fallback으로 사용합니다.

현재 메인 NEW ITEMS는 Supabase `products.is_new = true`이고 `is_visible = true`인 상품을 우선 조회합니다. 등록된 신상품이 없을 때만 기존 목업 상품을 fallback으로 사용합니다.

현재 메인 COMPANY INFO와 상품 상세 배송 안내는 Supabase `site_settings` 값을 표시합니다.

현재 관리자 주문 대시보드, 주문 목록, 주문 상세는 Supabase `orders`, `order_items` 데이터를 조회합니다. 관리자 주문 목록은 검색어, 결제 상태, 주문 상태 필터를 적용합니다. 관리자 주문 상세에서는 `orders.order_status`를 변경할 수 있습니다.

현재 관리자 설정은 Supabase `site_settings` 데이터를 조회하고 저장합니다. 저장된 값이 없으면 기본 설정값을 화면에 표시합니다.

현재 장바구니, 주문서, 주문 생성 액션은 Supabase `site_settings`의 `shipping_fee`, `free_shipping_minimum`, `shipping_notice`를 사용합니다. 상품 금액이 무료 배송 기준 이상이면 배송비는 0원으로 계산합니다.

현재 장바구니 담기와 주문 생성 전 단계에서는 `products.is_visible`, `products.is_sold_out`, `products.track_stock`, `products.stock_quantity`를 다시 확인합니다. 품절, 비노출, 재고 부족 상품은 장바구니 담기와 주문 진행을 막습니다.

현재 주문 생성 후에는 재고 관리 상품의 `stock_quantity`를 DB 함수 `decrement_product_stock`으로 차감합니다. 이 함수는 상품 행을 잠근 뒤 재고를 확인하고 차감하므로 동시 주문 시 같은 재고가 중복 차감될 위험을 줄입니다. 재고가 0개가 되면 `is_sold_out = true`로 자동 전환합니다.
