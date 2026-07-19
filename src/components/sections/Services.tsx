"use client";
import { useEffect, useRef, useState } from "react";
import { Reveal, REVEAL_DELAY, ButtonPrimary } from "@/components/ui";

const CARD_H = 240; // must match .svc-card height in CSS
const GAP = 18;     // visible gap between the active card and the peeking one
const PEEK = CARD_H + GAP;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const CARDS = [
  { no: "01", icon: "◆", title: "Custom Website Development", desc: "Fast, SEO-ready websites built around your brand and business goals — designed to convert." },
  { no: "02", icon: "▲", title: "Mobile App Development", desc: "iOS & Android apps from one clean Flutter codebase, on a solid backend." },
  { no: "03", icon: "✦", title: "AI & Automation Pipelines", desc: "Custom automations and AI workflows that quietly remove repetitive manual work." },
  { no: "04", icon: "◈", title: "Integration & Support", desc: "We connect your tools into one system — and stay on after launch." },
];

export function Services() {
  const secRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const disabled = () => mq.matches || window.innerWidth < 820;
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sec = secRef.current;
        if (!sec) return;

        // On mobile / reduced-motion: clear transforms so cards render as a normal list
        if (disabled()) {
          cardRefs.current.forEach((c) => {
            if (c) {
              c.style.transform = "";
              c.style.zIndex = "";
            }
          });
          return;
        }

        const r = sec.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(Math.max(-r.top / (r.height - vh), 0), 1); // 0..1 through the section
        const n = CARDS.length;
        const segs = n - 1;
        const progv = p * segs;

        cardRefs.current.forEach((c, i) => {
          if (!c) return;
          c.style.zIndex = String(i + 1); // later cards ON TOP
          const rel = i - progv; // 0 = active/top, 1 = next peeking, >1 hidden below
          let ty: number;
          if (rel <= 0) ty = 0; // active + covered cards rest at top
          else if (rel <= 1) ty = easeInOut(rel) * PEEK; // next card glides up to cover the active one
          else ty = rel * PEEK; // further cards wait below, clipped
          c.style.transform = `translateY(${ty}px)`;
        });

        setActive(Math.min(Math.round(progv), segs));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="svc-sec" ref={secRef}>
      <div className="svc-pin">
        <div className="svc-left">
          <div className="svc-ghost">WHAT WE DO</div>
          <Reveal delay={REVEAL_DELAY.eyebrow}>
            <p className="svc-e">What we do</p>
          </Reveal>
          <Reveal delay={REVEAL_DELAY.heading}>
            <h2 className="svc-h2">
              Everything you need,
              <br />
              built in-house
            </h2>
          </Reveal>
          <Reveal delay={REVEAL_DELAY.paragraph}>
            <p className="svc-p">
              From custom websites to mobile apps and automation — one team, full ownership, and support that stays after launch.
            </p>
          </Reveal>
          <ButtonPrimary className="mt-6 font-[family-name:var(--font-display)]">Start a Project</ButtonPrimary>
          <div className="svc-prog">
            {CARDS.map((_, i) => (
              <i key={i} className={i <= active ? "on" : ""} />
            ))}
          </div>
        </div>

        <div className="svc-stack">
          {CARDS.map((c, i) => (
            <div
              key={c.no}
              className="svc-card"
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              <span className="svc-no">{c.no}</span>
              <div className="svc-ic">{c.icon}</div>
              <h3 className="svc-title">{c.title}</h3>
              <p className="svc-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}