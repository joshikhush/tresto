import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  /** "white" applies a CSS invert filter for dark backgrounds. */
  variant?: "dark" | "white";
}

// TODO(polish): "white" is a brightness-0/invert CSS filter on the same
// dark file rather than a dedicated white asset — swap for a real white
// logo file if/when the invert filter isn't visually close enough.
export function Logo({ className, variant = "dark" }: LogoProps) {
  return (
    <Link href="/" aria-label="Tresto home" className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/tresto-logo.png"
        alt="Tresto"
        className={cn("h-[30px] w-auto", variant === "white" && "brightness-0 invert")}
      />
    </Link>
  );
}
