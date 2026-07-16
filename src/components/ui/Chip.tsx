import { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ChipTone = "violet" | "gold" | "emerald" | "red" | "blue" | "amber";

const toneClasses: Record<ChipTone, string> = {
  violet: "bg-lilac-card text-violet",
  gold: "bg-gold/15 text-gold",
  emerald: "bg-emerald-bg text-emerald",
  red: "bg-red-bg text-red",
  blue: "bg-blue-bg text-blue",
  amber: "bg-amber-bg text-amber",
};

interface ChipProps {
  /** Usually a lucide-react icon, e.g. <Sparkles className="h-5 w-5" />. */
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
}

/** Tinted icon chip used in card grids (Services, Values). Rotate tones for variety. */
export function Chip({ children, tone = "violet", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-chip",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
