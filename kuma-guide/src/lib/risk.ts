// 「きょうのクマ危険度」の簡易判定（時間帯＋季節）。
// 将来は天気APIや地域のドングリ豊凶を加えて本実装する余地を残す。

export type RiskLevel = 'high' | 'normal' | 'low'

export type RiskResult = {
  level: RiskLevel
  label: string // 「高い」「ふつう」「低い」
  emoji: string
  advice: string
  hour: number
  month: number // 1-12
}

// 時間帯スコア: 薄明(4-7時・16-19時)=+2、夜(20-翌4時)=+1、日中=0
function timeScore(hour: number): number {
  if ((hour >= 4 && hour < 7) || (hour >= 16 && hour < 19)) return 2
  if (hour >= 20 || hour < 4) return 1
  return 0
}

// 季節スコア: 春(4,5月)=+1、秋(9,10,11月)=+2、その他=0
function seasonScore(month: number): number {
  if (month === 4 || month === 5) return 1
  if (month === 9 || month === 10 || month === 11) return 2
  return 0
}

function adviceFor(level: RiskLevel, hour: number): string {
  if (level === 'high') {
    const timeWord =
      (hour >= 4 && hour < 7) || (hour >= 16 && hour < 19)
        ? '朝夕'
        : hour >= 20 || hour < 4
          ? '夜'
          : '季節的に'
    return `いまは${timeWord}、クマが動きやすい時間です。山ぎわ・やぶは避けて、出かけるなら日中の開けた道を、なるべく複数人で歩きましょう。`
  }
  if (level === 'normal') {
    return 'クマが動くことがある時間です。やぶや川ぞいを避け、音を出しながら歩くと安心です。家のまわりの生ゴミや柿も片付けましょう。'
  }
  return '比較的おだやかな時間帯です。それでも油断せず、家のまわりの生ゴミ・柿・栗は片付けておきましょう。'
}

// 現在時刻（実行時取得でOK。ブラウザ実行のため問題なし）から危険度を計算
export function assessRisk(now: Date = new Date()): RiskResult {
  const hour = now.getHours()
  const month = now.getMonth() + 1
  const total = timeScore(hour) + seasonScore(month)

  let level: RiskLevel
  if (total >= 3) level = 'high'
  else if (total >= 1) level = 'normal'
  else level = 'low'

  const label = level === 'high' ? '高い' : level === 'normal' ? 'ふつう' : '低い'
  const emoji = level === 'high' ? '🐻‼️' : level === 'normal' ? '🐻' : '🌿'

  return { level, label, emoji, advice: adviceFor(level, hour), hour, month }
}
