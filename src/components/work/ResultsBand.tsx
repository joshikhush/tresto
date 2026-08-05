import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { CaseStudyMetric } from "@/types/case-study";

/**
 * Results — dark strip 1 of 2 (design allows exactly two dark sections on
 * the page: this one and TechStack). Does not render at all when `metrics`
 * is absent or empty. Column count tracks the actual metric count rather
 * than the design's fixed 3, since the data type allows any length.
 */
export function ResultsBand({ metrics }: { metrics: CaseStudyMetric[] | undefined }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="bg-[var(--work-navy)] text-white">
      <div
        className="mx-auto grid max-w-[1080px] grid-cols-1 md:grid-cols-[repeat(var(--rg-cols),1fr)]"
        style={{ "--rg-cols": metrics.length } as CSSProperties}
      >
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={cn(
              "px-6 py-[30px] md:px-10 md:py-11",
              "border-b border-white/[.09] md:border-b-0 md:border-r md:border-white/[.09]",
              index === metrics.length - 1 && "border-b-0 md:border-r-0"
            )}
          >
            <div className="work-grad-text font-display text-[44px] font-extrabold leading-none tracking-[-.042em]">
              {metric.value}
            </div>
            <div className="mt-[11px] text-[13.5px] leading-[1.55] text-[#B8B5CC]">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
