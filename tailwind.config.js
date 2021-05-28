module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadein 0.3s ease-in-out',
        'fade-in-long': 'fadein 0.8s ease-in-out'
      },
      keyframes: {
        fadein: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        }
      }
    },
  },
  variants: {
    extend: {
      transform: ['hover']
    },
  },
  plugins: [],
}
