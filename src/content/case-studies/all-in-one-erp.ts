import type { CaseStudy } from "@/types/case-study";

// PLACEHOLDER CONTENT — real copy to follow.
export const allInOneErp: CaseStudy = {
  slug: "all-in-one-erp",
  title: "All-in-One ERP",
  summary: "A placeholder summary describing the outcome, not the category.",
  industry: "erp",
  year: "2025",
  platform: "Web",
  readTime: "7 min read",

  heroImage: "/work/all-in-one-erp/hero.jpg",

  atAGlance: [
    { label: "Client", value: "Placeholder Client" },
    { label: "Year", value: "2025" },
    { label: "Platform", value: "Web" },
    { label: "Engagement", value: "Placeholder — e.g. 4 months" },
  ],

  metrics: [
    { value: "00%", label: "Placeholder metric" },
    { value: "00%", label: "Placeholder metric" },
  ],

  problem: {
    heading: "The problem",
    paragraphs: [
      "Placeholder paragraph describing what was broken or missing before Tresto got involved.",
      "Placeholder paragraph continuing the problem narrative.",
    ],
  },

  pullQuote: {
    text: "Placeholder pull quote — one striking line for the middle of the article.",
    afterParagraph: 0,
  },

  challengesHeading: "What kept every department on a different system",
  challenges: [
    { title: "Placeholder challenge one", body: "Placeholder body text describing the obstacle." },
    { title: "Placeholder challenge two", body: "Placeholder body text describing the obstacle." },
  ],

  solution: {
    heading: "The solution",
    intro: "Placeholder intro describing the overall approach taken.",
    image: "/work/all-in-one-erp/step-1.jpg",
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
      items: [{ abbr: "NX", name: "Next.js", role: "Admin dashboard" }],
    },
    {
      layer: "Backend",
      items: [{ abbr: "NJ", name: "Node.js", role: "Business logic + API" }],
    },
  ],

  outcome: {
    heading: "The outcome",
    paragraphs: [
      "Placeholder paragraph describing the results and impact after launch.",
    ],
  },

  featured: false,
  order: 40,
};
