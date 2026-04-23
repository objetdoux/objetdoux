"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AccountProfile } from "../mypage/account-data";
import type { AccountAddress } from "../mypage/addresses/address-data";

type CheckoutAddressFieldsProps = {
  account: AccountProfile;
  addresses: AccountAddress[];
};

type ShippingFormState = {
  recipientName: string;
  recipientPhone: string;
  zoneCode: string;
  recipientAddress: string;
  recipientDetailAddress: string;
  deliveryMemo: string;
};

function createStateFromAddress(
  address: AccountAddress | null,
  account: AccountProfile,
): ShippingFormState {
  return {
    recipientName: address?.recipientName ?? account.name,
    recipientPhone: address?.phone ?? (account.phone === "-" ? "" : account.phone),
    zoneCode: address?.zoneCode ?? "",
    recipientAddress: address?.address ?? "",
    recipientDetailAddress: address?.detailAddress ?? "",
    deliveryMemo: address?.deliveryMemo ?? "",
  };
}

export function CheckoutAddressFields({
  account,
  addresses,
}: CheckoutAddressFieldsProps) {
  const defaultAddress = useMemo(
    () => addresses.find((address) => address.isDefault) ?? addresses[0] ?? null,
    [addresses],
  );
  const [selectedAddressId, setSelectedAddressId] = useState(
    defaultAddress?.id ?? "manual",
  );
  const [shippingInfo, setShippingInfo] = useState(() =>
    createStateFromAddress(defaultAddress, account),
  );

  function applyAddress(addressId: string) {
    setSelectedAddressId(addressId);

    if (addressId === "manual") {
      setShippingInfo(createStateFromAddress(null, account));
      return;
    }

    const selectedAddress =
      addresses.find((address) => address.id === addressId) ?? null;
    setShippingInfo(createStateFromAddress(selectedAddress, account));
  }

  function updateField(field: keyof ShippingFormState, value: string) {
    setSelectedAddressId("manual");
    setShippingInfo((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <section className="rounded-[1.75rem] border border-black/6 bg-white px-6 py-7 sm:px-8 sm:py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
            배송 정보
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            저장된 배송지를 불러오거나, 이번 주문에 사용할 배송지를 직접 입력할 수
            있습니다.
          </p>
        </div>
        <Link
          href="/mypage/addresses/new?returnTo=/checkout"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-black/8 px-4 text-sm font-medium text-stone-600 transition hover:border-stone-900 hover:text-stone-950"
        >
          배송지 추가
        </Link>
      </div>

      {addresses.length > 0 ? (
        <div className="mt-6 rounded-[1.25rem] bg-[#faf8f5] px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-stone-950">
                배송지 불러오기
              </p>
            </div>
            <select
              value={selectedAddressId}
              onChange={(event) => applyAddress(event.target.value)}
              className="h-10 rounded-lg border border-black/8 bg-white px-3 text-sm text-stone-700 outline-none transition focus:border-stone-900"
            >
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.isDefault ? "기본 배송지 - " : ""}
                  {address.recipientName} / {address.address}
                </option>
              ))}
              <option value="manual">직접 입력</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-[1.25rem] bg-[#faf8f5] px-4 py-4 text-sm leading-6 text-stone-600">
          등록된 배송지가 없습니다. 이번 주문에 사용할 배송지를 직접 입력하거나
          배송지를 먼저 추가해주세요.
        </div>
      )}

      <div className="mt-6 grid gap-4">
        <label className="block">
          <span className="text-sm text-stone-500">받는 분</span>
          <input
            name="recipientName"
            type="text"
            value={shippingInfo.recipientName}
            onChange={(event) => updateField("recipientName", event.target.value)}
            required
            className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />
        </label>

        <label className="block">
          <span className="text-sm text-stone-500">받는 분 연락처</span>
          <input
            name="recipientPhone"
            type="tel"
            value={shippingInfo.recipientPhone}
            onChange={(event) => updateField("recipientPhone", event.target.value)}
            required
            className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />
        </label>

        <input type="hidden" name="zoneCode" value={shippingInfo.zoneCode} />
        <label className="block">
          <span className="text-sm text-stone-500">주소</span>
          <input
            name="recipientAddress"
            type="text"
            value={shippingInfo.recipientAddress}
            onChange={(event) =>
              updateField("recipientAddress", event.target.value)
            }
            required
            className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />
        </label>

        <label className="block">
          <span className="text-sm text-stone-500">상세 주소</span>
          <input
            name="recipientDetailAddress"
            type="text"
            value={shippingInfo.recipientDetailAddress}
            onChange={(event) =>
              updateField("recipientDetailAddress", event.target.value)
            }
            className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />
        </label>

        <label className="block">
          <span className="text-sm text-stone-500">배송 메모</span>
          <input
            name="deliveryMemo"
            type="text"
            value={shippingInfo.deliveryMemo}
            onChange={(event) => updateField("deliveryMemo", event.target.value)}
            placeholder="부재 시 문 앞에 놓아주세요"
            className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />
        </label>
      </div>
    </section>
  );
}
