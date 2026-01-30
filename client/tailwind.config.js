/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "Sans"],
        pacifico: ['Pacifico', 'cursive'],
      }
    },
  },
  plugins: [],
}