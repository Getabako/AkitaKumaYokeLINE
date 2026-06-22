/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'line-green': '#06C755',
        'line-green-dark': '#05a648',
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
      },
    },
  },
  plugins: [],
}
