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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
