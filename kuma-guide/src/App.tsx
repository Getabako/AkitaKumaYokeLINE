import { useEffect } from 'react'
import { initLiff } from './lib/liff'
import { useGuide } from './stores/guide'
import { Menu } from './features/menu/Menu'
import { Avoid } from './features/avoid/Avoid'
import { Meet } from './features/meet/Meet'
import { Risk } from './features/risk/Risk'

export default function App() {
  const screen = useGuide((s) => s.screen)

  useEffect(() => {
    // ベストエフォート: LIFF初期化に失敗してもアプリは動く
    initLiff().catch((e) => console.warn('LIFF init skipped:', e))
  }, [])

  return (
    <div className="screen">
      {screen === 'menu' && <Menu />}
      {screen === 'avoid' && <Avoid />}
      {screen === 'meet' && <Meet />}
      {screen === 'risk' && <Risk />}
    </div>
  )
}
