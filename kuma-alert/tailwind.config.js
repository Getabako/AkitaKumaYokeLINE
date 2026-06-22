/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'line-green': '#06C755',
        'line-green-dark': '#05a648',
        kuma: {
          warn: '#c2410c',
          warnDark: '#9a3412',
        },
      },
      fontFamily: {
        sans: ['"Hiragino Sans"', '"Yu Gothic UI"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
