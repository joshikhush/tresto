import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonSecondaryTone = "brand" | "on-dark";

interface ButtonSecondarySharedProps {
  children: ReactNode;
  /** Rendered after the label; slides right 5px on hover, matching `ButtonPrimary`'s icon (3px there). */
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

/**
 * The original "Get in Touch" hover: a violet→gold gradient panel that
 * slides in from the left (`-translate-x-[101%]` → `0`) on hover/focus,
 * 350ms, this exact easing. Shared verbatim by the navbar link and this
 * component's consumers (Hero's "View Our Work", Cases' "See all work") —
 * import and render it rather than re-describing the sweep per call site.
 */
export const SWEEP_EASE = "cubic-bezier(0.4,0,0.2,1)";

// group/relative/overflow-hidden host the sweep fill; the 1px/200ms lift is
// the other half of the original effect. Shared alongside `HoverSweepFill`
// so every consumer gets the identical container behavior too.
export const SWEEP_LIFT_CLASSES = "group relative overflow-hidden transition-transform duration-200 hover:-translate-y-px";

export function HoverSweepFill() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 -translate-x-[101%] bg-[linear-gradient(120deg,var(--color-violet),var(--color-gold))] transition-transform duration-[350ms] group-hover:translate-x-0 group-focus-visible:translate-x-0"
      style={{ transitionTimingFunction: SWEEP_EASE }}
    />
  );
}

const BASE_CLASSES = cn(
  SWEEP_LIFT_CLASSES,
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[30px] border-[1.5px] px-[22px] py-[13px]",
  "bg-transparent text-[14px] font-semibold outline-none",
  "transition-[transform,box-shadow,color] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
  "hover:shadow-[0_10px_24px_-10px_rgba(109,90,230,0.5)]",
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none",
  "aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:pointer-events-none"
);

const TONE_CLASSES: Record<ButtonSecondaryTone, string> = {
  brand:
    "border-[var(--indigo)] text-[var(--indigo)] hover:text-white " +
    "focus-visible:shadow-[0_0_0_3px_#fff,0_0_0_5px_var(--indigo)] disabled:hover:text-[var(--indigo)]",
  "on-dark":
    "border-white text-white " +
    "focus-visible:shadow-[0_0_0_3px_#fff] disabled:hover:text-white",
};

// Matches ButtonPrimary's IconSlot timing but slides 5px (vs. 3px) — the
// distance specified for this shared hover treatment. Sits above the sweep
// fill (`relative z-10`) so it stays visible through the gradient.
function IconSlot({ icon }: { icon: ReactNode }) {
  return (
    <span className="relative z-10 inline-flex shrink-0 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[5px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
      {icon}
    </span>
  );
}

/**
 * Any supporting action that shouldn't compete with a section's primary
 * CTA — transparent/outline pill, per the Contact section reference
 * implementation. Renders a real `<button>`, or a `<Link>` when `href` is
 * given (never a styled `<div>`).
 */
export function ButtonSecondary({ children, icon, className, tone = "brand", ...props }: ButtonSecondaryProps) {
  const classes = cn(BASE_CLASSES, TONE_CLASSES[tone], className);

  const content = (
    <>
      <HoverSweepFill />
      <span className="relative z-10">{children}</span>
      {icon && <IconSlot icon={icon} />}
    </>
  );

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
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
