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
        'green-dark': '#90d159',
        'green-medium': '#99cd6a',
        'green-light': '#b6e094',
        'brown-dark': '#523629',
        'brown-medium': '#735c52',
        'brown-light': '#bdb6b0',
        'gray-light': '#9d938c',
        'gray-lighter': 'rgba(2193,213,208,0.23)',
      },
    },
  },
  plugins: [flowbite],
}

