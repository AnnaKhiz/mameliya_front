/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite/plugin';
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-dark': 'rgba(42, 65, 48, 1)',
      },
    },
  },
  plugins: [flowbite],
}

