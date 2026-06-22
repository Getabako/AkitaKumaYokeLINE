import { BackButton } from '../../components/BackButton'

type Action = {
  emoji: string
  text: string
}

const ACTIONS: Action[] = [
  {
    emoji: '🤫',
    text: 'さわがない・走らない。走ると 追いかけてきます（クマは とても 速いです）。',
  },
  {
    emoji: '👀',
    text: '背中を 向けない。クマを 見ながら、ゆっくり 後ろへ さがって 離れます。',
  },
  {
    emoji: '🐻',
    text: '子グマが いたら、近くに 母グマが います。すぐに その場を 離れます。',
  },
  {
    emoji: '🌶️',
    text: '熊スプレー（とうがらし）が あれば、最後の手段。鈴より 強く 追いはらえます。',
  },
  {
    emoji: '📣',
    text: '少し 離れているうちに、大きな音や 声で「人が いる」と 知らせます。',
  },
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
        {ACTIONS.map((a, i) => (
          <div key={i} className="guide-card flex items-start gap-4">
            <span className="text-5xl shrink-0">{a.emoji}</span>
            <p className="text-xl font-bold text-kuma-brown-dark">{a.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <BackButton />
      </div>
    </div>
  )
}
