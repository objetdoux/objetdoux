import { createAdminClient } from "@/lib/supabase/admin";

export type AdminProductRecord = {
  dbId: string;
  id: string;
  name: string;
  category: string;
  priceValue: number;
  price: string;
  summary: string;
  description: string;
  material: string;
  size: string;
  trackStock: boolean;
  stockQuantity: number;
  visible: boolean;
  soldOut: boolean;
  isNew: boolean;
  createdAt: string;
  thumbnailUrl?: string;
};

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  summary: string | null;
  description: string | null;
  material: string | null;
  size: string | null;
  track_stock?: boolean;
  stock_quantity?: number;
  is_visible: boolean;
  is_sold_out: boolean;
  is_new: boolean;
  created_at: string;
  product_images?: Array<{
    image_type: string;
    image_url: string;
    sort_order: number;
  }>;
};

export type AdminProductFilters = {
  query?: string;
  category?: string;
  status?: string;
};

const productSelect =
  "id, slug, name, category, price, summary, description, material, size, track_stock, stock_quantity, is_visible, is_sold_out, is_new, created_at, product_images(image_type, image_url, sort_order)";

function sanitizeSearchValue(value: string) {
  return value.replaceAll("%", "").replaceAll(",", "").replaceAll("(", "").replaceAll(")", "");
}

export async function getAdminProducts(filters: AdminProductFilters = {}) {
  const supabase = createAdminClient();
  let query = supabase
    .from("products")
    .select(productSelect)
    .order("created_at", { ascending: false });

  if (filters.query) {
    const search = sanitizeSearchValue(filters.query.trim());

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,category.ilike.%${search}%,slug.ilike.%${search}%`,
      );
    }
  }

  if (filters.category && filters.category !== "all") {
    query = query.eq("category", filters.category);
  }

  if (filters.status === "selling") {
    query = query.eq("is_visible", true).eq("is_sold_out", false);
  }

  if (filters.status === "sold_out") {
    query = query.eq("is_sold_out", true);
  }

  if (filters.status === "hidden") {
    query = query.eq("is_visible", false);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as ProductRow[]).map(mapProductRow);
}

export async function getAdminProductBySlug(slug: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapProductRow(data as ProductRow) : null;
}

export async function getAdminProductDashboardStats() {
  const products = await getAdminProducts();

  return {
    totalProductCount: products.length,
    visibleProductCount: products.filter((product) => product.visible).length,
    hiddenProductCount: products.filter((product) => !product.visible).length,
    soldOutProductCount: products.filter((product) => product.soldOut).length,
    newProductCount: products.filter((product) => product.isNew).length,
  };
}

function mapProductRow(product: ProductRow): AdminProductRecord {
  const thumbnail = product.product_images
    ?.filter((image) => image.image_type === "thumbnail")
    .sort((a, b) => a.sort_order - b.sort_order)[0];

  return {
    dbId: product.id,
    id: product.slug,
    name: product.name,
    category: product.category,
    priceValue: product.price,
    price: `₩${product.price.toLocaleString("ko-KR")}`,
    summary: product.summary ?? "",
    description: product.description ?? "",
    material: product.material ?? "",
    size: product.size ?? "",
    trackStock: product.track_stock ?? false,
    stockQuantity: product.stock_quantity ?? 0,
    visible: product.is_visible,
    soldOut: product.is_sold_out,
    isNew: product.is_new,
    createdAt: product.created_at.slice(0, 10).replaceAll("-", "."),
    thumbnailUrl: thumbnail?.image_url,
  };
}
