/**
 * Contact — light section, tinted form card. Markup only: no `onSubmit`
 * handler and no `action` wired up yet, per spec.
 */
export function ContactForm() {
  return (
    <section>
      <div className="mx-auto max-w-[1080px] px-8 py-[52px] md:py-[86px]">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.05fr] md:gap-16">
          <div>
            <div className="mb-[13px] text-[10.5px] font-bold uppercase tracking-[.15em] text-[var(--work-violet)]">
              Start a project
            </div>
            <h2 className="font-display text-[25px] font-extrabold leading-[1.18] tracking-[-.032em] text-[var(--work-navy)] md:text-[32px]">
              Got something harder than this?
            </h2>
            <p className="mb-[30px] mt-5 text-[16px] leading-[1.82] text-[var(--work-ink2)] md:text-[16.5px]">
              Tell us what isn&apos;t working. We&apos;ll tell you honestly whether we&apos;re the right team to
              fix it.
            </p>

            <div className="mb-[19px] flex gap-[14px]">
              <span aria-hidden className="mt-[10px] h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--work-violet)]" />
              <p className="m-0 text-[15.5px] text-[var(--work-ink2)]">We reply within one working day.</p>
            </div>
            <div className="mb-[19px] flex gap-[14px]">
              <span aria-hidden className="mt-[10px] h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--work-violet)]" />
              <p className="m-0 text-[15.5px] text-[var(--work-ink2)]">
                First conversation is a scoping call, not a pitch.
              </p>
            </div>
            <div className="flex gap-[14px]">
              <span aria-hidden className="mt-[10px] h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--work-violet)]" />
              <p className="m-0 text-[15.5px] text-[var(--work-ink2)]">If it isn&apos;t our kind of problem, we&apos;ll say so.</p>
            </div>
          </div>

          <form className="rounded-[18px] border border-[var(--work-line)] bg-[var(--work-tint)] p-8">
            <div className="mb-[18px]">
              <label htmlFor="cs-name" className="mb-2 block text-[12.5px] font-semibold text-[var(--work-navy)]">
                Name
              </label>
              <input
                id="cs-name"
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-[10px] border border-[var(--work-line2)] bg-white px-[14px] py-3 text-sm text-[var(--work-navy)] placeholder:text-[var(--work-ink3)]"
              />
            </div>
            <div className="mb-[18px]">
              <label htmlFor="cs-email" className="mb-2 block text-[12.5px] font-semibold text-[var(--work-navy)]">
                Work email
              </label>
              <input
                id="cs-email"
                name="email"
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-[10px] border border-[var(--work-line2)] bg-white px-[14px] py-3 text-sm text-[var(--work-navy)] placeholder:text-[var(--work-ink3)]"
              />
            </div>
            <div className="mb-[18px]">
              <label htmlFor="cs-company" className="mb-2 block text-[12.5px] font-semibold text-[var(--work-navy)]">
                Company
              </label>
              <input
                id="cs-company"
                name="company"
                type="text"
                placeholder="Company name"
                className="w-full rounded-[10px] border border-[var(--work-line2)] bg-white px-[14px] py-3 text-sm text-[var(--work-navy)] placeholder:text-[var(--work-ink3)]"
              />
            </div>
            <div className="mb-[18px]">
              <label htmlFor="cs-project" className="mb-2 block text-[12.5px] font-semibold text-[var(--work-navy)]">
                What are you trying to build?
              </label>
              <textarea
                id="cs-project"
                name="project"
                placeholder="A few lines is plenty."
                className="min-h-[100px] w-full rounded-[10px] border border-[var(--work-line2)] bg-white px-[14px] py-3 text-sm text-[var(--work-navy)] placeholder:text-[var(--work-ink3)]"
              />
            </div>
            <button
              type="submit"
              className="work-grad-bar w-full rounded-[10px] py-[14px] text-center font-display text-[14.5px] font-bold text-white"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
