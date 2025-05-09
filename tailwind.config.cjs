/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("tailwind-scrollbar"),
  ],
};