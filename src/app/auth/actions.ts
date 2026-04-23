"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type AuthActionState = {
  status: "idle" | "error";
  message: string;
};

export async function login(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      status: "error",
      message: "이메일과 비밀번호를 입력해주세요.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      status: "error",
      message: "로그인 정보를 다시 확인해주세요.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/mypage");
}

export async function signup(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");

  if (!name || !email || !phone || !password) {
    return {
      status: "error",
      message: "필수 정보를 모두 입력해주세요.",
    };
  }

  if (password.length < 6) {
    return {
      status: "error",
      message: "비밀번호는 최소 6자 이상 입력해주세요.",
    };
  }

  if (password !== passwordConfirm) {
    return {
      status: "error",
      message: "비밀번호 확인이 일치하지 않습니다.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
      },
    },
  });

  if (error) {
    return {
      status: "error",
      message: "회원가입 정보를 다시 확인해주세요.",
    };
  }

  if (data.user) {
    const admin = createAdminClient();
    await admin.from("users").upsert(
      {
        auth_user_id: data.user.id,
        email,
        name,
        phone,
        provider: "email",
        is_active: true,
      },
      { onConflict: "email" },
    );
  }

  revalidatePath("/", "layout");
  redirect("/login?joined=1");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}
