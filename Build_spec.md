# Tresto Website Redesign — Cursor Build Spec

**Goal:** Rebuild the Tresto marketing site. Take the *section architecture* from the SoluLab reference, recolor it with Tresto's violet/gold theme, and fill it with honest Tresto content (lean Bangalore studio — NOT enterprise-scale).

**How to use this file:** Drop it in the repo root as `BUILD_SPEC.md` and add it to Cursor's context. Build section by section using the "Build order" prompts at the bottom — don't one-shot the whole site.

---

## 1. Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling (tokens below go in `tailwind.config.ts` + `globals.css`)
- **framer-motion** for scroll/hover animation
- **lucide-react** for line icons (NOT emojis — the preview used emojis as placeholders)
- Deploy on **Vercel**
- Fonts via `next/font/google`: **Plus Jakarta Sans** (display/headings) + **Inter** (body)

> Swappable to a static Vite/HTML build if preferred, but Next + Tailwind is the cleanest for Cursor and for the interactions (tabs, accordion, carousel, form).

---

## 2. Design tokens (the theme)

Add to Tailwind config / CSS variables:

```
ink:          #1A1A2E   /* primary text, dark sections, nav CTA bg */
violet:       #5B21B6   /* brand primary — links, labels, accents */
violet-deep:  #3B1FA8   /* primary buttons (CTA / form submit) */
violet-700:   #4C1D95   /* button hover */
violet-mid:   #2D1B69   /* hero gradient middle stop */
gold:         #F5C518   /* highlight accent — emphasized words, stars, bullets */
violet-soft:  #A78BFA   /* small labels on dark backgrounds */

/* section backgrounds (rotate these so adjacent sections differ) */
white:        #FFFFFF
lilac-100:    #F0EEFF
lilac-50:     #F5F3FF
lilac-card:   #EDE9FE
blue-tint:    #EFF6FF
pink-tint:    #FDF2F8

/* supporting icon tints (use sparingly for variety in card icons) */
emerald: #059669 / bg #D1FAE5
red:     #DC2626 / bg #FEE2E2
blue:    #2563EB / bg #DBEAFE
amber:   #D97706 / bg #FEF3C7

/* neutrals */
text-strong: #374151   text-muted: #6B7280   text-faint: #9CA3AF
border: #E5E7EB        border-light: #F3F4F6
on-dark-1: #CBD5E1     on-dark-2: #E2E8F0

hero-gradient:   linear-gradient(135deg, #1A1A2E 0%, #2D1B69 50%, #1E3A5F 100%)
footer-gradient: linear-gradient(160deg, #F5F3FF 0%, #EFF6FF 50%, #FDF2F8 100%)
```

**Type scale:** display 800 weight, tracking `-0.02em`. Section titles ~38px/800. Body 15–17px, `text-muted`, line-height 1.7.
**Radius:** pills 24–40px, cards 14–28px, icon chips 12–14px.
**Shadow:** soft only — e.g. `0 4px 20px rgba(0,0,0,.04)`; on card hover `0 16px 40px rgba(91,33,182,.12)` + `translateY(-6px)`.

---

## 3. Honesty guardrails (important)

Tresto is a small studio. **Do NOT copy SoluLab's enterprise props.** Specifically:
- ❌ No fake big-brand client logos (no Mercedes/Goldman/Cambridge equivalents).
- ❌ No invented award badges (ISO / SOC2 / CMMI). Tresto doesn't have them.
- ❌ No inflated counters (no "250+ staff", "500 happy clients").
- ✅ Use real, modest numbers and leave any unverified figure as a clearly-marked `TODO:` placeholder for Hitesh to confirm.
- ✅ Real client/project names only (see Case Studies seed list).

---

## 4. Global components

- **`<Section>`** wrapper: max-width 1200px, horizontal padding 32px, vertical padding ~90px. Accepts a `bg` prop.
- **`<SectionLabel>`** : small uppercase violet label (e.g. "What we do"), tracking 0.07em.
- **Buttons:** `btn-primary` (violet-deep bg, white, pill, hover violet-700 + lift) · `btn-ghost` (1px border, transparent, for dark bg) · `btn-dark` (ink bg, used in nav).
- **Nav:** sticky, blurred translucent wrap; inner is a **white pill bar** with 0.5px border + soft shadow. Left logo `Tr<span class=violet>esto</span>`, center links, right "Get in Touch" dark pill. Links hover → violet. (SoluLab nav pattern, Tresto colors.)
- **Footer:** mega footer on `footer-gradient`. Columns + socials (next section 18).

