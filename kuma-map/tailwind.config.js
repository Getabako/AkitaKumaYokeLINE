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
        'bear-soft': '#8B5E3C',
        bell: '#F2A900',
        ink: '#2A2320',
        danger: '#E2483D',
        brand: {
          biz: '#1e40af',
          edu: '#ea580c',
        },
        // 獣種カラー（地図ピン・凡例で共通利用）
        bear: '#dc2626',
        boar: '#92400e',
        deer: '#16a34a',
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
