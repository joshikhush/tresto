import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Single italic cut, used only as a small editorial accent word inside the
// Trusted-by heading (Trusted.tsx) — not a general body/heading typeface.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
});

// Mono accent used only by the case-study detail design (src/components/work)
// for step numbers, tech-stack initials, and the "at a glance" sidebar label.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Tresto - Software & AI Studio",
  description:
    "Tresto is a Bangalore-based software and AI automation studio building custom web, Flutter apps, and automation pipelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-white font-body text-ink antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
