import { useGuide } from '../../stores/guide'

export function Menu() {
  const go = useGuide((s) => s.go)
  return (
    <>
      <header className="app-header">
        <span className="brand-tag">クマ避けAKITA</span>
        <h1 className="app-title mt-2">クマに遭わない暮らし方</h1>
        <p className="app-sub">秋田の安心を、いつものLINEで</p>
      </header>

      <div className="px-5 py-7">
        <h2 className="section-label mb-5">見たいものを えらんでください</h2>

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
    </>
  )
}
