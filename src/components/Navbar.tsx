"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { NavLink } from "@/types";

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SCROLL_THRESHOLD = 40;
const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SWEEP_EASE = "cubic-bezier(0.4,0,0.2,1)";
const BURGER_EASE = "cubic-bezier(0.4,0,0.2,1)";
/** Matches the reference's cubic-bezier(.34,1.4,.44,1) overshoot by feel, not by porting the curve directly. */
const BLOB_SPRING = { type: "spring" as const, stiffness: 350, damping: 28 };

const sheetVariants: Variants = {
  closed: { y: "-102%" },
  open: { y: 0, transition: { duration: 0.5, ease: REVEAL_EASE } },
};

const sheetVariantsReduced: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.2 } },
};

const linkListVariants: Variants = {
  closed: {},
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const linkItemVariants: Variants = {
  closed: { opacity: 0, y: 14 },
  open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: REVEAL_EASE } },
};

function isLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * S2 — Sticky nav, "Liquid Pill" (design-refs/navbar-liquid-pill.html,
 * Concept 1). The active-link indicator is a single `motion.span` with
 * `layoutId="nav-blob"` re-mounted inside whichever link is current —
 * Framer Motion morphs it between positions/sizes on its own, no manual
 * offsetLeft measurement. Blob follows hover; leaving the link row drops
 * it back to the route's real active link (`usePathname`, not click
 * state), so a hard refresh on any route starts correctly positioned
 * with no post-hydration jump. Scroll response is a boolean threshold
 * behind a passive listener (not a per-frame scroll-linked animation),
 * so it can't jank. The mobile sheet is rendered as a sibling of the
 * reveal-animated pill wrapper, not a descendant — nesting a
 * `position: fixed` element inside a Framer Motion `transform`-bearing
 * ancestor would make it fixed relative to that ancestor instead of the
 * viewport.
 */
export function Navbar() {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  const activeIndex = navLinks.findIndex((link) => isLinkActive(pathname, link.href));
  const blobIndex = hoveredIndex ?? activeIndex;

  // Close the mobile menu on route change — adjusted during render (React's
  // recommended pattern for "reset state when a prop changes") rather than
  // in an effect, so it can't cascade an extra render.
  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMobileLinkRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;

      const focusable = menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 w-full">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: REVEAL_EASE }}
        className="relative z-20 mx-auto max-w-[1200px] px-6 py-4"
      >
        <div
          className={cn(
            "pointer-events-auto relative flex items-center justify-between rounded-pill px-6 py-3 transition-[background-color,box-shadow] duration-300",
            scrolled ? "bg-white/85 shadow-card-hover backdrop-blur-md" : "bg-white shadow-soft"
          )}
        >
          <div className="flex items-center gap-3">
            <Logo variant="dark" />
            <span
              title="Available for projects"
              aria-label="Available for projects"
              className="relative hidden h-[7px] w-[7px] shrink-0 rounded-full bg-emerald shadow-[0_0_10px_var(--color-emerald)] sm:inline-block"
            >
              {!prefersReducedMotion && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-emerald animate-status-pulse"
                />
              )}
            </span>
          </div>

          <nav
            aria-label="Primary"
            className="relative hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, index) => {
              const isBlobHere = index === blobIndex;
              const isRouteActive = index === activeIndex;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isRouteActive ? "page" : undefined}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  className={cn(
                    "relative rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-[250ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    isBlobHere ? "text-white" : "text-text-muted hover:text-violet"
                  )}
                >
                  {isBlobHere && (
                    <motion.span
                      layoutId="nav-blob"
                      aria-hidden
                      className="absolute inset-0 rounded-pill bg-[linear-gradient(120deg,var(--color-violet),var(--color-blue))]"
                      transition={prefersReducedMotion ? { duration: 0 } : BLOB_SPRING}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="group relative hidden overflow-hidden rounded-pill bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:inline-flex md:items-center"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute inset-0 -translate-x-[101%] bg-[linear-gradient(120deg,var(--color-violet),var(--color-gold))] transition-transform duration-[350ms] group-hover:translate-x-0 group-focus-visible:translate-x-0"
                )}
                style={{ transitionTimingFunction: SWEEP_EASE }}
              />
              <span className="relative z-10">Get in Touch</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="relative z-10 inline-flex h-[34px] w-[34px] items-center justify-center rounded-chip bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span className="flex flex-col items-center justify-center gap-[5px]">
                <span
                  style={{ transitionTimingFunction: BURGER_EASE }}
                  className={cn(
                    "block h-0.5 w-4 rounded-full bg-white transition-transform duration-[350ms]",
                    mobileOpen && "translate-y-[7px] rotate-45"
                  )}
                />
                <span
                  style={{ transitionTimingFunction: BURGER_EASE }}
                  className={cn(
                    "block h-0.5 w-4 rounded-full bg-white transition-all duration-[350ms]",
                    mobileOpen && "scale-x-0 opacity-0"
                  )}
                />
                <span
                  style={{ transitionTimingFunction: BURGER_EASE }}
                  className={cn(
                    "block h-0.5 w-4 rounded-full bg-white transition-transform duration-[350ms]",
                    mobileOpen && "-translate-y-[7px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            variants={prefersReducedMotion ? sheetVariantsReduced : sheetVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="pointer-events-auto fixed inset-0 z-10 flex flex-col bg-white px-6 pb-8 pt-20 md:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              variants={prefersReducedMotion ? undefined : linkListVariants}
              initial="closed"
              animate="open"
              className="flex flex-1 flex-col gap-1"
            >
              {navLinks.map((link, index) => (
                <motion.div key={link.href} variants={prefersReducedMotion ? undefined : linkItemVariants}>
                  <Link
                    href={link.href}
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    aria-current={isLinkActive(pathname, link.href) ? "page" : undefined}
                    className="block py-2.5 text-[22px] font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.4 }}
              className="mt-auto"
            >
              <Link
                href="/contact"
                className="block rounded-pill bg-[linear-gradient(120deg,var(--color-violet),var(--color-gold))] py-3.5 text-center text-base font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
