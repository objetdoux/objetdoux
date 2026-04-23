import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getAdminSession } from "./admin-auth";
import { AdminLogoutButton } from "./admin-logout-button";
import { adminNavItems } from "./admin-data";

export async function AdminShell({ children }: { children: ReactNode }) {
  const adminSession = await getAdminSession();

  if (!adminSession) {
    redirect("/admin/login");
  }

  return (
    <main className="bg-[#f7f3ee] px-5 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="rounded-[1.5rem] border border-black/6 bg-white px-5 py-5">
          <Link
            href="/admin"
            className="block text-sm font-semibold tracking-[0.3em] text-stone-950"
          >
            OBJETDOUX ADMIN
          </Link>
          <p className="mt-2 text-xs leading-5 text-stone-500">
            {adminSession.name} / {adminSession.role}
          </p>

          <nav className="mt-6 space-y-1">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex h-11 items-center rounded-xl px-3 text-sm font-medium text-stone-700 transition hover:text-stone-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="mt-6 flex h-11 items-center rounded-xl border border-black/8 px-3 text-sm text-stone-600 transition hover:border-stone-900 hover:text-stone-950"
          >
            사이트로 돌아가기
          </Link>
          <AdminLogoutButton />
        </aside>

        <section>{children}</section>
      </div>
    </main>
  );
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[1.5rem] border border-black/6 bg-white px-6 py-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-medium tracking-[0.22em] text-stone-400">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-stone-950">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-sm leading-5 text-stone-600">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function AdminPrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 items-center justify-center rounded-xl bg-stone-950 px-5 text-sm font-medium text-white transition hover:bg-stone-800"
    >
      {children}
    </Link>
  );
}

export function AdminSecondaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 items-center justify-center rounded-xl border border-black/8 px-5 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-950"
    >
      {children}
    </Link>
  );
}

export function AdminTextField({
  label,
  name,
  value,
  placeholder,
  type = "text",
  form,
}: {
  label: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  type?: string;
  form?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <input
        name={name}
        form={form}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
      />
    </label>
  );
}

export function AdminSelectField({
  label,
  name,
  value,
  options,
}: {
  label: string;
  name?: string;
  value?: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <select
        name={name}
        defaultValue={value}
        className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#faf8f5] px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function AdminTextarea({
  label,
  name,
  value,
  placeholder,
}: {
  label: string;
  name?: string;
  value?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <textarea
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        rows={4}
        className="mt-2 w-full resize-none rounded-xl border border-black/8 bg-[#faf8f5] px-4 py-3 text-sm leading-6 text-stone-900 outline-none transition focus:border-stone-900"
      />
    </label>
  );
}

export function StatusPill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "dark" | "muted";
}) {
  const toneClass =
    tone === "dark"
      ? "bg-stone-950 text-white"
      : tone === "muted"
        ? "bg-stone-100 text-stone-500"
        : "bg-[#f0ebe4] text-stone-700";

  return (
    <span
      className={`inline-flex h-8 items-center whitespace-nowrap rounded-full px-3 text-xs font-medium ${toneClass}`}
    >
      {children}
    </span>
  );
}
