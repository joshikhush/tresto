"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/components/ui";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useMediaQuery } from "@/lib/useMediaQuery";

interface TestimonialSlide {
  quote: string;
  initials: string;
  author: string;
  role: string;
  tag: string;
  metric: string;
}

// §3 honesty guardrails: these are explicit placeholders per spec, not real
// clients. TODO(polish): swap for real client quotes/names once supplied.
const testimonials: TestimonialSlide[] = [
  {
    quote:
      "Tresto delivered ahead of schedule and kept us in the loop the whole way — the communication was the best part.",
    initials: "SC",
    author: "Sample Client",
    role: "Founder · placeholder",
    tag: "Website",
    metric: "↑ Delivered 1 week early",
  },
  {
    quote: "They were transparent about everything. We always knew exactly where the project stood.",
    initials: "S2",
    author: "Sample Client 2",
    role: "Owner · placeholder",
    tag: "Website",
    metric: "100% scope transparency",
  },
  {
    quote: "Post-launch support has been genuinely helpful. They actually care about the long-term result.",
    initials: "S3",
    author: "Sample Client 3",
    role: "CTO · placeholder",
    tag: "Mobile App",
    metric: "3+ months ongoing support",
  },
];

const COUNT = testimonials.length;

/**
 * S12 — Testimonials. Scroll-driven pinned stage: a 140vh outer section
 * holds a `position: sticky` inner stage; a rAF-throttled scroll handler
 * maps progress through that extra height to an active slide index `i`
 * plus `local` (0–1 progress within slide i). `i` drives React state
 * (`.tst-active` on both stacks + which ambient gradient shows) since it
 * only changes twice per full scroll-through. `local` drives the progress
 * segment widths via direct ref/style mutation instead of state — those
 * update on every rAF tick, and routing that through React would mean a
 * full re-render every frame during scroll.
 *
 * Falls back to a plain static stacked list (no pin, no transforms) below
 * 760px or under prefers-reduced-motion — a pure CSS override (see the
 * `@media` block around `.tst-*` in globals.css), not a JS-branched
 * render, so there's no server/client hydration mismatch.
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
    <section className="tst-section" ref={sectionRef}>
      <div className="tst-stage">
        <div className={`tst-ambient tst-ambient-${activeIndex}`} />
        <p className="tst-eyebrow" ref={eyebrowRef} style={eyebrowStyle}>
          Testimonials
        </p>

        <div className="tst-quote-stage">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
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
              key={testimonial.author}
              className={`tst-meta-slide${index === activeIndex ? " tst-active" : ""}`}
              style={{ order: index * 2 + 1 }}
            >
              <div className="tst-glass">
                <div className="tst-avatar">{testimonial.initials}</div>
                <div>
                  <div className="tst-name">{testimonial.author}</div>
                  <div className="tst-role">{testimonial.role}</div>
                </div>
              </div>
              <span className="tst-tag">{testimonial.tag}</span>
              <span className="tst-metric">{testimonial.metric}</span>
            </div>
          ))}
        </div>

        <div className="tst-progress">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.author} className="tst-segment">
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
