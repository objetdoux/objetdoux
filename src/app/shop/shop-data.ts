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
  material: string;
  size: string;
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
  material: string | null;
  size: string | null;
  product_images?: Array<{
    image_type: string;
    image_url: string;
    sort_order: number;
  }>;
};

export async function getShopProducts() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "slug, name, category, price, summary, description, material, size, product_images(image_type, image_url, sort_order)",
    )
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
    .select(
      "slug, name, category, price, summary, description, material, size, product_images(image_type, image_url, sort_order)",
    )
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
    material: product.material ?? "",
    size: product.size ?? "",
    thumbnailUrl: thumbnail?.image_url,
    galleryUrls: gallery.map((image) => image.image_url),
    detailImageUrl: detail?.image_url,
  };
}

function mapMockProduct(product: (typeof shopProducts)[number]): ShopProduct {
  return {
    ...product,
    galleryUrls: [],
  };
}
