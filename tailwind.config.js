/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enables manual dark mode toggle
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js app folder
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#93C5FD",
          DEFAULT: "#3B82F6",
          dark: "#1E40AF",
        },
        surface: {
          light: "#F9FAFB",
          dark: "#111827",
        },
      },
    },
    // custom breakpoints
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
