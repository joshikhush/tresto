import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonSecondaryTone = "brand" | "on-dark";

interface ButtonSecondarySharedProps {
  children: ReactNode;
  /** Rendered after the label. No hover-slide (that's a `ButtonPrimary`-only detail). */
  icon?: ReactNode;
  className?: string;
  /**
   * "brand" (default): indigo border/text, per spec. "on-dark": swaps to a
   * white border/text pair — indigo-on-dark-hero-gradient measures ~3.6:1,
   * short of WCAG AA's 4.5:1 for this text size. Branches the whole class
   * string rather than relying on a consumer `className` override, since
   * two same-specificity utility classes targeting the same property don't
   * reliably resolve by source order here (Tailwind's compiled stylesheet
   * order wins instead) — see the FAQ section's own note on this in
   * globals.css.
   */
  tone?: ButtonSecondaryTone;
}

type ButtonSecondaryAsButton = ButtonSecondarySharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonSecondaryAsLink = ButtonSecondarySharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string; disabled?: boolean };

type ButtonSecondaryProps = ButtonSecondaryAsButton | ButtonSecondaryAsLink;

// Box-shadow is only ever set via a single pseudo-class variant at a time
// (:hover or :focus-visible — never a bare/unprefixed shadow utility), so
// there's no same-specificity collision on the realistic keyboard-only-
// focus path. See ButtonPrimary.tsx for the case where that DID collide
// (a bare `shadow-[...]` silently beat `focus-visible:ring-2` there) and
// why both components avoid Tailwind's separate `ring-*` utilities in
// favor of one combined arbitrary `shadow-[...]` per state.
const BASE_CLASSES =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[30px] border-[1.5px] px-[22px] py-[13px] " +
  "bg-transparent text-[14px] font-semibold outline-none " +
  "transition-[background-color,color,transform,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] " +
  "hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(109,90,230,0.5)] " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 " +
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-transparent disabled:hover:shadow-none " +
  "aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:pointer-events-none";

const TONE_CLASSES: Record<ButtonSecondaryTone, string> = {
  brand:
    "border-[var(--indigo)] text-[var(--indigo)] hover:bg-[var(--indigo)] hover:text-white " +
    "focus-visible:shadow-[0_0_0_3px_#fff,0_0_0_5px_var(--indigo)] disabled:hover:text-[var(--indigo)]",
  "on-dark":
    "border-white text-white hover:bg-white hover:text-ink " +
    "focus-visible:shadow-[0_0_0_3px_#fff] disabled:hover:text-white",
};

/**
 * Any supporting action that shouldn't compete with a section's primary
 * CTA — transparent/outline pill, per the Contact section reference
 * implementation. Renders a real `<button>`, or a `<Link>` when `href` is
 * given (never a styled `<div>`).
 */
export function ButtonSecondary({ children, icon, className, tone = "brand", ...props }: ButtonSecondaryProps) {
  const classes = cn(BASE_CLASSES, TONE_CLASSES[tone], className);

  if (props.href !== undefined) {
    const { href, disabled, ...rest } = props as ButtonSecondaryAsLink;
    return (
      <Link
        href={href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className={classes}
        {...rest}
      >
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {icon}
    </button>
  );
}
