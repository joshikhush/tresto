"use client";

import { useState } from "react";
import { Section, SectionLabel, Button, TodoBadge, GhostWord } from "@/components/ui";
import { cn } from "@/lib/cn";

interface CaseStudy {
  id: string;
  name: string;
  description: string;
  /** Impact metric labels — values are unconfirmed, rendered as TodoBadge (§3). */
  impact: string[];
  demoHref?: string;
  caseStudyHref?: string;
}

// Real seed projects from BUILD_SPEC §5 S9 — §3 forbids inventing client work.
const caseStudies: CaseStudy[] = [
  {
    id: "hiveguard",
    name: "HiveGuard",
    description:
      "A Flutter + Node.js app built for beekeepers and pesticide applicators to log hive inspections and coordinate spray schedules in the field.",
    impact: ["Hive inspections logged", "Applicators onboarded", "Avg. sync time"],
  },
  {
    id: "triveni-radiators",
    name: "Triveni Radiators",
    description:
      "A multi-page industrial site for Triveni Radiators, deployed on Vercel, covering their product catalogue and enquiry flow.",
    impact: ["Pages shipped", "Products catalogued", "Lighthouse score"],
  },
  {
    id: "rotary-nagar",
    name: "Rotary Nagar",
    description:
      "An AI-generated marketing video and content kit for Rotary Nagar, a plotted township, used across their sales and social channels.",
    impact: ["Assets delivered", "Channels covered", "Turnaround time"],
  },
  {
    id: "reshapenation",
    name: "ReshapeNation",
    description:
      "A WhatsApp visual content automation system that generates and sends on-brand creative without manual design work.",
    impact: ["Messages automated / mo", "Templates built", "Manual hours saved"],
  },
  {
    id: "manglam-homes",
    name: "Manglam Homes",
    description:
      "A real-estate site for Manglam Homes with master-plan visuals to help buyers understand layouts before a site visit.",
    impact: ["Units represented", "Master-plan views", "Enquiry conversion"],
  },
];

/**
 * S9 — Case Studies. The interaction is real (tab click swaps the panel);
 * the mockup is a single reused static placeholder, not per-project art.
 * // TODO(polish): swap in a per-project screenshot/phone mockup and real
 * // demo / case-study URLs once assets exist.
 */
export function Cases() {
  const [activeId, setActiveId] = useState(caseStudies[0].id);
  const active = caseStudies.find((c) => c.id === activeId) ?? caseStudies[0];

  return (
    <Section bg="ink" className="relative overflow-hidden">
      <GhostWord tone="dark">CASE STUDIES</GhostWord>
      <SectionLabel className="text-violet-soft">Case studies</SectionLabel>
      <h2 className="mt-2 text-section-title text-white">What we&apos;ve shipped</h2>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {caseStudies.map((study) => (
            <button
              key={study.id}
              type="button"
              onClick={() => setActiveId(study.id)}
              className={cn(
                "whitespace-nowrap rounded-chip border-l-2 px-4 py-3 text-left text-sm font-medium transition-colors lg:whitespace-normal",
                study.id === activeId
                  ? "border-gold bg-white/5 text-white"
                  : "border-transparent text-on-dark-1 hover:text-white"
              )}
            >
              {study.name}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="font-display text-2xl font-bold text-white">{active.name}</p>
            <p className="mt-3 text-on-dark-1">{active.description}</p>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {active.impact.map((label) => (
                <div key={label}>
                  <TodoBadge>value</TodoBadge>
                  <p className="mt-2 text-xs text-on-dark-1">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" href={active.caseStudyHref ?? "#"}>
                View Case Study
              </Button>
              <Button variant="ghost" href={active.demoHref ?? "#"}>
                View Demo
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-card border border-white/10 bg-white/5">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald/70" />
            </div>
            <div className="space-y-4 p-6">
              <div className="h-4 w-2/3 rounded-full bg-white/20" />
              <div className="h-32 rounded-card bg-white/10" />
              <div className="h-3 w-1/2 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
