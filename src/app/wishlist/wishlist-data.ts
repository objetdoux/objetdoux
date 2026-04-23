import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAccountProfile } from "../mypage/account-data";
import type { ShopProduct } from "../shop/shop-data";

type WishlistProductRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  summary: string | null;
  description: string | null;
  is_sold_out?: boolean;
  track_stock?: boolean;
  stock_quantity?: number;
  product_images?: Array<{
    image_type: string;
    image_url: string;
    sort_order: number;
  }>;
};

type WishlistItemRow = {
  products: WishlistProductRow | WishlistProductRow[] | null;
};

function getProduct(row: WishlistItemRow) {
  return Array.isArray(row.products) ? row.products[0] : row.products;
}

function getThumbnail(product: WishlistProductRow) {
  const images = [...(product.product_images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  return images.find((image) => image.image_type === "thumbnail")?.image_url;
}

function mapWishlistProduct(product: WishlistProductRow): ShopProduct {
  return {
    slug: product.slug,
    name: product.name,
    category: product.category,
    priceValue: product.price,
    price: `₩${product.price.toLocaleString("ko-KR")}`,
    description: product.description ?? "",
    summary: product.summary ?? "",
    material: "",
    size: "",
    soldOut: product.is_sold_out ?? false,
    trackStock: product.track_stock ?? false,
    stockQuantity: product.stock_quantity ?? 0,
    thumbnailUrl: getThumbnail(product),
    galleryUrls: [],
  };
}

export async function getWishlistProductSlugs() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const admin = createAdminClient();
  const { data: account } = await admin
    .from("users")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle<{ id: string }>();

  if (!account) {
    return [];
  }

  const { data, error } = await admin
    .from("wishlist_items")
    .select("products(slug)")
    .eq("user_id", account.id)
    .returns<Array<{ products: { slug: string } | { slug: string }[] | null }>>();

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? [])
    .map((item) =>
      Array.isArray(item.products) ? item.products[0]?.slug : item.products?.slug,
    )
    .filter((slug): slug is string => Boolean(slug));
}

export async function getWishlistProducts() {
  const account = await getCurrentAccountProfile();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("wishlist_items")
    .select(
      "products(id, slug, name, category, price, summary, description, is_sold_out, track_stock, stock_quantity, product_images(image_type, image_url, sort_order))",
    )
    .eq("user_id", account.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as unknown as WishlistItemRow[])
    .map(getProduct)
    .filter((product): product is WishlistProductRow => product !== null)
    .map(mapWishlistProduct);
}
