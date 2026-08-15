"use client";

import { CheckCircle2 } from "lucide-react";
import { HoneypotField } from "@/components/ui";
import { useContactForm } from "@/lib/useContactForm";

type WorkContactFormData = {
  name: string;
  email: string;
  company: string;
  project: string;
};

const initialValues: WorkContactFormData = {
  name: "",
  email: "",
  company: "",
  project: "",
};

const FIELD_CLASS =
  "w-full rounded-[10px] border bg-white px-[14px] py-3 text-sm text-[var(--work-navy)] placeholder:text-[var(--work-ink3)]";

interface FieldProps {
  id: string;
  name: keyof WorkContactFormData;
  label: string;
  placeholder: string;
  type?: string;
  multiline?: boolean;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function Field({ id, name, label, placeholder, type = "text", multiline, value, error, onChange }: FieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="mb-[18px]">
      <label htmlFor={id} className="mb-2 block text-[12.5px] font-semibold text-[var(--work-navy)]">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={`min-h-[100px] ${FIELD_CLASS} ${error ? "border-red" : "border-[var(--work-line2)]"}`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={`${FIELD_CLASS} ${error ? "border-red" : "border-[var(--work-line2)]"}`}
        />
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const { values, errors, status, errorMessage, botcheck, handleChange, handleBotcheckChange, handleSubmit } =
    useContactForm<WorkContactFormData>({
      initialValues,
      requiredFields: ["name", "email", "project"],
      emailField: "email",
    });

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

          {status === "success" ? (
            <div
              role="status"
              className="flex flex-col items-center justify-center gap-2 rounded-[18px] border border-[var(--work-line)] bg-[var(--work-tint)] p-8 text-center"
            >
              <CheckCircle2 className="h-6 w-6 text-emerald" aria-hidden />
              <p className="text-sm font-semibold text-emerald">Thanks! We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-[18px] border border-[var(--work-line)] bg-[var(--work-tint)] p-8"
            >
              <HoneypotField value={botcheck} onChange={handleBotcheckChange} />
              <Field
                id="cs-name"
                name="name"
                label="Name"
                placeholder="Your name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
              />
              <Field
                id="cs-email"
                name="email"
                label="Work email"
                placeholder="you@company.com"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Field
                id="cs-company"
                name="company"
                label="Company"
                placeholder="Company name"
                value={values.company}
                onChange={handleChange}
                error={errors.company}
              />
              <Field
                id="cs-project"
                name="project"
                label="What are you trying to build?"
                placeholder="A few lines is plenty."
                value={values.project}
                onChange={handleChange}
                error={errors.project}
                multiline
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="work-grad-bar w-full rounded-[10px] py-[14px] text-center font-display text-[14.5px] font-bold text-white disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
              {status === "error" && (
                <p role="alert" className="mt-[14px] rounded-[10px] bg-red-bg px-4 py-3 text-center text-sm text-red">
                  {errorMessage}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
