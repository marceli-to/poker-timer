/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'huge': 'clamp(6rem, 30vw, 12rem)'
      }
    },
  },
  plugins: [],
};
