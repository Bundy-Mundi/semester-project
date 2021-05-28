module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadein 0.3s ease-in-out',
        'fade-in-long': 'fadein 0.8s ease-in-out',
        'float': ''
      },
      keyframes: {
        fadein: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        },
        float: {
          '0%': { transfrom: 'translate(0%)' },
          '100%': { transfrom: 'translate(-25%)' },
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
