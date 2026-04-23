"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "../auth/actions";
import type { AuthActionState } from "../auth/actions";

const initialState: AuthActionState = {
  status: "idle",
  message: "",
};

export function LoginForm({
  joined,
  verified,
  authError,
}: {
  joined: boolean;
  verified: boolean;
  authError: boolean;
}) {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <form key={state.values?.email ?? state.message} action={action}>
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
          일반 로그인
        </h2>
        {joined ? (
          <p className="mt-2 text-sm leading-5 text-green-700">
            회원가입이 완료되었습니다. 가입한 이메일로 로그인해주세요.
          </p>
        ) : null}
        {verified ? (
          <p className="mt-2 text-sm leading-5 text-green-700">
            이메일 인증이 완료되었습니다. 이제 로그인할 수 있습니다.
          </p>
        ) : null}
        {authError ? (
          <p className="mt-2 text-sm leading-5 text-red-600">
            인증 링크가 만료되었거나 올바르지 않습니다. 다시 시도해주세요.
          </p>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4">
        <label className="block">
          <span className="text-sm text-stone-500">이메일</span>
          <input
            name="email"
            type="email"
            defaultValue={state.values?.email ?? ""}
            placeholder="objetdoux@example.com"
            className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />
        </label>
        <label className="block">
          <span className="text-sm text-stone-500">비밀번호</span>
          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
          />
        </label>
      </div>

      {state.message ? (
        <p className="mt-4 text-sm leading-5 text-red-600">{state.message}</p>
      ) : null}

      <div className="mt-6">
        <button
          disabled={pending}
          className="block h-12 w-full rounded-xl bg-stone-950 px-6 text-center text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "로그인 중" : "로그인"}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-stone-500">
        <Link href="/signup" className="transition hover:text-stone-900">
          회원가입
        </Link>
        <Link href="/find-id" className="transition hover:text-stone-900">
          아이디 찾기
        </Link>
        <Link href="/reset-password" className="transition hover:text-stone-900">
          비밀번호 찾기
        </Link>
      </div>
    </form>
  );
}
