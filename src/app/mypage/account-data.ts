import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type AccountProfileRow = {
  id: string;
  auth_user_id: string | null;
  email: string;
  name: string;
  phone: string | null;
  provider: string;
  created_at: string;
};

export type AccountProfile = {
  id: string;
  authUserId: string;
  email: string;
  name: string;
  phone: string;
  provider: string;
  joinedAt: string;
};

const joinedAtFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function formatJoinedAt(value: string) {
  return joinedAtFormatter.format(new Date(value)).replaceAll(". ", ".");
}

function mapAccountProfile(row: AccountProfileRow): AccountProfile {
  return {
    id: row.id,
    authUserId: row.auth_user_id ?? "",
    email: row.email,
    name: row.name,
    phone: row.phone ?? "-",
    provider: row.provider,
    joinedAt: formatJoinedAt(row.created_at),
  };
}

export async function getCurrentAccountProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const admin = createAdminClient();
  const { data: existingProfile } = await admin
    .from("users")
    .select("id, auth_user_id, email, name, phone, provider, created_at")
    .eq("auth_user_id", user.id)
    .maybeSingle<AccountProfileRow>();

  if (existingProfile) {
    return mapAccountProfile(existingProfile);
  }

  const email = user.email ?? "";
  const metadata = user.user_metadata;
  const name =
    typeof metadata.name === "string" && metadata.name.trim()
      ? metadata.name.trim()
      : email.split("@")[0] || "objetdoux member";
  const phone =
    typeof metadata.phone === "string" && metadata.phone.trim()
      ? metadata.phone.trim()
      : null;

  const { data: createdProfile, error } = await admin
    .from("users")
    .upsert(
      {
        auth_user_id: user.id,
        email,
        name,
        phone,
        provider: "email",
        is_active: true,
      },
      { onConflict: "email" },
    )
    .select("id, auth_user_id, email, name, phone, provider, created_at")
    .single<AccountProfileRow>();

  if (error || !createdProfile) {
    redirect("/login");
  }

  return mapAccountProfile(createdProfile);
}
