import { ShieldCheck, Handshake, BadgeCheck, Eye, LifeBuoy, type LucideIcon } from "lucide-react";
import { Section, SectionLabel, GhostWord, Reveal, REVEAL_DELAY } from "@/components/ui";

interface Value {
  title: string;
  description: string;
  icon: LucideIcon;
}

const values: Value[] = [
  { title: "Trust", description: "Honest updates, always.", icon: ShieldCheck },
  { title: "Ownership", description: "Your project is ours.", icon: Handshake },
  { title: "Quality", description: "No shortcuts in code.", icon: BadgeCheck },
  { title: "Transparency", description: "Full visibility.", icon: Eye },
  { title: "Support", description: "We stay after launch.", icon: LifeBuoy },
];

/**
 * S7 — Values ("What we stand for", replaces the SoluLab awards carousel
 * Tresto doesn't have). 5 equal, lightly-bordered cards (`.gradient-border-card`
 * in globals.css — shared with the Services scroll-stack — draws the
 * animated violet→gold ring on hover via a masked ::before, pure CSS, no
 * JS needed). Card lift and icon-chip scale are
 * plain Tailwind `hover:`/`group-hover:` transitions, disabled via the
 * `motion-reduce:` variant so nothing moves under prefers-reduced-motion;
 * the ring itself still appears on hover either way (see globals.css),
 * just without an animated fade.
 */
export function Values() {
  return (
    <Section bg="white" className="relative overflow-hidden">
      <GhostWord>WHY TRESTO</GhostWord>
      <Reveal delay={REVEAL_DELAY.eyebrow}>
        <SectionLabel>Why Tresto</SectionLabel>
      </Reveal>
      <Reveal delay={REVEAL_DELAY.heading}>
        <h2 className="mt-2 text-section-title text-ink">What we stand for</h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-5">
        {values.map(({ title, description, icon: Icon }, index) => (
          <Reveal key={title} delay={REVEAL_DELAY.gridBase + index * REVEAL_DELAY.gridStep}>
            <div className="gradient-border-card group rounded-card border-[0.5px] border-border bg-[linear-gradient(150deg,#fff,#fff)] p-5 text-center transition-[background,box-shadow,transform] duration-300 hover:-translate-y-1 hover:bg-[linear-gradient(150deg,#EDE9FE,#FCE7F3)] hover:shadow-[0_18px_42px_rgba(91,33,182,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <span className="mx-auto flex h-[46px] w-[46px] items-center justify-center rounded-chip bg-lilac-card text-violet transition-all duration-300 group-hover:scale-105 group-hover:bg-violet group-hover:text-white motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>

              <p className="mt-4 font-display font-bold text-ink">{title}</p>
              <p className="mt-1 text-sm text-text-muted">{description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
