import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentAccountProfile } from "../account-data";

type AddressRow = {
  id: string;
  recipient_name: string;
  phone: string;
  zone_code: string | null;
  address: string;
  detail_address: string | null;
  delivery_memo: string | null;
  is_default: boolean;
  created_at: string;
};

export type AccountAddress = {
  id: string;
  recipientName: string;
  phone: string;
  zoneCode: string;
  address: string;
  detailAddress: string;
  deliveryMemo: string;
  isDefault: boolean;
};

function mapAddress(row: AddressRow): AccountAddress {
  return {
    id: row.id,
    recipientName: row.recipient_name,
    phone: row.phone,
    zoneCode: row.zone_code ?? "",
    address: row.address,
    detailAddress: row.detail_address ?? "",
    deliveryMemo: row.delivery_memo ?? "",
    isDefault: row.is_default,
  };
}

export async function getAccountAddresses() {
  const account = await getCurrentAccountProfile();

  return getAccountAddressesByAccountId(account.id);
}

export async function getAccountAddressesByAccountId(accountId: string) {
  const admin = createAdminClient();

  const { data } = await admin
    .from("addresses")
    .select(
      "id, recipient_name, phone, zone_code, address, detail_address, delivery_memo, is_default, created_at",
    )
    .eq("user_id", accountId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false })
    .returns<AddressRow[]>();

  return (data ?? []).map(mapAddress);
}

export async function getAccountAddress(addressId: string) {
  const account = await getCurrentAccountProfile();
  const admin = createAdminClient();

  const { data } = await admin
    .from("addresses")
    .select(
      "id, recipient_name, phone, zone_code, address, detail_address, delivery_memo, is_default, created_at",
    )
    .eq("id", addressId)
    .eq("user_id", account.id)
    .maybeSingle<AddressRow>();

  return data ? mapAddress(data) : null;
}

export async function getCurrentAccountId() {
  const account = await getCurrentAccountProfile();

  return account.id;
}
