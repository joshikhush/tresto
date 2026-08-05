import type { CaseStudy, CaseStudyIndustry } from "@/types/case-study";
import { caseStudies } from "@/content/case-studies";

/**
 * The only module pages should import case-study data from. Keeping this as
 * the single boundary means the data source (currently hardcoded TS files)
 * can be swapped for a CMS later without touching any page.
 */

const INDUSTRY_LABELS: Record<CaseStudyIndustry, string> = {
  "real-estate": "Real Estate",
  "ride-hailing": "Ride-Hailing",
  "industrial-iot": "Industrial IoT",
  erp: "ERP",
  manufacturing: "Manufacturing",
};

/** All industries with at least one case study, in a fixed display order — for filter chips. */
export function getAllIndustries(): CaseStudyIndustry[] {
  return Object.keys(INDUSTRY_LABELS) as CaseStudyIndustry[];
}

export function getIndustryLabel(industry: CaseStudyIndustry): string {
  return INDUSTRY_LABELS[industry];
}

/** All case studies, sorted by `order` ascending. */
export function getAllCaseStudies(): CaseStudy[] {
  return [...caseStudies].sort((a, b) => a.order - b.order);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

/**
 * Up to `count` other case studies for a "more work" section, walking
 * forward from `slug`'s position in order (sorted by `order`) and wrapping
 * around the start of the list. Never includes `slug` itself.
 */
export function getAdjacentCaseStudies(slug: string, count: number): CaseStudy[] {
  const all = getAllCaseStudies();
  const currentIndex = all.findIndex((caseStudy) => caseStudy.slug === slug);

  if (currentIndex === -1) {
    return all.slice(0, count);
  }

  const adjacent: CaseStudy[] = [];
  for (let offset = 1; adjacent.length < count && offset < all.length; offset++) {
    adjacent.push(all[(currentIndex + offset) % all.length]);
  }
  return adjacent;
}

/** Case studies flagged to show on the homepage, sorted by `order` ascending. */
export function getFeaturedCaseStudies(): CaseStudy[] {
  return getAllCaseStudies().filter((caseStudy) => caseStudy.featured);
}
