import { BackButton } from '../../components/BackButton'

const ACTIONS: string[] = [
  'さわがない・走らない。走ると追いかけてきます。',
  '背中を向けず、クマを見ながらゆっくり後ろへさがる。',
  '子グマがいたら、近くに母グマがいる。すぐ離れる。',
  '熊スプレーがあれば、最後の手段に使う。',
  '少し離れたら、大きな音や声で人がいると知らせる。',
]

export function Meet() {
  return (
    <div className="px-5 py-8">
      <h1 className="text-3xl font-bold text-kuma-brown-dark text-center mb-2">
        もし クマに
        <br />
        会ったら
      </h1>
      <p className="text-center text-lg text-kuma-brown mb-8">
        あわてず、この通りに。
      </p>

      <div className="space-y-6">
        {ACTIONS.map((text, i) => (
          <div key={i} className="guide-card flex items-start gap-4">
            <span className="num-badge">{i + 1}</span>
            <p className="text-xl font-bold text-kuma-brown-dark">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <BackButton />
      </div>
    </div>
  )
}
