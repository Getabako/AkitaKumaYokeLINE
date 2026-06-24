import { useEffect, useState } from 'react'
import { initLiff } from './lib/liff'
import { AKITA_AREA_GROUPS } from './lib/areas'
import {
  loadAlertPrefs,
  saveAlertPrefs,
  setUserId,
  type Severity,
} from './lib/alert'

type Screen = 'edit' | 'done'

export default function App() {
  const [screen, setScreen] = useState<Screen>('edit')
  const [areas, setAreas] = useState<string[]>([])
  const [severity, setSeverity] = useState<Severity>('critical')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 起動時：LIFF 初期化（userId を alert へ渡す）＋ 既存設定の復元。
  // どこかで失敗してもアプリ自体は動かす。
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const profile = await initLiff()
        if (profile) setUserId(profile.userId)
      } catch (e) {
        console.warn('LIFF init skipped:', e)
      }
      try {
        const prefs = await loadAlertPrefs()
        if (!cancelled && prefs) {
          setAreas(prefs.areas)
          setSeverity(prefs.severity)
        }
      } catch (e) {
        console.warn('loadAlertPrefs skipped:', e)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const toggleArea = (name: string) => {
    setAreas((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name],
    )
  }

  const handleSave = async () => {
    setError(null)
    setSaving(true)
    try {
      await saveAlertPrefs({ areas, severity })
      setScreen('done')
      window.scrollTo({ top: 0 })
    } catch (e) {
      console.error(e)
      setError('保存できませんでした。電波の良いところで、もう一度お試しください。')
    } finally {
      setSaving(false)
    }
  }

  if (screen === 'done') {
    return <DoneScreen areas={areas} onEdit={() => setScreen('edit')} />
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-slate-50">
      <header className="bg-kuma-warn px-5 py-5 text-white">
        <p className="text-base font-bold opacity-90">あきた見守り</p>
        <h1 className="mt-1 text-2xl font-bold leading-snug">クマ通知エリア設定</h1>
      </header>

      <main className="px-4 py-6 space-y-6">
        <section className="card">
          <h2 className="text-xl font-bold leading-relaxed">
            クマを知らせてほしい市町村をえらぶ
          </h2>
          <p className="mt-3 text-slate-600">
            えらんだ市町村にクマが出たら、LINEでお知らせします。
          </p>
        </section>

        <section className="card">
          <p className="font-bold text-slate-700">選んでいる市町村</p>
          {areas.length === 0 ? (
            <p className="mt-3 text-slate-500">まだ選ばれていません。</p>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              {areas.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggleArea(name)}
                  className="area-chip"
                  aria-label={`${name}を外す`}
                >
                  <span>{name}</span>
                  <span className="area-chip-x" aria-hidden="true">
                    ×
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>

        {AKITA_AREA_GROUPS.map((group) => (
          <section key={group.region}>
            <p className="mb-3 px-1 text-lg font-bold text-slate-700">
              {group.region}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {group.areas.map((name) => {
                const on = areas.includes(name)
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => toggleArea(name)}
                    aria-pressed={on}
                    className={`area-cell ${on ? 'area-cell-on' : 'area-cell-off'}`}
                  >
                    {name}
                  </button>
                )
              })}
            </div>
          </section>
        ))}

        <section className="card">
          <p className="mb-4 font-bold text-slate-700">どこまで知らせますか？</p>
          <div className="space-y-3">
            <SeverityOption
              checked={severity === 'critical'}
              onSelect={() => setSeverity('critical')}
              title="人身被害・警報だけ"
              desc="けが人や警報のときだけ知らせます。"
            />
            <SeverityOption
              checked={severity === 'all'}
              onSelect={() => setSeverity('all')}
              title="目撃も全部"
              desc="目撃された情報もすべて知らせます。"
            />
          </div>
        </section>

        {error && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 font-bold text-red-700">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={saving || areas.length === 0}
          className="btn-primary disabled:opacity-50"
        >
          {saving ? '保存しています…' : 'この内容で通知をうけとる'}
        </button>

        {areas.length === 0 && (
          <p className="text-center text-slate-500">
            まず、知らせてほしい市町村をえらんでください。
          </p>
        )}

        <p className="pb-4 text-center text-sm text-slate-400">
          設定はあとから何度でも変えられます。
        </p>
      </main>
    </div>
  )
}

function SeverityOption(props: {
  checked: boolean
  onSelect: () => void
  title: string
  desc: string
}) {
  const { checked, onSelect, title, desc } = props
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className={`flex w-full items-start gap-3 rounded-2xl border-2 bg-white p-4 text-left transition ${
        checked ? 'border-line-green bg-green-50' : 'border-slate-300'
      }`}
      style={{ minHeight: 64 }}
    >
      <span
        className={`mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 ${
          checked ? 'border-line-green' : 'border-slate-300'
        }`}
        aria-hidden="true"
      >
        <span
          className={`h-4 w-4 rounded-full ${checked ? 'bg-line-green' : 'bg-transparent'}`}
        />
      </span>
      <span>
        <span className="block text-lg font-bold text-slate-800">{title}</span>
        <span className="mt-1 block text-slate-600">{desc}</span>
      </span>
    </button>
  )
}

function DoneScreen(props: { areas: string[]; onEdit: () => void }) {
  const { areas, onEdit } = props
  const areaText = areas.join('・')
  return (
    <div className="min-h-screen max-w-md mx-auto bg-slate-50">
      <header className="bg-line-green px-5 py-5 text-white">
        <h1 className="text-2xl font-bold">設定しました</h1>
      </header>
      <main className="px-4 py-8 space-y-6">
        <section className="card text-center">
          <p className="text-xl font-bold leading-relaxed text-slate-800">
            {areaText}でクマが出たら、LINEでお知らせします。
          </p>
        </section>

        <section className="card">
          <p className="font-bold text-slate-700">えらんだ市町村</p>
          <ul className="mt-3 space-y-2">
            {areas.map((name) => (
              <li
                key={name}
                className="rounded-xl bg-green-50 px-4 py-3 font-bold text-slate-800"
              >
                {name}
              </li>
            ))}
          </ul>
        </section>

        <button type="button" onClick={onEdit} className="btn-outline">
          えらぶ市町村を変える
        </button>
      </main>
    </div>
  )
}
