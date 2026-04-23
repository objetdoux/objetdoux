"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const PRODUCT_IMAGES_BUCKET = "product-images";
const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

export type ProductImageUploadState = {
  status: "idle" | "success" | "error";
  message: string;
  path?: string;
  publicUrl?: string;
};

const initialUploadState: ProductImageUploadState = {
  status: "idle",
  message: "",
};

export async function uploadProductImage(
  prevState: ProductImageUploadState = initialUploadState,
  formData: FormData,
): Promise<ProductImageUploadState> {
  void prevState;

  const file = formData.get("image");
  const imageType = String(formData.get("imageType") ?? "");
  const productId = String(formData.get("productId") ?? "");
  const productSlug = sanitizePathPart(String(formData.get("productSlug") ?? "draft"));

  if (!(file instanceof File) || file.size === 0) {
    return {
      status: "error",
      message: "업로드할 이미지를 선택해주세요.",
    };
  }

  if (!file.type.startsWith("image/")) {
    return {
      status: "error",
      message: "이미지 파일만 업로드할 수 있습니다.",
    };
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return {
      status: "error",
      message: "이미지는 8MB 이하로 업로드해주세요.",
    };
  }

  if (!["thumbnail", "gallery", "detail"].includes(imageType)) {
    return {
      status: "error",
      message: "이미지 유형이 올바르지 않습니다.",
    };
  }

  const fileExtension = getFileExtension(file.name);
  const fileName = `${Date.now()}-${crypto.randomUUID()}${fileExtension}`;
  const filePath = `products/${productSlug}/${imageType}/${fileName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const supabase = createAdminClient();

  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  const { data } = supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .getPublicUrl(filePath);

  if (productId) {
    const { error: imageError } = await supabase.from("product_images").insert({
      product_id: productId,
      image_type: imageType,
      image_url: data.publicUrl,
      alt_text: productSlug,
      sort_order: 0,
    });

    if (imageError) {
      return {
        status: "error",
        message: imageError.message,
      };
    }
  }

  return {
    status: "success",
    message: "이미지가 업로드되었습니다.",
    path: filePath,
    publicUrl: data.publicUrl,
  };
}

export async function createProduct(formData: FormData) {
  const payload = parseProductFormData(formData);
  const supabase = createAdminClient();

  const { error } = await supabase.from("products").insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect(`/admin/products/${payload.slug}`);
}

export async function updateProduct(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");
  const payload = parseProductFormData(formData);
  const supabase = createAdminClient();

  if (!productId) {
    throw new Error("Missing product id.");
  }

  const { error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", productId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${payload.slug}`);
  revalidatePath("/shop");
  redirect(`/admin/products/${payload.slug}`);
}

function parseProductFormData(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = sanitizePathPart(String(formData.get("slug") ?? ""));
  const category = String(formData.get("category") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const trackStock = formData.get("track_stock") === "on";
  const stockQuantity = Math.max(
    0,
    Number(formData.get("stock_quantity") ?? 0) || 0,
  );

  if (!name) {
    throw new Error("상품명을 입력해주세요.");
  }

  if (!slug) {
    throw new Error("상품 코드를 입력해주세요.");
  }

  if (!category) {
    throw new Error("카테고리를 선택해주세요.");
  }

  if (!Number.isFinite(price) || price < 0) {
    throw new Error("판매가를 올바르게 입력해주세요.");
  }

  return {
    name,
    slug,
    category,
    price,
    description: nullableString(formData.get("description")),
    summary: nullableString(formData.get("summary")),
    is_visible: formData.get("is_visible") === "on",
    track_stock: trackStock,
    stock_quantity: stockQuantity,
    is_sold_out:
      formData.get("is_sold_out") === "on" ||
      (trackStock && stockQuantity <= 0),
    is_new: formData.get("is_new") === "on",
  };
}

function nullableString(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text || null;
}

function sanitizePathPart(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "draft"
  );
}

function getFileExtension(fileName: string) {
  const extension = fileName.split(".").pop();

  if (!extension || extension === fileName) {
    return "";
  }

  return `.${extension.toLowerCase()}`;
}
