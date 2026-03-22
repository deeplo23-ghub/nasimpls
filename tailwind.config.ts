import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roca)", "sans-serif"],
        serif: ["var(--font-roca)", "serif"],
        baskerville: ["var(--font-roca)", "serif"]
      },
      colors: {
        brand: {
          red: "#F20505",
          "deep-red": "#620202",
          "mid-red": "#A60303",
          green: "#155C28",
          "deep-green": "#1D261D",
          yellow: "#F2AE30",
          tan: "#DCC0A5",
          brown: "#624614",
          cream: "#F5EFE3",
          charcoal: "#626262"
        }
      },
      boxShadow: {
        poster: "6px 6px 0 #F20505, 10px 10px 0 #F2AE30"
      },
      backgroundImage: {
        "landing-overlay":
          "linear-gradient(180deg, rgba(29,38,29,0.1) 0%, rgba(29,38,29,0.42) 52%, rgba(29,38,29,0.88) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
