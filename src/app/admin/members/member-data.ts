import { createAdminClient } from "@/lib/supabase/admin";
import { formatOrderDate } from "../../orders/order-data";

type MemberRow = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  provider: string;
  is_active: boolean;
  created_at: string;
};

type MemberOrderRow = {
  user_id: string;
  order_status: string;
  total: number;
  created_at: string;
};

export type AdminMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  provider: string;
  isActive: boolean;
  joinedAt: string;
  orderCount: number;
  recentOrderDate?: string;
  recentOrderAt: string;
  totalPaid: number;
};

export type AdminMemberFilters = {
  query?: string;
  sort?: string;
};

function formatProvider(provider: string) {
  const labels: Record<string, string> = {
    email: "일반",
    kakao: "카카오",
    naver: "네이버",
  };

  return labels[provider] ?? provider;
}

export async function getAdminMembers() {
  const admin = createAdminClient();
  const [membersResult, ordersResult] = await Promise.all([
    admin
      .from("users")
      .select("id, email, name, phone, provider, is_active, created_at")
      .order("created_at", { ascending: false })
      .returns<MemberRow[]>(),
    admin
      .from("orders")
      .select("user_id, order_status, total, created_at")
      .returns<MemberOrderRow[]>(),
  ]);

  if (membersResult.error) {
    throw new Error(membersResult.error.message);
  }

  if (ordersResult.error) {
    throw new Error(ordersResult.error.message);
  }

  const orderStats = new Map<
    string,
    { count: number; total: number; recentOrderAt?: string }
  >();

  for (const order of ordersResult.data ?? []) {
    if (order.order_status === "canceled") {
      continue;
    }

    const current = orderStats.get(order.user_id) ?? { count: 0, total: 0 };
    current.count += 1;
    current.total += order.total;

    if (
      !current.recentOrderAt ||
      new Date(order.created_at) > new Date(current.recentOrderAt)
    ) {
      current.recentOrderAt = order.created_at;
    }

    orderStats.set(order.user_id, current);
  }

  return (membersResult.data ?? []).map<AdminMember>((member) => {
    const stats = orderStats.get(member.id);

    return {
      id: member.id,
      name: member.name,
      email: member.email,
      phone: member.phone ?? "-",
      createdAt: member.created_at,
      provider: formatProvider(member.provider),
      isActive: member.is_active,
      joinedAt: formatOrderDate(member.created_at),
      orderCount: stats?.count ?? 0,
      recentOrderDate: stats?.recentOrderAt,
      recentOrderAt: stats?.recentOrderAt
        ? formatOrderDate(stats.recentOrderAt)
        : "-",
      totalPaid: stats?.total ?? 0,
    };
  });
}

export async function getFilteredAdminMembers(filters: AdminMemberFilters = {}) {
  const keyword = filters.query?.trim().toLowerCase();
  const members = await getAdminMembers();
  const filteredMembers = keyword
    ? members.filter((member) =>
        [member.name, member.email, member.phone, member.provider]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      )
    : members;

  return [...filteredMembers].sort((a, b) => {
    if (filters.sort === "orders") {
      return b.orderCount - a.orderCount;
    }

    if (filters.sort === "paid") {
      return b.totalPaid - a.totalPaid;
    }

    if (filters.sort === "recent_order") {
      return (
        new Date(b.recentOrderDate ?? 0).getTime() -
        new Date(a.recentOrderDate ?? 0).getTime()
      );
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
