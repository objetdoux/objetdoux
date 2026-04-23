"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type AdminAuthActionState = {
  status: "idle" | "error";
  message: string;
};

export async function adminLogin(
  _prevState: AdminAuthActionState,
  formData: FormData,
): Promise<AdminAuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("nextPath") ?? "/admin");

  if (!email || !password) {
    return {
      status: "error",
      message: "이메일과 비밀번호를 입력해주세요.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      status: "error",
      message: "관리자 로그인 정보를 다시 확인해주세요.",
    };
  }

  const admin = createAdminClient();
  const { data: adminUser, error: adminUserError } = await admin
    .from("admin_users")
    .select("id")
    .eq("email", data.user.email)
    .eq("is_active", true)
    .maybeSingle<{ id: string }>();

  if (adminUserError || !adminUser) {
    await supabase.auth.signOut();
    return {
      status: "error",
      message: "관리자 권한이 없는 계정입니다.",
    };
  }

  await admin
    .from("admin_users")
    .update({
      auth_user_id: data.user.id,
      last_login_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", adminUser.id);

  revalidatePath("/admin", "layout");
  redirect(nextPath.startsWith("/admin") ? nextPath : "/admin");
}

export async function adminLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/admin", "layout");
  redirect("/admin/login");
}
