"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** Display shape for one Cases-grid card — mapped from a real CaseStudy in Cases.tsx. */
export interface CaseStudyCard {
  tag: string;
  title: string;
  desc: string;
  chips: string[];
  /** Path under /public — e.g. heroImage. May 404 until real assets land; see .cs-img-placeholder below. */
  img: string;
  href: string;
}

const STAGGER_MS = 110;

/**
 * S9 — Case Studies animated grid. Split out of Cases.tsx so the
 * data-fetching parent can stay a server component; this is the only part
 * that needs client state (the one-shot IntersectionObserver entrance and
 * its per-card `--cs-delay` stagger). Raw CSS (.cs- classnames in
 * globals.css), not Tailwind utilities, per spec — unchanged by the split.
 * See the comment on `.cs-card` in globals.css for why the entrance delay
 * can't leak into later hover transitions.
 */
export function CasesGrid({ cards }: { cards: CaseStudyCard[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [observed, setObserved] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const inView = observed || prefersReducedMotion;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setObserved(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div className="cs-grid" ref={gridRef}>
      {cards.map((project, index) => (
        <a
          key={project.title}
          href={project.href}
          className={`cs-card${inView ? " cs-in" : ""}`}
          style={{ "--cs-delay": `${index * STAGGER_MS}ms` } as CSSProperties}
        >
          {/* Always rendered behind next/image (not a conditional fallback) — no
              filesystem check for whether `img` actually exists on disk. If it
              404s, the <img> underneath paints nothing and this violet tint
              shows through; if it loads, `fill` + object-cover fully covers it. */}
          <div className="cs-img-placeholder" />
          <Image
            src={project.img}
            alt={project.title}
            fill
            sizes="(min-width: 700px) 500px, 100vw"
            className="cs-img"
          />

          <div className="cs-overlay">
            <span className="cs-tag">{project.tag}</span>
            <h3 className="cs-title">{project.title}</h3>
            <p className="cs-desc">{project.desc}</p>
            <div className="cs-meta">
              {project.chips.map((chip) => (
                <span key={chip} className="cs-chip">
                  {chip}
                </span>
              ))}
              <span className="cs-view">View Case Study →</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
