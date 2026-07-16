import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TodoBadgeProps {
  children: ReactNode;
  className?: string;
}

/** Flags a value Hitesh hasn't confirmed yet — BUILD_SPEC §3 honesty guardrails. */
export function TodoBadge({ children, className }: TodoBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-chip border border-dashed border-red bg-red-bg/40 px-3 py-1 text-xs font-semibold text-red",
        className
      )}
    >
      TODO: {children}
    </span>
  );
}
