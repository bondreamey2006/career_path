import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F4F0E6",
        dark: "#0A0A0A",
        brutal: {
          bg: "#F4F0E6",
          black: "#0A0A0A",
          violet: "#A855F7",
          indigo: "#6366F1",
          emerald: "#10B981",
          yellow: "#FFE14D",
          pink: "#FF5CAA",
          surface: "#FFFFFF",
          muted: "#EADFC9",
          slate: "#2A2A2A",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        brutal: "6px 6px 0px #0A0A0A",
        "brutal-sm": "3px 3px 0px #0A0A0A",
        "brutal-lg": "10px 10px 0px #0A0A0A",
        "brutal-xl": "14px 14px 0px #0A0A0A",
        "brutal-hover": "2px 2px 0px #0A0A0A",
        "brutal-pink": "6px 6px 0px #FF5CAA",
        "brutal-yellow": "6px 6px 0px #FFE14D",
        "brutal-violet": "6px 6px 0px #A855F7",
      },
      borderWidth: {
        "3": "3px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-6px) rotate(1deg)" },
        },
        "wiggle-hover": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "marquee-fast": "marquee 15s linear infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
