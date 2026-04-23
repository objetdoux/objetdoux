import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { updateAdminOrderStatus } from "../actions";
import {
  AdminPageHeader,
  AdminSecondaryLink,
  AdminShell,
  StatusPill,
} from "../../admin-components";
import {
  adminOrderStatusOptions,
  getAdminOrderByNumber,
} from "../order-data";

export const metadata: Metadata = {
  title: "주문 상세",
  description: "objetdoux 관리자 주문 상세 목업입니다.",
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getAdminOrderByNumber(id);

  if (!order) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="ORDER DETAIL"
          title={order.orderNumber}
          description={`${order.buyerName}님의 주문 상세 정보입니다.`}
          action={<StatusPill>{order.orderStatusLabel}</StatusPill>}
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <div className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                주문 상품
              </h2>
              <div className="mt-5 divide-y divide-black/6">
                {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="grid gap-4 py-4 sm:grid-cols-[72px_minmax(0,1fr)_120px]"
                    >
                      <div className="h-[72px] overflow-hidden rounded-xl bg-[#dedbd5]">
                        {item.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-950">{item.name}</p>
                        <p className="mt-1 text-sm leading-5 text-stone-500">
                          {item.category}
                        </p>
                        <p className="mt-1 text-sm text-stone-500">수량 {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-stone-950 sm:text-right">
                        ₩{item.total.toLocaleString("ko-KR")}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                배송 정보
              </h2>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-[120px_minmax(0,1fr)]">
                <dt className="text-stone-500">수령인</dt>
                <dd className="text-stone-900">{order.recipientName}</dd>
                <dt className="text-stone-500">연락처</dt>
                <dd className="text-stone-900">{order.recipientPhone}</dd>
                <dt className="text-stone-500">주소</dt>
                <dd className="text-stone-900">
                  {order.recipientAddress}
                  {order.recipientDetailAddress
                    ? `, ${order.recipientDetailAddress}`
                    : ""}
                </dd>
                <dt className="text-stone-500">배송 메모</dt>
                <dd className="text-stone-900">{order.deliveryMemo || "-"}</dd>
              </dl>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                주문 처리
              </h2>
              <form action={updateAdminOrderStatus} className="mt-5 space-y-5">
                <input type="hidden" name="orderNumber" value={order.orderNumber} />
                <label className="block">
                  <span className="text-sm font-medium text-stone-700">
                    주문 상태
                  </span>
                  <select
                    name="orderStatus"
                    defaultValue={order.orderStatus}
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
                  >
                    {adminOrderStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-stone-700">운송장 번호</span>
                  <input
                    placeholder="택배사 / 운송장 번호"
                    className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm outline-none transition focus:border-stone-900"
                  />
                </label>
                <button className="h-12 w-full rounded-xl bg-stone-950 px-6 text-sm font-medium text-white transition hover:bg-stone-800">
                  상태 저장
                </button>
              </form>
            </div>

            <div className="rounded-[1.5rem] border border-black/6 bg-white px-6 py-6">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                결제 정보
              </h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">결제 상태</dt>
                  <dd className="font-medium text-stone-950">
                    {order.paymentStatusLabel}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">결제 수단</dt>
                  <dd className="font-medium text-stone-950">{order.paymentMethod}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">배송비</dt>
                  <dd className="font-medium text-stone-950">
                    ₩{order.shippingFee.toLocaleString("ko-KR")}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-black/6 pt-3">
                  <dt className="text-stone-500">총 결제 금액</dt>
                  <dd className="text-lg font-semibold text-stone-950">
                    ₩{order.total.toLocaleString("ko-KR")}
                  </dd>
                </div>
              </dl>
            </div>

            <AdminSecondaryLink href="/admin/orders">목록으로</AdminSecondaryLink>
          </aside>
        </section>
      </div>
    </AdminShell>
  );
}
