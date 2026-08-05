import type { CaseStudyOutcome } from "@/types/case-study";

/** Outcome — light section, gold left rail beside the closing prose. */
export function OutcomeSection({ outcome }: { outcome: CaseStudyOutcome }) {
  return (
    <section>
      <div className="mx-auto max-w-[1080px] px-8 py-[52px] md:py-[86px]">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[.85fr_1fr] md:gap-16">
          <div>
            <div className="mb-[13px] text-[10.5px] font-bold uppercase tracking-[.15em] text-[var(--work-violet)]">
              Outcome
            </div>
            <h2 className="font-display text-[25px] font-extrabold leading-[1.18] tracking-[-.032em] text-[var(--work-navy)] md:text-[32px]">
              {outcome.heading}
            </h2>
          </div>
          <div className="border-l-[3px] border-[var(--work-gold)] pl-7">
            {outcome.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mb-[19px] text-[16px] leading-[1.82] text-[var(--work-ink2)] last:mb-0 md:text-[16.5px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
