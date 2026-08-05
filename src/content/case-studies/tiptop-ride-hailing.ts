import type { CaseStudy } from "@/types/case-study";

// PLACEHOLDER CONTENT — real copy to follow.
export const tiptopRideHailing: CaseStudy = {
  slug: "tiptop-ride-hailing",
  title: "TipTop Ride-Hailing",
  summary: "A placeholder summary describing the outcome, not the category.",
  industry: "ride-hailing",
  year: "2025",
  platform: "iOS · Android",
  readTime: "5 min read",

  heroImage: "/work/tiptop-ride-hailing/hero.jpg",

  atAGlance: [
    { label: "Client", value: "Placeholder Client" },
    { label: "Year", value: "2025" },
    { label: "Platform", value: "iOS, Android" },
    { label: "Engagement", value: "Placeholder — e.g. Ongoing" },
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

  challengesHeading: "What two platforms and live tracking demanded",
  challenges: [
    { title: "Placeholder challenge one", body: "Placeholder body text describing the obstacle." },
    { title: "Placeholder challenge two", body: "Placeholder body text describing the obstacle." },
  ],

  solution: {
    heading: "The solution",
    intro: "Placeholder intro describing the overall approach taken.",
    image: "/work/tiptop-ride-hailing/step-1.jpg",
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
      items: [{ abbr: "FL", name: "Flutter", role: "Cross-platform rider + driver apps" }],
    },
    {
      layer: "Backend",
      items: [{ abbr: "FB", name: "Firebase", role: "Realtime location + auth" }],
    },
  ],

  outcome: {
    heading: "The outcome",
    paragraphs: [
      "Placeholder paragraph describing the results and impact after launch.",
    ],
  },

  featured: true,
  order: 20,
};
