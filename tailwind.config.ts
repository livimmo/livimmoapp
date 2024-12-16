import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6366F1", // Indigo-500
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F9FAFB", // Gray-50
          foreground: "#111827", // Gray-900
        },
        destructive: {
          DEFAULT: "#EF4444", // Red-500
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F3F4F6", // Gray-100
          foreground: "#6B7280", // Gray-500
        },
        accent: {
          DEFAULT: "#EEF2FF", // Indigo-50
          foreground: "#6366F1", // Indigo-500
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827", // Gray-900
        },
        success: {
          DEFAULT: "#10B981", // Emerald-500
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#F59E0B", // Amber-500
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;