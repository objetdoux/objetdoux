import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentAccountProfile } from "../mypage/account-data";

type CartRow = {
  id: string;
};

type ProductImageRow = {
  image_type: string;
  image_url: string;
  sort_order: number;
};

type CartProductRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  summary: string | null;
  is_visible: boolean;
  is_sold_out: boolean;
  track_stock?: boolean;
  stock_quantity?: number;
  product_images?: ProductImageRow[];
};

type CartItemRow = {
  id: string;
  quantity: number;
  products: CartProductRow | CartProductRow[] | null;
};

export type CartLineItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  category: string;
  priceValue: number;
  price: string;
  summary: string;
  quantity: number;
  total: number;
  isVisible: boolean;
  isSoldOut: boolean;
  trackStock: boolean;
  stockQuantity: number;
  hasEnoughStock: boolean;
  thumbnailUrl?: string;
};

function getProduct(row: CartItemRow) {
  return Array.isArray(row.products) ? row.products[0] : row.products;
}

function getThumbnail(product: CartProductRow) {
  const images = [...(product.product_images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  return images.find((image) => image.image_type === "thumbnail")?.image_url;
}

function mapCartItem(row: CartItemRow): CartLineItem | null {
  const product = getProduct(row);

  if (!product) {
    return null;
  }

  return {
    id: row.id,
    productId: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    priceValue: product.price,
    price: `₩${product.price.toLocaleString("ko-KR")}`,
    summary: product.summary ?? "",
    quantity: row.quantity,
    total: product.price * row.quantity,
    isVisible: product.is_visible,
    isSoldOut: product.is_sold_out,
    trackStock: product.track_stock ?? false,
    stockQuantity: product.stock_quantity ?? 0,
    hasEnoughStock:
      !(product.track_stock ?? false) ||
      row.quantity <= (product.stock_quantity ?? 0),
    thumbnailUrl: getThumbnail(product),
  };
}

export function getUnavailableCartItems(items: CartLineItem[]) {
  return items.filter(
    (item) => !item.isVisible || item.isSoldOut || !item.hasEnoughStock,
  );
}

export async function getCurrentCartId() {
  const account = await getCurrentAccountProfile();
  const admin = createAdminClient();

  const { data: existingCart } = await admin
    .from("carts")
    .select("id")
    .eq("user_id", account.id)
    .maybeSingle<CartRow>();

  if (existingCart) {
    return existingCart.id;
  }

  const { data: createdCart, error } = await admin
    .from("carts")
    .insert({ user_id: account.id })
    .select("id")
    .single<CartRow>();

  if (error || !createdCart) {
    throw new Error(error?.message ?? "Failed to create cart.");
  }

  return createdCart.id;
}

export async function getCartLineItems() {
  const account = await getCurrentAccountProfile();
  const admin = createAdminClient();

  const { data: cart } = await admin
    .from("carts")
    .select("id")
    .eq("user_id", account.id)
    .maybeSingle<CartRow>();

  if (!cart) {
    return [];
  }

  const { data, error } = await admin
    .from("cart_items")
    .select(
      "id, quantity, products(id, slug, name, category, price, summary, is_visible, is_sold_out, track_stock, stock_quantity, product_images(image_type, image_url, sort_order))",
    )
    .eq("cart_id", cart.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as unknown as CartItemRow[])
    .map(mapCartItem)
    .filter((item): item is CartLineItem => item !== null);
}
