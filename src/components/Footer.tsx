import Link from "next/link";
import { Section } from "@/components/ui";
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

/** S18 — Mega footer. Structure only, no scroll-reveal. */
export function Footer() {
  return (
    <Section as="footer" bg="footer-gradient">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
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

        {columns.map((column) => (
          <div key={column.title}>
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
    </Section>
  );
}
