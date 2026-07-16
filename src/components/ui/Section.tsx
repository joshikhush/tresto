import { ReactNode } from "react";
import { cn } from "@/lib/cn";

const backgrounds = {
  white: "bg-white",
  "lilac-100": "bg-lilac-100",
  "lilac-50": "bg-lilac-50",
  "lilac-card": "bg-lilac-card",
  "blue-tint": "bg-blue-tint",
  "pink-tint": "bg-pink-tint",
  ink: "bg-ink",
  "hero-gradient": "bg-hero-gradient",
  "footer-gradient": "bg-footer-gradient",
} as const;

export type SectionBackground = keyof typeof backgrounds;

interface SectionProps {
  children: ReactNode;
  /** Section background token — BUILD_SPEC §2. Rotate across adjacent sections. */
  bg?: SectionBackground;
  id?: string;
  /** Classes applied to the outer element (e.g. overflow-hidden for glow effects). */
  className?: string;
  /** Classes applied to the inner max-width container. */
  containerClassName?: string;
  /** Outer element tag — "footer" for the mega footer (S18), "section" otherwise. */
  as?: "section" | "footer";
}

/** Global section wrapper: 1200px max-width, 32px horizontal / ~90px vertical padding. */
export function Section({
  children,
  bg = "white",
  id,
  className,
  containerClassName,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag id={id} className={cn(backgrounds[bg], "py-16 md:py-[90px]", className)}>
      <div className={cn("mx-auto max-w-[1200px] px-8", containerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
