import { useMemo } from 'react'
import { assessRisk } from '../../lib/risk'
import { BackButton } from '../../components/BackButton'

const STYLE = {
  high: { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-700' },
  normal: { bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-700' },
  low: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700' },
} as const

export function Risk() {
  // 実行時に現在時刻を取得して判定（ブラウザ実行のため問題なし）
  const result = useMemo(() => assessRisk(), [])
  const s = STYLE[result.level]

  return (
    <div className="px-5 py-8">
      <h1 className="text-3xl font-bold text-kuma-brown-dark text-center mb-2">
        きょうの
        <br />
        クマ危険度
      </h1>
      <p className="text-center text-lg text-kuma-brown mb-8">
        いまの 時間と 季節から。
      </p>

      <div className={`rounded-3xl border-4 ${s.border} ${s.bg} p-8 text-center shadow-md`}>
        <p className="text-xl text-kuma-brown-dark mb-3">きょうは</p>
        <p className={`text-5xl font-bold ${s.text}`}>{result.label}</p>
      </div>

      <div className="guide-card mt-6">
        <p className="text-xl font-bold text-kuma-brown-dark">{result.advice}</p>
      </div>

      <p className="text-base text-kuma-brown bg-kuma-cream rounded-2xl p-4 mt-6">
        ※ これは 時間と 季節からの 目安です。天気や 地域の ドングリの ようすで 変わります。
      </p>

      <div className="mt-8">
        <BackButton />
      </div>
    </div>
  )
}
