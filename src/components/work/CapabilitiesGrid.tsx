import type { CaseStudyCapability } from "@/types/case-study";

const DEFAULT_HEADING = "What shipped";

/**
 * Capabilities — hairline-divided 3-up grid (1px `gap` painted the line
 * color, so the dividers are a single continuous grid line rather than
 * doubled-up borders between cells). `heading` falls back to static site
 * copy when the case study doesn't supply one.
 */
export function CapabilitiesGrid({
  capabilities,
  heading,
}: {
  capabilities: CaseStudyCapability[];
  heading?: string;
}) {
  return (
    <section>
      <div className="mx-auto max-w-[1080px] px-8 py-[52px] md:py-[86px]">
        <div className="mb-[13px] text-[10.5px] font-bold uppercase tracking-[.15em] text-[var(--work-violet)]">
          Capabilities
        </div>
        <h2 className="font-display text-[25px] font-extrabold leading-[1.18] tracking-[-.032em] text-[var(--work-navy)] md:text-[32px]">
          {heading || DEFAULT_HEADING}
        </h2>

        <div className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--work-line)] bg-[var(--work-line)] sm:grid-cols-3">
          {capabilities.map((capability, index) => (
            <div key={capability.title} className="group bg-white p-7 transition-colors duration-200 hover:bg-[var(--work-violet-soft)]">
              <div className="mb-[14px] flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--work-violet-edge)] bg-[var(--work-violet-soft)] font-mono text-xs font-semibold text-[var(--work-violet)] transition-colors duration-200 group-hover:bg-white">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-2 font-display text-[16.5px] font-bold tracking-[-.02em] text-[var(--work-navy)]">
                {capability.title}
              </h3>
              <p className="m-0 text-[14px] leading-[1.7] text-[var(--work-ink2)]">{capability.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
