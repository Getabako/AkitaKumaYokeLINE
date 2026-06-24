import type { Animal } from '../lib/sightings'
import { ANIMAL_LABEL, ANIMAL_COLOR } from '../lib/labels'

const ANIMALS: Animal[] = ['bear', 'boar', 'deer']

export function Legend() {
  return (
    <div className="panel space-y-3">
      <h2 className="section-label">ピンの色のいみ</h2>
      <div className="flex flex-wrap gap-x-8 gap-y-3">
        {ANIMALS.map((a) => (
          <div key={a} className="flex items-center gap-3">
            <span
              className="inline-block h-7 w-7 rounded-full border-[3px] border-white shadow"
              style={{ backgroundColor: ANIMAL_COLOR[a] }}
              aria-hidden
            />
            <span className="font-bold">{ANIMAL_LABEL[a]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
