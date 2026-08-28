/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        cosmic: {
          black: '#000000',
          deep: '#020617',
          violet: '#3b0764',
          blue: '#1e1b4b',
        },
      },
      backgroundImage: {
        'cosmic-radial':
          'radial-gradient(120% 120% at 50% -10%, #1e1b4b 0%, #020617 45%, #000000 100%)',
        'cosmic-glow':
          'radial-gradient(60% 60% at 50% 0%, rgba(139,92,246,0.25) 0%, rgba(2,6,23,0) 70%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(139,92,246,0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
