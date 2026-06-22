import { CATEGORY_META } from '../../lib/info'
import type { InfoCategory } from '../../lib/info'
import { useInfo } from '../../stores/info'
import type { Filter } from '../../stores/info'

const ORDER: Filter[] = ['all', 'roadblock', 'snow', 'bus', 'bear']

function labelOf(f: Filter): string {
  if (f === 'all') return 'すべて'
  return CATEGORY_META[f as InfoCategory].label
}

function emojiOf(f: Filter): string {
  if (f === 'all') return '📋'
  return CATEGORY_META[f as InfoCategory].emoji
}

export function FilterBar() {
  const filter = useInfo((s) => s.filter)
  const setFilter = useInfo((s) => s.setFilter)

  return (
    <div className="grid grid-cols-3 gap-3" role="group" aria-label="種類でしぼりこむ">
      {ORDER.map((f) => {
        const active = filter === f
        return (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={active}
            className={[
              'toggle-chip flex flex-col items-center gap-1',
              active
                ? 'bg-line-green text-white border-line-green shadow-md'
                : 'bg-white text-slate-700 border-slate-300',
            ].join(' ')}
          >
            <span className="text-2xl leading-none">{emojiOf(f)}</span>
            <span>{labelOf(f)}</span>
          </button>
        )
      })}
    </div>
  )
}
