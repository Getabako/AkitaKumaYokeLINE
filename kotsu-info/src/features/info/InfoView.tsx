import { useEffect } from 'react'
import { fetchInfo } from '../../lib/info'
import { useInfo } from '../../stores/info'
import { FilterBar } from './FilterBar'
import { InfoMap } from './InfoMap'
import { InfoList } from './InfoList'

export function InfoView() {
  const loading = useInfo((s) => s.loading)
  const error = useInfo((s) => s.error)
  const setItems = useInfo((s) => s.setItems)
  const setLoading = useInfo((s) => s.setLoading)
  const setError = useInfo((s) => s.setError)

  useEffect(() => {
    let alive = true
    setLoading(true)
    fetchInfo()
      .then((items) => {
        if (alive) {
          setItems(items)
          setError(null)
        }
      })
      .catch((e: unknown) => {
        if (alive) setError(e instanceof Error ? e.message : '情報の取得に失敗しました')
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [setItems, setLoading, setError])

  return (
    <div className="screen">
      <header className="app-header">
        <span className="brand-tag">クマ避けAKITA</span>
        <h1 className="app-title emboss mt-2">いまの交通・くらし情報</h1>
        <p className="app-sub">秋田の今を、いつものLINEで</p>
      </header>

      <main className="flex flex-col gap-6 px-4 py-6">
        <section className="flex flex-col gap-3">
          <h2 className="section-label">地図でみる</h2>
          <InfoMap />
        </section>

        <div className="divider" />

        <section className="flex flex-col gap-3">
          <h2 className="section-label">種類でしぼる</h2>
          <FilterBar />
        </section>

        <div className="divider" />

        <section className="flex flex-col gap-4">
          <h2 className="section-label">いまの情報</h2>

          {loading && (
            <div className="panel text-center text-bear-soft">情報を読みこんでいます…</div>
          )}

          {error && (
            <div className="panel border-danger/40 text-center font-bold text-danger">
              {error}
            </div>
          )}

          {!loading && !error && <InfoList />}
        </section>

        <p className="pb-8 pt-2 text-center text-sm text-bear-soft/70">
          ※ 表示中の情報はサンプルです。最新の状況は各自治体・交通事業者の発表をご確認ください。
        </p>
      </main>
    </div>
  )
}
