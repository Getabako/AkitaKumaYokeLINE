import { CATEGORY_META } from '../../lib/info'
import type { InfoCategory } from '../../lib/info'
import { useInfo } from '../../stores/info'
import type { Filter } from '../../stores/info'

const ORDER: Filter[] = ['all', 'roadblock', 'snow', 'bus', 'bear']

function labelOf(f: Filter): string {
  if (f === 'all') return 'すべて'
  return CATEGORY_META[f as InfoCategory].label
}

// 'all' は灰色、その他はカテゴリ色のバッジ
function colorOf(f: Filter): string {
  if (f === 'all') return '#64748b'
  return CATEGORY_META[f as InfoCategory].color
}

export function FilterBar() {
  const filter = useInfo((s) => s.filter)
  const setFilter = useInfo((s) => s.setFilter)

  return (
    <div className="flex flex-wrap gap-2.5" role="group" aria-label="種類でしぼりこむ">
      {ORDER.map((f) => {
        const active = filter === f
        return (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={active}
            className={['chip gap-2', active ? 'chip-on' : 'chip-off'].join(' ')}
          >
            <span
              className="h-4 w-4 rounded-full border-2 border-white/80"
              style={{ background: colorOf(f) }}
              aria-hidden
            />
            <span>{labelOf(f)}</span>
          </button>
        )
      })}
    </div>
  )
}
