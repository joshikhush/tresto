"use client";

import { Section, GhostWord, Reveal, REVEAL_DELAY } from "@/components/ui";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

// Real project/client names — §3 honesty guardrails forbid invented
// client logos, so this stays plain text until logo assets exist.
// TODO(polish): swap for real client logo marks.
const clients = ["Triveni Radiators", "Manglam Homes", "Rotary Nagar", "ReshapeNation", "HiveGuard"];

const maskImage =
  "linear-gradient(to right, transparent, black 12%, black 88%, transparent)";

/**
 * S5 — Trusted by. Single auto-scrolling marquee row (list duplicated for
 * a seamless loop, `animate-marquee` CSS keyframe in globals.css —
 * translateX(-50%) over 20s linear), edges faded with a mask-image
 * gradient, paused on hover. When prefers-reduced-motion is set the list
 * isn't duplicated and the animation class is dropped, so it renders as
 * one static centered row instead.
 */
export function Trusted() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const items = prefersReducedMotion ? clients : [...clients, ...clients];

  return (
    <Section bg="white" className="relative overflow-hidden">
      <GhostWord>TRUSTED</GhostWord>
      <Reveal delay={REVEAL_DELAY.eyebrow}>
        <p className="tracking-label text-center text-xs font-semibold uppercase text-text-muted">
          Teams we&apos;ve shipped for
        </p>
      </Reveal>

      <Reveal delay={REVEAL_DELAY.heading}>
        <div
          className="group mt-8 overflow-hidden"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          <div
            className={cn(
              "flex w-max items-center gap-16 whitespace-nowrap",
              prefersReducedMotion
                ? "mx-auto justify-center"
                : "animate-marquee group-hover:[animation-play-state:paused]"
            )}
          >
            {items.map((name, index) => (
              <span key={`${name}-${index}`} className="font-display text-lg text-text-faint">
                {name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
