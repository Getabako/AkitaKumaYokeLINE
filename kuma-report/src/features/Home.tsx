import type { Animal } from '../lib/sightings'
import { ANIMAL_COLOR } from '../lib/labels'

type Props = {
  onReport: (animal: Animal) => void
}

export default function Home({ onReport }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center pt-1">
        <h2 className="emboss">クマを見たら、すぐおしらせ</h2>
        <p className="mt-2 text-bear-soft">
          ボタンを押すだけ。場所は自動でつたわります。
        </p>
      </div>

      <button className="btn-hero" onClick={() => onReport('bear')}>
        いま ここで
        <br />
        クマを見た
      </button>

      <div className="divider" />

      <div className="flex flex-col gap-3">
        <h2 className="section-label">クマ以外を見たとき</h2>
        <button className="btn-outline flex items-center justify-center gap-3" onClick={() => onReport('boar')}>
          <span
            className="inline-block rounded-full"
            style={{ width: '16px', height: '16px', backgroundColor: ANIMAL_COLOR.boar }}
            aria-hidden
          />
          イノシシを見た
        </button>
        <button className="btn-outline flex items-center justify-center gap-3" onClick={() => onReport('deer')}>
          <span
            className="inline-block rounded-full"
            style={{ width: '16px', height: '16px', backgroundColor: ANIMAL_COLOR.deer }}
            aria-hidden
          />
          シカを見た
        </button>
      </div>

      <p className="text-center text-sm text-bear-soft/80">
        LINEで本人確認ずみ。いたずら通報は入りにくいしくみです。
      </p>
    </div>
  )
}
