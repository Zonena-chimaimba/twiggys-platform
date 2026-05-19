/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          pink:        '#D4216B',
          'pink-light':'#F472B6',
          'pink-pale': '#FDF0F6',
          black:       '#0A0A0A',
          'black-soft':'#111111',
          'black-card':'#161616',
          white:       '#FAFAFA',
          'white-dim': '#E8E8E8',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script:  ['"Dancing Script"', 'cursive'],
        body:    ['"Jost"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'pulse-pink': 'pulsePink 2s ease-in-out infinite',
        'spin-slow':  'spin 1.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulsePink: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,33,107,0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(212,33,107,0)' },
        },
      },
    },
  },
  plugins: [],
}
