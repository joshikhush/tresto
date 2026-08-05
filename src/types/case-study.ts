/**
 * The 5 industries currently covered by case studies (epc-project-erp is
 * filed under "erp", not a separate industry). Inferred from the six
 * case-study slugs this file type-checks against — revisit if a future case
 * study doesn't cleanly fit one of these.
 */
export type CaseStudyIndustry =
  | "real-estate"
  | "ride-hailing"
  | "industrial-iot"
  | "erp"
  | "manufacturing";

/** One row in the "At a glance" meta strip (e.g. Client, Year, Platform, Team). */
export interface AtAGlanceItem {
  label: string;
  value: string;
}

/** One headline result (e.g. "40%" / "faster onboarding"). Omit the whole section if none exist. */
export interface CaseStudyMetric {
  value: string;
  label: string;
}

/** The "what was broken before us" section. */
export interface CaseStudyProblem {
  heading: string;
  paragraphs: string[];
}

/** One obstacle called out before the solution is presented. */
export interface CaseStudyChallenge {
  title: string;
  body: string;
}

/** One step within the solution narrative. */
export interface CaseStudySolutionStep {
  title: string;
  paragraphs: string[];
}

/** The "what we built and how" section. */
export interface CaseStudySolution {
  heading: string;
  intro: string;
  /** Path under /public, e.g. /work/[slug]/step-1.jpg — one image for the whole section. */
  image: string;
  steps: CaseStudySolutionStep[];
}

/** One notable feature/capability shipped, shown as its own card. */
export interface CaseStudyCapability {
  title: string;
  body: string;
}

/** One technology within a tech-stack layer (e.g. layer "Backend", abbr "PG"). */
export interface CaseStudyTechItem {
  abbr: string;
  name: string;
  role: string;
}

/** One layer of the tech stack (e.g. "Frontend", "Backend", "Infrastructure"). */
export interface CaseStudyTechLayer {
  layer: string;
  items: CaseStudyTechItem[];
}

/** The closing "results and impact" section. */
export interface CaseStudyOutcome {
  heading: string;
  paragraphs: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  industry: CaseStudyIndustry;
  year: string;
  platform: string;
  /** e.g. "5 min read" */
  readTime: string;

  /** Path under /public, e.g. /work/[slug]/hero.jpg */
  heroImage: string;
  atAGlance: AtAGlanceItem[];

  /** Omit entirely (don't render the section) when there are no verifiable numbers yet. */
  metrics?: CaseStudyMetric[];

  problem: CaseStudyProblem;

  /**
   * Omit entirely (don't render the pull quote) when there's no real,
   * cleared-for-use line yet. `afterParagraph` is a 0-based index into
   * `problem.paragraphs` — the quote renders immediately after that
   * paragraph, so it interrupts the prose rather than trailing it.
   * ProblemSection defaults to 1 when the index is out of range.
   */
  pullQuote?: { text: string; afterParagraph: number };

  /** Section heading for Challenges. Falls back to static site copy when absent. */
  challengesHeading?: string;
  challenges: CaseStudyChallenge[];
  solution: CaseStudySolution;
  /** Section heading for Capabilities. Falls back to static site copy when absent. */
  capabilitiesHeading?: string;
  capabilities: CaseStudyCapability[];
  techStack: CaseStudyTechLayer[];
  outcome: CaseStudyOutcome;

  /** Show on the homepage. */
  featured: boolean;
  /** Lower shows first on /work. Use gaps of 10 so items can be inserted later without renumbering. */
  order: number;
}
