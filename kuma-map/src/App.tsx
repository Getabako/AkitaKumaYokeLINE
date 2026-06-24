import { useEffect, useMemo } from 'react'
import { initLiff } from './lib/liff'
import { fetchSightings } from './lib/sightings'
import { useMap } from './stores/map'
import { MapView } from './components/MapView'
import { Filters } from './components/Filters'
import { Legend } from './components/Legend'

// 秋田県の公式マップ「クマダス」を、秋田中心・直近3日で開くためのURL。
// 本番では議員ルートで県と正式にデータ連携する想定。デモではここへリンクして本物の最新情報を見せる。
function kumadasUrl(lat = 39.72, lng = 140.1): string {
  const end = new Date()
  const start = new Date(end.getTime() - 2 * 24 * 60 * 60 * 1000)
  const ymd = (d: Date) => d.toISOString().slice(0, 10)
  const params = new URLSearchParams({
    lat: String(lat),
    lng: String(lng),
    startdate: ymd(start),
    enddate: ymd(end),
    zoom_level: '10',
  })
  return `https://kumadas.net/?${params.toString()}`
}

export default function App() {
  const status = useMap((s) => s.status)
  const error = useMap((s) => s.error)
  const setProfile = useMap((s) => s.setProfile)
  const setLoading = useMap((s) => s.setLoading)
  const setSightings = useMap((s) => s.setSightings)
  const fail = useMap((s) => s.fail)

  // 表示中（フィルタ適用後）の件数と一覧。
  // ストアのセレクタで filter すると毎レンダーで新配列が返り
  // 無限再レンダリング（React #185）になるため、生データを取り出して useMemo で絞り込む。
  const sightings = useMap((s) => s.sightings)
  const animals = useMap((s) => s.animals)
  const kinds = useMap((s) => s.kinds)
  const visible = useMemo(
    () => sightings.filter((item) => animals[item.animal] && kinds[item.kind]),
    [sightings, animals, kinds],
  )

  // LIFF 初期化（プロフィール取得はベストエフォート。失敗してもアプリは動く）
  useEffect(() => {
    initLiff()
      .then((profile) => setProfile(profile))
      .catch((e) => console.warn('LIFF init skipped:', e))
  }, [setProfile])

  // 出没情報の取得
  useEffect(() => {
    setLoading()
    fetchSightings()
      .then((list) => setSightings(list))
      .catch((e) => {
        console.error(e)
        fail('出没情報を読み込めませんでした。時間をおいて開き直してください。')
      })
  }, [setLoading, setSightings, fail])

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-slate-50">
      <header className="bg-line-green px-5 py-5 text-white shadow-md">
        <h1 className="text-white">クマ出没マップ</h1>
        <p className="mt-1 text-base text-white/90">あきた見守り・無料</p>
      </header>

      <main className="flex-1 space-y-5 p-5">
        <section>
          <h2 className="mb-3">いまの出没状況</h2>

          {status === 'error' && (
            <div className="card border-2 border-red-300 text-red-700">
              {error}
            </div>
          )}

          {status === 'ready' && (
            <p className="mb-3 text-slate-700">
              いま地図に出ているのは <span className="font-bold text-line-green">{visible.length}件</span> です。
            </p>
          )}

          <div className="overflow-hidden rounded-2xl border-2 border-slate-200 shadow-md">
            <div className="h-[420px] w-full">
              {status === 'loading' ? (
                <div className="flex h-full items-center justify-center bg-white text-slate-500">
                  地図を読み込んでいます…
                </div>
              ) : (
                <MapView sightings={visible} />
              )}
            </div>
          </div>

          <a
            href={kumadasUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4 flex items-center justify-center text-center"
          >
            県の最新情報を見る（クマダス）
          </a>
          <p className="mt-2 text-base text-slate-500">
            正式に県と連携すると、最新の出没情報がこの画面にそのまま表示されます。
          </p>
        </section>

        <section className="card">
          <h2 className="mb-4">しぼりこみ</h2>
          <Filters />
        </section>

        <Legend />

        <p className="px-1 pb-2 text-base text-slate-500">
          ※ 情報はうそ情報チェック後に掲載しています。危険を感じたらすぐに安全な場所へ。
        </p>
      </main>
    </div>
  )
}
