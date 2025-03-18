/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da8ff',
          DEFAULT: '#1c7ed6',
          dark: '#0c55a5',
        },
        secondary: {
          light: '#f8f9fa',
          DEFAULT: '#e9ecef',
          dark: '#dee2e6',
        }
      },
    },
  },
  plugins: [],
}