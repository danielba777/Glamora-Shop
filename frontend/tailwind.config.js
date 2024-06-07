/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slide1: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '10%, 30%': { transform: 'translateX(0)', opacity: 1 },
          '40%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { opacity: 0 }
        },
        slide2: {
          '0%, 33%': { transform: 'translateX(100%)', opacity: 0 },
          '43%, 63%': { transform: 'translateX(0)', opacity: 1 },
          '73%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { opacity: 0 }
        },
        slide3: {
          '0%, 66%': { transform: 'translateX(100%)', opacity: 0 },
          '76%, 96%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(-100%)', opacity: 0 }
        }
      },
      animation: {
        'slide-1': 'slide1 9s linear infinite',
        'slide-2': 'slide2 9s linear infinite',
        'slide-3': 'slide3 9s linear infinite'
      }
    }
  },
  plugins: [],
}

