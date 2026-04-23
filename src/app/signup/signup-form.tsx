"use client";

import { useActionState } from "react";
import { signup } from "../auth/actions";
import type { AuthActionState } from "../auth/actions";

const initialState: AuthActionState = {
  status: "idle",
  message: "",
};

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, initialState);

  return (
    <form action={action}>
      <div className="mt-8 space-y-6">
        <label className="block">
          <span className="text-sm text-stone-500">이름</span>
          <input
            name="name"
            type="text"
            placeholder="이름을 입력해주세요"
            className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />
        </label>

        <label className="block">
          <span className="text-sm text-stone-500">이메일</span>
          <input
            name="email"
            type="email"
            placeholder="objetdoux@example.com"
            className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />
        </label>

        <label className="block">
          <span className="text-sm text-stone-500">연락처</span>
          <input
            name="phone"
            type="tel"
            placeholder="010-0000-0000"
            className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />
        </label>

        <label className="block">
          <span className="text-sm text-stone-500">비밀번호</span>
          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />
        </label>

        <label className="block">
          <span className="text-sm text-stone-500">비밀번호 확인</span>
          <input
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            className="mt-3 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />
        </label>
      </div>

      {state.message ? (
        <p className="mt-4 text-sm leading-5 text-red-600">{state.message}</p>
      ) : null}

      <div className="mt-8">
        <button
          disabled={pending}
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-stone-950 px-5 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "가입 중" : "회원가입 완료"}
        </button>
      </div>
    </form>
  );
}
