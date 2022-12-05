const addPlugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        text: "hsl(0, 0%, 100%)",
        dark: "hsl(252, 64%, 44%))",
        primary: "hsl(252, 66%, 48%)",
        light: "hsl(252, 66%, 52%)",
        secondary: "hsl(158, 66%, 48%)",
        warning: "hsl(14, 98%, 66%)",
        gray: "hsl(0, 0%, 46%)",
        ui1: "hsl(248, 8%, 58%)",
        ui2: "hsl(240, 8%, 54%)",
        ui3: "hsl(248, 12%, 28%)",
        ui4: "hsl(248, 12%, 24%)",
        ui5: "hsl(248, 18%, 20%)",
        ui6: "hsl(248, 18%, 18%)",
        ui7: "hsl(248, 16%, 14%)",
        ui8: "hsl(248, 14%, 11%)",
        ui9: "hsl(248, 14%, 6%)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        112: "28rem",
        120: "30rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    addPlugin(function ({ addBase }) {
      addBase({
        ".scrollbar-hidden": {
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
        },
        ".scrollbar-hidden::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
  ],
};
