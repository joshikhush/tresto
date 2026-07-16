import { ShieldCheck, Handshake, BadgeCheck, Eye, LifeBuoy, type LucideIcon } from "lucide-react";
import { Section, SectionLabel, GhostWord } from "@/components/ui";

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
      <SectionLabel>Why Tresto</SectionLabel>
      <h2 className="mt-2 text-section-title text-ink">What we stand for</h2>

      <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-5">
        {values.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="gradient-border-card group rounded-card border-[0.5px] border-border bg-white p-5 text-center transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <span className="mx-auto flex h-[46px] w-[46px] items-center justify-center rounded-chip bg-lilac-card text-violet transition-all duration-300 group-hover:scale-105 group-hover:bg-violet group-hover:text-white motion-reduce:transition-none motion-reduce:group-hover:scale-100">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>

            <p className="mt-4 font-display font-bold text-ink">{title}</p>
            <p className="mt-1 text-sm text-text-muted">{description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
