import { Reveal, REVEAL_DELAY, ButtonSecondary } from "@/components/ui";
import { getAllCaseStudies } from "@/lib/case-studies";
import type { CaseStudyIndustry } from "@/types/case-study";
import { CasesGrid, type CaseStudyCard } from "./CasesGrid";

/**
 * Homepage-teaser-only label set — deliberately separate from
 * `getIndustryLabel` in @/lib/case-studies (which renders "ERP", not
 * "Business Systems"). That lookup drives /work's filter chips and case
 * study pages; changing it would ripple there too, so this one stays local
 * to the Cases card's "tag" field.
 */
const CARD_TAG_LABELS: Record<CaseStudyIndustry, string> = {
  "real-estate": "Real Estate",
  "ride-hailing": "Ride-Hailing",
  "industrial-iot": "Industrial IoT",
  erp: "Business Systems",
  manufacturing: "Manufacturing",
};

const CARD_COUNT = 4;

/**
 * S9 — Case Studies. Server component: fetches real case-study data and
 * maps it to card shape, then hands the array to CasesGrid (client) for the
 * IntersectionObserver-driven entrance and hover behaviour. Shows the first
 * 4 case studies by `order` — the 2-column .cs-grid fills cleanly at 4;
 * "See all work" points at /work, which lists all six.
 */
export function Cases() {
  const cards: CaseStudyCard[] = getAllCaseStudies()
    .slice(0, CARD_COUNT)
    .map((caseStudy) => ({
      tag: CARD_TAG_LABELS[caseStudy.industry],
      title: caseStudy.title,
      desc: caseStudy.summary,
      chips: (caseStudy.techStack[0]?.items ?? []).slice(0, 2).map((item) => item.name),
      img: caseStudy.heroImage,
      href: `/work/${caseStudy.slug}`,
    }));

  return (
    <section id="work" className="cs-section">
      <div className="cs-container">
        <Reveal delay={REVEAL_DELAY.eyebrow}>
          <p className="cs-eyebrow">Our Work</p>
        </Reveal>
        <Reveal delay={REVEAL_DELAY.heading}>
          <h2 className="cs-heading">Case Studies</h2>
        </Reveal>

        <CasesGrid cards={cards} />

        <div className="cs-button-row">
          <ButtonSecondary href="/work" icon={<span aria-hidden>→</span>} className="font-[family-name:var(--font-display)]">
            See all work
          </ButtonSecondary>
        </div>
      </div>
    </section>
  );
}
