"use client";

import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Building2, Check, Cog, Rocket, Users } from "lucide-react";
import { Section, ButtonPrimary, ButtonSecondary } from "@/components/ui";
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
  primaryCta: { label: "Start a Project", href: "#contact" },
  secondaryCta: { label: "View Our Work", href: "/work" },
};

const trustedIndustries = [
  { label: "Startups", Icon: Rocket },
  { label: "Real Estate", Icon: Building2 },
  { label: "Manufacturing", Icon: Cog },
  { label: "Field Services", Icon: Users },
];

/**
 * Splits titleLine2 around titleHighlight and wraps the match in a lighter
 * violet→pink gradient — the site-wide brand gradient (--gradient-main) is
 * tuned for dark text on a light background and reads muddy on this hero's
 * dark scrim, which now applies at every breakpoint.
 *
 * The pair is #E9D5FF→#FDE2F3, not the more saturated #A78BFA→#F0ABFC one
 * might reach for: this headline sits at the top of the section, over the
 * photo's brightest patch (golden-hour sky), where the scrim is at its
 * most opaque (0.78) but still measurably lets ~0.09–0.11 luminance
 * through. #A78BFA only reaches 2.36:1 there and #F0ABFC 3.65:1 — both
 * short of the 4.5:1 bar. Lightened one step further, #E9D5FF/#FDE2F3
 * hold 4.72:1 / 5.31:1 against the same measured worst-case pixel.
 */
function HighlightedLine({ line, highlight }: { line: string; highlight: string }) {
  const index = line.indexOf(highlight);
  if (index === -1) return <>{line}</>;

  const before = line.slice(0, index);
  const after = line.slice(index + highlight.length);

  return (
    <>
      {before}
      <span className="bg-[image:linear-gradient(135deg,#E9D5FF,#FDE2F3)] bg-clip-text text-transparent">
        {highlight}
      </span>
      {after}
    </>
  );
}

