# Tresto — Cursor Build Prompts (structure-first + ownership)

Use with `BUILD_SPEC.md` already in the repo and added to Cursor's context (`@BUILD_SPEC.md`).

---

## Ground rules for this phase

**Building now:** component files, layout, Tailwind tokens, and interaction logic (tabs, accordion, form state).

**NOT now — defer to a polish pass:** per-section fonts, the real Tresto logo, background videos, and animations. Where these will go, leave a `// TODO(polish):` comment so they're easy to find later.

**One component at a time.** Understand each before moving to the next. That's the whole point.

---

## Folder convention (tell Cursor to follow this)

```
app/page.tsx              → composes all sections in order
components/layout/         → Navbar.tsx, Footer.tsx
components/sections/       → one file per section (Hero.tsx, Services.tsx, …)
components/ui/             → Button.tsx, Section.tsx, SectionLabel.tsx, Chip.tsx
lib/data/                 → cases.ts, techStack.ts, faqs.ts, services.ts (content as arrays)
```

Keeping content in `lib/data/` (not hardcoded in JSX) is deliberate — it's how you'll swap real copy in later without touching layout.

---

## PROMPT 0 — Architecture + shell (run once)

> Read `@BUILD_SPEC.md`. Set up the component architecture in §Folder convention: create the `components/ui`, `components/layout`, `components/sections`, and `lib/data` folders. Build the reusable `Section`, `SectionLabel`, `Button` (primary/ghost/dark variants), and `Chip` components using the design tokens from §2 — nothing else styled yet. Then make `app/page.tsx` render an empty ordered shell with a placeholder `<div>` for each section (Hero, Pillars, Trusted, Stats, Values, Services, Cases, Industries, Testimonials, Discovery, TechStack, FAQ, Contact) plus Navbar and Footer slots. Skip fonts, logo art, background video, and animation — leave `// TODO(polish):` where they'll go. After you're done, list every file you created and what each one does in one line.

---

## THE LOOP — repeat for every section

### Step A — Build (structure only)

> Build the **{SECTION}** component per `@BUILD_SPEC.md` (section {ID}). Structure and layout only: correct semantic HTML, responsive grid, and the design tokens from §2. Put any repeated content in a `lib/data/*.ts` array and map over it. Wire the interaction logic if the section has one (e.g. tab switch / accordion / carousel state). **Do not** add custom fonts, the logo, background video, or animations yet — leave `// TODO(polish):` markers. Follow the honesty guardrails in §3 — placeholders as `TODO:`, never invented stats or logos. Mount it in `app/page.tsx`.

### Step B — Own it (explain-back) ← don't skip this

> Explain the **{SECTION}** file you just wrote, in plain English, like I'm learning: what each block does, what data it reads, what state (if any) drives the interaction, and — importantly — which lines I'd touch later to restyle it (fonts, colors, animation). Point out anything I should understand before we move on.

### Step C — Make it yours

Before the next section, you (not Cursor):
- Change one real thing by hand — a heading, a token value, a grid column count — and see it update at `localhost:3000`.
- Add one line to `NOTES.md`: *"{SECTION} — does X, driven by Y, I'd change Z to restyle."*

If it breaks, read the error, find the file/line it names, then ask Cursor: *"why is this happening and what are my options?"* — options first, then you pick.

---

## Section order (run the loop in this sequence)

| # | Section | Component | Spec ID |
|---|---------|-----------|---------|
| 1 | Navbar + Footer | `layout/Navbar`, `layout/Footer` | S2, S18 |
| 2 | Hero | `sections/Hero` | S3 |
| 3 | 3-pillar band | `sections/Pillars` | S4 |
| 4 | Trusted-by | `sections/Trusted` | S5 |
| 5 | Stats | `sections/Stats` | S6 |
| 6 | Values | `sections/Values` | S7 |
| 7 | Services grid | `sections/Services` | S8 |
| 8 | Case Studies (tab switcher) | `sections/Cases` | S9 |
| 9 | Industries | `sections/Industries` | S10 |
| 10 | Testimonials | `sections/Testimonials` | S12 |
| 11 | Discovery CTA | `sections/Discovery` | S13 |
| 12 | Tech Stack (tabs) | `sections/TechStack` | S14 |
| 13 | FAQ (accordion) | `sections/Faq` | S16 |
| 14 | Contact (form state) | `sections/Contact` | S17 |

Do the interaction-heavy ones (Cases, TechStack, FAQ, Contact) carefully — that's where the real learning is.

---

## After the structure is done

Only once every section is built and mounted, start the polish pass (separate prompts, one concern at a time):
1. Real Tresto logo (replace the text logo in Navbar + Footer).
2. Font pairing per section.
3. Background video in Hero / Discovery.
4. Scroll reveals + hover micro-interactions (framer-motion).
5. Replace all `TODO:` content with real copy.

Keep each polish change small and reviewable — same own-it habit.

---

## Ownership habits (keep these all the way through)

- **Read before you accept.** Never merge a file you haven't looked at.
- **NOTES.md is your map.** One honest line per component, in your words.
- **Ask "why + options", not "just fix it".** You stay the decision-maker.
- **One hand-edit per section.** Touching the code is what turns "generated" into "yours".
