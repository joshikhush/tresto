"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { getIndustryLabel } from "@/lib/case-studies";
import { cn } from "@/lib/cn";
import type { CaseStudy, CaseStudyIndustry } from "@/types/case-study";

const ALL = "all" as const;
type IndustryFilter = CaseStudyIndustry | typeof ALL;

/**
 * Industry filter chips + case-study grid for /work. The only client
 * component on the page — everything else (data fetching, the page shell)
 * stays server-rendered. Filtering happens entirely in memory against the
 * already-resolved `caseStudies` prop, no refetch.
 */
export function CaseStudyFilterGrid({
  caseStudies,
  industries,
}: {
  caseStudies: CaseStudy[];
  industries: CaseStudyIndustry[];
}) {
  const [selected, setSelected] = useState<IndustryFilter>(ALL);
  const filtered = selected === ALL ? caseStudies : caseStudies.filter((cs) => cs.industry === selected);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <FilterChip active={selected === ALL} onClick={() => setSelected(ALL)}>
          All
        </FilterChip>
        {industries.map((industry) => (
          <FilterChip key={industry} active={selected === industry} onClick={() => setSelected(industry)}>
            {getIndustryLabel(industry)}
          </FilterChip>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-pill border px-4 py-2 text-sm font-medium transition-colors",
        active ? "border-violet bg-violet text-white" : "border-border text-text-muted hover:border-violet hover:text-violet"
      )}
    >
      {children}
    </button>
  );
}

function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group block overflow-hidden rounded-card border border-border bg-white shadow-soft transition-shadow duration-300 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-lilac-100">
        <Image
          src={caseStudy.heroImage}
          alt={caseStudy.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-label text-violet">
          {getIndustryLabel(caseStudy.industry)}
        </p>
        <h3 className="mt-2 font-display text-lg font-bold text-ink">{caseStudy.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{caseStudy.summary}</p>
        <span className="mt-4 inline-block text-sm font-semibold text-violet">Read case study →</span>
      </div>
    </Link>
  );
}
