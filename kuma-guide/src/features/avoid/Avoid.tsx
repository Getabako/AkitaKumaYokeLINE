import { BackButton } from '../../components/BackButton'

type Condition = {
  no: number
  title: string
  good: string
  reason: string
}

const CONDITIONS: Condition[] = [
  {
    no: 1,
    title: '時間',
    good: '明るい日中に動く。朝早く・夕方・夜はさける。',
    reason: 'クマは朝と夕方によく動きます。',
  },
  {
    no: 2,
    title: '季節',
    good: '春と秋はとくに注意する。',
    reason: '秋は冬ごもり前で、里に下りてきやすいです。',
  },
  {
    no: 3,
    title: '場所',
    good: '開けた道を通る。やぶ・川ぞいはさける。',
    reason: 'やぶや川ぞいはクマの通り道です。',
  },
  {
    no: 4,
    title: '天気',
    good: '雨や風の日は山ぎわに近づかない。',
    reason: '雨・風の日はおたがい気づきにくいです。',
  },
  {
    no: 5,
    title: '行動',
    good: '何人かで、音を出して歩く。',
    reason: '音でクマが先に気づいて離れます。',
  },
  {
    no: 6,
    title: '家のまわり',
    good: '生ゴミ・柿・栗を片付ける。いちばん効きます。',
    reason: 'エサをなくすのが、いちばんの対策です。',
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
        この6つで、クマに遭いにくくなります。
      </p>

      <div className="space-y-6">
        {CONDITIONS.map((c) => (
          <div key={c.no} className="guide-card">
            <div className="flex items-center gap-3 mb-3">
              <span className="num-badge">{c.no}</span>
              <span className="text-2xl font-bold text-kuma-brown-dark">
                {c.title}
              </span>
            </div>
            <p className="text-xl font-bold text-kuma-brown-dark mb-3">{c.good}</p>
            <p className="text-lg text-kuma-brown bg-kuma-cream rounded-2xl p-4">
              {c.reason}
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
