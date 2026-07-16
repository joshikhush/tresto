"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionLabel, TodoBadge, GhostWord } from "@/components/ui";
import type { Testimonial } from "@/types";

// §3 honesty guardrails: real quotes only, TODO until Hitesh supplies them.
const testimonials: Testimonial[] = [
  { id: "t1", quote: "", author: "", role: "", company: "" },
  { id: "t2", quote: "", author: "", role: "", company: "" },
  { id: "t3", quote: "", author: "", role: "", company: "" },
];

/**
 * S12 — Testimonials. Structure only: arrow buttons swap the active card
 * instantly (no slide transition, no drag).
 * // TODO(polish): swipe/drag on mobile, slide transition, real quotes.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const active = testimonials[index];

  const goTo = (next: number) => setIndex(((next % total) + total) % total);

  return (
    <Section bg="lilac-50" className="relative overflow-hidden">
      <GhostWord>TESTIMONIALS</GhostWord>
      <SectionLabel>Testimonials</SectionLabel>
      <h2 className="mt-2 text-section-title text-ink">What our clients say</h2>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous testimonial"
          className="rounded-chip border border-border bg-white p-2 text-ink hover:text-violet"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div
          className={
            active.quote
              ? "w-full max-w-xl rounded-card border border-border bg-white p-8"
              : "w-full max-w-xl rounded-card border border-dashed border-red/40 bg-white p-8"
          }
        >
          <div className="flex gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          {active.quote ? (
            <>
              <p className="mt-4 text-sm text-text-muted">{active.quote}</p>
              <div className="mt-6 flex items-center gap-2 text-sm text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                {active.author} — {active.role}, {active.company}
              </div>
            </>
          ) : (
            <>
              <p className="mt-4 text-sm italic text-text-muted">
                Real client quote pending — confirm with Hitesh.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                <TodoBadge>client name, role &amp; company</TodoBadge>
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next testimonial"
          className="rounded-chip border border-border bg-white p-2 text-ink hover:text-violet"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((testimonial, i) => (
          <button
            key={testimonial.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={i === index ? "h-2 w-2 rounded-full bg-violet" : "h-2 w-2 rounded-full bg-border"}
          />
        ))}
      </div>
    </Section>
  );
}
