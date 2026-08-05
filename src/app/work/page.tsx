import type { Metadata } from "next";
import { Section, SectionLabel } from "@/components/ui";
import { CaseStudyFilterGrid } from "@/components/work/CaseStudyFilterGrid";
import { getAllCaseStudies, getAllIndustries } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Our Work - Tresto",
  description: "Case studies from Tresto's software and AI automation studio.",
};

export default function WorkPage() {
  const caseStudies = getAllCaseStudies();
  const industries = getAllIndustries();

  return (
    <Section bg="white" className="hero-offset-top">
      <SectionLabel>Our work</SectionLabel>
      <h1 className="mt-2 text-section-title text-ink">Case studies</h1>
      <p className="mt-4 max-w-2xl text-base text-text-muted">
        A selection of what we&apos;ve built: real estate, mobility, industrial IoT, ERP and manufacturing.
      </p>

      <div className="mt-10">
        <CaseStudyFilterGrid caseStudies={caseStudies} industries={industries} />
      </div>
    </Section>
  );
}
