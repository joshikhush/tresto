/** A single item in the site navigation (used by Navbar) */
export interface NavLink {
  label: string;
  href: string;
}

/** One of Tresto's service offerings (used by Services section) */
export interface Service {
  id: string;
  title: string;
  description: string;
  /** Lucide icon name — resolved to a component at render time */
  icon: string;
}

/** A headline stat (used by Stats section) */
export interface Stat {
  id: string;
  value: string;
  label: string;
}

/** Stats section header copy */
export interface StatsSectionContent {
  label: string;
  title: string;
}

/** A portfolio / case-study card (used by Portfolio section) */
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  href?: string;
}

/** Client testimonial (used by Testimonials section) */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

/** Team member profile (used by Team section) */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

/** FAQ accordion item (used by FAQ section) */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/** CTA link used in Hero and other sections */
export interface HeroCta {
  label: string;
  href?: string;
  external?: boolean;
}

/** Hero section content (used by Hero) */
export interface HeroContent {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  /** Substring of titleLine2 rendered in gold accent */
  titleHighlight: string;
  description: string;
  /** 3 short value props, rendered with a gold bullet mark */
  bullets: string[];
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
}

/** Top-level site configuration — single source of truth for all content */
export interface SiteConfig {
  company: {
    name: string;
    tagline: string;
    description: string;
  };
  hero: HeroContent;
  contact: {
    phone: string;
    email: string;
    location: string;
    bookingUrl: string;
  };
  nav: {
    ctaLabel: string;
  };
  navLinks: NavLink[];
  services: Service[];
  statsSection: StatsSectionContent;
  stats: Stat[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  team: TeamMember[];
  faq: FAQItem[];
}
