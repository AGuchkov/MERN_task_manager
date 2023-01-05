/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-dark': '#2e2e2e',
        'main-light': '#ebf0f6',
        'main-blue': '#7683ec',
        'gray': '#959595',
        'shadow-rgba': 'rgba(58, 66, 76, 0.8)'
      },
      boxShadow: {
        'custom': '0px 0px 80px -10px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}