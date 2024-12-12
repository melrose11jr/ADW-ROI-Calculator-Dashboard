/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'], // Adjust to your project structure
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.gray,
      },
      spacing: {
        cardPadding: '2rem',
        boxMargin: '1rem',
        boxPadding: '1.5rem',
      },
      fontSize: {
        metricTitle: '1rem',
        metricValue: '1.25rem',
      },
    },
  },
  plugins: [],
};

