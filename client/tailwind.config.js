const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: ['class', '[data-mode="dark"]'], // Enable dark mode with class and custom attribute
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#4f46e5', // Custom light mode color
        'primary-dark': '#818cf8',  // Custom dark mode color
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Include typography plugin
    require('tailwind-scrollbar-hide'),
    require('flowbite/plugin'),
  ],
});
