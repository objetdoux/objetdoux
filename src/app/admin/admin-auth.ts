import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type AdminSession = {
  id: string;
  authUserId: string;
  email: string;
  name: string;
  role: string;
};

type AdminUserRow = {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("admin_users")
    .select("id, email, name, role, is_active")
    .eq("email", user.email)
    .eq("is_active", true)
    .maybeSingle<AdminUserRow>();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    authUserId: user.id,
    email: data.email,
    name: data.name,
    role: data.role,
  };
}
