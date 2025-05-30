/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite/plugin';
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  safelist: ['-left-full'],
  theme: {
    extend: {
      colors: {
        'green-dark': '#90d159',
        'green-medium': '#99cd6a',
        'green-light': '#b6e094',
        'green-light-opacity-5': 'rgba(182,224,148,0.5)',
        'green-bg': 'rgba(233,230,176,0.44)',
        'brown-dark': '#523629',
        'brown-medium': '#735c52',
        'brown-light': '#bdb6b0',
        'gray-light': '#9d938c',
        'gray-lighter': 'rgba(2193,213,208,0.23)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      },
      fontSize: {
        '2xs': '10px',
      },
      screens: {
        'xs': '300px',
        '2lg': '1000px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [flowbite],
}

