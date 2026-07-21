"use client";

import type { MouseEvent } from "react";
import {
  Server,
  FileCode2,
  Triangle,
  Database,
  Route,
  Sparkles,
  ListChecks,
  Zap,
  Smartphone,
  Target,
  Flame,
  HardDrive,
  Rocket,
  TrainFront,
  Cloud,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionLabel, GhostWord, Reveal, REVEAL_DELAY } from "@/components/ui";
import { cn } from "@/lib/cn";

interface Tool {
  name: string;
  icon: LucideIcon;
  caption: string;
  category: "Engineering" | "AI" | "Mobile" | "Cloud";
}

// Vertical marquee columns (design-refs/tresto-techstack-set3.html, Option
// B). Add a tool here and it flows into the column split below — no other
// code changes needed.
const tools: Tool[] = [
  { name: "Node.js", icon: Server, caption: "JavaScript runtime for backend services", category: "Engineering" },
  { name: "TypeScript", icon: FileCode2, caption: "Type-safe code end to end", category: "Engineering" },
  { name: "Next.js", icon: Triangle, caption: "React framework for our web builds", category: "Engineering" },
  { name: "PostgreSQL", icon: Database, caption: "Primary relational database", category: "Engineering" },
  { name: "Express", icon: Route, caption: "Lightweight API framework", category: "Engineering" },
  { name: "Claude API", icon: Sparkles, caption: "Powers agents and content automation", category: "AI" },
  { name: "BullMQ", icon: ListChecks, caption: "Background job queues", category: "AI" },
  { name: "Redis", icon: Zap, caption: "Caching and fast state", category: "AI" },
  { name: "Flutter", icon: Smartphone, caption: "Cross-platform mobile framework", category: "Mobile" },
  { name: "Dart", icon: Target, caption: "Flutter's programming language", category: "Mobile" },
  { name: "Firebase", icon: Flame, caption: "Auth, push notifications and analytics", category: "Mobile" },
  { name: "SQLite", icon: HardDrive, caption: "Offline-first local storage", category: "Mobile" },
  { name: "Vercel", icon: Rocket, caption: "Hosting and deploys for web apps", category: "Cloud" },
  { name: "Railway", icon: TrainFront, caption: "Backend and database hosting", category: "Cloud" },
  { name: "Cloudflare", icon: Cloud, caption: "DNS, CDN and edge network", category: "Cloud" },
  { name: "GitHub Actions", icon: Workflow, caption: "CI/CD pipelines", category: "Cloud" },
];

/** Splits `items` into `columns` groups as evenly as possible (earlier columns absorb the remainder). */
function splitIntoColumns<T>(items: T[], columns: number): T[][] {
  const base = Math.floor(items.length / columns);
  const remainder = items.length % columns;
  const result: T[][] = [];
  let start = 0;
  for (let i = 0; i < columns; i++) {
    const size = base + (i < remainder ? 1 : 0);
    result.push(items.slice(start, start + size));
    start += size;
  }
  return result;
}

const columns = splitIntoColumns(tools, 3);

const maskImage = "linear-gradient(180deg, transparent, black 12%, black 88%, transparent)";

const columnAnimation = ["animate-vmarquee-up-slow", "animate-vmarquee-down", "animate-vmarquee-up-slower"];

/** Ports the reference's gl(e, el) — writes --mx/--my straight to the DOM, no setState, so mousemove never re-renders. */
function handleSpotlightMove(event: MouseEvent<HTMLDivElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  card.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <div
      onMouseMove={handleSpotlightMove}
      className="spotlight-card w-full shrink-0 rounded-card border border-border bg-white px-4 py-[18px] text-center transition-colors duration-200"
    >
      <Icon className="mx-auto mb-2 h-6 w-6 text-violet" />
      <b className="block font-mono text-[13.5px] font-semibold text-ink">{tool.name}</b>
      <small className="mt-1 block font-mono text-[10.5px] text-text-muted">{tool.caption}</small>
    </div>
  );
}

/**
 * S14 — Tech Stack. Three CSS-only vertical marquees (content duplicated
 * back-to-back, `animate-vmarquee-*` keyframes in globals.css translate one
 * full copy's height so the loop wraps with no visible seam). No JS timers;
 * hover-pause is `group-hover:[animation-play-state:paused]` and
 * prefers-reduced-motion drops the marquee entirely in CSS.
 *
 * Client component only because of the cursor-tracking spotlight border on
 * each card (`.spotlight-card` in globals.css) — mousemove writes --mx/--my
 * directly via `style.setProperty`, never through React state, so it can't
 * trigger a re-render. The spotlight itself is pure CSS (radial-gradient +
 * mask), scoped inside `(hover: hover)`; touch devices fall back to a
 * `(hover: none) :active` border-color instead.
 */
export function TechStack() {
  return (
    <Section id="tech" bg="white" className="relative overflow-hidden">
      <GhostWord>OUR TECH STACK</GhostWord>

      <div className="grid grid-cols-1 items-center gap-10 min-[860px]:grid-cols-[1fr_1.2fr] min-[860px]:gap-[60px]">
        <div>
          <Reveal delay={REVEAL_DELAY.eyebrow}>
            <SectionLabel>Our tech stack</SectionLabel>
          </Reveal>
          <Reveal delay={REVEAL_DELAY.heading}>
            <h2 className="mt-2 text-section-title text-ink">Tools we actually build with</h2>
          </Reveal>
          <Reveal delay={REVEAL_DELAY.paragraph}>
            <p className="mt-3 max-w-md text-sm text-text-muted">
              The languages, frameworks and platforms we reach for on almost every engagement — hover the columns
              to pause and take a closer look.
            </p>
          </Reveal>
        </div>

        <div
          className="group grid h-[320px] grid-cols-2 gap-3.5 overflow-hidden min-[860px]:h-[420px] min-[860px]:grid-cols-3"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          {columns.map((columnTools, columnIndex) => (
            <div
              key={columnIndex}
              className={cn(
                "flex w-full flex-col gap-3.5",
                columnAnimation[columnIndex],
                "group-hover:[animation-play-state:paused]",
                columnIndex === 2 && "hidden min-[860px]:flex"
              )}
            >
              {[...columnTools, ...columnTools].map((tool, itemIndex) => (
                <ToolCard key={`${tool.name}-${itemIndex}`} tool={tool} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
