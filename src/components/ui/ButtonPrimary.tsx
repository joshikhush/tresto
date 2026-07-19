import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface ButtonPrimarySharedProps {
  children: ReactNode;
  /** Rendered after the label; slides right ~3px on hover (disabled under prefers-reduced-motion). */
  icon?: ReactNode;
  className?: string;
}

type ButtonPrimaryAsButton = ButtonPrimarySharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonPrimaryAsLink = ButtonPrimarySharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string; disabled?: boolean };

type ButtonPrimaryProps = ButtonPrimaryAsButton | ButtonPrimaryAsLink;

// Rest/hover/focus each set a full `box-shadow` value (never a bare
// `ring-*` utility) and stay mutually exclusive via :hover/:focus-visible —
// mixing arbitrary `shadow-[...]` with Tailwind's `ring-*` utilities means
// two same-specificity rules target the one `box-shadow` property, and
// which one wins is decided by Tailwind's internal stylesheet order, not
// source order (confirmed empirically: `focus-visible:ring-2` silently lost
// to the bare `shadow-[...]` here). Same fix as ContactSection's
// FloatingField. The focus ring is a 2-layer shadow (white gap + indigo
// ring) standing in for `ring-2 ring-offset-2`.
const REST_SHADOW = "shadow-[0_10px_26px_-10px_rgba(139,92,246,0.55)]";
const FOCUS_SHADOW =
  "focus-visible:shadow-[0_10px_26px_-10px_rgba(139,92,246,0.55),0_0_0_3px_#fff,0_0_0_5px_var(--indigo)]";

const CLASSES = cn(
  "group relative inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[11px] px-7 py-[15px]",
  "bg-[image:var(--gradient-main)] text-[14.5px] font-semibold text-white",
  REST_SHADOW,
  "transition-[transform,box-shadow] duration-[350ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
  "hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-10px_rgba(139,92,246,0.7)]",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
  "outline-none",
  FOCUS_SHADOW,
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
  // Written as a literal (not interpolated from REST_SHADOW) — Tailwind's
  // build-time scanner greps raw source text for class-like tokens, so a
  // template-literal-assembled class name here wouldn't be found/generated.
  "disabled:hover:shadow-[0_10px_26px_-10px_rgba(139,92,246,0.55)]",
  "aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:pointer-events-none"
);

function IconSlot({ icon }: { icon: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 transition-transform duration-[350ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
      {icon}
    </span>
  );
}

/**
 * The one primary CTA per section — gradient fill, per the Contact section
 * reference implementation. Renders a real `<button>`, or a `<Link>` when
 * `href` is given (never a styled `<div>`).
 */
export function ButtonPrimary({ children, icon, className, ...props }: ButtonPrimaryProps) {
  const classes = cn(CLASSES, className);

  if (props.href !== undefined) {
    const { href, disabled, ...rest } = props as ButtonPrimaryAsLink;
    return (
      <Link
        href={href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className={classes}
        {...rest}
      >
        {children}
        {icon && <IconSlot icon={icon} />}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {icon && <IconSlot icon={icon} />}
    </button>
  );
}
