import type { CaseStudyChallenge } from "@/types/case-study";

const DEFAULT_HEADING = "What had to be solved before anything worked";

/**
 * Challenges — white cards on a tinted section background, each with a
 * small gradient bar in its top-left corner and a lift-on-hover. `heading`
 * falls back to static site copy when the case study doesn't supply one.
 */
export function ChallengesGrid({
  challenges,
  heading,
}: {
  challenges: CaseStudyChallenge[];
  heading?: string;
}) {
  return (
    <section className="bg-[var(--work-tint)]">
      <div className="mx-auto max-w-[1080px] px-8 py-[52px] md:py-[86px]">
        <div className="mb-[13px] text-[10.5px] font-bold uppercase tracking-[.15em] text-[var(--work-violet)]">
          The challenges
        </div>
        <h2 className="max-w-[620px] font-display text-[25px] font-extrabold leading-[1.18] tracking-[-.032em] text-[var(--work-navy)] md:text-[32px]">
          {heading || DEFAULT_HEADING}
        </h2>

        <div className="mt-[38px] grid grid-cols-1 gap-5 sm:grid-cols-2">
          {challenges.map((challenge, index) => (
            <div
              key={challenge.title}
              className="group relative overflow-hidden rounded-2xl border border-[var(--work-line)] bg-white p-7 shadow-[0_1px_2px_rgba(26,26,46,.04)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[3px] hover:border-[var(--work-violet-edge)] hover:shadow-[0_12px_28px_rgba(91,33,182,.09)]"
            >
              <span aria-hidden className="work-grad-bar absolute left-0 top-0 h-[3px] w-[46px]" />
              <div className="mb-[14px] font-mono text-[11px] tracking-[.12em] text-[var(--work-violet)]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-[9px] font-display text-[17px] font-bold leading-tight tracking-[-.02em] text-[var(--work-navy)]">
                {challenge.title}
              </h3>
              <p className="m-0 text-[14.5px] leading-[1.72] text-[var(--work-ink2)]">{challenge.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
