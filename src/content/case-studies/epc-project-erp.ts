import type { CaseStudy } from "@/types/case-study";

// PLACEHOLDER CONTENT — real copy to follow.
export const epcProjectErp: CaseStudy = {
  slug: "epc-project-erp",
  title: "EPC Project ERP",
  summary: "A placeholder summary describing the outcome, not the category.",
  industry: "erp",
  year: "2025",
  platform: "Web",
  readTime: "6 min read",

  heroImage: "/work/epc-project-erp/hero.jpg",

  atAGlance: [
    { label: "Client", value: "Placeholder Client" },
    { label: "Year", value: "2025" },
    { label: "Platform", value: "Web" },
    { label: "Engagement", value: "Placeholder — e.g. 5 months" },
  ],

  // No metrics confirmed yet — section will not render until this is filled in.

  problem: {
    heading: "The problem",
    paragraphs: [
      "Placeholder paragraph describing what was broken or missing before Tresto got involved.",
      "Placeholder paragraph continuing the problem narrative.",
    ],
  },

  // No pull quote confirmed yet — section will not render until this is filled in.

  challengesHeading: "What made project tracking a spreadsheet problem",
  challenges: [
    { title: "Placeholder challenge one", body: "Placeholder body text describing the obstacle." },
    { title: "Placeholder challenge two", body: "Placeholder body text describing the obstacle." },
  ],

  solution: {
    heading: "The solution",
    intro: "Placeholder intro describing the overall approach taken.",
    image: "/work/epc-project-erp/step-1.jpg",
    steps: [
      {
        title: "Placeholder step one",
        paragraphs: ["Placeholder paragraph describing this step of the build."],
      },
      {
        title: "Placeholder step two",
        paragraphs: ["Placeholder paragraph describing this step of the build."],
      },
      {
        title: "Placeholder step three",
        paragraphs: ["Placeholder paragraph describing this step of the build."],
      },
    ],
  },

  capabilities: [
    { title: "Placeholder capability one", body: "Placeholder description of a shipped feature." },
    { title: "Placeholder capability two", body: "Placeholder description of a shipped feature." },
    { title: "Placeholder capability three", body: "Placeholder description of a shipped feature." },
  ],

  techStack: [
    {
      layer: "Frontend",
      items: [{ abbr: "NX", name: "Next.js", role: "Project tracking dashboard" }],
    },
    {
      layer: "Backend",
      items: [{ abbr: "PG", name: "PostgreSQL", role: "Primary data store" }],
    },
  ],

  outcome: {
    heading: "The outcome",
    paragraphs: [
      "Placeholder paragraph describing the results and impact after launch.",
    ],
  },

  featured: false,
  order: 50,
};
