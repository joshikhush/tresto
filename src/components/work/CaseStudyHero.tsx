import Image from "next/image";
import Link from "next/link";
import { getIndustryLabel } from "@/lib/case-studies";
import type { CaseStudy } from "@/types/case-study";

/**
 * Hero — offset overlap. The hero image sits in a two-column grid with the
 * title block, then translates down 48px past the grid's own bottom edge
 * (`items-end` + `translate-y-12`) so it visually overlaps the section
 * below rather than sitting flush inside the hero. Two blurred radial
 * glows (violet top-right, gold bottom-left) sit behind everything —
 * plain inline-style `background` (not a Tailwind arbitrary value) for the
 * same reason Footer.tsx's multi-stop radial gradient does: Tailwind's
 * arbitrary-value parser doesn't reliably handle comma-separated
 * radial-gradient() args.
 */
export function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  const industryLabel = getIndustryLabel(caseStudy.industry);

  return (
    <div className="hero-offset-top relative overflow-hidden border-b border-[var(--work-line)] bg-[var(--work-tint)] px-8 pb-0">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[110px] -top-[150px] h-[440px] w-[440px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,.17), transparent 68%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[100px] bottom-[30px] h-[320px] w-[320px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,197,24,.16), transparent 68%)" }}
      />

      <div className="relative mx-auto max-w-[1080px]">
        <Link href="/work" className="mb-6 inline-block text-[13px] text-[var(--work-ink3)]">
          ← Back to all work
        </Link>

        <div className="grid grid-cols-1 items-end gap-11 md:grid-cols-[1.08fr_.92fr]">
          <div>
            <span className="mb-[18px] inline-block rounded-[20px] border border-[var(--work-violet-edge)] bg-white px-[14px] py-[6px] text-[10.5px] font-bold uppercase tracking-[.11em] text-[var(--work-violet)]">
              {industryLabel}
            </span>
            <h1 className="mb-4 font-display text-[29px] font-extrabold leading-[1.14] tracking-[-.04em] text-[var(--work-navy)] md:text-[42px]">
              {caseStudy.title}
            </h1>
            <p className="text-[18px] leading-[1.68] text-[var(--work-ink2)]">{caseStudy.summary}</p>
          </div>

          <div className="work-img-fallback relative h-[200px] overflow-hidden rounded-2xl shadow-[0_20px_52px_rgba(91,33,182,.15)] md:mt-0 md:h-[310px] md:translate-y-12">
            <Image src={caseStudy.heroImage} alt={caseStudy.title} fill className="object-cover" priority />
          </div>
        </div>

        <div className="flex flex-wrap gap-9 py-5 pb-[70px] text-[11.5px] text-[var(--work-ink3)] md:pt-5">
          <div>
            Industry
            <b className="mt-[3px] block text-[14px] font-semibold text-[var(--work-navy)]">{industryLabel}</b>
          </div>
          <div>
            Platform
            <b className="mt-[3px] block text-[14px] font-semibold text-[var(--work-navy)]">{caseStudy.platform}</b>
          </div>
          <div>
            Year
            <b className="mt-[3px] block text-[14px] font-semibold text-[var(--work-navy)]">{caseStudy.year}</b>
          </div>
          <div>
            Read
            <b className="mt-[3px] block text-[14px] font-semibold text-[var(--work-navy)]">{caseStudy.readTime}</b>
          </div>
        </div>
      </div>
    </div>
  );
}
