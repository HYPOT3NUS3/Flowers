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
        ivory: "#F7F4EC",
        porcelain: "#FDFBF6",
        ink: "#1C2433",
        graphite: "#545B66",
        powder: "#E1E8F0",
        toile: "#2F4F86",
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
