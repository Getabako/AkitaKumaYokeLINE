import { CATEGORY_META } from '../../lib/info'
import type { InfoItem } from '../../lib/info'
import { useInfo } from '../../stores/info'

function formatUpdated(iso: string): string {
  const d = new Date(iso)
  const m = d.getMonth() + 1
  const day = d.getDate()
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${m}月${day}日 ${hh}:${mm} 更新`
}

function Card({ item }: { item: InfoItem }) {
  const meta = CATEGORY_META[item.category]
  const selectedId = useInfo((s) => s.selectedId)
  const select = useInfo((s) => s.select)
  const selected = selectedId === item.id

  return (
    <button
      onClick={() => select(item.id)}
      className="info-card"
      style={{
        borderLeftColor: meta.color,
        outline: selected ? `3px solid ${meta.color}` : 'none',
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-base font-bold text-white"
          style={{ background: meta.color }}
        >
          <span className="w-3 h-3 rounded-full bg-white/90" aria-hidden />
          {meta.label}
        </span>
      </div>
      <p className="text-xl font-bold text-slate-900 mb-1">{item.title}</p>
      <p className="text-lg text-slate-700 mb-2">{item.place}</p>
      <p className="text-lg text-slate-800 mb-3">{item.detail}</p>
      <p className="text-base text-slate-500">{formatUpdated(item.updatedAt)}</p>
    </button>
  )
}

export function InfoList() {
  const items = useInfo((s) => s.items)
  const filter = useInfo((s) => s.filter)

  const visible = items.filter((it) => filter === 'all' || it.category === filter)

  if (visible.length === 0) {
    return (
      <div className="card rounded-3xl bg-white shadow-md p-8 text-center text-lg text-slate-600">
        いまは、この種類の情報はありません。
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {visible.map((it) => (
        <Card key={it.id} item={it} />
      ))}
    </div>
  )
}
