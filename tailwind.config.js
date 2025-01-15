/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: "hsl(13, 75%, 58%)",

        // Dark theme
        dark: {
          bg: {
            primary: "hsl(225, 9%, 9%)",
            secondary: "hsl(216, 8%, 12%)",
            highlight: "hsl(220, 7%, 18%)",
          },

          text: {
            primary: "hsl(0, 0%, 100%)",
            secondary: "hsl(222, 9%, 78%)",
          },
        },

        // Light theme
        light: {
          bg: {
            primary: "hsl(0, 0%, 98%)",
            secondary: "hsl(0, 0%, 94%)",
            highlight: "hsl(0, 0%, 92%)",
          },

          text: {
            primary: "hsl(216, 9%, 23%)",
            secondary: "hsl(213, 4%, 51%)",
          },
        },
      },

      fontFamily: {
        robotoSlab: ['"Roboto Slab"', ...fontFamily.serif],
        robotoMono: ['"Roboto Mono"', ...fontFamily.serif],
      },

      fontSize: {
        sm: "0.8125rem",
        base: "0.875rem",
        md: "0.9375rem",
        h1: "2rem",
        h2: "1.75rem",
        h3: "1.5rem",
        h4: "1.25rem",
        h5: "1rem",
        h6: "0.875rem",
      },

      fontWeight: {
        light: 300,
        normal: 400,
        bold: 700,
      },

      letterSpacing: {
        sm: "2px",
        lg: "5px",
      },
    },
  },

  plugins: [],
};
