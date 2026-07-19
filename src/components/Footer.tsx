import Link from "next/link";
import { Section, Reveal, REVEAL_DELAY } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/SocialIcons";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const columns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/about#team" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web", href: "/services#web" },
      { label: "Mobile", href: "/services#mobile" },
      { label: "AI Automation", href: "/services#ai-automation" },
      { label: "Support", href: "/services#support" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "HiveGuard", href: "/work#hiveguard" },
      { label: "Triveni Radiators", href: "/work#triveni-radiators" },
      { label: "Rotary Nagar", href: "/work#rotary-nagar" },
      { label: "ReshapeNation", href: "/work#reshapenation" },
      { label: "Manglam Homes", href: "/work#manglam-homes" },
    ],
  },
  {
    title: "Connect",
    links: [
      // TODO: confirm real social URLs with Hitesh
      { label: "LinkedIn", href: "#" },
      { label: "Twitter / X", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "Twitter / X", href: "#", Icon: XIcon },
  { label: "GitHub", href: "#", Icon: GithubIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

/**
 * S18 — Mega footer. Columns fade + slide in via the shared `Reveal` system.
 * Background is two radial-gradient glows (violet top-left, pink
 * bottom-right) over a solid `#F6F2FE` base — set via inline `style`, not a
 * Tailwind `bg-[...]` arbitrary VALUE, since Tailwind's arbitrary-value
 * parser doesn't handle multiple comma-separated `radial-gradient()` calls
 * in one value correctly. The layer is `absolute inset-0`, nested inside
 * Section's own max-width container div — that inner div has no `position`
 * of its own, so `inset: 0` skips past it and resolves against the
 * `<footer>` tag instead (the same containing-block-skip `GhostWord`
 * relies on elsewhere), giving a true full-bleed footer background rather
 * than one clipped to the 1200px content column.
 */
export function Footer() {
  return (
    <Section as="footer" className="relative overflow-hidden rounded-[24px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 0%, rgba(109,90,230,0.14), transparent 55%), radial-gradient(circle at 95% 100%, rgba(236,72,153,0.12), transparent 55%)",
          backgroundColor: "#F6F2FE",
        }}
      />

      <div className="relative z-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <Reveal delay={REVEAL_DELAY.eyebrow}>
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-sm text-text-muted">
                Trust First. Technology Always.
              </p>
              <div className="mt-6 flex items-center gap-4">
                {socials.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-text-muted hover:text-violet"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          {columns.map((column, index) => (
            <Reveal key={column.title} delay={REVEAL_DELAY.heading + index * REVEAL_DELAY.gridStep}>
              <div>
                <p className="text-sm font-semibold text-ink">{column.title}</p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted hover:text-violet"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border-light pt-8 text-sm text-text-faint md:flex-row">
          <p>&copy; {new Date().getFullYear()} Tresto. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-violet">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-violet">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
