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
    <div className="min-h-screen bg-slate-50">
      <header className="bg-line-green text-white px-5 py-5 shadow-md">
        <p className="text-base opacity-90">あきた見守り</p>
        <h1 className="text-2xl font-bold mt-1">いまの交通・くらし情報</h1>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 flex flex-col gap-6">
        <InfoMap />

        <FilterBar />

        {loading && (
          <div className="card rounded-3xl bg-white shadow-md p-8 text-center text-lg text-slate-600">
            情報を読みこんでいます…
          </div>
        )}

        {error && (
          <div className="rounded-3xl bg-red-50 border-2 border-red-200 p-6 text-center text-lg text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && <InfoList />}

        <p className="text-base text-slate-400 text-center pt-2 pb-8">
          ※ 表示中の情報はサンプルです。最新の状況は各自治体・交通事業者の発表をご確認ください。
        </p>
      </main>
    </div>
  )
}
