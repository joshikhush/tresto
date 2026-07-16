import { cn } from "@/lib/cn";

interface GhostWordProps {
  children: string;
  /** "dark" = on a dark section bg (faint white); "light" = on a light bg (faint ink). */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Faint oversized background word behind a section's eyebrow/heading —
 * purely decorative (`aria-hidden`, `pointer-events-none`). The section
 * using it must pass `className="relative overflow-hidden"` to its
 * `<Section>` (or already have it) so this can't cause horizontal
 * overflow on narrow viewports — long phrases are expected to bleed off
 * the edge and get clipped rather than wrap.
 */
export function GhostWord({ children, tone = "light", className }: GhostWordProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute -left-1 -top-2 select-none whitespace-nowrap font-display text-[4rem] font-extrabold leading-none sm:text-[5.5rem] lg:-top-4 lg:text-[7rem]",
        tone === "dark" ? "text-white/[0.05]" : "text-ink/[0.04]",
        className
      )}
    >
      {children}
    </span>
  );
}
