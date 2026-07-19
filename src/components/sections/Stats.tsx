"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Briefcase, Clock, Layers, LifeBuoy, Smile, type LucideIcon } from "lucide-react";
import { Section, SectionLabel, TodoBadge, GhostWord, Reveal, REVEAL_DELAY } from "@/components/ui";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface StatItem {
  icon: LucideIcon;
  /** Integer to count up from 0. `null` for a non-numeric stat (rendered as static text). */
  value: number | null;
  suffix: string;
  /** Only used when `value` is null. */
  staticText?: string;
  label: string;
  /** §3 honesty guardrails: flags a figure Hitesh hasn't confirmed yet. */
  todo?: boolean;
}

const stats: StatItem[] = [
  { icon: Clock, value: 2, suffix: "", label: "Years of experience", todo: true },
  { icon: Briefcase, value: 40, suffix: "+", label: "Projects delivered", todo: true },
  { icon: Smile, value: 25, suffix: "+", label: "Happy clients", todo: true },
  { icon: Layers, value: 3, suffix: "", label: "Platforms · Web·iOS·Android" },
  { icon: LifeBuoy, value: null, suffix: "", staticText: "Ongoing", label: "Support" },
];

/**
 * Right-border divider classes for a 5-item row that wraps to 3 cols
 * (tablet) then 2 cols (mobile) — shows a divider only between columns
 * that sit in the same visual row at each breakpoint, and never on the
 * true last item.
 */
function dividerClasses(index: number) {
  const isLast = index === stats.length - 1;
  const mobileShow = index % 2 === 0 && !isLast;
  const tabletShow = (index + 1) % 3 !== 0 && !isLast;
  const desktopShow = !isLast;

  return cn(
    "border-border",
    mobileShow ? "border-r" : "border-r-0",
    tabletShow ? "sm:border-r" : "sm:border-r-0",
    desktopShow ? "lg:border-r" : "lg:border-r-0"
  );
}

/** One inline stat column — counts up from 0 the first time it scrolls into view. */
function StatColumn({ icon: Icon, value, suffix, staticText, label, todo, index }: StatItem & { index: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === null || !isInView) return;
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value]);

  return (
    <div className={cn("flex flex-col items-center px-4 py-6 text-center sm:py-0", dividerClasses(index))}>
      <Icon className="h-8 w-8 text-violet" strokeWidth={1.5} />
      <p ref={ref} className="mt-3 font-display text-3xl font-extrabold text-ink">
        {value === null ? staticText : `${display}${suffix}`}
      </p>
      <p className="mt-1 text-sm text-text-muted">{label}</p>
      {todo && <TodoBadge className="mt-2">confirm number</TodoBadge>}
    </div>
  );
}

/**
 * S6 — Who we are. SoluLab-style inline stat row: centered eyebrow +
 * heading (no paragraph) above a single 5-column row of icon/number/label
 * columns separated by thin right-border dividers — no card boxes, no
 * background, no shadow on the individual stats. Wraps to 3 cols (tablet)
 * then 2 cols (mobile), with `dividerClasses` keeping the border only
 * between columns that share a visual row at each breakpoint. Integer
 * stats count up from 0 via framer-motion's `animate()` the first time
 * they scroll into view (skipped under prefers-reduced-motion, which
 * renders the final value immediately); "Ongoing" is static text, never
 * animated.
 */
export function Stats() {
  return (
    <Section bg="lilac-50" className="relative overflow-hidden">
      <GhostWord>WHO WE ARE</GhostWord>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal delay={REVEAL_DELAY.eyebrow}>
          <SectionLabel>Who we are</SectionLabel>
        </Reveal>
        <Reveal delay={REVEAL_DELAY.heading}>
          <h2 className="mt-2 text-section-title text-ink">
            A trusted technology partner for digital-first businesses
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={REVEAL_DELAY.gridBase + index * REVEAL_DELAY.gridStep}>
            <StatColumn {...stat} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
