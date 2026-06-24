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
      className="panel w-full overflow-hidden text-left transition active:translate-y-0.5"
      style={{
        borderColor: selected ? meta.color : undefined,
        boxShadow: selected
          ? `0 0 0 3px ${meta.color}, 0 12px 26px rgba(94,64,35,0.12)`
          : undefined,
      }}
    >
      <span
        className="absolute left-0 top-0 h-full w-2"
        style={{ background: meta.color }}
        aria-hidden
      />
      <div className="mb-2 flex items-center gap-3 pl-2">
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-base font-bold text-white"
          style={{ background: meta.color }}
        >
          <span className="h-3 w-3 rounded-full bg-white/90" aria-hidden />
          {meta.label}
        </span>
      </div>
      <p className="mb-1 pl-2 text-xl font-bold text-ink">{item.title}</p>
      <p className="mb-2 pl-2 text-lg text-bear">{item.place}</p>
      <p className="mb-3 pl-2 text-lg text-ink/90">{item.detail}</p>
      <p className="pl-2 text-base text-bear-soft/80">{formatUpdated(item.updatedAt)}</p>
    </button>
  )
}

export function InfoList() {
  const items = useInfo((s) => s.items)
  const filter = useInfo((s) => s.filter)

  const visible = items.filter((it) => filter === 'all' || it.category === filter)

  if (visible.length === 0) {
    return (
      <div className="panel text-center text-bear-soft">
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
