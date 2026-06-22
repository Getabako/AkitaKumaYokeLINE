/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'line-green': '#06C755',
        'line-green-dark': '#05a648',
        cat: {
          roadblock: '#dc2626',
          snow: '#2563eb',
          bus: '#7c3aed',
          bear: '#b45309',
        },
      },
      fontFamily: {
        sans: ['"Hiragino Sans"', '"Yu Gothic UI"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
