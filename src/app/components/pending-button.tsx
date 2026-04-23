"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type PendingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  pendingLabel?: ReactNode;
};

export function PendingButton({
  children,
  pendingLabel,
  disabled,
  className,
  ...props
}: PendingButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = disabled || pending;

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-busy={pending}
      className={className}
    >
      <span className="inline-flex items-center justify-center gap-2">
        {pending ? <PendingDot /> : null}
        {pending ? (pendingLabel ?? children) : children}
      </span>
    </button>
  );
}

function PendingDot() {
  return (
    <span
      aria-hidden="true"
      className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent"
    />
  );
}
