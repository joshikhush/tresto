"use client";

import { useRef, useState, type ChangeEvent, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useContactForm } from "@/lib/useContactForm";
import { HoneypotField } from "@/components/ui";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--contact-font-display",
});

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  projectInfo: string;
  okWithWhatsapp: boolean;
};

interface ContactSectionProps {
  eyebrow?: string;
  headline?: string;
  whatsappHref?: string;
}

const DEFAULT_EYEBROW = "Contact";
const DEFAULT_HEADLINE = "Let's discuss your project";
const DEFAULT_SUPPORTING_LINE =
  "Fill in the form and we'll get back to you shortly, or reach out directly using the details below.";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const MAGNETIC_TRANSITION = { duration: 0.15, ease: EASE };
const MAGNETIC_PULL = 0.25;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_BASE_CLASS =
  "peer w-full rounded-[14px] border bg-[var(--contact-bg-card)] px-4 text-[14.5px] text-[var(--contact-text-hi)] outline-none shadow-[0_1px_2px_rgba(30,20,60,0.04),0_6px_20px_-14px_rgba(76,29,149,0.10)] transition-[border-color,box-shadow] duration-[350ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] focus:border-[var(--contact-indigo)] focus:shadow-[0_1px_2px_rgba(30,20,60,0.04),0_6px_20px_-14px_rgba(76,29,149,0.10),0_0_0_4px_rgba(109,90,230,0.12)]";

interface FloatingFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  required?: boolean;
  multiline?: boolean;
  validate?: "email" | "nonEmpty";
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function FloatingField({ id, name, label, type = "text", value, required, multiline, validate, error, onChange }: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const floating = focused || value.length > 0;
  const isValid =
    !error && touched && value.length > 0
      ? validate === "email"
        ? EMAIL_REGEX.test(value)
        : validate === "nonEmpty"
          ? value.trim().length > 0
          : null
      : null;

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
  };

  const labelClass = cn(
    "pointer-events-none absolute left-4 transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
    floating
      ? "top-2 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[var(--contact-indigo)]"
      : multiline
        ? "top-[18px] text-[14.5px] text-[var(--contact-text-low)]"
        : "top-1/2 -translate-y-1/2 text-[14.5px] text-[var(--contact-text-low)]"
  );

  const borderClass = error
    ? "border-red"
    : isValid === true
      ? "border-[var(--contact-green)]"
      : "border-[var(--contact-border)]";
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          placeholder=" "
          className={cn(FIELD_BASE_CLASS, borderClass, "resize-none pb-3 pt-6")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          placeholder=" "
          className={cn(FIELD_BASE_CLASS, borderClass, "h-[52px] pt-4", isValid === true && "pr-10")}
        />
      )}
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {isValid === true && (
        <CheckCircle2
          aria-hidden
          className={cn("absolute right-4 h-4 w-4 text-[var(--contact-green)]", multiline ? "top-4" : "top-1/2 -translate-y-1/2")}
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

interface ContactDetailRowProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}

function ContactDetailRow({ icon, label, children }: ContactDetailRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="contact-detail-icon-chip flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] text-[var(--contact-indigo)]">
        {icon}
      </span>
      <div className="pt-0.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.11em] text-[var(--contact-text-mid)]">
          {label}
        </p>
        <div className="mt-1 text-[14.5px] font-medium leading-[1.6] text-[var(--contact-text-hi)]">
          {children}
        </div>
      </div>
    </div>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

function MagneticSubmitButton({ children, disabled }: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHoverCapable = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = usePrefersReducedMotion();
  const magneticEnabled = isHoverCapable && !reducedMotion;

  function handleMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (!magneticEnabled) return;
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    animate(x, offsetX * MAGNETIC_PULL, MAGNETIC_TRANSITION);
    animate(y, offsetY * MAGNETIC_PULL, MAGNETIC_TRANSITION);
  }

  function handleMouseLeave() {
    if (!magneticEnabled) return;
    animate(x, 0, MAGNETIC_TRANSITION);
    animate(y, 0, MAGNETIC_TRANSITION);
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto flex w-fit items-center justify-center p-5"
    >
      <motion.button
        type="submit"
        disabled={disabled}
        style={{ x, y }}
        className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-[image:var(--contact-gradient-main)] px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[var(--contact-shadow-rest)] transition-shadow duration-300 hover:shadow-[var(--contact-shadow-lift)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--contact-indigo)] focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {children}
        <span className="flex transition-transform duration-300 group-hover:translate-x-[3px]">
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </motion.button>
    </div>
  );
}

const initialForm: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  projectInfo: "",
  okWithWhatsapp: false,
};

/**
 * S17 — Contact. Two-column layout: a left column (eyebrow, headline,
 * supporting line, contact detail rows) sitting directly on the animated
 * gradient mesh, and a right column holding the form inside the existing
 * white card. Below `md` the grid collapses to a single stacked column,
 * left content first. Content/field wording is unchanged from the current
 * site — only the layout is new.
 *
 * Deviates from the spec on one point: it says the headline should be an
 * `h1`, but Hero.tsx already renders the page's one `h1` — a second `h1`
 * on the same page is a real accessibility/SEO anti-pattern (screen
 * readers and document-outline tooling expect exactly one per page), so
 * this uses `h2`, matching every other section's heading level.
 */
