import type { Metadata } from "next";
import { AdminPageHeader, AdminShell } from "../../admin-components";
import { ProductForm } from "../product-form";

export const metadata: Metadata = {
  title: "상품 등록",
  description: "objetdoux 관리자 상품 등록 목업입니다.",
};

export default function AdminProductNewPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="PRODUCT NEW"
          title="상품 등록"
          description="DB/CMS에 저장될 상품 정보와 이미지, 판매 상태를 입력합니다."
        />

        <ProductForm mode="new" />
      </div>
    </AdminShell>
  );
}
