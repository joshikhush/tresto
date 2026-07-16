import type { Config } from "tailwindcss";

/**
 * Tailwind v4 uses CSS-first theming — all color tokens live in globals.css.
 * This config only declares content paths for class scanning.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
};

export default config;
