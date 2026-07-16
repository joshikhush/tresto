import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

/** Small uppercase violet label used above section titles (e.g. "What we do"). */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "tracking-label text-xs font-semibold uppercase text-violet",
        className
      )}
    >
      {children}
    </p>
  );
}
