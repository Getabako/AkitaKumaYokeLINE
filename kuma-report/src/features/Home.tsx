import type { Animal } from '../lib/sightings'
import { ANIMAL_EMOJI } from '../lib/labels'

type Props = {
  onReport: (animal: Animal) => void
}

export default function Home({ onReport }: Props) {
  return (
    <div className="flex flex-col gap-7">
      <div className="text-center pt-2">
        <p className="text-xl font-bold text-slate-700">
          {ANIMAL_EMOJI.bear} クマを見たら、すぐおしらせ
        </p>
        <p className="text-base text-slate-500 mt-2">
          ボタンを押すだけ。いまいる場所が自動でつたわります。
        </p>
      </div>

      <button className="btn-hero" onClick={() => onReport('bear')}>
        いま ここで
        <br />
        クマを見た
      </button>

      <div className="flex flex-col gap-3">
        <p className="text-base font-bold text-slate-600">クマ以外を見たとき</p>
        <button className="btn-outline" onClick={() => onReport('boar')}>
          {ANIMAL_EMOJI.boar} イノシシを見た
        </button>
        <button className="btn-outline" onClick={() => onReport('deer')}>
          {ANIMAL_EMOJI.deer} シカを見た
        </button>
      </div>

      <p className="text-sm text-slate-400 text-center leading-relaxed">
        LINEで本人確認しているので、
        <br />
        いたずら通報は入りにくいしくみです。
      </p>
    </div>
  )
}
