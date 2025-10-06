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
        bg: "var(--color-bg)",
        fg: "var(--color-fg)",
        accent: "var(--color-accent)",
        primary: "var(--color-primary)",
        chicken: "var(--color-chicken)",
        egg: "var(--color-egg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        success: "var(--color-success)",
        muted: "var(--color-text-muted)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
        vote: "var(--shadow-vote)",
      },
    },
  },
  plugins: [],
};

export default config;
