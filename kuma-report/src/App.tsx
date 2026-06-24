import { useEffect } from 'react'
import { initLiff, closeLiff } from './lib/liff'
import { submitSighting } from './lib/sightings'
import type { Animal } from './lib/sightings'
import { useReport } from './stores/report'
import Home from './features/Home'
import Locating from './features/Locating'
import Confirm from './features/Confirm'
import Done from './features/Done'
import ErrorScreen from './features/ErrorScreen'

export default function App() {
  const {
    step,
    profile,
    lat,
    lng,
    animal,
    kind,
    note,
    error,
    submitting,
    setProfile,
    startLocating,
    locatingSucceeded,
    fail,
    setAnimal,
    setKind,
    setNote,
    setSubmitting,
    done,
    reset,
  } = useReport()

  // LIFF 初期化（失敗してもアプリは動く）
  useEffect(() => {
    initLiff()
      .then((p) => {
        if (p) setProfile(p)
      })
      .catch(() => {
        // 本人確認できなくても利用可能にする
      })
  }, [setProfile])

  // 現在地を取得
  function locate(selected: Animal) {
    startLocating(selected)
    if (!('geolocation' in navigator)) {
      fail('このスマホは位置情報に対応していません')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        locatingSucceeded(pos.coords.latitude, pos.coords.longitude)
      },
      () => {
        fail('位置情報がオフになっています')
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    )
  }

  async function handleSubmit() {
    if (lat == null || lng == null) {
      fail('位置情報がうまく取れませんでした')
      return
    }
    setSubmitting(true)
    try {
      await submitSighting(
        { lat, lng, animal, kind, note: note.trim() || undefined },
        profile?.displayName,
      )
      done()
    } catch {
      setSubmitting(false)
      fail('送信できませんでした。電波のよい場所でもう一度おためしください')
    }
  }

  // done 画面は 3 秒後に自動で閉じる
  useEffect(() => {
    if (step !== 'done') return
    const t = setTimeout(() => closeLiff(), 3000)
    return () => clearTimeout(t)
  }, [step])

  return (
    <div className="screen">
      <header className="app-header">
        <span className="brand-tag">クマ避けAKITA</span>
        <h1 className="app-title mt-2">クマ目撃をしらせる</h1>
        <p className="app-sub">秋田の安心を、いつものLINEで</p>
      </header>

      <main className="flex-1 px-5 py-6">
        {step === 'home' && <Home onReport={locate} />}
        {step === 'locating' && <Locating />}
        {step === 'confirm' && lat != null && lng != null && (
          <Confirm
            lat={lat}
            lng={lng}
            animal={animal}
            kind={kind}
            note={note}
            submitting={submitting}
            onAnimal={setAnimal}
            onKind={setKind}
            onNote={setNote}
            onSubmit={handleSubmit}
            onBack={reset}
          />
        )}
        {step === 'done' && <Done onClose={closeLiff} />}
        {step === 'error' && (
          <ErrorScreen
            message={error}
            onRetry={() => locate(animal)}
            onBack={reset}
          />
        )}
      </main>
    </div>
  )
}
