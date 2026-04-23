import type { Metadata } from "next";
import Link from "next/link";
import { AdminPageHeader, AdminShell, StatusPill } from "../admin-components";
import { getFilteredAdminMembers } from "./member-data";

export const metadata: Metadata = {
  title: "회원 관리",
  description: "objetdoux 관리자 회원 관리입니다.",
};

type AdminMembersPageProps = {
  searchParams: Promise<{ q?: string; sort?: string }>;
};

const sortOptions = [
  { value: "recent", label: "최근 가입순" },
  { value: "orders", label: "주문 많은순" },
  { value: "paid", label: "구매 금액순" },
  { value: "recent_order", label: "최근 주문순" },
];

export default async function AdminMembersPage({
  searchParams,
}: AdminMembersPageProps) {
  const params = await searchParams;
  const members = await getFilteredAdminMembers({
    query: params.q,
    sort: params.sort,
  });
  const hasFilters = Boolean(params.q || params.sort);

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="MEMBERS"
          title="회원 관리"
          description="비회원 주문 없이 회원 주문만 받는 구조를 기준으로 한 회원 목록입니다."
        />

        <section className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
          <form
            action="/admin/members"
            className="grid gap-3 md:grid-cols-[1fr_180px_auto]"
          >
            <input
              name="q"
              defaultValue={params.q ?? ""}
              placeholder="이름, 이메일, 연락처 검색"
              className="h-12 rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm outline-none transition focus:border-stone-900"
            />
            <select
              name="sort"
              defaultValue={params.sort ?? "recent"}
              className="h-12 rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm outline-none transition focus:border-stone-900"
            >
              {sortOptions.map((sort) => (
                <option key={sort.value} value={sort.value}>
                  {sort.label}
                </option>
              ))}
            </select>
            <button className="h-12 rounded-xl bg-stone-950 px-5 text-sm font-medium text-white transition hover:bg-stone-800">
              검색
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-stone-500">
            <p>검색 결과 {members.length}명</p>
            {hasFilters ? (
              <Link href="/admin/members" className="font-medium hover:text-stone-950">
                필터 초기화
              </Link>
            ) : null}
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-black/6">
            <div className="hidden grid-cols-[0.75fr_1.25fr_0.85fr_0.55fr_0.65fr_0.55fr_0.65fr_0.75fr_0.55fr] bg-[#faf8f5] px-5 py-3 text-xs font-medium text-stone-500 md:grid">
              <span>이름</span>
              <span>이메일</span>
              <span>연락처</span>
              <span>방식</span>
              <span>가입일</span>
              <span>주문</span>
              <span>최근 주문</span>
              <span>구매금액</span>
              <span>상태</span>
            </div>
            <div className="divide-y divide-black/6">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="grid gap-2 px-5 py-4 text-sm md:grid-cols-[0.75fr_1.25fr_0.85fr_0.55fr_0.65fr_0.55fr_0.65fr_0.75fr_0.55fr] md:items-center"
                >
                  <p className="font-semibold text-stone-950">{member.name}</p>
                  <p className="text-stone-700">{member.email}</p>
                  <p className="text-stone-700">{member.phone}</p>
                  <p className="text-stone-500">{member.provider}</p>
                  <p className="text-stone-500">{member.joinedAt}</p>
                  <p className="text-stone-700">{member.orderCount}건</p>
                  <p className="text-stone-500">{member.recentOrderAt}</p>
                  <p className="font-semibold text-stone-950">
                    ₩{member.totalPaid.toLocaleString("ko-KR")}
                  </p>
                  <div>
                    <StatusPill tone={member.isActive ? "default" : "muted"}>
                      {member.isActive ? "활성" : "중지"}
                    </StatusPill>
                  </div>
                </div>
              ))}
              {members.length === 0 ? (
                <div className="px-5 py-12 text-center text-sm text-stone-500">
                  {hasFilters
                    ? "조건에 맞는 회원이 없습니다."
                    : "아직 가입한 회원이 없습니다."}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
