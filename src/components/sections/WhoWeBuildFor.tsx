"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionLabel, GhostWord, Reveal, REVEAL_DELAY } from "@/components/ui";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const UNSPLASH_PARAMS = "?auto=format&fit=crop&w=800&q=70";

interface Industry {
  id: string;
  /** Bold lead-in of the caption, e.g. "Manufacturing:". */
  lead: string;
  /** Regular-weight remainder of the caption (leading space intentional). */
  text: string;
  /** Proper display name — shown as the white heading over the photo. */
  name: string;
  /** Real photo — falls back to a gradient placeholder if omitted. */
  image?: string;
  /** Descriptive alt text for the photo. */
  imageAlt?: string;
  /** Case-study link for the center card — omitted where none exists yet. */
  href?: string;
}

// Coverflow ring (design-refs/tresto-whowebuildfor-coverflow-v4.html). Keep
// this list a one-line-per-industry edit.
const industries: Industry[] = [
  {
    id: "manufacturing",
    lead: "Manufacturing:",
    text: " catalogs, enquiry pipelines & internal tools",
    name: "Manufacturing",
    image: `https://images.unsplash.com/photo-1565043666747-69f6646db940${UNSPLASH_PARAMS}`,
    imageAlt: "Industrial machinery on a factory production line",
    href: "#", // -> Triveni Radiators case study
  },
  {
    id: "real-estate",
    lead: "Real Estate:",
    text: " property sites with WhatsApp-first leads",
    name: "Real Estate",
    image: `https://images.unsplash.com/photo-1560518883-ce09059eeffa${UNSPLASH_PARAMS}`,
    imageAlt: "Modern residential building exterior against a blue sky",
    href: "#", // -> Manglam Homes case study
  },
  {
    id: "ngo",
    lead: "NGOs & Local:",
    text: " profiles & CSR decks that build credibility",
    name: "NGOs & Local Business",
    image: `https://images.unsplash.com/photo-1556761175-5973dc0f32e7${UNSPLASH_PARAMS}`,
    imageAlt: "Community volunteers working together on a local project",
    href: "#", // -> Virtuous Club India case study
  },
  {
    id: "field-services",
    lead: "Field Services:",
    text: " offline-first apps for crews in the field",
    name: "Field Services",
    image: `https://images.unsplash.com/photo-1581578731548-c64695cc6952${UNSPLASH_PARAMS}`,
    imageAlt: "A field technician working on equipment outdoors",
    href: "#", // -> HiveGuard case study
  },
  {
    id: "startups",
    lead: "Startups:",
    text: " MVPs in weeks — web, mobile & AI in one place",
    name: "Startups",
    image: `https://images.unsplash.com/photo-1559136555-9303baea8ebd${UNSPLASH_PARAMS}`,
    imageAlt: "Founders collaborating around a laptop in a startup workspace",
  },
];

const COUNT = industries.length;
const AUTO_ADVANCE_MS = 3000;
const STEP_PX = 190;
const SCALE_STEP = 0.11;
const ROTATE_DEG = 7;
const OPACITY_STEP = 0.16;
const MAX_VISIBLE_OFFSET = 2;

/** Shortest signed distance from `active` to `index` around the ring — wraps the short way, never rewinds. */
function offsetOf(index: number, active: number) {
  let off = (index - active) % COUNT;
  if (off > COUNT / 2) off -= COUNT;
  if (off < -COUNT / 2) off += COUNT;
  return off;
}

