"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Reveal, REVEAL_DELAY, ButtonSecondary } from "@/components/ui";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface CaseStudy {
  tag: string;
  title: string;
  desc: string;
  chips: string[];
  /** Path under /public/work — falls back to a solid placeholder if omitted. */
  img?: string;
  href: string;
}

const STAGGER_MS = 110;

// TODO: replace with real project screenshots
const caseStudies: CaseStudy[] = [
  {
    tag: "Mobile App",
    title: "HiveGuard",
    desc: "A Flutter and Node.js app for beekeepers and pesticide applicators to log hive inspections and coordinate spray schedules in the field.",
    chips: ["Flutter", "Node.js"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=65",
    href: "/work/hiveguard",
  },
  {
    tag: "Website",
    title: "Triveni Radiators",
    desc: "A multi-page industrial website for Triveni Radiators covering their product catalogue and enquiry pipeline.",
    chips: ["Next.js", "SEO"],
    img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=900&q=65",
    href: "/work/triveni-radiators",
  },
  {
    tag: "AI Content",
    title: "Rotary Nagar",
    desc: "An AI-generated marketing video and content kit for Rotary Nagar, a plotted township development.",
    chips: ["AI Pipeline", "Video"],
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=65",
    href: "/work/rotary-nagar",
  },
  {
    tag: "Retail POS",
    title: "Smart Stores",
    desc: "A point-of-sale and dashboard system built for retail stores to manage inventory and daily sales.",
    chips: ["POS", "Dashboard"],
    img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=900&q=65",
    href: "/work/smart-stores",
  },
];

/**
 * S9 — Case Studies. Raw CSS (.cs- classnames in globals.css), not Tailwind
 * utilities, per spec. Entrance is a one-shot IntersectionObserver on the
 * grid (threshold 0.2): once it fires, every card gets `.cs-in` and reveals
 * with a 110ms stagger via the `--cs-delay` custom property set inline per
 * card index — see the comment on `.cs-card` in globals.css for why that
 * delay can't leak into later hover transitions.
 */
export function Cases() {
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
    <section id="work" className="cs-section">
      <div className="cs-container">
        <Reveal delay={REVEAL_DELAY.eyebrow}>
          <p className="cs-eyebrow">Our Work</p>
        </Reveal>
        <Reveal delay={REVEAL_DELAY.heading}>
          <h2 className="cs-heading">Case Studies</h2>
        </Reveal>

        <div className="cs-grid" ref={gridRef}>
          {caseStudies.map((project, index) => (
            <a
              key={project.title}
              href={project.href}
              className={`cs-card${inView ? " cs-in" : ""}`}
              style={{ "--cs-delay": `${index * STAGGER_MS}ms` } as CSSProperties}
            >
              {project.img ? (
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="(min-width: 700px) 500px, 100vw"
                  className="cs-img"
                />
              ) : (
                <div className="cs-img-placeholder" />
              )}

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

        <div className="cs-button-row">
          <ButtonSecondary href="/work" icon={<span aria-hidden>→</span>} className="font-[family-name:var(--font-display)]">
            See all work
          </ButtonSecondary>
        </div>
      </div>
    </section>
  );
}
