/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#102033",
        navy: "#16324f",
        sand: "#f4efe8",
        clay: "#c97c45",
        mist: "#e2ebf2",
        pine: "#27495f",
      },
      fontFamily: {
        sans: ["Avenir Next", "Avenir", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["Iowan Old Style", "Baskerville", "Times New Roman", "serif"],
      },
      boxShadow: {
        card: "0 24px 80px rgba(16, 32, 51, 0.12)",
      },
      backgroundImage: {
        paper:
          "radial-gradient(circle at top, rgba(22, 50, 79, 0.1), transparent 30%), linear-gradient(135deg, #f7f1e7 0%, #edf4f8 100%)",
      },
    },
  },
  plugins: [],
};
