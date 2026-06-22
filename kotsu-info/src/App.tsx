import { useEffect } from 'react'
import { initLiff } from './lib/liff'
import { InfoView } from './features/info/InfoView'

export default function App() {
  useEffect(() => {
    // LIFF 初期化（失敗してもアプリは動作する）
    initLiff().catch((e) => console.warn('LIFF init skipped:', e))
  }, [])

  return <InfoView />
}
