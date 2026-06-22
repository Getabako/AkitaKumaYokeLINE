import { useGuide } from '../../stores/guide'

export function Menu() {
  const go = useGuide((s) => s.go)
  return (
    <div className="px-5 py-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-3">🐻🌲</div>
        <h1 className="text-3xl font-bold text-kuma-brown-dark">
          クマに 遭わない
          <br />
          暮らし方
        </h1>
        <p className="mt-3 text-lg text-kuma-brown">
          おはようございます。
          <br />
          見たいものを えらんでください。
        </p>
      </div>

      <div className="space-y-5">
        <button className="menu-btn" onClick={() => go('avoid')}>
          <span className="text-4xl">📖</span>
          <span>
            クマに遭わない
            <br />6つのこと
          </span>
        </button>

        <button className="menu-btn" onClick={() => go('meet')}>
          <span className="text-4xl">⚠️</span>
          <span>
            もし
            <br />
            クマに会ったら
          </span>
        </button>

        <button className="menu-btn" onClick={() => go('risk')}>
          <span className="text-4xl">📅</span>
          <span>
            きょうの
            <br />
            クマ危険度
          </span>
        </button>
      </div>
    </div>
  )
}
