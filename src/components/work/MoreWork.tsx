import Image from "next/image";
import Link from "next/link";
import { getIndustryLabel } from "@/lib/case-studies";
import type { CaseStudy } from "@/types/case-study";

/**
 * More work — closing "other things we've shipped" rail. Each card always
 * renders next/image against the case study's real heroImage; the
 * decorative gradient sits behind it as a plain CSS background, so it only
 * shows through if the image path 404s (no filesystem check — that doesn't
 * hold up once `public/` isn't a plain directory on the deploy target).
 */
export function MoreWork({ items }: { items: CaseStudy[] }) {
  return (
    <section className="border-t border-[var(--work-line)]">
      <div className="mx-auto max-w-[1080px] px-8 py-[52px] md:py-[86px]">
        <div className="mb-[13px] text-[10.5px] font-bold uppercase tracking-[.15em] text-[var(--work-violet)]">
          More work
        </div>
        <h2 className="font-display text-[25px] font-extrabold leading-[1.18] tracking-[-.032em] text-[var(--work-navy)] md:text-[32px]">
          Other things we&apos;ve shipped
        </h2>

        <div className="mt-[34px] grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              className="block overflow-hidden rounded-2xl border border-[var(--work-line)] bg-white shadow-[0_1px_2px_rgba(26,26,46,.04)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[var(--work-violet-edge)] hover:shadow-[0_12px_30px_rgba(91,33,182,.1)]"
            >
              <div
                className="relative h-[150px] w-full overflow-hidden"
                style={{ background: "linear-gradient(135deg,#EDE7FA,#FEF7E0)" }}
              >
                <Image src={item.heroImage} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-[22px]">
                <div className="mb-[9px] text-[10.5px] font-bold uppercase tracking-[.11em] text-[var(--work-violet)]">
                  {getIndustryLabel(item.industry)}
                </div>
                <div className="mb-2 font-display text-[16.5px] font-bold leading-[1.35] tracking-[-.02em] text-[var(--work-navy)]">
                  {item.title}
                </div>
                <div className="text-[13.5px] leading-[1.62] text-[var(--work-ink2)]">{item.summary}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
