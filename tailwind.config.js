export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#1a3300",
        cream: "#fcfaf5",
        yellow: {
          highlight: "#ffe95c",
        },
        pencil: "#b6b6b6",
        whisper: "#f1f1f1",
        sticky: {
          teal: "#a8e5e5",
          mint: "#d5f5c2",
          blush: "#f6d0ff",
        },
        terracotta: "#cb5521",
      },
      fontFamily: {
        display: ["var(--font-display)", "Archivo Black", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        btn: "6px",
        card: "12px",
        nav: "16px",
      },
      maxWidth: {
        page: "1200px",
      },
      boxShadow: {
        cta: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
        "nav-glow":
          "0 0 0 1px #b6b6b6, 0 4px 24px -4px rgba(255, 233, 92, 0.55), 0 8px 32px -8px rgba(255, 233, 92, 0.35)",
      },
      animation: {
        shimmer: "shimmer 2s ease-in-out infinite",
        "spin-slow": "spin 4s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.03)" },
        },
      },
    },
  },
  plugins: [],
};
