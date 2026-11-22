import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF8F3",
        porcelain: "#FFFDF9",
        ink: "#161616",
        graphite: "#5E5E5E",
        powder: "#DDE7ED",
        toile: "#718DA5",
        botanical: "#B6C0BC"
      },
      fontFamily: {
        serif: ["var(--font-editorial)"],
        sans: ["var(--font-manrope)"]
      }
    }
  },
  plugins: []
};

export default config;
