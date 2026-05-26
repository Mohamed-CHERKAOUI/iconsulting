import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        electric: "#0066FF",
        cyan: "#00C2FF",
        violet: "#7C3AED",
        cyber: "#00FFB2",
        text: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-space)", "Space Grotesk", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"]
      },
      boxShadow: {
        glow: "0 0 48px rgba(0, 194, 255, 0.28)",
        "glow-strong": "0 0 70px rgba(0, 102, 255, 0.4)"
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        },
        "pulse-glow": {
          "0%, 100%": { filter: "drop-shadow(0 0 8px rgba(0,194,255,.45))" },
          "50%": { filter: "drop-shadow(0 0 22px rgba(0,255,178,.65))" }
        },
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" }
        }
      },
      animation: {
        shimmer: "shimmer 1.3s linear",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "scroll-x": "scroll-x 28s linear infinite",
        float: "float 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
