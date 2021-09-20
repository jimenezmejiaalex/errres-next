const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // Configure your color palette here
      // 'errres-green': '#135563',
      // 'errres-brown': '#9E7F60',
      eden: {
        DEFAULT: '#135563',
        50: '#77D2E5',
        100: '#61CAE1',
        200: '#36BCD9',
        300: '#239EB9',
        400: '#1B7A8E',
        500: '#135563',
        600: '#0B3038',
        700: '#030C0D',
        800: '#000000',
        900: '#000000',
      },
      leather: {
        DEFAULT: '#9E7F60',
        50: '#F5F2EF',
        100: '#EBE5DF',
        200: '#D8CCBF',
        300: '#C5B29F',
        400: '#B2997F',
        500: '#9E7F60',
        600: '#7E664D',
        700: '#5F4C39',
        800: '#3F3326',
        900: '#1F1913',
      },
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
      pink: colors.pink,
    },
    extend: {
      borderWidth: ['hover', 'focus'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
