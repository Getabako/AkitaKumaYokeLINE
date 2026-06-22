import type { Animal } from '../lib/sightings'
import { ANIMAL_LABEL, ANIMAL_COLOR } from '../lib/labels'

const ANIMALS: Animal[] = ['bear', 'boar', 'deer']

export function Legend() {
  return (
    <div className="card">
      <div className="mb-3 font-bold text-slate-700">ピンの色のいみ</div>
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
