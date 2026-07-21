"use client";

// TODO: contact email and phone not yet confirmed — deliberately not a
// prop on this component (see spec); when finalized, add a display row
// wherever the office locations live below.

import { useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent as ReactMouseEvent } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--contact-font-display",
});

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  projectInfo: string;
  okWithWhatsapp: boolean;
}

interface ContactSectionProps {
  eyebrow?: string;
  headline?: string;
  whatsappHref?: string;
  onSubmit?: (data: ContactFormData) => void;
  locations?: string[];
}

const DEFAULT_EYEBROW = "Contact";
const DEFAULT_HEADLINE = "Let's discuss your project";
const DEFAULT_LOCATIONS = ["Bangalore", "Mandi Dabwali"];

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
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function FloatingField({ id, name, label, type = "text", value, required, multiline, validate, onChange }: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const floating = focused || value.length > 0;
  const isValid =
    touched && value.length > 0
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

  const borderClass = isValid === true ? "border-[var(--contact-green)]" : "border-[var(--contact-border)]";

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
 * S17 — Contact. Full redesign: a single centered card (max-width 460px)
 * floating over an animated gradient mesh, replacing the old two-column
 * "locations + form" layout. Content/field wording is unchanged from the
 * current site — only the visual system and interaction are new.
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
  whatsappHref = "#",
  onSubmit,
  locations = DEFAULT_LOCATIONS,
}: ContactSectionProps) {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const reducedMotion = usePrefersReducedMotion();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div aria-hidden className="contact-mesh absolute inset-0" />

      <div className="relative z-10 mx-auto flex max-w-[1200px] justify-center px-6">
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`${spaceGrotesk.variable} w-full max-w-[460px] rounded-[24px] border border-[var(--contact-border)] bg-[var(--contact-bg-card)] px-6 py-10 shadow-[var(--contact-shadow-rest)] sm:px-10`}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[var(--contact-indigo)]">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-center font-[family-name:var(--contact-font-display)] text-[26px] font-bold leading-tight text-[var(--contact-text-hi)]">
            {headline}
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <FloatingField
              id="contact-name"
              name="name"
              label="Name"
              value={form.name}
              onChange={handleChange}
              required
              validate="nonEmpty"
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

            <MagneticSubmitButton>Let&apos;s Connect</MagneticSubmitButton>

            <div className="flex items-center gap-3 pt-2">
              <span className="h-px flex-1 bg-[var(--contact-border)]" />
              <span className="text-xs uppercase tracking-wide text-[var(--contact-text-low)]">or</span>
              <span className="h-px flex-1 bg-[var(--contact-border)]" />
            </div>

            <a
              href={whatsappHref}
              className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-[var(--contact-indigo)] px-6 py-3 text-sm font-semibold text-[var(--contact-indigo)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--contact-indigo)] hover:text-white hover:shadow-[var(--contact-shadow-lift)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--contact-indigo)] focus-visible:ring-offset-2"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Message us on WhatsApp
            </a>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-2 text-xs text-[var(--contact-text-low)]">
              {locations.map((location) => (
                <span key={location} className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" aria-hidden />
                  {location}
                </span>
              ))}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
