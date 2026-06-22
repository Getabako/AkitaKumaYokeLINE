import type { Animal, Kind } from './sightings'

// 獣種の日本語ラベルと地図ピンの色
export const ANIMAL_LABEL: Record<Animal, string> = {
  bear: 'クマ',
  boar: 'イノシシ',
  deer: 'シカ',
}

export const ANIMAL_COLOR: Record<Animal, string> = {
  bear: '#dc2626', // 赤
  boar: '#92400e', // 茶
  deer: '#16a34a', // 緑
}

// 種別の日本語ラベル
export const KIND_LABEL: Record<Kind, string> = {
  sighting: '目撃',
  trace: '痕跡',
  injury: '人身被害',
}

// 日時を高齢者にも読みやすい和文表記に
export function formatReportedAt(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const m = d.getMonth() + 1
  const day = d.getDate()
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${m}月${day}日 ${hh}時${mm}分ごろ`
}

// 信頼度を百分率に
export function confidencePercent(confidence: number): number {
  return Math.round(Math.max(0, Math.min(1, confidence)) * 100)
}
