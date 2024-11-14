/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': {
          DEFAULT: '#020420',
          light: '#0a1930',
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        glow: {
          'from': {
            'box-shadow': '0 0 20px #3b82f6',
          },
          'to': {
            'box-shadow': '0 0 30px #3b82f6',
          }
        },
        'spin-slow': {
          'from': {
            'transform': 'rotate(0deg)'
          },
          'to': {
            'transform': 'rotate(360deg)'
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}