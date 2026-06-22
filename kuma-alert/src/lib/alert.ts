// クマ通知エリア設定の保存・読込ロジック。
//
// 本番設計（メモ）:
//   この設定は最終的に line-harness の friend メタデータ / タグに保存する。
//   ユーザーが選んだ市町村を「エリアタグ」（例: area:秋田市）として LINE 公式アカウントの
//   フレンド情報に付与し、通知の強さ（severity）もタグ化する。
//   クマ検知 Webhook が「○○市でクマ出没」を受け取ったら、該当エリアのタグを持つ
//   ユーザーだけに公式アカウントから push メッセージを送る。
//   ここではその設定値を保存する API（/api/alert-prefs）の口だけ用意し、
//   VITE_API_BASE が無いローカル開発時は localStorage にフォールバックする。

export type Severity = 'critical' | 'all'

export type AlertPrefs = {
  areas: string[]
  severity: Severity
}

const STORAGE_KEY = 'neokuma_alert_prefs'

// LIFF の userId を保持しておき、API 送信時に body へ含める。
let currentUserId: string | null = null

export function setUserId(userId: string | null) {
  currentUserId = userId
}

export async function saveAlertPrefs(p: AlertPrefs): Promise<void> {
  const base = import.meta.env.VITE_API_BASE as string | undefined

  if (base) {
    // 本番: line-harness 連携 API に保存（friend のエリアタグ / severity を更新）
    const res = await fetch(`${base}/api/alert-prefs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUserId, ...p }),
    })
    if (!res.ok) {
      throw new Error(`saveAlertPrefs failed: ${res.status}`)
    }
    return
  }

  // ローカル開発フォールバック
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
}

export async function loadAlertPrefs(): Promise<AlertPrefs | null> {
  const base = import.meta.env.VITE_API_BASE as string | undefined

  if (base) {
    const url = new URL(`${base}/api/alert-prefs`)
    if (currentUserId) url.searchParams.set('userId', currentUserId)
    const res = await fetch(url.toString())
    if (!res.ok) return null
    const data = (await res.json()) as Partial<AlertPrefs> | null
    if (!data || !Array.isArray(data.areas)) return null
    return {
      areas: data.areas,
      severity: data.severity === 'all' ? 'all' : 'critical',
    }
  }

  // ローカル開発フォールバック
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as Partial<AlertPrefs>
    if (!Array.isArray(data.areas)) return null
    return {
      areas: data.areas,
      severity: data.severity === 'all' ? 'all' : 'critical',
    }
  } catch {
    return null
  }
}
