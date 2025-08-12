/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate';

const config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lexend-deca)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [animate],
};

export default config;
