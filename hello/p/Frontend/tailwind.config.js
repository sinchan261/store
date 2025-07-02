/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vt323: ['VT323', 'monospace'],
      },
      colors:{
        customA: 'rgb(154,153,255)',
      },
      screens:{
        'xs':'480px'
      }
    },
  },
  plugins: [],
}
