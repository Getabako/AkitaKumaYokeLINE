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
    <div className="min-h-screen max-w-md mx-auto bg-white text-slate-800 flex flex-col">
      {/* 上部：音量アップの案内 */}
      <header className="bg-amber-100 text-amber-900 px-5 py-4 text-center font-bold">
        スマホの音量を、いちばん大きくしてください
      </header>

      <main className="flex-1 px-5 py-6 flex flex-col gap-7">
        {/* メイン：極大の赤いブザーボタン */}
        <section>
          <p className="text-center text-xl font-bold mb-4">
            クマに会ったら、このボタン
          </p>
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
          <p className="text-center text-base text-slate-500 mt-3">
            指をはなすと止まります／一度タップでも鳴ります
          </p>
        </section>

        {/* サブ：熊よけ鈴モード */}
        <section>
          <p className="text-center text-lg font-bold mb-3">
            歩くときの予防（熊よけ鈴）
          </p>
          <button
            type="button"
            onClick={() => void toggleBell()}
            aria-pressed={bellOn}
            className={`btn-bell ${
              bellOn
                ? 'bg-line-green text-white border-line-green-dark'
                : 'bg-white text-line-green border-line-green'
            }`}
          >
            {bellOn ? '鈴モード：オン（タップで止める）' : '鈴モードを始める'}
          </button>
          <p className="text-center text-base text-slate-500 mt-3">
            3秒ごとにチリンと鳴って、クマに人の気配を知らせます
          </p>
        </section>

        {/* 遭遇時の行動ガイド（大きく） */}
        <section className="card bg-red-50 border-2 border-red-200">
          <h2 className="text-xl font-extrabold text-red-700 mb-4">
            クマに会ったら
          </h2>
          <ul className="space-y-4 text-lg font-bold">
            <li className="flex gap-3">
              <span className="text-red-600">①</span>
              <span>さわがず、おちついて</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-600">②</span>
              <span>走らず、せなかを見せず</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-600">③</span>
              <span>クマを見ながら、ゆっくり離れる</span>
            </li>
          </ul>
        </section>

        {/* 人への注意 */}
        <section className="text-center text-base text-slate-600 leading-relaxed">
          大きな音です。近くに人がいないか確かめてから鳴らしてください。
        </section>

        <footer className="text-center text-sm text-slate-400 pt-2 pb-6">
          あきた見守り｜クマ撃退ブザー
        </footer>
      </main>
    </div>
  )
}
