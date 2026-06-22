import clsx from 'clsx'
import { useMap } from '../stores/map'
import type { Animal, Kind } from '../lib/sightings'
import { ANIMAL_LABEL, KIND_LABEL } from '../lib/labels'

const ANIMALS: Animal[] = ['bear', 'boar', 'deer']
const KINDS: Kind[] = ['sighting', 'trace', 'injury']

export function Filters() {
  const animals = useMap((s) => s.animals)
  const kinds = useMap((s) => s.kinds)
  const toggleAnimal = useMap((s) => s.toggleAnimal)
  const toggleKind = useMap((s) => s.toggleKind)

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 font-bold text-slate-700">動物のしゅるい</div>
        <div className="flex flex-wrap gap-3">
          {ANIMALS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => toggleAnimal(a)}
              aria-pressed={animals[a]}
              className={clsx('chip', animals[a] ? 'chip-on' : 'chip-off')}
            >
              {ANIMAL_LABEL[a]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 font-bold text-slate-700">じょうほうのしゅるい</div>
        <div className="flex flex-wrap gap-3">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => toggleKind(k)}
              aria-pressed={kinds[k]}
              className={clsx('chip', kinds[k] ? 'chip-on' : 'chip-off')}
            >
              {KIND_LABEL[k]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
