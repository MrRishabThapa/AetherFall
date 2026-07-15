import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070b",
        glass: "rgba(255,255,255,0.06)",
        stroke: "rgba(255,255,255,0.10)",
        glow: "#64b5ff",
        glow2: "#7c5cff",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(100,181,255,0.25), 0 0 40px rgba(100,181,255,0.18)",
      },
      backdropBlur: {
        xl: "24px",
      },
    },
  },
  plugins: [],
} satisfies Config;