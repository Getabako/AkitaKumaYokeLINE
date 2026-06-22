/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'line-green': '#06C755',
        'line-green-dark': '#05a648',
        'kuma-red': '#dc2626',
        'kuma-red-dark': '#b91c1c',
      },
      fontFamily: {
        sans: ['"Hiragino Sans"', '"Yu Gothic UI"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
