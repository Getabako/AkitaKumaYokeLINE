import type { Animal } from '../lib/sightings'
import { ANIMAL_COLOR } from '../lib/labels'

type Props = {
  onReport: (animal: Animal) => void
}

export default function Home({ onReport }: Props) {
  return (
    <div className="flex flex-col gap-7">
      <div className="text-center pt-2">
        <p className="text-xl font-bold text-slate-700">
          クマを見たら、すぐおしらせ
        </p>
        <p className="text-base text-slate-500 mt-2">
          ボタンを押すだけ。場所は自動でつたわります。
        </p>
      </div>

      <button className="btn-hero" onClick={() => onReport('bear')}>
        いま ここで
        <br />
        クマを見た
      </button>

      <div className="flex flex-col gap-3">
        <p className="text-base font-bold text-slate-600">クマ以外を見たとき</p>
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

      <p className="text-sm text-slate-400 text-center">
        LINEで本人確認ずみ。いたずら通報は入りにくいしくみです。
      </p>
    </div>
  )
}
