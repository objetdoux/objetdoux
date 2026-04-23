"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentCartId } from "./cart-data";

type ProductIdRow = {
  id: string;
  track_stock: boolean;
  stock_quantity: number;
};

type CartMutationResult = {
  status: "success" | "error";
  message: string;
};

function revalidateCartFlow() {
  revalidatePath("/cart");
  revalidatePath("/checkout");
  revalidatePath("/", "layout");
}

export async function addCartItem(formData: FormData) {
  const productSlug = String(formData.get("productSlug") ?? "").trim();
  const quantity = Math.max(1, Number(formData.get("quantity") ?? 1) || 1);
  const redirectTo = getSafeRedirectPath(
    String(formData.get("redirectTo") ?? "/cart"),
  );

  if (!productSlug) {
    redirect("/shop");
  }

  const admin = createAdminClient();
  const { data: product } = await admin
    .from("products")
    .select("id, track_stock, stock_quantity")
    .eq("slug", productSlug)
    .eq("is_visible", true)
    .eq("is_sold_out", false)
    .maybeSingle<ProductIdRow>();

  if (!product) {
    redirect(`/shop/${productSlug}`);
  }

  const cartId = await getCurrentCartId();
  const { data: existingItem } = await admin
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("product_id", product.id)
    .maybeSingle<{ id: string; quantity: number }>();

  if (existingItem) {
    const nextQuantity = existingItem.quantity + quantity;

    if (product.track_stock && nextQuantity > product.stock_quantity) {
      revalidateCartFlow();
      redirect(`/shop/${productSlug}?cartError=stock`);
    }

    await admin
      .from("cart_items")
      .update({
        quantity: nextQuantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingItem.id)
      .eq("cart_id", cartId);
  } else {
    if (product.track_stock && quantity > product.stock_quantity) {
      revalidateCartFlow();
      redirect(`/shop/${productSlug}?cartError=stock`);
    }

    await admin.from("cart_items").insert({
      cart_id: cartId,
      product_id: product.id,
      quantity,
    });
  }

  revalidateCartFlow();
  redirect(redirectTo);
}

export async function addCartItemInline(
  productSlug: string,
  quantity: number,
): Promise<CartMutationResult> {
  const safeProductSlug = productSlug.trim();
  const safeQuantity = Math.max(1, quantity || 1);

  if (!safeProductSlug) {
    return {
      status: "error",
      message: "상품 정보를 확인할 수 없습니다.",
    };
  }

  const admin = createAdminClient();
  const { data: product } = await admin
    .from("products")
    .select("id, track_stock, stock_quantity")
    .eq("slug", safeProductSlug)
    .eq("is_visible", true)
    .eq("is_sold_out", false)
    .maybeSingle<ProductIdRow>();

  if (!product) {
    return {
      status: "error",
      message: "현재 구매할 수 없는 상품입니다.",
    };
  }

  const cartId = await getCurrentCartId();
  const { data: existingItem } = await admin
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("product_id", product.id)
    .maybeSingle<{ id: string; quantity: number }>();

  const nextQuantity = (existingItem?.quantity ?? 0) + safeQuantity;

  if (product.track_stock && nextQuantity > product.stock_quantity) {
    return {
      status: "error",
      message: "현재 선택 가능한 재고 수량을 초과했습니다.",
    };
  }

  if (existingItem) {
    await admin
      .from("cart_items")
      .update({
        quantity: nextQuantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingItem.id)
      .eq("cart_id", cartId);
  } else {
    await admin.from("cart_items").insert({
      cart_id: cartId,
      product_id: product.id,
      quantity: safeQuantity,
    });
  }

  revalidateCartFlow();

  return {
    status: "success",
    message: "장바구니에 담았습니다.",
  };
}

export async function changeCartItemQuantity(formData: FormData) {
  const cartItemId = String(formData.get("cartItemId") ?? "").trim();
  const direction = String(formData.get("direction") ?? "");

  if (!cartItemId) {
    redirect("/cart");
  }

  const cartId = await getCurrentCartId();
  const admin = createAdminClient();
  const { data: item } = await admin
    .from("cart_items")
    .select("id, quantity, products(track_stock, stock_quantity, is_visible, is_sold_out)")
    .eq("id", cartItemId)
    .eq("cart_id", cartId)
    .maybeSingle<{
      id: string;
      quantity: number;
      products:
        | {
            track_stock: boolean;
            stock_quantity: number;
            is_visible: boolean;
            is_sold_out: boolean;
          }
        | Array<{
            track_stock: boolean;
            stock_quantity: number;
            is_visible: boolean;
            is_sold_out: boolean;
          }>
        | null;
    }>();

  if (!item) {
    redirect("/cart");
  }

  const nextQuantity =
    direction === "decrease" ? item.quantity - 1 : item.quantity + 1;
  const product = Array.isArray(item.products) ? item.products[0] : item.products;

  if (
    nextQuantity > item.quantity &&
    (!product ||
      !product.is_visible ||
      product.is_sold_out ||
      (product.track_stock && nextQuantity > product.stock_quantity))
  ) {
    revalidateCartFlow();
    redirect("/cart?invalid=1");
  }

  if (nextQuantity <= 0) {
    await admin
      .from("cart_items")
      .delete()
      .eq("id", cartItemId)
      .eq("cart_id", cartId);
  } else {
    await admin
      .from("cart_items")
      .update({ quantity: nextQuantity, updated_at: new Date().toISOString() })
      .eq("id", cartItemId)
      .eq("cart_id", cartId);
  }

  revalidateCartFlow();
  redirect("/cart");
}

export async function setCartItemQuantity(
  cartItemId: string,
  nextQuantity: number,
): Promise<CartMutationResult> {
  const safeCartItemId = cartItemId.trim();
  const safeNextQuantity = Math.max(0, nextQuantity || 0);

  if (!safeCartItemId) {
    return {
      status: "error",
      message: "장바구니 상품을 확인할 수 없습니다.",
    };
  }

  const cartId = await getCurrentCartId();
  const admin = createAdminClient();
  const { data: item } = await admin
    .from("cart_items")
    .select("id, quantity, products(track_stock, stock_quantity, is_visible, is_sold_out)")
    .eq("id", safeCartItemId)
    .eq("cart_id", cartId)
    .maybeSingle<{
      id: string;
      quantity: number;
      products:
        | {
            track_stock: boolean;
            stock_quantity: number;
            is_visible: boolean;
            is_sold_out: boolean;
          }
        | Array<{
            track_stock: boolean;
            stock_quantity: number;
            is_visible: boolean;
            is_sold_out: boolean;
          }>
        | null;
    }>();

  if (!item) {
    return {
      status: "error",
      message: "장바구니 상품을 확인할 수 없습니다.",
    };
  }

  const product = Array.isArray(item.products) ? item.products[0] : item.products;

  if (
    !product ||
    !product.is_visible ||
    product.is_sold_out ||
    (product.track_stock && safeNextQuantity > product.stock_quantity)
  ) {
    return {
      status: "error",
      message: "현재 선택 가능한 수량을 초과했습니다.",
    };
  }

  if (safeNextQuantity <= 0) {
    await admin
      .from("cart_items")
      .delete()
      .eq("id", safeCartItemId)
      .eq("cart_id", cartId);
  } else {
    await admin
      .from("cart_items")
      .update({
        quantity: safeNextQuantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", safeCartItemId)
      .eq("cart_id", cartId);
  }

  revalidateCartFlow();

  return {
    status: "success",
    message: "수량이 변경되었습니다.",
  };
}

export async function removeCartItem(formData: FormData) {
  const cartItemId = String(formData.get("cartItemId") ?? "").trim();

  if (!cartItemId) {
    redirect("/cart");
  }

  const cartId = await getCurrentCartId();
  const admin = createAdminClient();

  await admin
    .from("cart_items")
    .delete()
    .eq("id", cartItemId)
    .eq("cart_id", cartId);

  revalidateCartFlow();
  redirect("/cart");
}

function getSafeRedirectPath(value: string) {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/cart";
}
