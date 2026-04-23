import type { ReactNode } from "react";
import {
  AdminSecondaryLink,
  AdminSelectField,
  AdminTextField,
  AdminTextarea,
} from "../admin-components";
import { createProduct, updateProduct } from "./actions";
import { ProductImageUploadBox } from "./product-image-upload-box";

type ProductFormProduct = {
  dbId?: string;
  id: string;
  name: string;
  category: string;
  priceValue: number;
  summary: string;
  description: string;
  material: string;
  size: string;
  visible: boolean;
  soldOut: boolean;
  isNew?: boolean;
};

const categories = ["Plate", "Cup", "Bowl", "Tea Ware", "Object"];

export function ProductForm({
  mode,
  product,
}: {
  mode: "new" | "edit";
  product?: ProductFormProduct;
}) {
  const isEdit = mode === "edit";
  const productSlug = product?.id ?? "draft-product";
  const formId = isEdit ? `product-form-${product?.id}` : "product-form-new";
  const formAction = isEdit ? updateProduct : createProduct;

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <form id={formId} action={formAction} className="space-y-6">
            {product?.dbId ? (
              <input type="hidden" name="productId" value={product.dbId} />
            ) : null}
            <AdminFormSection
              title="기본 정보"
              description="고객 화면의 상품명, 카테고리, 가격에 연결될 핵심 정보입니다."
            >
              <div className="grid gap-5 lg:grid-cols-2">
                <AdminTextField
                  label="상품명"
                  name="name"
                  value={product?.name}
                  placeholder="예: Lune Plate"
                />
                <AdminSelectField
                  label="카테고리"
                  name="category"
                  value={product?.category}
                  options={categories}
                />
                <AdminTextField
                  label="판매가"
                  name="price"
                  value={product?.priceValue}
                  placeholder="38000"
                  type="number"
                />
                <AdminTextField
                  label="상품 코드"
                  name="slug"
                  value={product?.id}
                  placeholder="예: lune-plate"
                />
                <AdminTextField
                  label="사이즈"
                  name="size"
                  value={product?.size}
                  placeholder="26cm / 300ml"
                />
                <AdminTextField
                  label="재질"
                  name="material"
                  value={product?.material}
                  placeholder="Ceramic"
                />
              </div>
            </AdminFormSection>

            <AdminFormSection
              title="상품 문구"
              description="목록 카드와 상세 상단에 노출될 짧은 설명입니다."
            >
              <div className="space-y-5">
                <AdminTextarea
                  label="목록용 한 줄 설명"
                  name="description"
                  value={product?.description}
                  placeholder="상품 카드에 보일 짧은 문구"
                />
                <AdminTextarea
                  label="상세 상단 요약"
                  name="summary"
                  value={product?.summary}
                  placeholder="상품 상세 상단에 보일 요약 문구"
                />
              </div>
            </AdminFormSection>
          </form>

          <AdminFormSection
            title="이미지 관리"
            description={
              isEdit
                ? "이미지는 Supabase Storage에 업로드되고 product_images 테이블에 저장됩니다."
                : "상품을 먼저 등록한 뒤 수정 화면에서 이미지를 업로드할 수 있습니다."
            }
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <ProductImageUploadBox
                title="대표 이미지"
                description="상품 목록과 상세 상단 썸네일에 사용합니다."
                ratio="aspect-square"
                imageType="thumbnail"
                productSlug={productSlug}
                productId={product?.dbId}
              />
              <ProductImageUploadBox
                title="추가 이미지"
                description="상세 상단 이미지 갤러리에 추가될 이미지입니다."
                ratio="aspect-square"
                imageType="gallery"
                productSlug={productSlug}
                productId={product?.dbId}
              />
            </div>

            <div className="mt-4">
              <ProductImageUploadBox
                title="상세페이지 긴 이미지"
                description="상세페이지 제작 이미지를 세로로 길게 등록하는 영역입니다."
                ratio="aspect-[4/7]"
                imageType="detail"
                productSlug={productSlug}
                productId={product?.dbId}
              />
            </div>
          </AdminFormSection>
        </div>

        <aside className="space-y-6">
          <AdminFormSection title="판매 설정">
            <div className="space-y-3">
              <ToggleRow
                title="상품 노출"
                name="is_visible"
                formId={formId}
                description="켜두면 SHOP과 메인 상품 영역에 노출됩니다."
                defaultChecked={product?.visible ?? true}
              />
              <ToggleRow
                title="품절 표시"
                name="is_sold_out"
                formId={formId}
                description="켜두면 구매 버튼 대신 품절 상태로 보여줍니다."
                defaultChecked={product?.soldOut ?? false}
              />
              <ToggleRow
                title="신상품 영역 노출"
                name="is_new"
                formId={formId}
                description="메인 NEW ITEMS 영역에 노출할지 결정합니다."
                defaultChecked={product?.isNew ?? !isEdit}
              />
            </div>
          </AdminFormSection>

          <AdminFormSection title="미리보기">
            <div className="rounded-[1.25rem] bg-[#faf8f5] p-4">
              <div className="aspect-square rounded-xl bg-[#dedbd5]" />
              <p className="mt-4 text-xs text-stone-500">
                {product?.category ?? "Category"}
              </p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.03em] text-stone-950">
                {product?.name ?? "상품명"}
              </p>
              <p className="mt-1 text-sm leading-5 text-stone-600">
                {product?.description ?? "상품 설명이 표시됩니다."}
              </p>
              <p className="mt-3 text-base font-semibold text-stone-950">
                {product ? `₩${product.priceValue.toLocaleString("ko-KR")}` : "₩0"}
              </p>
            </div>
          </AdminFormSection>

          <div className="rounded-[1.5rem] border border-black/6 bg-white px-5 py-5">
            <button
              form={formId}
              className="h-12 w-full rounded-xl bg-stone-950 px-6 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              {isEdit ? "수정 저장" : "상품 등록"}
            </button>
            <div className="mt-2 [&>a]:w-full">
              <AdminSecondaryLink href="/admin/products">목록으로</AdminSecondaryLink>
            </div>
            {isEdit ? (
              <button
                type="button"
                className="mt-2 h-12 w-full rounded-xl border border-black/8 px-6 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-950"
              >
                상품 삭제
              </button>
            ) : null}
          </div>
        </aside>
      </section>
    </div>
  );
}

function AdminFormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
      <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
        {title}
      </h2>
      {description ? (
        <p className="mt-1 text-sm leading-5 text-stone-500">{description}</p>
      ) : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ToggleRow({
  title,
  name,
  formId,
  description,
  defaultChecked,
}: {
  title: string;
  name: string;
  formId: string;
  description: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-[1.25rem] bg-[#faf8f5] px-4 py-4">
      <span>
        <span className="block text-sm font-semibold text-stone-950">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-stone-500">
          {description}
        </span>
      </span>
      <input
        name={name}
        form={formId}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-1 h-5 w-5 accent-stone-950"
      />
    </label>
  );
}
