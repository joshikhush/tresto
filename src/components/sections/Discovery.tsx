import { CheckCircle2, Rocket } from "lucide-react";
import { Section, Button, GhostWord } from "@/components/ui";

const checks = ["No commitment", "Expert review"];

/**
 * S13 — Discovery workshop CTA (SoluLab "Innovation Lab"). Structure only:
 * static glow, no video, no illustration asset.
 */
export function Discovery() {
  return (
    <Section bg="ink" className="relative overflow-hidden">
      <GhostWord tone="dark">DISCOVERY</GhostWord>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-violet-deep/50 blur-3xl"
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-section-title text-white">Get a free discovery call</h2>
          <p className="mt-4 max-w-md text-on-dark-1">
            Tell us what you're building. We'll walk through scope, timeline and a
            realistic plan — no pressure, no jargon.
          </p>

          <div className="mt-6 flex flex-wrap gap-6">
            {checks.map((check) => (
              <div key={check} className="flex items-center gap-2 text-sm text-on-dark-1">
                <CheckCircle2 className="h-4 w-4 text-gold" />
                {check}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button variant="primary" href="/contact">
              Talk with an expert
            </Button>
          </div>
        </div>

        <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-card border border-white/10 bg-white/5">
          <div
            aria-hidden
            className="absolute h-40 w-40 rounded-full bg-gold/20 blur-2xl"
          />
          <Rocket className="relative h-16 w-16 text-gold" />
        </div>
      </div>
    </Section>
  );
}
