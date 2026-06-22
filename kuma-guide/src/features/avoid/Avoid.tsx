import { BackButton } from '../../components/BackButton'

type Condition = {
  no: number
  emoji: string
  title: string
  good: string
  reason: string
}

const CONDITIONS: Condition[] = [
  {
    no: 1,
    emoji: '🕐',
    title: '時間',
    good: '日中の 明るい時間に 動く。朝早く・夕方・夜は さける。',
    reason: 'クマは 朝と夕方（うすあかり）に いちばんよく動きます。夜に出る クマもいます。',
  },
  {
    no: 2,
    emoji: '🍂',
    title: '季節',
    good: '春と秋は とくに 注意。秋の ドングリが 少ない年は なおさら。',
    reason: '秋は 冬ごもり前の 食べざかり。山の実が 少ない年は、エサを さがして 里に たくさん下りてきます。',
  },
  {
    no: 3,
    emoji: '🌳',
    title: '場所',
    good: '見通しのよい 開けた道を 通る。やぶ・川ぞい・果物の木の そばは さける。',
    reason: 'やぶや 川ぞいは クマの通り道。果物や ドングリの木の下は エサ場で、ばったり 出会いやすいです。',
  },
  {
    no: 4,
    emoji: '🌧️',
    title: '天気',
    good: '晴れて 風のない日に。雨や 風の日は 山ぎわに 近づかない。',
    reason: '雨・風の日は おたがいに 気づきにくく、近くで いきなり 出会う 事故が おきやすいです。',
  },
  {
    no: 5,
    emoji: '🔔',
    title: '行動',
    good: 'ひとりで 静かに 歩かない。何人かで、音を出して 歩く。',
    reason: 'クマも 本当は 人を さけたいのです。会話・鈴・ラジオの 音で、クマが 先に 気づいて 離れます。',
  },
  {
    no: 6,
    emoji: '🏠',
    title: '家のまわり',
    good: '生ゴミ・柿・栗・コンポストを 片付ける。これが いちばん 効きます。',
    reason: 'クマを 里に 呼ぶのは「エサ」。さわった 物を なくすことが、地域で いちばん 効く クマ対策です。',
  },
]

export function Avoid() {
  return (
    <div className="px-5 py-8">
      <h1 className="text-3xl font-bold text-kuma-brown-dark text-center mb-2">
        クマに遭わない
        <br />6つのこと
      </h1>
      <p className="text-center text-lg text-kuma-brown mb-8">
        この 6つが そろうと、
        <br />
        クマに 遭いにくくなります。
      </p>

      <div className="space-y-6">
        {CONDITIONS.map((c) => (
          <div key={c.no} className="guide-card">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-5xl">{c.emoji}</span>
              <span className="text-2xl font-bold text-kuma-brown-dark">
                {c.no}. {c.title}
              </span>
            </div>
            <p className="text-xl font-bold text-kuma-brown-dark mb-3">{c.good}</p>
            <p className="text-lg text-kuma-brown bg-kuma-cream rounded-2xl p-4">
              💡 {c.reason}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <BackButton />
      </div>
    </div>
  )
}
