"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Section, SectionLabel, GhostWord } from "@/components/ui";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface Industry {
  id: string;
  /** Bold lead-in of the caption, e.g. "Manufacturing:". */
  lead: string;
  /** Regular-weight remainder of the caption (leading space intentional). */
  text: string;
  /** Short lowercase tag shown on the screenshot placeholder. */
  category: string;
  /** Real screenshot path once assets exist — falls back to a gradient placeholder. */
  image?: string;
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
    category: "manufacturing",
    href: "#", // -> Triveni Radiators case study
  },
  {
    id: "real-estate",
    lead: "Real Estate:",
    text: " property sites with WhatsApp-first leads",
    category: "real estate",
    href: "#", // -> Manglam Homes case study
  },
  {
    id: "ngo",
    lead: "NGOs & Local:",
    text: " profiles & CSR decks that build credibility",
    category: "ngo",
    href: "#", // -> Virtuous Club India case study
  },
  {
    id: "field-services",
    lead: "Field Services:",
    text: " offline-first apps for crews in the field",
    category: "field services",
    href: "#", // -> HiveGuard case study
  },
  {
    id: "startups",
    lead: "Startups:",
    text: " MVPs in weeks — web, mobile & AI in one place",
    category: "startups",
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
      <SectionLabel>Who we build for</SectionLabel>
      <h2 className="mt-2 text-section-title text-ink">Built for teams who need to move fast</h2>
      <p className="mt-2 max-w-xl text-sm text-text-muted">
        Pick your industry — see what we ship for teams like yours.
      </p>

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
                <div className="relative flex h-[95px] items-center justify-center bg-gradient-to-br from-lilac-100 to-pink-tint min-[760px]:h-[120px]">
                  <span className="font-body text-[10px] text-violet-soft">{industry.category}</span>
                  <span className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-violet text-white shadow-[0_8px_20px_rgba(91,33,182,0.4)] transition-transform duration-200 group-hover:scale-110">
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </span>
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
                  "group absolute left-1/2 top-[26px] w-[210px] transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none min-[760px]:w-[270px]",
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
                      <a href={industry.href} aria-label={`See the ${industry.category} case study`}>
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