---

## 5. Sections (in order) — structure from SoluLab, theme from tokens above

### S1 — Announcement bar
Thin `ink` bar, centered, 13px. Real offer, gold-highlighted CTA word. e.g. *"Now booking projects for this quarter — Book a free discovery call →"* (gold link). Dismissible (x).

### S2 — Sticky pill nav
As in Global components. Links: Home · Services · Work · About · Blog · Contact. Right: **Get in Touch** pill. Mobile: hamburger → slide-over.

### S3 — Hero
SoluLab hero layout (big bold headline left, visual right) on **hero-gradient** with a soft radial violet glow top-right.
- Small `violet-soft` label: "Bangalore-based Software & AI Studio".
- H1 (white, 56px/800): emphasize a phrase in **gold** — e.g. *"Your build partner for custom software & **AI automation**."*
- Sub (on-dark-1).
- 3 bullets (gold `•`): Custom web that converts · Flutter apps for iOS & Android · AI/automation pipelines.
- Two CTAs: `btn-primary` "Start a Project" + `btn-ghost` "View Our Work".
- Right side: abstract product/browser mockup illustration (like SoluLab's hero image / preview's window mock). Keep it abstract, no stock-photo claims.

### S4 — 3-pillar band  *(SoluLab's AI / Blockchain / Custom strip)*
Three columns on a dark or lilac band, plus a "Talk with an expert" pill (SoluLab pattern). Tresto's three real pillars:
1. **Custom web** that converts and scales.
2. **Flutter mobile apps** for iOS & Android.
3. **AI & automation pipelines** that remove manual work.

### S5 — Trusted by (client strip)
SoluLab's logo strip — but **real clients only**. If logos aren't ready, render as a muted "Trusted by teams across manufacturing, real estate & local business" line with real names as text. Mark `TODO:` for logo assets.

### S6 — Stats band  *("Who we are")*
4–5 stat counters (animate count-up on scroll), SoluLab layout. **Honest numbers only** — e.g. Projects delivered, Years building, On-time delivery %, Tech in stack. Any number Hitesh hasn't confirmed → `TODO:`.

