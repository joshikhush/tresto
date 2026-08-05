"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Section, GhostWord, Reveal, REVEAL_DELAY } from "@/components/ui";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

// Industries of real clients, not names — §3 honesty guardrails forbid
// invented client logos, and no logo image assets exist yet, so each renders
// as a clean typographic wordmark instead of an image mark. Matches the
// industry labels used in the "Who we build for" section (see
// WhoWeBuildFor.tsx `industries`).
const industries = ["Manufacturing", "Real Estate", "Real Estate", "Startups", "Field Services"];

const STAGGER_MS = 90;

/**
 * S5 — Trusted by, restyled as a single curated row of client wordmarks
 * (see `.logo-mark` / `.logo-row` in globals.css for the blur-to-sharp
 * entrance). One IntersectionObserver on the row adds `.logo-in` once,
 * which cascades the staggered reveal to every mark via its own
 * `--logo-delay` custom property — cheaper than one observer per mark, and
 * keeps the whole row arriving as a single sequence rather than each mark
 * re-triggering independently. Vertical 1px dividers only render at `md+`,
 * where the row is guaranteed to stay single-line (flex-nowrap); below
 * that it wraps with plain gaps instead of a stray leading divider on the
 * wrapped line. Skipped entirely under prefers-reduced-motion — the CSS
 * media query in globals.css renders every mark at its resting opacity
 * immediately, independent of whether `.logo-in` ever gets added.
 */
export function Trusted() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const rowRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const node = rowRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <Section bg="white" className="relative overflow-hidden">
      <GhostWord>TRUSTED</GhostWord>

      <Reveal delay={REVEAL_DELAY.eyebrow}>
        <p className="tracking-label text-center text-xs font-semibold uppercase text-text-muted">
          Selected collaborations
        </p>
      </Reveal>

      <Reveal delay={REVEAL_DELAY.heading}>
        <h2 className="mx-auto mt-4 max-w-xl text-center font-display text-3xl font-extrabold leading-[1.3] tracking-tight text-ink sm:text-4xl">
          Teams we&apos;ve{" "}
          <span className="font-accent-serif text-[1.15em] font-normal italic">shipped</span> for
        </h2>
      </Reveal>

      <div
        ref={rowRef}
        role="list"
        aria-label="Industries Tresto has shipped products for"
        className={cn(
          "logo-row mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:mt-16 md:flex-nowrap md:justify-center md:gap-x-0",
          inView && "logo-in"
        )}
      >
        {industries.map((name, index) => (
          <div key={`${name}-${index}`} role="listitem" className="flex items-center">
            {index > 0 && (
              <span aria-hidden className="mx-8 hidden h-6 w-px shrink-0 bg-border md:block lg:mx-12" />
            )}
            <span
              className="logo-mark whitespace-nowrap font-display text-lg font-semibold tracking-tight text-text-strong"
              style={{ "--logo-delay": `${index * STAGGER_MS}ms` } as CSSProperties}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
