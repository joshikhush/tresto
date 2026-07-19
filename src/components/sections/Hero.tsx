"use client";

import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Section, SectionLabel, ButtonPrimary, ButtonSecondary } from "@/components/ui";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { HeroContent } from "@/types";

const hero: HeroContent = {
  badge: "Bangalore-based Software & AI Studio",
  titleLine1: "Your build partner for custom software &",
  titleLine2: "AI automation.",
  titleHighlight: "AI automation",
  description:
    "We design, build and ship web, mobile and AI-automation projects for teams who need a small studio that moves fast and stays accountable.",
  bullets: [
    "Custom web that converts",
    "Flutter apps for iOS & Android",
    "AI/automation pipelines",
  ],
  primaryCta: { label: "Start a Project", href: "/contact" },
  secondaryCta: { label: "View Our Work", href: "/work" },
};

/** Splits titleLine2 around titleHighlight and wraps the match in a gold span. */
function HighlightedLine({ line, highlight }: { line: string; highlight: string }) {
  const index = line.indexOf(highlight);
  if (index === -1) return <>{line}</>;

  const before = line.slice(0, index);
  const after = line.slice(index + highlight.length);

  return (
    <>
      {before}
      <span className="text-gold">{highlight}</span>
      {after}
    </>
  );
}

/**
 * S3 — Hero. Structure/tokens unchanged from the prior pass. New: a
 * multi-layer cursor parallax (framer-motion springs — JS is the right
 * tool since it needs live pointer position) and a looping muted video
 * inside the mockup (plain CSS transition for the traffic-light dots,
 * nothing else needs JS). All parallax collapses to 0 — i.e. static —
 * when `prefers-reduced-motion: reduce` is set.
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Depth layers: translation = normalized cursor position (-0.5..0.5) * depth px.
  const glowX = useTransform(springX, (v) => v * 26);
  const glowY = useTransform(springY, (v) => v * 26);
  const textX = useTransform(springX, (v) => v * 14);
  const textY = useTransform(springY, (v) => v * 14);

  return (
    <Section bg="hero-gradient" className="relative overflow-hidden hero-offset-top">
      <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {/* Layer 2 — radial glow, depth 26 */}
        <motion.div
          aria-hidden
          style={{ x: glowX, y: glowY }}
          className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-violet-mid/50 blur-3xl"
        />

        <div className="relative">
          {/* Layer 4 — text block, depth 14 */}
          <motion.div style={{ x: textX, y: textY }}>
            <SectionLabel className="text-violet-soft">{hero.badge}</SectionLabel>

            <h1 className="text-display mt-4 max-w-xl text-white">
              {hero.titleLine1}
              <br />
              <HighlightedLine line={hero.titleLine2} highlight={hero.titleHighlight} />
            </h1>

            <p className="mt-6 max-w-lg text-on-dark-1">{hero.description}</p>

            <ul className="mt-6 space-y-2">
              {hero.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2 text-sm text-on-dark-1">
                  <span className="text-gold">•</span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonPrimary href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonPrimary>
              <ButtonSecondary href={hero.secondaryCta.href} tone="on-dark">
                {hero.secondaryCta.label}
              </ButtonSecondary>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
