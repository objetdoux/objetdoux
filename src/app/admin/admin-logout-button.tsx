import { adminLogout } from "./auth-actions";
import { PendingButton } from "../components/pending-button";

export function AdminLogoutButton() {
  return (
    <form action={adminLogout}>
      <PendingButton
        pendingLabel="로그아웃 중"
        className="mt-3 flex h-11 w-full items-center rounded-xl border border-black/8 px-3 text-left text-sm text-stone-600 transition hover:border-stone-900 hover:text-stone-950 disabled:cursor-wait disabled:opacity-60"
      >
        로그아웃
      </PendingButton>
    </form>
  );
}
