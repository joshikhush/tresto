"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import { GhostWord, SectionLabel, Reveal, REVEAL_DELAY } from "@/components/ui";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

// Heading font only — everything else in this section is Inter (the
// site's own font-body), per spec. Loaded locally rather than in the
// root layout so this component doesn't require a layout.tsx change.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--faq-font-display",
});

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  eyebrow?: string;
  heading?: string;
  items?: FAQItem[];
}

const DEFAULT_EYEBROW = "FAQ";
const DEFAULT_HEADING = "Questions you might have";
const DEFAULT_ITEMS: FAQItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most builds land between 6-10 weeks depending on scope. You'll get a firm range before we start, not after.",
  },
  {
    question: "What technologies do you build with?",
    answer: "Next.js, TypeScript, and Tailwind by default. We'll match your existing stack if you already have one.",
  },
  {
    question: "How do you price projects?",
    answer: "Fixed-scope quotes for defined projects, or a monthly retainer for ongoing work. No hourly surprises.",
  },
  {
    question: "Can you work with our existing codebase?",
    answer: "Yes. Most engagements start with an audit of what's there before we touch anything.",
  },
  {
    question: "What happens after launch?",
    answer: "A 2-week warranty window, then an optional monthly retainer for support and iteration.",
  },
  {
    question: "How do we get started?",
    answer: "One discovery call. If it's a fit, you'll have a scoped plan within 48 hours.",
  },
];

// Icon morph + divider growth (spec's own curve).
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
// Answer text entrance ("same spring easing" as the height spring below).
const TEXT_EASE: [number, number, number, number] = [0.34, 1.4, 0.4, 1];
// Accordion height — Framer's native spring option (the spec's
// CSS-cubic-bezier alternative is for a grid-template-rows implementation,
// which this isn't).
const HEIGHT_SPRING = { type: "spring" as const, stiffness: 300, damping: 24 };

function PlusMinusIcon({ isOpen, reduced }: { isOpen: boolean; reduced: boolean }) {
  const strokeColor = isOpen ? "#fff" : "var(--faq-text-hi)";
  return (
    <span
      aria-hidden="true"
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
      style={{
        borderColor: isOpen ? "transparent" : "var(--faq-border-strong)",
        background: isOpen ? "var(--faq-gradient-main)" : "transparent",
        transition: reduced ? "none" : "background 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Horizontal stroke — constant. */}
      <span className="absolute h-[1.5px] w-3.5 rounded-full" style={{ background: strokeColor }} />
      {/* Vertical stroke at rest (rotate: 90) — rotates a further 90deg (to
          180, visually overlapping the horizontal stroke) while shrinking
          to scaleX 0, leaving only the constant horizontal stroke: a plus
          becomes a minus. */}
      <motion.span
        className="absolute h-[1.5px] w-3.5 rounded-full"
        style={{ background: strokeColor }}
        initial={false}
        animate={{ rotate: isOpen ? 180 : 90, scaleX: isOpen ? 0 : 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.4, ease: EASE }}
      />
    </span>
  );
}

interface FAQCardProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  reduced: boolean;
}

function FAQCard({ item, index, isOpen, onToggle, reduced }: FAQCardProps) {
  const buttonId = `faq-question-${index}`;
  const answerId = `faq-answer-${index}`;

  return (
    <div
      className="rounded-card border bg-[var(--faq-bg-card)]"
      style={{
        borderColor: isOpen ? "var(--faq-border-strong)" : "var(--faq-border)",
        boxShadow: isOpen ? "var(--faq-shadow-open)" : "var(--faq-shadow-rest)",
        transition: reduced ? "none" : "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--faq-violet)] focus-visible:ring-offset-2"
      >
        <span className="font-medium text-[var(--faq-text-hi)]">{item.question}</span>
        <PlusMinusIcon isOpen={isOpen} reduced={reduced} />
      </button>

      {/* Growing divider: static hairline base, gradient overlay scales in from the left on open. */}
      <div className="relative mx-6 h-px overflow-hidden" style={{ background: "var(--faq-border-strong)" }}>
        <motion.div
          className="absolute inset-0 origin-left"
          style={{ background: "var(--faq-gradient-main)" }}
          initial={false}
          animate={{ scaleX: isOpen ? 1 : 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.6, ease: EASE }}
        />
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={answerId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduced ? { opacity: 0 } : { height: 0 }}
            animate={reduced ? { opacity: 1 } : { height: "auto" }}
            exit={reduced ? { opacity: 0 } : { height: 0 }}
            transition={reduced ? { duration: 0.2 } : HEIGHT_SPRING}
            className="overflow-hidden"
          >
            <motion.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduced ? { duration: 0.2 } : { duration: 0.4, ease: TEXT_EASE, delay: 0.1 }}
              className="px-6 pb-6 pt-4 text-sm text-[var(--faq-text-mid)]"
            >
              {item.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * S16 — FAQ. Same structure as the site's existing FAQ section (eyebrow +
 * h2 + two manually-split columns of cards, `Section`'s own max-width/
 * padding scale) — only the interaction is new: spring-height accordion
 * (Framer's `height: "auto"` measurement, not an animated max-height,
 * which would jank), a divider that grows in under the question on open,
 * a plus-to-minus icon morph (one stroke rotates + scales to 0, the other
 * stays put), and a delayed text entrance nested inside the height
 * animation. Colors/shadows are this component's own token set (see
 * "FAQ Section" in globals.css) rather than the site's `Section` background
 * prop — passing an override className for that would race Section's own
 * `bg-lilac-50` class in the compiled stylesheet, since both target
 * `background-color` at equal specificity.
 */
export function FAQSection({
  eyebrow = DEFAULT_EYEBROW,
  heading = DEFAULT_HEADING,
  items = DEFAULT_ITEMS,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = usePrefersReducedMotion();

  const toggle = (index: number) => setOpenIndex((current) => (current === index ? null : index));

  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <section id="faq" className={`${spaceGrotesk.variable} relative overflow-hidden bg-[var(--faq-bg-page)] py-16 md:py-[90px]`}>
      <div className="relative mx-auto max-w-[1200px] px-8">
        <GhostWord>FAQ</GhostWord>
        <Reveal delay={REVEAL_DELAY.eyebrow}>
          <SectionLabel>{eyebrow}</SectionLabel>
        </Reveal>
        <Reveal delay={REVEAL_DELAY.heading}>
          <h2 className="mt-2 font-[family-name:var(--faq-font-display)] text-[38px] font-bold leading-tight text-ink">
            {heading}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-3.5">
              {column.map((item, itemIndex) => {
                const index = columnIndex === 0 ? itemIndex : half + itemIndex;
                return (
                  <Reveal key={item.question} delay={REVEAL_DELAY.gridBase + itemIndex * REVEAL_DELAY.gridStep}>
                    <FAQCard
                      item={item}
                      index={index}
                      isOpen={openIndex === index}
                      onToggle={() => toggle(index)}
                      reduced={reduced}
                    />
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
