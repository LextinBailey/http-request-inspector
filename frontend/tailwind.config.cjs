module.exports = {
  content: [
    "./index.html",
    "./src/**/*",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0d0e1c",
        card: "#252640",
        active: "#2a2b45",
        panel: "#1e1f35",
        border: "#2e2f50",
        divider: "#232438",
        remove: "ff6b6b",

        primary: "#e8e8f0",
        input: "#a0a0c0",
        muted: "#5a5a7a",
        labels: "#4a4a6a",
        veryMuted: "#3a3a55",

        accent: "#7878cc",
        accentSoft: "#3d3f6a",

        success: "#50e0a0",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      }
    },
  },
  plugins: [],
}

