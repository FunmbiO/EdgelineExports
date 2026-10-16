import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        edgeline: {
          black: "#0a0a0a",
          red: "#c41e2a",
          "red-dark": "#9c1620",
          white: "#ffffff",
          gray: "#1a1a1a",
          "gray-light": "#f5f5f5",
          border: "#262626",
        },
      },
      fontFamily: {
        display: ["var(--font-abril-fatface)", "serif"],
        heading: ["var(--font-yeseva-one)", "serif"],
        body: ["var(--font-plus-jakarta-sans)", "sans-serif"],
        condensed: ["var(--font-barlow-condensed)", "sans-serif"],
        // Decorative brush accent only — never body copy or anything that
        // needs to stay legible small.
        accent: ["var(--font-rock-salt)", "cursive"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
export default config;
