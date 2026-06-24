import { useMemo } from 'react'
import { assessRisk } from '../../lib/risk'
import { BackButton } from '../../components/BackButton'

// 危険度ごとの大パネルの色味（背景グラデ・文字色・ラベル下のアクセント）
const STYLE = {
  high: {
    bg: 'linear-gradient(160deg, #FFF1EF 0%, #FBDDD8 60%, #F3C7C0 100%)',
    text: '#C5392F',
    accent: 'linear-gradient(90deg, #E2483D, #C5392F)',
  },
  normal: {
    bg: 'linear-gradient(160deg, #FFF8E8 0%, #FBEFCF 60%, #F2E2AE 100%)',
    text: '#C6870A',
    accent: 'linear-gradient(90deg, #F2A900, #D98A00)',
  },
  low: {
    bg: 'linear-gradient(160deg, #F1FBEC 0%, #DEF1D4 60%, #C9E7BB 100%)',
    text: '#2f7a42',
    accent: 'linear-gradient(90deg, #06C755, #04a948)',
  },
} as const

export function Risk() {
  // 実行時に現在時刻を取得して判定（ブラウザ実行のため問題なし）
  const result = useMemo(() => assessRisk(), [])
  const s = STYLE[result.level]

  return (
    <>
      <header className="app-header">
        <span className="brand-tag">クマ避けAKITA</span>
        <h1 className="app-title mt-2">きょうのクマ危険度</h1>
        <p className="app-sub">いまの時間と季節から</p>
      </header>

      <div className="px-5 py-7">
        {/* 危険度の色付き大パネル */}
        <div
          className="relative overflow-hidden rounded-[2rem] p-8 text-center"
          style={{
            background: s.bg,
            border: '2px solid rgba(255,255,255,0.6)',
            boxShadow:
              '0 18px 40px rgba(94,64,35,0.16), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          <span
            className="absolute left-12 right-12 top-0 h-1.5 rounded-b-full"
            style={{ background: s.accent }}
          />
          <p className="text-xl font-bold text-ink">きょうは</p>
          <p
            className="emboss mt-2 font-rounded font-black"
            style={{ color: s.text, fontSize: '3.4rem', lineHeight: 1.2 }}
          >
            {result.label}
          </p>
        </div>

        <h2 className="section-label mt-7 mb-3">アドバイス</h2>
        <div className="panel panel-accent">
          <p className="text-lg font-bold text-ink">{result.advice}</p>
        </div>

        <div className="divider" />

        <p className="rounded-2xl bg-cream-deep/50 p-4 text-base text-bear-soft">
          ※ これは時間と季節からの目安です。天気や地域のドングリのようすで変わります。
        </p>

        <div className="mt-7">
          <BackButton />
        </div>
      </div>
    </>
  )
}
