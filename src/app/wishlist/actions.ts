"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentAccountProfile } from "../mypage/account-data";

type ProductIdRow = {
  id: string;
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
