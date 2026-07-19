"use client";

import { useEffect, useState, useSyncExternalStore, Fragment } from "react";
import { motion } from "framer-motion";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ButtonPrimary } from "@/components/ui";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Hydration-safe media-query read via useSyncExternalStore — no effect, no
 * setState, so there's nothing that can render one value on the server and
 * a different one on the client's first paint (framer-motion's own
 * `useReducedMotion` returns `null` during SSR, which this component's
 * `prefersReducedMotion ? … : …` ternaries would treat as "motion enabled"
 * even for a user whose real OS/browser preference is reduced motion,
 * producing exactly that mismatch).
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
}

// Fonts are loaded locally (not in the root layout) so swapping this
// component in doesn't require layout.tsx changes. Its color tokens,
// unlike the fonts, live in globals.css (see the "Discovery Call CTA"
// block there) rather than here, so a host page just needs globals.css
// imported — which every page already does.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--dcta-font-display",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--dcta-font-body",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--dcta-font-mono",
});

export interface TimelineStep {
  title: string;
  timestamp: string;
  description: string;
}

interface DiscoveryCallCTAProps {
  eyebrow?: string;
  /**
   * Plain text, with two optional conventions: `\n` for a line break, and
   * `**...**` to mark a span for the gradient-clip treatment (may itself
   * contain `\n`). Both are handled by `renderHeadline` below.
   */
  headline?: string;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Expects exactly 3 — the timeline layout (dot + connecting line) is built for 3 steps. */
  steps?: TimelineStep[];
}

const DEFAULT_EYEBROW = "What happens next";
const DEFAULT_HEADLINE = "Know exactly what\n**the next 30 minutes\nlook like.**";
const DEFAULT_SUBHEAD =
  "No mystery calls. See the actual steps between clicking the button and having a plan in hand.";
const DEFAULT_STEPS: TimelineStep[] = [
  {
    title: "You tell us what you're building",
    timestamp: "2 min - async form",
    description: "Scope, stage, and rough timeline. No jargon required.",
  },
  {
    title: "We map scope and a realistic plan",
    timestamp: "Within 24 hrs",
    description: "An engineer reviews it, not a sales rep.",
  },
  {
    title: "30-min call, plan in hand",
    timestamp: "Live walkthrough",
    description: "Leave knowing cost, timeline, and next step.",
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const STEP_STAGGER_MS = 450;

/** Renders `\n` as line breaks and `**...**` spans with the gradient-clip treatment. */
function renderHeadline(text: string) {
  return text.split(/\*\*([\s\S]+?)\*\*/g).map((segment, segmentIndex) => {
    const isGradient = segmentIndex % 2 === 1;
    const lines = segment.split("\n");
    const content = lines.map((line, lineIndex) => (
      <Fragment key={lineIndex}>
        {line}
        {lineIndex < lines.length - 1 && <br />}
      </Fragment>
    ));
    return isGradient ? (
      <span key={segmentIndex} className="bg-[image:var(--gradient-main)] bg-clip-text text-transparent">
        {content}
      </span>
    ) : (
      <Fragment key={segmentIndex}>{content}</Fragment>
    );
  });
}

export function DiscoveryCallCTA({
  eyebrow = DEFAULT_EYEBROW,
  headline = DEFAULT_HEADLINE,
  subhead = DEFAULT_SUBHEAD,
  ctaLabel = "Talk with an expert",
  ctaHref = "#",
  steps = DEFAULT_STEPS,
}: DiscoveryCallCTAProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [cardEntered, setCardEntered] = useState(false);
  const [triggeredStep, setTriggeredStep] = useState(-1);
  // Reduced motion: every step is "lit" the instant the card enters view,
  // derived here rather than set from the effect below — no stagger timers
  // needed for that case at all.
  const activeStep = prefersReducedMotion && cardEntered ? steps.length - 1 : triggeredStep;

  useEffect(() => {
    if (!cardEntered || prefersReducedMotion) return;

    const timers = steps.map((_, index) =>
      window.setTimeout(() => setTriggeredStep(index), 300 + index * STEP_STAGGER_MS)
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [cardEntered, prefersReducedMotion, steps]);

  return (
    <section
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} bg-[var(--bg-deep)] py-24 font-[family-name:var(--dcta-font-body)]`}
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 min-[860px]:grid-cols-2">
        {/* Left column */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[image:var(--gradient-main)]" />
            <span className="font-[family-name:var(--dcta-font-mono)] text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-mid)]">
              {eyebrow}
            </span>
          </div>

          <h2 className="mt-5 font-[family-name:var(--dcta-font-display)] text-[30px] font-semibold leading-[1.15] text-[var(--text-hi)] min-[860px]:text-[44px]">
            {renderHeadline(headline)}
          </h2>

          <p className="mt-5 max-w-[440px] font-[family-name:var(--dcta-font-body)] text-base text-[var(--text-mid)]">
            {subhead}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            {["No commitment", "Expert review"].map((label) => (
              <span key={label} className="flex items-center gap-1.5 text-sm text-[var(--text-mid)]">
                <CheckCircle2 className="h-4 w-4 text-[var(--violet)]" aria-hidden />
                {label}
              </span>
            ))}
          </div>

          <ButtonPrimary
            href={ctaHref}
            icon={<ArrowRight className="h-4 w-4" aria-hidden />}
            className="mt-9 w-fit font-[family-name:var(--dcta-font-display)]"
          >
            {ctaLabel}
          </ButtonPrimary>
        </motion.div>

        {/* Right column — timeline card */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          onViewportEnter={() => setCardEntered(true)}
          transition={{ duration: 0.9, ease: EASE, delay: prefersReducedMotion ? 0 : 0.1 }}
          className="rounded-[18px] border border-[var(--card-line)] bg-gradient-to-br from-white/[0.06] to-white/[0.02] px-[34px] py-[38px] backdrop-blur-xl"
        >
          <ol className="flex flex-col">
            {steps.map((step, index) => {
              const isLit = activeStep >= index;
              const isLast = index === steps.length - 1;

              return (
                <li key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
                  {!isLast && (
                    <span
                      aria-hidden
                      className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px overflow-hidden bg-white/10"
                    >
                      <motion.span
                        className="block h-full w-full origin-top bg-gradient-to-b from-[var(--indigo)] to-[var(--pink)]"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: isLit ? 1 : 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 1, ease: EASE }}
                      />
                    </span>
                  )}

                  <motion.span
                    aria-hidden
                    className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-[family-name:var(--dcta-font-mono)] text-xs font-medium"
                    initial={false}
                    animate={{
                      backgroundColor: isLit ? "var(--violet)" : "rgba(255,255,255,0.03)",
                      borderColor: isLit ? "var(--violet)" : "rgba(196,181,253,0.25)",
                      color: isLit ? "var(--text-hi)" : "var(--text-low)",
                      boxShadow: isLit ? "0 0 0 6px rgba(155,92,246,0.18)" : "0 0 0 0 rgba(155,92,246,0)",
                    }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE }}
                  >
                    {index + 1}
                  </motion.span>

                  <div className="min-w-0 pt-0.5">
                    <p className="font-[family-name:var(--dcta-font-display)] text-base font-semibold text-[var(--text-hi)]">
                      {step.title}
                    </p>
                    <p className="mt-1 font-[family-name:var(--dcta-font-mono)] text-xs text-[var(--text-mid)]">
                      {step.timestamp}
                    </p>
                    <p className="mt-2 text-sm text-[var(--text-mid)]">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
