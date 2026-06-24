import { useGuide } from '../../stores/guide'

export function Menu() {
  const go = useGuide((s) => s.go)
  return (
    <div className="px-5 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-kuma-brown-dark">
          クマに 遭わない
          <br />
          暮らし方
        </h1>
        <p className="mt-3 text-lg text-kuma-brown">
          見たいものを えらんでください。
        </p>
      </div>

      <div className="space-y-5">
        <button className="menu-btn" onClick={() => go('avoid')}>
          <span className="num-badge">1</span>
          <span>クマに遭わない 6つのこと</span>
        </button>

        <button className="menu-btn" onClick={() => go('meet')}>
          <span className="num-badge">2</span>
          <span>もし クマに会ったら</span>
        </button>

        <button className="menu-btn" onClick={() => go('risk')}>
          <span className="num-badge">3</span>
          <span>きょうの クマ危険度</span>
        </button>
      </div>
    </div>
  )
}
