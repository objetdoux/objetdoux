"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { adminLogin, type AdminAuthActionState } from "../auth-actions";

const initialState: AdminAuthActionState = {
  status: "idle",
  message: "",
};

export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(
    adminLogin,
    initialState,
  );
  const nextPath = searchParams.get("next") || "/admin";

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <input type="hidden" name="nextPath" value={nextPath} />
      <label className="block">
        <span className="text-sm font-medium text-stone-700">이메일</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm outline-none transition focus:border-stone-900"
          placeholder="admin@objetdoux.com"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-stone-700">비밀번호</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm outline-none transition focus:border-stone-900"
          placeholder="objetdoux2026"
        />
      </label>

      {state.status === "error" ? (
        <p className="text-sm text-red-600">{state.message}</p>
      ) : null}

      <button
        disabled={isPending}
        className="h-12 w-full rounded-xl bg-stone-950 px-6 text-sm font-medium text-white transition hover:bg-stone-800 disabled:bg-stone-300"
      >
        {isPending ? "확인 중" : "관리자 로그인"}
      </button>

      <p className="text-xs leading-5 text-stone-500">
        Supabase Auth 계정 중 `admin_users`에 등록된 이메일만 접근할 수
        있습니다.
      </p>
    </form>
  );
}
