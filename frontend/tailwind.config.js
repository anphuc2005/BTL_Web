/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#52AB98',
        'custom-green-hover': '#4a9d8a',
      }
    },
  },
  plugins: [],
}

