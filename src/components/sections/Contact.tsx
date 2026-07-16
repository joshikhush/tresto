"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Section, SectionLabel, Button, TodoBadge, GhostWord } from "@/components/ui";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  projectInfo: string;
  whatsappOptIn: boolean;
}

const initialForm: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  projectInfo: "",
  whatsappOptIn: false,
};

// TODO: confirm the canonical WhatsApp number with Hitesh.
const whatsappNumber = "910000000000";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * S17 — Contact. Form state (values, submit status) is fully wired; the
 * submit handler simulates a network call instead of calling a real API.
 * // TODO(polish): replace the simulated submit with a real fetch() to a
 * // Resend/Formspree API route (env-configured key) + real success/error
 * // toast component.
 */
export function Contact() {
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("success");
    setForm(initialForm);
  };

  return (
    <Section bg="white" className="relative overflow-hidden">
      <GhostWord>CONTACT</GhostWord>
      <SectionLabel>Contact</SectionLabel>
      <h2 className="mt-2 text-section-title text-ink">Let&apos;s discuss your project</h2>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <MapPin className="h-4 w-4 text-violet" /> Bangalore
            </div>
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <MapPin className="h-4 w-4 text-violet" /> Mandi Dabwali
            </div>
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <Mail className="h-4 w-4 text-violet" />
              <TodoBadge>confirm email — tresto.io vs tresto.in</TodoBadge>
            </div>
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <Phone className="h-4 w-4 text-violet" />
              <TodoBadge>confirm phone number</TodoBadge>
            </div>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            className="mt-8 inline-flex items-center gap-2 rounded-pill border border-violet px-6 py-3 text-sm font-semibold text-violet hover:bg-lilac-50"
          >
            <MessageCircle className="h-4 w-4" />
            Message us on WhatsApp
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-ink">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-chip border border-border px-4 py-3 text-sm text-ink focus:border-violet focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-chip border border-border px-4 py-3 text-sm text-ink focus:border-violet focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium text-ink">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-chip border border-border px-4 py-3 text-sm text-ink focus:border-violet focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="projectInfo" className="text-sm font-medium text-ink">
              Project info
            </label>
            <textarea
              id="projectInfo"
              name="projectInfo"
              rows={4}
              value={form.projectInfo}
              onChange={handleChange}
              className="mt-1 w-full rounded-card border border-border px-4 py-3 text-sm text-ink focus:border-violet focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-text-muted">
            <input
              type="checkbox"
              name="whatsappOptIn"
              checked={form.whatsappOptIn}
              onChange={handleChange}
              className="h-4 w-4 rounded border-border text-violet focus:ring-violet"
            />
            I&apos;m ok being contacted on WhatsApp
          </label>

          <Button
            type="submit"
            variant="primary"
            disabled={status === "submitting"}
            className="w-full sm:w-auto"
          >
            {status === "submitting" ? "Sending..." : "Let's Connect"}
          </Button>

          {status === "success" && (
            <p className="rounded-chip bg-emerald-bg px-4 py-3 text-sm text-emerald">
              Thanks — we&apos;ll be in touch shortly.
            </p>
          )}
          {status === "error" && (
            <p className="rounded-chip bg-red-bg px-4 py-3 text-sm text-red">
              Something went wrong — try again or reach us on WhatsApp.
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}
