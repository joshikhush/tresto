"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Section, SectionLabel, GhostWord } from "@/components/ui";
import type { FAQItem } from "@/types";

const faqs: FAQItem[] = [
  {
    id: "timeline",
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope — we'll walk through a realistic estimate on the discovery call.",
  },
  {
    id: "pricing",
    question: "How do you price projects?",
    answer:
      "We scope each project individually — fixed-price for well-defined builds, retainer for ongoing work. You'll get a clear quote before anything starts.",
  },
  {
    id: "support",
    question: "What happens after launch?",
    answer:
      "We offer ongoing support and maintenance after launch — bug fixes, monitoring and updates, not just a handover.",
  },
  {
    id: "tech",
    question: "What technologies do you build with?",
    answer:
      "Mainly Next.js/React and Node.js for web, Flutter for mobile — see our Tech Stack section below for specifics.",
  },
  {
    id: "existing-codebase",
    question: "Can you work with our existing codebase?",
    answer:
      "Yes — we regularly pick up existing codebases. We start with a short audit so we understand what's there before making changes.",
  },
  {
    id: "getting-started",
    question: "How do we get started?",
    answer:
      "Book a free discovery call — we'll talk through your goals and follow up with a scoped proposal.",
  },
];

const leftColumn = faqs.slice(0, 3);
const rightColumn = faqs.slice(3);

/** S16 — FAQ. Structure only: single-open accordion, no expand transition. */
export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  const toggle = (id: string) => setOpenId((current) => (current === id ? null : id));

  const renderItem = (item: FAQItem) => {
    const isOpen = item.id === openId;
    return (
      <div key={item.id} className="rounded-card border border-border bg-white">
        <button
          type="button"
          onClick={() => toggle(item.id)}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="font-display font-semibold text-ink">{item.question}</span>
          {isOpen ? (
            <Minus className="h-4 w-4 shrink-0 text-violet" />
          ) : (
            <Plus className="h-4 w-4 shrink-0 text-violet" />
          )}
        </button>
        {isOpen && (
          <p className="px-6 pb-5 text-sm text-text-muted">{item.answer}</p>
        )}
      </div>
    );
  };

  return (
    <Section bg="lilac-50" className="relative overflow-hidden">
      <GhostWord>FAQ</GhostWord>
      <SectionLabel>FAQ</SectionLabel>
      <h2 className="mt-2 text-section-title text-ink">Questions you might have</h2>

      <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-8">
        <div className="space-y-4">{leftColumn.map(renderItem)}</div>
        <div className="space-y-4">{rightColumn.map(renderItem)}</div>
      </div>
    </Section>
  );
}
