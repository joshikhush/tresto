"use client";

import { motion, type Variants } from "framer-motion";
import { Section, GhostWord } from "@/components/ui";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const pillars = [
  "Custom web for complex business needs",
  "Flutter apps that scale across platforms",
  "AI & automation for new workflows.",
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const column: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * S4 — Hero pillars. A dark hero-gradient band sitting flush under the
 * Hero (same bg token, no top radius) so the two read as one continuous
 * dark block, rounded only on the bottom corners where it meets the
 * lighter Trusted strip below. Columns stagger fade-up on scroll;
 * collapses to a static reveal when prefers-reduced-motion is set.
 */
export function Pillars() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Section bg="hero-gradient" className="relative overflow-hidden rounded-b-[40px]">
      <GhostWord tone="dark">OUR PILLARS</GhostWord>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3"
        variants={prefersReducedMotion ? undefined : container}
        initial={prefersReducedMotion ? undefined : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.4 }}
      >
        {pillars.map((headline, index) => (
          <motion.div
            key={headline}
            variants={prefersReducedMotion ? undefined : column}
            className={cn(
              "px-6 py-6 text-center first:pt-0 sm:py-0 sm:text-left sm:first:pl-0",
              index > 0 &&
                "border-t border-white/[0.14] sm:border-t-0 sm:border-l"
            )}
          >
            <p className="font-display text-[19px] font-bold text-white">{headline}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