### S7 — How we work / Values  *(replaces SoluLab's awards carousel)*
Tresto has no awards, so reuse this slot for trust. 5 cards (preview's values grid): **Trust · Ownership · Quality · Transparency · Long-term support.** Each: soft tinted icon chip (rotate the supporting tints), title, one-line desc. Section label "Why Tresto", title "What we stand for".

### S8 — Services grid  *("What we do")*
SoluLab 2-col bordered-card grid, lucide line icons, violet theme. Cards:
- Custom Website Development
- Mobile App Development (Flutter)
- AI / Automation Pipelines
- API & Systems Integration
- Ongoing Support & Maintenance
Card hover: lift + violet shadow. Each card → "Learn more →" in violet.

### S9 — Case Studies  *(the strongest section — copy SoluLab's interaction exactly)*
Dark section. **Left = vertical tab list**, **right = active detail panel** with title, paragraph, **IMPACT stat row** (3 stats), View Demo / View Case Study buttons, and a phone/screenshot mockup. Clicking a left tab swaps the right panel (state-driven). Seed with **real projects** (pull details from Hitesh):
- **HiveGuard** — Flutter + Node app for beekeepers & applicators.
- **Triveni Radiators** — multi-page industrial site (deployed on Vercel).
- **Rotary Nagar** — AI marketing video + content kit (plotted township).
- **ReshapeNation** — WhatsApp visual content automation system.
- **Manglam Homes** — real-estate site + master-plan visuals.
Use honest impact metrics or `TODO:` placeholders.

### S10 — Who we build for  *(SoluLab "Industries" — active-image-card pattern)*
Grid of audience cards; one card highlighted with an image bg + arrow (SoluLab style), rest plain with line icon. Tresto's segments: **Manufacturing · Real Estate · NGOs & Local Business · Field Services · Startups.**

### S11 — Who We Work For  *(optional — SoluLab "Startups → Enterprises")*
3 image cards: Local businesses · Growing startups · Established SMBs. Plus a "Talk with an expert" pill. Skip if S10 already covers it.

### S12 — Testimonials  *("What our clients say")*
Light section, gold star rows, quote cards in a **carousel** (arrows like SoluLab). **Real quotes only** — `TODO:` until Hitesh supplies them. Author + role + small violet dot.

### S13 — Discovery Workshop CTA  *(SoluLab "Innovation Lab")*
Dark-violet band. "Get a free discovery call" + paragraph + `btn-primary` "Talk with an expert" + two checks (✓ No commitment · ✓ Expert review). Right: rocket/browser illustration.

### S14 — Tech Stack  *("Our Tech Stack")*
SoluLab tabbed pattern: top tabs (Software Engineering · AI · Mobile · Cloud · QA) + left sub-nav (Backend / Frontend / Fullstack / Mobile), right logo grid. Use Tresto's **real stack**: Node.js, Express, React/Next.js, Flutter, TypeScript, PostgreSQL, etc. (confirm full list with Hitesh).

### S15 — Blog  *("Our Blogs")* — optional
"Updates to help you decide smarter" + horizontal card carousel. Wire to MDX or a CMS later; placeholder cards for now.

### S16 — FAQ
2-col **accordion** (preview already has the markup). Click → expand one item (icon + ↔ −). Questions: timeline, pricing model, post-launch support, tech used, working with existing codebase, getting started.

### S17 — Contact  *("Let's discuss your project")*
Two columns. Left: presence — **Bangalore** + **Mandi Dabwali** + email + phone (confirm values). Right: form — Name, Email, Phone, Project info, **WhatsApp opt-in** checkbox, submit `btn-primary` "Let's Connect".
- Functioning: wire form to **Resend** or **Formspree** (env var for key), success/error toast. Add a one-click **WhatsApp** deep link as alt CTA.

### S18 — Mega footer
On `footer-gradient`. Logo + tagline **"Trust First. Technology Always."** + socials. Columns: **Company** (About, Team, Careers, Contact) · **Services** (Web, Mobile, AI Automation, Support) · **Work** (case studies) · **Connect** (LinkedIn, Twitter/X, GitHub, Instagram). Bottom row: © Tresto + Privacy · Terms.

---

## 6. Interactions / functioning checklist
- Sticky nav with blur; shrink slightly on scroll.
- Scroll-reveal (framer-motion `whileInView`) on section entry.
- Stat counters count-up on view.
- Case-study left-tab switcher (state).
- Tech-stack tabs + sub-nav (state).
- FAQ accordion (single-open).
- Testimonial carousel (arrows + drag on mobile).
- Contact form → email service + WhatsApp link.
- All hovers: lift + violet shadow per tokens.

## 7. Responsive
- Desktop ≥1024: multi-col grids as specced.
- Tablet 768–1023: 2-col grids, case-study tabs stack above panel.
- Mobile <768: single column, hamburger nav, carousels swipeable, hero H1 ~34px.

## 8. Domain / contact — CONFIRM before launch
Preview used `tresto.io` / `hitesh@tresto.io`, but the live company domain on record is **tresto.in**. Confirm which is canonical and set email/links accordingly. Leave as env/config, not hardcoded.

---

## Build order — paste these into Cursor one at a time

1. *"Scaffold a Next.js 14 + TypeScript + Tailwind project. Add the design tokens from BUILD_SPEC.md §2 to tailwind.config.ts and globals.css. Set up Plus Jakarta Sans + Inter via next/font. Install framer-motion and lucide-react."*
2. *"Build the global Section wrapper, SectionLabel, Button variants, sticky pill Navbar (§4), and mega Footer (§18) using the tokens."*
3. *"Build the Hero (S3) and the 3-pillar band (S4)."*
4. *"Build Stats (S6) with count-up, Values (S7), and the Services grid (S8)."*
5. *"Build the Case Studies section (S9) with the left-tab / right-panel switcher and impact stats."*
6. *"Build Industries (S10), Testimonials carousel (S12), and the Discovery CTA (S13)."*
7. *"Build the Tech Stack tabs (S14), FAQ accordion (S16)."*
8. *"Build the Contact section (S17) and wire the form to Resend (env key) plus a WhatsApp deep link."*
9. *"Pass for responsive (§7), scroll animations, and replace every TODO placeholder list — flag them for me."*

Follow the honesty guardrails in §3 throughout — never invent stats, logos, or awards.
