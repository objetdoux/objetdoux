import { createAdminClient } from "@/lib/supabase/admin";
import { shopProducts } from "../site-data";

export type ShopProduct = {
  slug: string;
  name: string;
  category: string;
  priceValue: number;
  price: string;
  description: string;
  summary: string;
  soldOut: boolean;
  trackStock: boolean;
  stockQuantity: number;
  thumbnailUrl?: string;
  galleryUrls: string[];
  detailImageUrl?: string;
};

type ProductRow = {
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

const shopProductSelect =
  "slug, name, category, price, summary, description, is_sold_out, track_stock, stock_quantity, product_images(image_type, image_url, sort_order)";

export async function getShopProducts() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select(shopProductSelect)
    .eq("is_visible", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const products = ((data ?? []) as ProductRow[]).map(mapProductRow);

  return products.length > 0 ? products : shopProducts.map(mapMockProduct);
}

export async function getShopProductBySlug(slug: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select(shopProductSelect)
    .eq("slug", slug)
    .eq("is_visible", true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (data) {
    return mapProductRow(data as ProductRow);
  }

  const mockProduct = shopProducts.find((product) => product.slug === slug);
  return mockProduct ? mapMockProduct(mockProduct) : null;
}

export async function getNewShopProducts(limit = 4) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select(shopProductSelect)
    .eq("is_visible", true)
    .eq("is_new", true)
    .eq("is_sold_out", false)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  const products = ((data ?? []) as ProductRow[]).map(mapProductRow);

  return products.length > 0
    ? products
    : shopProducts.slice(0, limit).map(mapMockProduct);
}

function mapProductRow(product: ProductRow): ShopProduct {
  const images = [...(product.product_images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );
  const thumbnail = images.find((image) => image.image_type === "thumbnail");
  const gallery = images.filter((image) => image.image_type === "gallery");
  const detail = images.find((image) => image.image_type === "detail");

  return {
    slug: product.slug,
    name: product.name,
    category: product.category,
    priceValue: product.price,
    price: `₩${product.price.toLocaleString("ko-KR")}`,
    description: product.description ?? "",
    summary: product.summary ?? "",
    soldOut: product.is_sold_out ?? false,
    trackStock: product.track_stock ?? false,
    stockQuantity: product.stock_quantity ?? 0,
    thumbnailUrl: thumbnail?.image_url,
    galleryUrls: gallery.map((image) => image.image_url),
    detailImageUrl: detail?.image_url,
  };
}

function mapMockProduct(product: (typeof shopProducts)[number]): ShopProduct {
  return {
    ...product,
    soldOut: false,
    trackStock: false,
    stockQuantity: 0,
    galleryUrls: [],
  };
}
