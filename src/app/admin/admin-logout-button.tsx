import { adminLogout } from "./auth-actions";

export function AdminLogoutButton() {
  return (
    <form action={adminLogout}>
      <button className="mt-3 flex h-11 w-full items-center rounded-xl border border-black/8 px-3 text-left text-sm text-stone-600 transition hover:border-stone-900 hover:text-stone-950">
        로그아웃
      </button>
    </form>
  );
}