export function ContactSection({
  eyebrow = DEFAULT_EYEBROW,
  headline = DEFAULT_HEADLINE,
  whatsappHref = "https://wa.me/919916668331",
}: ContactSectionProps) {
  const reducedMotion = usePrefersReducedMotion();
  const {
    values: form,
    errors,
    status,
    errorMessage,
    botcheck,
    handleChange,
    handleBotcheckChange,
    handleSubmit,
  } = useContactForm<ContactFormData>({
    initialValues: initialForm,
    requiredFields: ["name", "email"],
    emailField: "email",
  });

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div aria-hidden className="contact-mesh absolute inset-0" />

      <div className={`${spaceGrotesk.variable} relative z-10 mx-auto max-w-[1200px] px-6`}>
        <div className="grid items-start gap-x-[56px] gap-y-12 md:grid-cols-[0.85fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--contact-indigo)]">
              {eyebrow}
            </p>
            <h2 className="mt-2 font-[family-name:var(--contact-font-display)] text-[26px] font-bold leading-tight text-[var(--contact-text-hi)]">
              {headline}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--contact-text-mid)]">
              {DEFAULT_SUPPORTING_LINE}
            </p>

            <div className="contact-detail-panel mt-10 space-y-7">
              <ContactDetailRow icon={<Mail className="h-4 w-4" aria-hidden />} label="Email">
                <a
                  href="mailto:hitesh.mehta638@gmail.com"
                  className="font-semibold text-[var(--contact-indigo)] hover:underline"
                >
                  hitesh.mehta638@gmail.com
                </a>
              </ContactDetailRow>

              <ContactDetailRow icon={<Phone className="h-4 w-4" aria-hidden />} label="Phone">
                <a
                  href="tel:+919916668331"
                  className="font-semibold text-[var(--contact-indigo)] hover:underline"
                >
                  +91 99166 68331
                </a>
                <p className="mt-1 text-[13px] font-normal leading-[1.6] text-[var(--contact-text-mid)]">
                  WhatsApp on the same number
                </p>
              </ContactDetailRow>

              <ContactDetailRow icon={<MapPin className="h-4 w-4" aria-hidden />} label="Registered office">
                <p>United Growth, House No. 520</p>
                <p className="mt-1 text-[13px] font-normal leading-[1.6] text-[var(--contact-text-mid)]">
                  Rajeev Nagar, Mandi Dabwali
                </p>
                <p className="text-[13px] font-normal leading-[1.6] text-[var(--contact-text-mid)]">
                  Sirsa, Haryana 125104
                </p>
              </ContactDetailRow>
            </div>
          </div>

          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="w-full rounded-[24px] border border-[var(--contact-border)] bg-[var(--contact-bg-card)] px-6 py-10 shadow-[var(--contact-shadow-rest)] sm:px-10"
          >
            <div className="space-y-4">
              {status === "success" ? (
                <div
                  role="status"
                  className="flex flex-col items-center gap-2 rounded-[14px] bg-emerald-bg px-4 py-8 text-center"
                >
                  <CheckCircle2 className="h-6 w-6 text-emerald" aria-hidden />
                  <p className="text-sm font-semibold text-emerald">Thanks! We&apos;ll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <HoneypotField value={botcheck} onChange={handleBotcheckChange} />
                  <FloatingField
                    id="contact-name"
                    name="name"
                    label="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    validate="nonEmpty"
                    error={errors.name}
                  />
                  <FloatingField
                    id="contact-email"
                    name="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    validate="email"
                    error={errors.email}
                  />
                  <FloatingField
                    id="contact-phone"
                    name="phone"
                    label="Phone"
                    type="text"
                    value={form.phone ?? ""}
                    onChange={handleChange}
                  />
                  <FloatingField
                    id="contact-project-info"
                    name="projectInfo"
                    label="Project info"
                    value={form.projectInfo}
                    onChange={handleChange}
                    multiline
                  />

                  <label htmlFor="contact-whatsapp-optin" className="flex cursor-pointer items-center gap-2.5 text-sm text-[var(--contact-text-mid)]">
                    <input
                      id="contact-whatsapp-optin"
                      type="checkbox"
                      name="okWithWhatsapp"
                      checked={form.okWithWhatsapp}
                      onChange={handleChange}
                      className="h-4 w-4 shrink-0 rounded border-[var(--contact-border)] text-[var(--contact-indigo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--contact-indigo)] focus-visible:ring-offset-2"
                    />
                    I&apos;m ok being contacted on WhatsApp
                  </label>

                  <MagneticSubmitButton disabled={status === "submitting"}>
                    {status === "submitting" ? "Sending…" : "Let's Connect"}
                  </MagneticSubmitButton>

                  {status === "error" && (
                    <p role="alert" className="rounded-[12px] bg-red-bg px-4 py-3 text-center text-sm text-red">
                      {errorMessage}
                    </p>
                  )}
                </form>
              )}

              <div className="flex items-center gap-3 pt-2">
                <span className="h-px flex-1 bg-[var(--contact-border)]" />
                <span className="text-xs uppercase tracking-wide text-[var(--contact-text-low)]">or</span>
                <span className="h-px flex-1 bg-[var(--contact-border)]" />
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-[var(--contact-indigo)] px-6 py-3 text-sm font-semibold text-[var(--contact-indigo)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--contact-indigo)] hover:text-white hover:shadow-[var(--contact-shadow-lift)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--contact-indigo)] focus-visible:ring-offset-2"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Message us on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
