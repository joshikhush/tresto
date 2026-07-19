"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

const DURATION_MS = 700;
const EASE = "cubic-bezier(.22,1,.36,1)";

interface UseRevealOptions {
  /** Stagger offset in ms, applied as a transition-delay once the element enters view. */
  delay?: number;
  /** IntersectionObserver threshold — fraction of the element visible before it reveals. */
  amount?: number;
}

/**
 * Reveal primitive: an IntersectionObserver-driven ref + inline style pair
 * that fades an element in and slides it up from translateY(24px) the first
 * time ~`amount` of it enters the viewport, then stops observing (never
 * re-hides on scroll-up). Spread `style` onto the element that should carry
 * the `transform` directly — a non-`none` `transform` makes its element the
 * containing block for any `position: absolute`/`fixed` descendants, so for
 * an element whose OWN absolute positioning resolves against a non-immediate
 * ancestor (e.g. `.tst-eyebrow` against `.tst-stage`), routing the transform
 * through an extra wrapper `<div>` (as `Reveal` below does) would silently
 * insert a new containing block and reposition it — use this hook directly
 * on the element itself instead in that situation.
 */
export function useReveal<T extends HTMLElement>({ delay = 0, amount = 0.2 }: UseRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: amount }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion, amount]);

  const revealed = prefersReducedMotion || visible;

  const style: CSSProperties | undefined = prefersReducedMotion
    ? undefined
    : {
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(24px)",
        transition: `opacity ${DURATION_MS}ms ${EASE} ${delay}ms, transform ${DURATION_MS}ms ${EASE} ${delay}ms`,
      };

  return { ref, style };
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  amount?: number;
  className?: string;
}

/**
 * Convenience wrapper around `useReveal` for the common case — a plain block
 * `div` with no padding/border/overflow, so it doesn't interfere with
 * margin-collapsing or flex/grid gap sizing between the wrapped element and
 * its neighbors. Don't use this around an element whose own `position:
 * absolute` depends on an ancestor further out than this wrapper — see
 * `useReveal` above.
 */
export function Reveal({ children, delay, amount, className }: RevealProps) {
  const { ref, style } = useReveal<HTMLDivElement>({ delay, amount });
  return (
    <div ref={ref} className={cn(className)} style={style}>
      {children}
    </div>
  );
}

/** Shared per-section stagger offsets (ms): eyebrow, heading, paragraph, then grid/card items. */
export const REVEAL_DELAY = {
  eyebrow: 0,
  heading: 80,
  paragraph: 160,
  gridBase: 240,
  gridStep: 100,
} as const;
