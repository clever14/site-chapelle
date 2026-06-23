import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marial: {
          DEFAULT: "#22386a",
          dark: "#1a2a50",
          hover: "#1a2c54",
        },
        or: {
          DEFAULT: "#c89b3c",
          hover: "#b98a2e",
          light: "#e9c87a",
        },
        bordeaux: "#7c2a2f",
        creme: "#f6f3ec",
        carte: "#fffdf8",
        encre: "#2a2e38",
        attenue: "#4a4f5c",
        attenue2: "#6b7080",
        mono: "#8a8070",
        mono2: "#a89e85",
        bord: {
          1: "#ece6d8",
          2: "#e3d8c2",
          3: "#ddd5c2",
          4: "#d9cfb8",
        },
        panneau: {
          1: "#f3ece0",
          2: "#f6f1e7",
          3: "#fbf6ec",
          4: "#fbf1e8",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-mulish)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        pill: "9999px",
        card: "16px",
        field: "12px",
      },
      boxShadow: {
        card: "0 6px 22px rgba(34,56,106,.06)",
        cardLg: "0 14px 36px rgba(34,56,106,.10)",
        elevated: "0 18px 48px rgba(34,56,106,.14)",
      },
      maxWidth: {
        container: "1160px",
      },
    },
  },
  plugins: [],
};

export default config;
