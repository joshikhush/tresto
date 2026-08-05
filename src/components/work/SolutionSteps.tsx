"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { CaseStudySolution } from "@/types/case-study";

/**
 * Solution — sticky image, scrolling steps. One image for the whole section
 * (not per-step): it sits in the left column at `sticky top-[100px]` and
 * stays in view while the right column's numbered steps scroll past. Below
 * the md breakpoint it stacks — image first (`order-first`), then steps,
 * both un-stuck.
 *
 * The "active" step (2px violet rail + dot, vs. the neutral line color on
 * the rest) is whichever step is nearest the vertical center of the
 * viewport, tracked via IntersectionObserver against a thin horizontal
 * band (`rootMargin: "-45% 0px -45% 0px"`) rather than a scroll-position
 * calculation — same family of scroll-driven techniques as Services.tsx's
 * pinned stack, just simpler since there's no transform interpolation
 * here, only a color swap.
 */
export function SolutionSteps({ solution }: { solution: CaseStudySolution }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = stepRefs.current.findIndex((el) => el === entry.target);
          if (index !== -1) setActiveIndex(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [solution.steps.length]);

  return (
    <section>
      <div className="mx-auto max-w-[1080px] px-8 py-[52px] md:py-[86px]">
        <div className="mb-[13px] text-[10.5px] font-bold uppercase tracking-[.15em] text-[var(--work-violet)]">
          What we built
        </div>
        <h2 className="max-w-[540px] font-display text-[25px] font-extrabold leading-[1.18] tracking-[-.032em] text-[var(--work-navy)] md:text-[32px]">
          {solution.heading}
        </h2>
        <p className="mt-5 max-w-[620px] text-[16px] leading-[1.82] text-[var(--work-ink2)] md:text-[16.5px]">
          {solution.intro}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[.92fr_1.08fr] md:items-start md:gap-14">
          <div className="work-img-fallback relative order-first h-[220px] overflow-hidden rounded-2xl md:sticky md:top-[100px] md:h-[420px]">
            <Image src={solution.image} alt={solution.heading} fill className="object-cover" />
          </div>

          <div>
            {solution.steps.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={step.title}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative border-b border-l-2 border-b-[var(--work-line)] py-[34px] pl-6 last:border-b-0 last:pb-0",
                    isActive ? "border-l-[var(--work-violet)]" : "border-l-[var(--work-line)]"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-[5px] top-[38px] h-2 w-2 rounded-full transition-colors duration-300",
                      isActive ? "bg-[var(--work-violet)]" : "bg-[var(--work-line2)]"
                    )}
                  />
                  <div className="mb-[13px] font-mono text-[11px] tracking-[.12em] text-[var(--work-violet)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-[14px] font-display text-[20px] font-bold tracking-[-.02em] text-[var(--work-navy)] md:text-[23px]">
                    {step.title}
                  </h3>
                  {step.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="mb-[19px] text-[15px] leading-[1.8] text-[var(--work-ink2)] last:mb-0 md:text-[15.5px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
