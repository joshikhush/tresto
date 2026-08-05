"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/components/ui";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useMediaQuery } from "@/lib/useMediaQuery";

interface TestimonialSlide {
  quote: string;
  role: string;
}

const testimonials: TestimonialSlide[] = [
  {
    quote:
      "What impressed me most about Tresto.io wasn't just their technical skills, it was how deeply they understood our business problem before proposing a solution. They genuinely cared about building the right product, not just completing the project. Their young, passionate team stayed committed from start to finish and delivered exactly what we envisioned.",
    role: "Founder & CEO",
  },
  {
    quote:
      "Managing software projects becomes much easier when your development partner is proactive. The Tresto.io team took ownership, solved challenges quickly, and kept us informed throughout the project. Their focus on timely delivery and problem-solving made them an extension of our own team.",
    role: "Project Manager",
  },
  {
    quote:
      "We've partnered with Tresto.io on multiple engagements, and they consistently bring energy, technical expertise, and a solution-first mindset. Their developers don't just write code, they understand the business context and work closely with everyone involved to ensure successful project completion.",
    role: "Founder & CEO, second engagement",
  },
  {
    quote:
      "The team is incredibly approachable and always willing to go the extra mile. Whenever we faced roadblocks, they came back with practical solutions instead of excuses. Their passion for development and commitment to quality were evident throughout the engagement.",
    role: "Product Owner",
  },
  {
    quote:
      "Tresto.io doesn't disappear after deployment. They continue to support, optimize, and improve the product whenever required. Having a reliable technology partner who truly stands behind their work gives us complete confidence.",
    role: "Head of Operations",
  },
];

const COUNT = testimonials.length;
/** ~40vh of extra scroll per testimonial, plus one viewport to pin against. */
const SECTION_HEIGHT_VH = COUNT * 40 + 100;
/** Only 3 ambient gradients exist (.tst-ambient-0/1/2) — cycle through them for any count. */
const AMBIENT_COUNT = 3;

/**
 * S12 — Testimonials. Scroll-driven pinned stage: an outer section (height
 * scales with testimonial count — see SECTION_HEIGHT_VH) holds a
 * `position: sticky` inner stage; a rAF-throttled scroll handler maps
 * progress through that extra height to an active slide index `i` plus
 * `local` (0–1 progress within slide i). `i` drives React state
 * (`.tst-active` on both stacks + which ambient gradient shows, cycled
 * modulo AMBIENT_COUNT) since it only changes twice per full scroll-through.
 * `local` drives the progress segment widths via direct ref/style mutation
 * instead of state — those update on every rAF tick, and routing that
 * through React would mean a full re-render every frame during scroll.
 *
 * Falls back to a plain static stacked list (no pin, no transforms) below
 * 760px or under prefers-reduced-motion — a pure CSS override (see the
 * `@media` block around `.tst-*` in globals.css), not a JS-branched
 * render, so there's no server/client hydration mismatch. The inline
 * section-height style is skipped in that fallback too, so the CSS's own
 * `height: auto` override isn't fought by a higher-precedence inline style.
 */
export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 760px)");
  const isFallback = prefersReducedMotion || isMobile;
  // .tst-eyebrow is `position: absolute` against the further-out .tst-stage
  // (see globals.css) — applying the reveal `transform` via a wrapping
  // `Reveal` div would make that div the new containing block and
  // reposition it, so this hooks the transform onto the element directly.
  const { ref: eyebrowRef, style: eyebrowStyle } = useReveal<HTMLParagraphElement>();

  useEffect(() => {
    if (isFallback) return;

    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;

    function update() {
      const rect = section!.getBoundingClientRect();
      const denom = rect.height - window.innerHeight * 0.8;
      const p = Math.min(Math.max(-rect.top / denom, 0), 0.999);
      const i = Math.floor(p * COUNT);
      const local = p * COUNT - i;

      setActiveIndex((prev) => (prev === i ? prev : i));

      fillRefs.current.forEach((fill, k) => {
        if (!fill) return;
        const width = k < i ? 100 : k === i ? local * 100 : 0;
        fill.style.width = `${width}%`;
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isFallback]);

  return (
    <section
      className="tst-section"
      ref={sectionRef}
      style={isFallback ? undefined : { height: `${SECTION_HEIGHT_VH}vh` }}
    >
      <div className="tst-stage">
        <div className={`tst-ambient tst-ambient-${activeIndex % AMBIENT_COUNT}`} />
        <p className="tst-eyebrow" ref={eyebrowRef} style={eyebrowStyle}>
          Testimonials
        </p>

        <div className="tst-quote-stage">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`tst-quote-slide${index === activeIndex ? " tst-active" : ""}`}
              /* Only meaningful in the fallback layout, where .tst-quote-stage
                 collapses via display:contents and this slide becomes a
                 direct flex child of .tst-stage — order interleaves it with
                 its own meta slide (quote_i=2i, meta_i=2i+1) without
                 depending on DOM order, which pinned mode needs to be
                 [stage-of-3-quotes, stage-of-3-metas] instead. No effect in
                 pinned mode (these aren't flex/grid items there). */
              style={{ order: index * 2 }}
            >
              <p className="tst-quote">{testimonial.quote}</p>
            </div>
          ))}
        </div>

        <div className="tst-meta-stage">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`tst-meta-slide${index === activeIndex ? " tst-active" : ""}`}
              style={{ order: index * 2 + 1 }}
            >
              <div className="tst-glass">
                <div className="tst-name">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="tst-progress">
          {testimonials.map((_, index) => (
            <div key={index} className="tst-segment">
              <div
                className="tst-segment-fill"
                ref={(el) => {
                  fillRefs.current[index] = el;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
