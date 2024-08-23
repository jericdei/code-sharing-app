import type { Config } from "tailwindcss";
import formsPlugin from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#406AFF",
        neutral: {
          100: "#FFFFFE",
          200: "#CED6E1",
          400: "#364153",
          700: "#121826",
        },
      },
      backgroundImage: {
        gradient:
          "url('/hero-bg.png'), linear-gradient(to bottom right, rgba(183, 135, 245, 1), rgba(116, 62, 228, 1))",
      },
    },
  },
  plugins: [formsPlugin],
};
export default config;