export function WhoWeBuildFor() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || paused) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % COUNT);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, paused]);

  function go(dir: 1 | -1) {
    setActive((a) => (a + dir + COUNT) % COUNT);
  }

  function jump(index: number) {
    setActive(index);
  }

  function handleCardKeyDown(event: KeyboardEvent<HTMLDivElement>, index: number, isCenter: boolean) {
    if (isCenter || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    jump(index);
  }

  return (
    <Section bg="white" className="relative overflow-hidden">
      <GhostWord>WHO WE BUILD FOR</GhostWord>
      <Reveal delay={REVEAL_DELAY.eyebrow}>
        <SectionLabel>Who we build for</SectionLabel>
      </Reveal>
      <Reveal delay={REVEAL_DELAY.heading}>
        <h2 className="mt-2 text-section-title text-ink">Built for teams who need to move fast</h2>
      </Reveal>
      <Reveal delay={REVEAL_DELAY.paragraph}>
        <p className="mt-2 max-w-xl text-sm text-text-muted">
          Pick your industry — see what we ship for teams like yours.
        </p>
      </Reveal>

      {/* Prev/next arrows + the dot indicators below are carousel navigation
          controls, not CTA-style buttons — out of scope for the site-wide
          ButtonPrimary/ButtonSecondary pass (same category as the FAQ
          accordion toggles and Footer social icons). */}
      <div className="relative mx-auto mt-11 max-w-[1180px] px-[50px] min-[760px]:px-16">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous industry"
          className="absolute left-0 top-1/2 z-[200] flex h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full bg-violet text-white shadow-[0_10px_26px_rgba(91,33,182,0.35)] transition-all duration-200 hover:scale-[1.08] hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft focus-visible:ring-offset-2 min-[760px]:h-[52px] min-[760px]:w-[52px]"
        >
          <ChevronLeft className="h-4 w-4 min-[760px]:h-5 min-[760px]:w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next industry"
          className="absolute right-0 top-1/2 z-[200] flex h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full bg-violet text-white shadow-[0_10px_26px_rgba(91,33,182,0.35)] transition-all duration-200 hover:scale-[1.08] hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft focus-visible:ring-offset-2 min-[760px]:h-[52px] min-[760px]:w-[52px]"
        >
          <ChevronRight className="h-4 w-4 min-[760px]:h-5 min-[760px]:w-5" />
        </button>

        <div
          className="relative h-[290px] min-[760px]:h-[340px] [perspective:1100px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {industries.map((industry, index) => {
            const off = offsetOf(index, active);
            const ab = Math.abs(off);
            const isCenter = off === 0;
            const visible = ab <= MAX_VISIBLE_OFFSET;

            const shot = (
              <div className="overflow-hidden rounded-chip border border-white/60 bg-white shadow-card-hover">
                <div className="flex items-center gap-1 border-b border-border px-2.5 py-[7px]">
                  <span className="h-[7px] w-[7px] rounded-full bg-red/70" />
                  <span className="h-[7px] w-[7px] rounded-full bg-amber/70" />
                  <span className="h-[7px] w-[7px] rounded-full bg-emerald/70" />
                </div>
                <div className="relative h-[95px] min-[760px]:h-[120px]">
                  {industry.image ? (
                    <>
                      <Image
                        src={industry.image}
                        alt={industry.imageAlt ?? industry.name}
                        fill
                        sizes="270px"
                        className="object-cover"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                      />
                      <span className="absolute bottom-1.5 left-2.5 font-display text-xs font-bold text-white min-[760px]:text-sm">
                        {industry.name}
                      </span>
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-lilac-100 to-pink-tint">
                      <span className="font-body text-[10px] text-violet-soft">{industry.name}</span>
                    </div>
                  )}
                </div>
              </div>
            );

            return (
              <div
                key={industry.id}
                role={visible && !isCenter ? "button" : undefined}
                tabIndex={visible && !isCenter ? 0 : -1}
                aria-label={visible && !isCenter ? `Show ${industry.lead.replace(":", "")}` : undefined}
                aria-hidden={!visible}
                onClick={() => !isCenter && jump(index)}
                onKeyDown={(event) => handleCardKeyDown(event, index, isCenter)}
                className={cn(
                  "absolute left-1/2 top-[26px] w-[210px] transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none min-[760px]:w-[270px]",
                  isCenter && industry.href ? "cursor-default" : "cursor-pointer"
                )}
                style={{
                  transform: `translateX(calc(-50% + ${off * STEP_PX}px)) scale(${1 - ab * SCALE_STEP}) rotateY(${off * -ROTATE_DEG}deg)`,
                  zIndex: 50 - ab,
                  opacity: ab > MAX_VISIBLE_OFFSET ? 0 : 1 - ab * OPACITY_STEP,
                  pointerEvents: visible ? "auto" : "none",
                }}
              >
                <div className="relative rounded-chip bg-lilac-card px-4 pb-4">
                  <div
                    className={cn(
                      "-mb-3 -translate-y-[26px] transition-transform duration-[600ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none",
                      isCenter && "-translate-y-10 scale-[1.07]"
                    )}
                  >
                    {isCenter && industry.href ? (
                      <a href={industry.href} aria-label={`See the ${industry.name} case study`}>
                        {shot}
                      </a>
                    ) : (
                      shot
                    )}
                  </div>
                  <p className="px-0.5 text-[13.5px] font-medium leading-[1.45] text-ink">
                    <b className="font-bold text-violet">{industry.lead}</b>
                    {industry.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-[18px] flex justify-center gap-2">
        {industries.map((industry, index) => (
          <button
            key={industry.id}
            type="button"
            onClick={() => jump(index)}
            aria-label={`Go to ${industry.lead.replace(":", "")}`}
            aria-current={index === active}
            className={cn(
              "h-2 rounded-pill bg-lilac-card transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft",
              index === active ? "w-6 bg-violet" : "w-2"
            )}
          />
        ))}
      </div>
    </Section>
  );
}
