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
          brown: '#7c4a21',
          'brown-dark': '#5c3414',
          cream: '#fef6e9',
          forest: '#3f7d4e',
        },
      },
      fontFamily: {
        rounded: ['"M PLUS Rounded 1c"', 'system-ui', 'sans-serif'],
        body: ['"Zen Kaku Gothic New"', 'system-ui', 'sans-serif'],
        sans: ['"Zen Kaku Gothic New"', '"Hiragino Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
