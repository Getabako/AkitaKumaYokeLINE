import { useCallback, useEffect, useRef, useState } from 'react'
import { initLiff } from './lib/liff'
import {
  ensureAudio,
  playSiren,
  stopSiren,
  startBellMode,
  stopBellMode,
} from './lib/sound'

export default function App() {
  // ブザー（サイレン）が鳴っているか
  const [alarmOn, setAlarmOn] = useState(false)
  // 鈴モードが ON か
  const [bellOn, setBellOn] = useState(false)

  // トグル誤作動防止：pointerdown で鳴らした時に続く click を無視する
  const startedByPointer = useRef(false)

  useEffect(() => {
    // LIFF 初期化（失敗してもアプリは動く）
    initLiff().catch((e) => console.warn('LIFF init skipped:', e))
  }, [])

  // 画面を離れる・隠れるときは音を止める（鳴りっぱなし防止）
  useEffect(() => {
    return () => {
      stopSiren()
      stopBellMode()
    }
  }, [])

  const startAlarm = useCallback(async () => {
    await ensureAudio()
    playSiren()
    setAlarmOn(true)
  }, [])

  const stopAlarm = useCallback(() => {
    stopSiren()
    setAlarmOn(false)
  }, [])

  // 押している間だけ鳴らす（pointerdown 〜 pointerup）
  const handlePointerDown = useCallback(() => {
    startedByPointer.current = true
    void startAlarm()
  }, [startAlarm])

  const handlePointerUp = useCallback(() => {
    if (startedByPointer.current) {
      stopAlarm()
    }
  }, [stopAlarm])

  // タップ（click）でのトグル：押しっぱなしが難しい高齢者向けの保険。
  // pointer 操作で既に鳴らした直後の click は無視する。
  const handleClick = useCallback(() => {
    if (startedByPointer.current) {
      startedByPointer.current = false
      return
    }
    if (alarmOn) {
      stopAlarm()
    } else {
      void startAlarm()
    }
  }, [alarmOn, startAlarm, stopAlarm])

  const alarmLabel = alarmOn
    ? ['鳴っています', '（指をはなすと止まります）']
    : ['ブザーを鳴らす', '（大音量）']

  const toggleBell = useCallback(async () => {
    if (bellOn) {
      stopBellMode()
      setBellOn(false)
    } else {
      await ensureAudio()
      startBellMode(3000)
      setBellOn(true)
    }
  }, [bellOn])

  return (
    <div className="screen">
      <header className="app-header">
        <span className="brand-tag">クマ避けAKITA</span>
        <h1 className="app-title mt-2">クマ撃退ブザー</h1>
        <p className="app-sub">クマに会ったら、大音量で身を守る</p>
      </header>

      <main className="flex-1 px-5 py-6 flex flex-col gap-6">
        {/* メイン：極大の赤いブザーボタン */}
        <section className="flex flex-col gap-3">
          <h2 className="section-label">クマに会ったら、このボタン</h2>
          <button
            type="button"
            className={`btn-alarm ${alarmOn ? 'btn-alarm-on' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClick={handleClick}
            aria-pressed={alarmOn}
          >
            {alarmLabel.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </button>
          <p className="text-center text-base text-bear-soft">
            指をはなすと止まります／一度タップでも鳴ります
          </p>
        </section>

        <div className="divider" />

        {/* サブ：熊よけ鈴モード */}
        <section className="flex flex-col gap-3">
          <h2 className="section-label">歩くときの予防（熊よけ鈴）</h2>
          <button
            type="button"
            onClick={() => void toggleBell()}
            aria-pressed={bellOn}
            className={bellOn ? 'btn-primary' : 'btn-outline'}
          >
            {bellOn ? '鈴モード：オン（タップで止める）' : '鈴モードを始める'}
          </button>
          <p className="text-center text-base text-bear-soft">
            3秒ごとにチリンと鳴って、クマに人の気配を知らせます
          </p>
        </section>

        {/* 遭遇時の行動ガイド */}
        <section className="panel panel-accent flex flex-col gap-4">
          <h2 className="section-label">クマに会ったら</h2>
          <ul className="space-y-3 text-lg font-bold text-ink">
            <li className="flex gap-3">
              <span className="font-extrabold text-danger">①</span>
              <span>さわがず、おちついて</span>
            </li>
            <li className="flex gap-3">
              <span className="font-extrabold text-danger">②</span>
              <span>走らず、せなかを見せず</span>
            </li>
            <li className="flex gap-3">
              <span className="font-extrabold text-danger">③</span>
              <span>クマを見ながら、ゆっくり離れる</span>
            </li>
          </ul>
          <div className="divider my-1" />
          <p className="text-center text-base font-bold text-bear-soft">
            スマホの音量を、いちばん大きくしてください
          </p>
          <p className="text-center text-base text-bear-soft leading-relaxed">
            大きな音です。近くに人がいないか確かめてから鳴らしてください。
          </p>
        </section>

        <footer className="text-center text-sm text-bear-soft/70 pt-1 pb-6">
          クマ避けAKITA｜クマ撃退ブザー
        </footer>
      </main>
    </div>
  )
}
