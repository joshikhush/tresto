import { Fragment } from "react";
import { cn } from "@/lib/cn";
import type { AtAGlanceItem, CaseStudyProblem } from "@/types/case-study";

const DEFAULT_AFTER_PARAGRAPH = 1;

/**
 * Resolves which paragraph the pull quote should render after. Falls back
 * to DEFAULT_AFTER_PARAGRAPH when the requested index isn't a valid
 * paragraph index, then clamps to the last real paragraph so it can never
 * point past the end of a short problem section.
 */
function resolveQuoteIndex(afterParagraph: number, paragraphCount: number): number {
  const inRange = Number.isInteger(afterParagraph) && afterParagraph >= 0 && afterParagraph < paragraphCount;
  const resolved = inRange ? afterParagraph : DEFAULT_AFTER_PARAGRAPH;
  return Math.min(resolved, paragraphCount - 1);
}

/**
 * Problem — sticky "at a glance" sidebar beside a prose column, with an
 * optional gold-bordered pull quote. The quote renders immediately after
 * `problem.paragraphs[pullQuote.afterParagraph]`, interrupting the prose
 * rather than trailing it, and is skipped entirely when `pullQuote` is
 * absent.
 */
export function ProblemSection({
  atAGlance,
  problem,
  pullQuote,
}: {
  atAGlance: AtAGlanceItem[];
  problem: CaseStudyProblem;
  pullQuote?: { text: string; afterParagraph: number };
}) {
  const quoteIndex = pullQuote ? resolveQuoteIndex(pullQuote.afterParagraph, problem.paragraphs.length) : null;

  return (
    <section>
      <div className="mx-auto max-w-[1080px] px-8 py-[52px] md:py-[86px]">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[.66fr_1fr] md:gap-16">
          <div className="static mb-8 md:sticky md:top-[100px] md:mb-0">
            <div className="rounded-2xl border border-[var(--work-line)] bg-[var(--work-tint)] p-[26px]">
              <div className="mb-[14px] font-mono text-[10.5px] uppercase tracking-[.1em] text-[var(--work-ink3)]">
                At a glance
              </div>
              {atAGlance.map((item, index) => (
                <div
                  key={item.label}
                  className={
                    index === atAGlance.length - 1
                      ? "flex justify-between gap-3 py-[11px] text-[13px]"
                      : "flex justify-between gap-3 border-b border-[var(--work-line)] py-[11px] text-[13px]"
                  }
                >
                  <span className="text-[var(--work-ink3)]">{item.label}</span>
                  <span className="text-right font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-[13px] text-[10.5px] font-bold uppercase tracking-[.15em] text-[var(--work-violet)]">
              The problem
            </div>
            <h2 className="mb-5 font-display text-[25px] font-extrabold leading-[1.18] tracking-[-.032em] text-[var(--work-navy)] md:text-[32px]">
              {problem.heading}
            </h2>
            {problem.paragraphs.map((paragraph, index) => {
              const isLast = index === problem.paragraphs.length - 1;
              const quoteFollows = quoteIndex === index;

              return (
                <Fragment key={index}>
                  <p
                    className={cn(
                      "text-[16px] leading-[1.82] text-[var(--work-ink2)] md:text-[16.5px]",
                      isLast && !quoteFollows ? "mb-0" : "mb-[19px]"
                    )}
                  >
                    {paragraph}
                  </p>
                  {quoteFollows && pullQuote && (
                    <div className="my-[38px] rounded-r-[14px] border-l-[3px] border-[var(--work-gold)] bg-[var(--work-gold-soft)] px-8 py-7 last:mb-0">
                      <p className="m-0 font-display text-[20px] font-semibold leading-[1.56] tracking-[-.02em] text-[var(--work-navy)]">
                        {pullQuote.text}
                      </p>
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
