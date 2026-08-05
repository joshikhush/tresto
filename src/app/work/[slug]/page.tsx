import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyHero } from "@/components/work/CaseStudyHero";
import { ResultsBand } from "@/components/work/ResultsBand";
import { ProblemSection } from "@/components/work/ProblemSection";
import { ChallengesGrid } from "@/components/work/ChallengesGrid";
import { SolutionSteps } from "@/components/work/SolutionSteps";
import { CapabilitiesGrid } from "@/components/work/CapabilitiesGrid";
import { TechStack } from "@/components/work/TechStack";
import { OutcomeSection } from "@/components/work/OutcomeSection";
import { MoreWork } from "@/components/work/MoreWork";
import { ContactForm } from "@/components/work/ContactForm";
import { getAllCaseStudies, getAdjacentCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCaseStudies().map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.title} - Tresto`,
    description: caseStudy.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const moreWork = getAdjacentCaseStudies(slug, 3);

  return (
    <>
      <CaseStudyHero caseStudy={caseStudy} />
      <ResultsBand metrics={caseStudy.metrics} />
      <ProblemSection atAGlance={caseStudy.atAGlance} problem={caseStudy.problem} pullQuote={caseStudy.pullQuote} />
      <ChallengesGrid challenges={caseStudy.challenges} heading={caseStudy.challengesHeading} />
      <SolutionSteps solution={caseStudy.solution} />
      <CapabilitiesGrid capabilities={caseStudy.capabilities} heading={caseStudy.capabilitiesHeading} />
      <TechStack techStack={caseStudy.techStack} />
      <OutcomeSection outcome={caseStudy.outcome} />
      <MoreWork items={moreWork} />
      <ContactForm />
    </>
  );
}
