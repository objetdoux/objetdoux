import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminPageHeader, AdminShell } from "../../admin-components";
import { getAdminProductBySlug } from "../product-data";
import { ProductForm } from "../product-form";

export const metadata: Metadata = {
  title: "상품 수정",
  description: "objetdoux 관리자 상품 수정 목업입니다.",
};

export const dynamic = "force-dynamic";

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getAdminProductBySlug(id);

  if (!product) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="PRODUCT EDIT"
          title="상품 수정"
          description={`${product.name} 상품 정보와 이미지, 판매 상태를 수정합니다.`}
        />

        <ProductForm mode="edit" product={product} />
      </div>
    </AdminShell>
  );
}
