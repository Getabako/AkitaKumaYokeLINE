export type Animal = 'bear' | 'boar' | 'deer'
export type Kind = 'sighting' | 'trace' | 'injury'

export type NewSighting = {
  lat: number
  lng: number
  animal: Animal
  kind: Kind
  note?: string
}

export type StoredSighting = NewSighting & {
  id: number
  reportedAt: string
  confidence: number
  reporter?: string
}

const STORAGE_KEY = 'neokuma_sightings'

/**
 * 目撃情報を送信する。
 * VITE_API_BASE があればサーバーへ POST、無ければ localStorage に保存する。
 */
export async function submitSighting(s: NewSighting, reporter?: string): Promise<void> {
  const base = import.meta.env.VITE_API_BASE as string | undefined
  const reportedAt = new Date().toISOString()

  if (base) {
    const res = await fetch(`${base}/api/sightings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...s, reportedAt }),
    })
    if (!res.ok) {
      throw new Error(`送信に失敗しました (${res.status})`)
    }
    return
  }

  // ローカル保存（API 未設定時のフォールバック）
  let list: StoredSighting[] = []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) list = JSON.parse(raw) as StoredSighting[]
  } catch {
    list = []
  }
  const id = list.reduce((max, item) => Math.max(max, item.id), 0) + 1
  const record: StoredSighting = {
    ...s,
    id,
    reportedAt,
    confidence: 80, // LINE 本人確認済みのため高めの信頼度
    ...(reporter ? { reporter } : {}),
  }
  list.push(record)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))

  // デモ動作: 実際に送信しているような待ち時間を入れる
  await new Promise((resolve) => setTimeout(resolve, 1200))
}
