"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentAccountProfile } from "../mypage/account-data";

type ProductIdRow = {
  id: string;
};

type WishlistMutationResult = {
  status: "success" | "error";
  liked: boolean;
  message: string;
};

function revalidateWishlistFlow(productSlug?: string) {
  revalidatePath("/shop");
  revalidatePath("/mypage/wishlist");

  if (productSlug) {
    revalidatePath(`/shop/${productSlug}`);
  }
}

export async function toggleWishlistItem(formData: FormData) {
  const productSlug = String(formData.get("productSlug") ?? "").trim();
  const redirectTo = String(formData.get("redirectTo") ?? "/shop");

  if (!productSlug) {
    redirect(redirectTo);
  }

  const account = await getCurrentAccountProfile();
  const admin = createAdminClient();
  const { data: product } = await admin
    .from("products")
    .select("id")
    .eq("slug", productSlug)
    .eq("is_visible", true)
    .maybeSingle<ProductIdRow>();

  if (!product) {
    redirect(redirectTo);
  }

  const { data: existing } = await admin
    .from("wishlist_items")
    .select("id")
    .eq("user_id", account.id)
    .eq("product_id", product.id)
    .maybeSingle<{ id: string }>();

  if (existing) {
    await admin
      .from("wishlist_items")
      .delete()
      .eq("id", existing.id)
      .eq("user_id", account.id);
  } else {
    await admin.from("wishlist_items").insert({
      user_id: account.id,
      product_id: product.id,
    });
  }

  revalidateWishlistFlow(productSlug);
  redirect(redirectTo);
}

export async function toggleWishlistItemInline(
  productSlug: string,
  nextLiked: boolean,
): Promise<WishlistMutationResult> {
  const safeProductSlug = productSlug.trim();

  if (!safeProductSlug) {
    return {
      status: "error",
      liked: !nextLiked,
      message: "상품 정보를 확인할 수 없습니다.",
    };
  }

  const account = await getCurrentAccountProfile();
  const admin = createAdminClient();
  const { data: product } = await admin
    .from("products")
    .select("id")
    .eq("slug", safeProductSlug)
    .eq("is_visible", true)
    .maybeSingle<ProductIdRow>();

  if (!product) {
    return {
      status: "error",
      liked: !nextLiked,
      message: "현재 관심 상품으로 저장할 수 없습니다.",
    };
  }

  const { data: existing } = await admin
    .from("wishlist_items")
    .select("id")
    .eq("user_id", account.id)
    .eq("product_id", product.id)
    .maybeSingle<{ id: string }>();

  if (nextLiked && !existing) {
    await admin.from("wishlist_items").insert({
      user_id: account.id,
      product_id: product.id,
    });
  }

  if (!nextLiked && existing) {
    await admin
      .from("wishlist_items")
      .delete()
      .eq("id", existing.id)
      .eq("user_id", account.id);
  }

  revalidatePath("/shop");
  revalidatePath("/mypage/wishlist");

  return {
    status: "success",
    liked: nextLiked,
    message: nextLiked ? "관심 상품에 추가했습니다." : "관심 상품에서 해제했습니다.",
  };
}