/**
 * S3 — Hero. One full-bleed café photograph behind everything at every
 * breakpoint, at full opacity, object-position right so the group of four
 * is never cropped — desktop and mobile just serve differently-sized
 * pre-generated WebP (JPEG fallback) variants of it through the same
 * `<picture>` (see the notes below), never the original 2.3MB PNG.
 *
 * Desktop now shares mobile's dark top-to-bottom scrim + brand tint and
 * light/white text — previously desktop had its own separate light,
 * left-to-right wash with dark text; that's gone, so there's no more `md:`
 * split on any of it. The one thing that's still desktop-only is the
 * layout: copy stays capped to the left ~50% (`md:max-w-[50%]` below) so
 * it doesn't overlap their faces, since that's a structural constraint,
 * not a background/color one. A cursor parallax (framer-motion springs —
 * JS is the right tool since it needs live pointer position) moves the
 * text block slightly; it collapses to 0 — i.e. static — when
 * `prefers-reduced-motion: reduce` is set.
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

  // Depth layer: translation = normalized cursor position (-0.5..0.5) * depth px.
  const textX = useTransform(springX, (v) => v * 14);
  const textY = useTransform(springY, (v) => v * 14);

  return (
    <Section bg="white" className="relative overflow-hidden hero-offset-top">
      <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {/* Full-bleed photo layer — breaks out of the 1200px container via the
            left-1/2/w-screen/-translate-x-1/2 trick so it spans the whole
            viewport while positioning against Section's `relative` outer
            element. object-right anchors the group to the right so cover
            cropping never eats into them, at every breakpoint.

            Two media-gated source pairs (not next/image) so each
            breakpoint fetches only its own correctly-sized WebP (JPEG
            fallback) — never the original 2.3MB PNG, and never the other
            breakpoint's variant. Desktop needs `loading="eager"`/
            `fetchPriority="high"` to preload exactly as it did under
            `priority`; that also covers mobile now that the photo is a
            true background there again, not a below-the-fold band. */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden"
        >
          <picture>
            <source media="(min-width: 768px)" type="image/webp" srcSet="/hero-bg-1600.webp" />
            <source media="(min-width: 768px)" type="image/jpeg" srcSet="/hero-bg-1600.jpg" />
            <source media="(max-width: 767px)" type="image/webp" srcSet="/hero-bg-mobile-800.webp" />
            <source media="(max-width: 767px)" type="image/jpeg" srcSet="/hero-bg-mobile-800.jpg" />
            {/* No `src` (not even ""): every real viewport width matches
                one of the four sources above, so this is purely the
                no-`<picture>`-support fallback. An empty string would
                still resolve against the document URL and re-fetch the
                page, so it's omitted rather than set empty. */}
            <img
              alt=""
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-right"
            />
          </picture>
          {/* Scrim — dark, not light, at every breakpoint now (this used to
              be desktop-only light-wash / mobile-only dark-scrim; desktop's
              light version is gone). The photo stays at full opacity and
              visible throughout (no whitening-out), with the copy sitting
              on top of a dark top-to-bottom veil instead. Near-solid at the
              very top (behind the headline), easing to its lowest opacity
              around the middle, then rising back up toward the bottom —
              that uptick is what keeps the trusted-by row (measured
              ~78–92% of section height on mobile, similar on desktop) on a
              safe-enough dark base even though it's not the literal
              minimum-opacity point.

              The 75/100% stops are 0.74/0.76, not the initially-tried
              0.62/0.72: verified against the actual rendered background
              (text hidden, sampled at real glyph positions — same method
              as everywhere else in this file), the trusted-by label passed
              on mobile (7.39:1) but failed on desktop (4.23:1) at 0.62 —
              same y-position, but the desktop photo crop (hero-bg-1600.webp,
              a different source than mobile's) has a brighter patch of
              pavement there. Since this gradient is shared now, raising the
              trough fixes desktop (4.90:1 at 0.70) without hurting mobile
              (more opacity only ever helps light text) — pushed a little
              further still (0.74/0.76) for real margin rather than a bare
              pass. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(22,16,32,0.78) 0%, rgba(22,16,32,0.68) 45%, rgba(22,16,32,0.74) 75%, rgba(22,16,32,0.76) 100%)",
            }}
          />
          {/* Brand tint — sits on top of the scrim (later in DOM, same
              stacking convention as the rest of this file: no z-index,
              paint order follows source order). */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(109,90,230,0.22), transparent 70%)",
            }}
          />
        </div>

        {/* Decorative brand accent, bottom-left — a soft violet radial glow
            plus a low-opacity dot pattern, faded out via mask so it reads
            as a quiet flourish rather than a hard-edged grid. Sits behind
            the content (DOM order, no z-index) and low enough to clear the
            trusted-by row. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-16 h-[360px] w-[520px]"
          style={{
            background: "radial-gradient(circle at bottom left, rgba(109,90,230,0.22), transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[280px] w-[420px] opacity-40"
          style={{
            backgroundImage: "radial-gradient(rgba(109,90,230,0.55) 1px, transparent 1.5px)",
            backgroundSize: "18px 18px",
            WebkitMaskImage: "radial-gradient(circle at bottom left, black, transparent 70%)",
            maskImage: "radial-gradient(circle at bottom left, black, transparent 70%)",
          }}
        />

        <div className="relative md:max-w-[50%]">
          {/* Layer 4 — text block, depth 14 */}
          <motion.div style={{ x: textX, y: textY }}>
            <h1 className="text-display max-w-md text-[1.875rem] leading-[1.15] text-white lg:max-w-lg lg:text-[2.75rem] lg:leading-[1.1]">
              {hero.titleLine1}
              <br />
              <HighlightedLine line={hero.titleLine2} highlight={hero.titleHighlight} />
            </h1>

            <p className="mt-6 max-w-lg text-[rgba(255,255,255,0.82)]">{hero.description}</p>

            <ul className="mt-6 space-y-2.5">
              {hero.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-2.5 text-sm font-medium text-[rgba(255,255,255,0.88)]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-main)]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonPrimary href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonPrimary>
              {/* tone="on-dark": white border/text, transparent fill — the
                  correct look against this hero's dark scrim at every
                  breakpoint now. */}
              <ButtonSecondary href={hero.secondaryCta.href} tone="on-dark">
                {hero.secondaryCta.label}
              </ButtonSecondary>
            </div>

            <div className="mt-10 max-w-md border-t border-white/25 pt-6">
              {/* rgba(255,255,255,0.7), not a dimmer value: this label sits
                  where the scrim is thinner (measured ~78–92% of section
                  height on mobile), so anything with too little contrast
                  margin fails once real photo shows through underneath. */}
              <p className="tracking-label text-xs font-semibold uppercase text-[rgba(255,255,255,0.7)]">
                Trusted by teams across
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                {trustedIndustries.map(({ label, Icon }) => (
                  <div key={label} className="flex items-center gap-1.5 text-sm font-medium text-[rgba(255,255,255,0.7)]">
                    <Icon className="h-4 w-4 text-violet-soft" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
