/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tang: {
          DEFAULT: '#F28C28',
          shade: '#C96A12',
          dark: '#D06A10'
        },
        sea: {
          DEFAULT: '#3D8FB0',
          shade: '#2A6A85',
          dark: '#4F7C8A'
        },
        stone: {
          DEFAULT: '#77736F',
          dark: '#4A4846',
          charcoal: '#3A3836',
          light: '#8A8682'
        },
        jeju: {
          sand: '#EDECE8',
          ink: '#231F20',
          night: '#121110',
          green: '#6E9B4F'
        }
      },
      fontFamily: {
        pixel: ['Silkscreen', 'Courier New', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Apple SD Gothic Neo"', '"IBM Plex Sans KR"', 'sans-serif'],
      },
      animation: {
        'hint-bob': 'hintBob 1.8s ease-in-out infinite',
        'sway': 'sway 9s ease-in-out 2s infinite alternate',
        'aura': 'aura 28s linear infinite',
        'blink': 'blink 1.05s steps(1,end) infinite',
        'nudge': 'nudge 4.5s ease-in-out 3s infinite',
      },
      keyframes: {
        hintBob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        sway: {
          'from': { transform: 'rotateY(-12deg) rotateX(4deg)' },
          'to': { transform: 'rotateY(12deg) rotateX(-3deg)' },
        },
        aura: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.08)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        nudge: {
          '0%, 80%, 100%': { transform: 'none' },
          '88%': { transform: 'translate3d(0, 3%, 12px)' },
        }
      }
    },
  },
  plugins: [],
}
