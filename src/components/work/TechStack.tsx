import type { CaseStudyTechLayer } from "@/types/case-study";

/**
 * Tech — dark strip 2 of 2 (the design allows exactly two dark sections;
 * this is the second, after ResultsBand). Grouped by layer, each layer's
 * label row trails a hairline to the section edge. Cards get a hover lift
 * plus a gradient underline that fades in on hover.
 */
export function TechStack({ techStack }: { techStack: CaseStudyTechLayer[] }) {
  return (
    <section className="bg-[var(--work-navy)]">
      <div className="mx-auto max-w-[1080px] px-8 py-[52px] md:py-[86px]">
        <div className="mb-[13px] text-[10.5px] font-bold uppercase tracking-[.15em] text-[var(--work-gold)]">
          Technology
        </div>
        <h2 className="mb-9 font-display text-[25px] font-extrabold leading-[1.18] tracking-[-.032em] text-white md:text-[32px]">
          The stack, by layer
        </h2>

        {techStack.map((layer, layerIndex) => (
          <div key={layer.layer} className={layerIndex === techStack.length - 1 ? "" : "mb-[30px]"}>
            <div className="mb-[14px] flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[.12em] text-[#6F6C87]">
              {layer.layer}
              <span aria-hidden className="h-px flex-1 bg-white/[.09]" />
            </div>
            <div className="grid grid-cols-1 gap-[14px] min-[881px]:grid-cols-2 min-[961px]:grid-cols-4">
              {layer.items.map((item) => (
                <div
                  key={item.name}
                  className="group relative overflow-hidden rounded-[14px] border border-white/[.09] bg-[var(--work-navy-2)] p-5 transition-[transform,border-color] duration-200 hover:-translate-y-[3px] hover:border-[rgba(124,58,237,.42)]"
                >
                  <span
                    aria-hidden
                    className="work-grad-bar absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                  <div className="mb-[13px] flex h-9 w-9 items-center justify-center rounded-[10px] border border-[rgba(245,197,24,.28)] bg-[rgba(245,197,24,.13)] font-mono text-[12.5px] font-semibold text-[var(--work-gold)]">
                    {item.abbr}
                  </div>
                  <div className="mb-[5px] font-display text-[15px] font-bold tracking-[-.015em] text-white">
                    {item.name}
                  </div>
                  <div className="text-[12.5px] leading-[1.6] text-[#8E8DA3]">{item.role}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
