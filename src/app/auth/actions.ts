"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AuthActionState = {
  status: "idle" | "error";
  message: string;
  values?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  fieldErrors?: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    passwordConfirm?: string;
  };
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
      values: { email },
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
      values: { email },
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
  const values = { name, email, phone };
  const fieldErrors: NonNullable<AuthActionState["fieldErrors"]> = {};

  if (!name) {
    fieldErrors.name = "이름을 입력해주세요.";
  }

  if (!email) {
    fieldErrors.email = "이메일을 입력해주세요.";
  }

  if (!phone) {
    fieldErrors.phone = "연락처를 입력해주세요.";
  }

  if (!password) {
    fieldErrors.password = "비밀번호를 입력해주세요.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "필수 정보를 모두 입력해주세요.",
      values,
      fieldErrors,
    };
  }

  if (password.length < 6) {
    return {
      status: "error",
      message: "비밀번호는 최소 6자 이상 입력해주세요.",
      values,
      fieldErrors: {
        password: "비밀번호는 최소 6자 이상 입력해주세요.",
      },
    };
  }

  if (password !== passwordConfirm) {
    return {
      status: "error",
      message: "비밀번호 확인이 일치하지 않습니다.",
      values,
      fieldErrors: {
        passwordConfirm: "비밀번호가 일치하지 않습니다.",
      },
    };
  }

  const supabase = await createClient();
  const origin = await getRequestOrigin();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/login?verified=1`,
      data: {
        name,
        phone,
      },
    },
  });

  if (error) {
    const emailMessage = error.message.toLowerCase().includes("already")
      ? "이미 가입된 이메일일 수 있습니다."
      : "이메일 형식 또는 회원가입 정보를 다시 확인해주세요.";

    return {
      status: "error",
      message: "회원가입 정보를 다시 확인해주세요.",
      values,
      fieldErrors: {
        email: emailMessage,
      },
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
  redirect(`/signup/complete?email=${encodeURIComponent(email)}`);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}

async function getRequestOrigin() {
  const headerStore = await headers();
  const host = headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? "https";

  if (host) {
    return `${protocol}://${host}`;
  }

  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://objetdoux.com";
}
