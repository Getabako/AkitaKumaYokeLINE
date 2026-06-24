/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'line-green': '#06C755',
        'line-green-dark': '#04a948',
        cream: '#FBF6EC',
        'cream-deep': '#EFE6D3',
        bear: '#5E4023',
        'bear-soft': '#8B5E3C',
        bell: '#F2A900',
        ink: '#2A2320',
        danger: '#E2483D',
        kuma: {
          warn: '#c2410c',
          warnDark: '#9a3412',
        },
      },
      fontFamily: {
        sans: ['"Hiragino Sans"', '"Yu Gothic UI"', 'system-ui', 'sans-serif'],
        rounded: ['"M PLUS Rounded 1c"', 'system-ui', 'sans-serif'],
        body: ['"Zen Kaku Gothic New"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
