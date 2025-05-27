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
        'green-medium': 'rgba(42, 65, 48, 0.5)',
        'green-light': 'rgba(219, 248, 193, 1)',
        'form-bg': 'rgba(225, 241, 210, 1)',
      },
    },
  },
  plugins: [flowbite],
}

