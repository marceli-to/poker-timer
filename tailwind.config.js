/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'huge': 'clamp(4rem, 24vw, 12rem)'
      }
    },
  },
  plugins: [],
};
