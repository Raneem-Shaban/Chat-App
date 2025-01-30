/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        scrollbarTrack: '#F2F2F7',
        scrollbarThumb: '#D1D1D6',
        scrollbarThumbHover: '#888',
      },
      borderRadius: {
        'scrollbar': '6px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.custom-scroll': {
          
          '&::-webkit-scrollbar': {
            width: '20px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#F2F2F7',
            'border-radius': '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#D1D1D6',
            'border-radius': '6px',
            border: '3px solid #f0f0f0',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#888',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};