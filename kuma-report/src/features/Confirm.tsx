import clsx from 'clsx'
import MapPreview from './MapPreview'
import type { Animal, Kind } from '../lib/sightings'
import { ANIMALS, KINDS, ANIMAL_LABEL, ANIMAL_COLOR, KIND_LABEL } from '../lib/labels'

type Props = {
  lat: number
  lng: number
  animal: Animal
  kind: Kind
  note: string
  submitting: boolean
  onAnimal: (a: Animal) => void
  onKind: (k: Kind) => void
  onNote: (note: string) => void
  onSubmit: () => void
  onBack: () => void
}

export default function Confirm({
  lat,
  lng,
  animal,
  kind,
  note,
  submitting,
  onAnimal,
  onKind,
  onNote,
  onSubmit,
  onBack,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="section-label">いまいる場所</h2>
        <MapPreview lat={lat} lng={lng} />
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-3">
        <h2 className="section-label">何を見ましたか？</h2>
        <div className="grid grid-cols-3 gap-3">
          {ANIMALS.map((a) => (
            <button
              key={a}
              className={clsx('btn-choice flex flex-col items-center justify-center gap-2', a === animal && 'btn-choice-active')}
              onClick={() => onAnimal(a)}
            >
              <span
                className="inline-block rounded-full"
                style={{ width: '20px', height: '20px', backgroundColor: ANIMAL_COLOR[a] }}
                aria-hidden
              />
              {ANIMAL_LABEL[a]}
            </button>
          ))}
        </div>
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-3">
        <h2 className="section-label">どんなようすですか？</h2>
        <div className="flex flex-col gap-3">
          {KINDS.map((k) => (
            <button
              key={k}
              className={clsx('btn-choice', k === kind && 'btn-choice-active')}
              onClick={() => onKind(k)}
            >
              {KIND_LABEL[k]}
            </button>
          ))}
        </div>
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-3">
        <label htmlFor="note" className="section-label">
          ひとこと（任意）
        </label>
        <textarea
          id="note"
          className="note-input"
          placeholder="例：田んぼのそばにいました"
          value={note}
          onChange={(e) => onNote(e.target.value)}
        />
      </div>

      <button className="btn-primary" style={{ minHeight: '76px', fontSize: '1.35rem' }} onClick={onSubmit} disabled={submitting}>
        {submitting ? '送信しています…' : 'この内容でしらせる'}
      </button>

      <button className="btn-outline" onClick={onBack} disabled={submitting}>
        やめて最初にもどる
      </button>

      <p className="text-center text-sm text-bear-soft/80">
        LINEで本人確認ずみ。いたずら通報は入りにくいしくみです。
      </p>
    </div>
  )
}
