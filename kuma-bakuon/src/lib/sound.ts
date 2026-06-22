// Web Audio API による警報音・鈴音の合成。
// 音声ファイルを一切使わないため、オフラインでも鳴る。
// iOS / モバイル対策として、AudioContext はユーザー操作（タップ）で
// 生成し、必ず resume() してから鳴らす。

type WindowWithWebkitAudio = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext
  }

let ctx: AudioContext | null = null

// サイレン用のノードを保持して stop 時に確実に止める
let sirenOsc: OscillatorNode | null = null
let sirenSubOsc: OscillatorNode | null = null
let sirenGain: GainNode | null = null
let sirenLfo: OscillatorNode | null = null
let sirenLfoGain: GainNode | null = null

// 鈴モードの繰り返しタイマー
let bellTimer: ReturnType<typeof setInterval> | null = null

/**
 * AudioContext を取得（無ければ生成）し resume する。
 * 必ずユーザー操作のハンドラ内から呼ぶこと。
 */
export async function ensureAudio(): Promise<AudioContext> {
  if (!ctx) {
    const w = window as WindowWithWebkitAudio
    const Ctor: typeof AudioContext = w.AudioContext ?? w.webkitAudioContext!
    ctx = new Ctor()
  }
  if (ctx.state === 'suspended') {
    await ctx.resume()
  }
  return ctx
}

/**
 * 大音量のサイレン警報を鳴らし続ける。
 * 矩形波の主音 + 1オクターブ下の補強音を、LFO で「ピーポー」と
 * 上下にスイープさせる。GainNode で音量はほぼ最大。
 */
export function playSiren(): void {
  if (!ctx) return
  // 既に鳴っていれば一旦止める
  stopSiren()

  const now = ctx.currentTime

  // 出力ゲイン（耳障りで遠くまで届くよう大きめ。0.9）
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.9, now + 0.05)
  gain.connect(ctx.destination)

  // 主オシレーター（矩形波＝倍音が豊富で鋭く通る）
  const osc = ctx.createOscillator()
  osc.type = 'square'
  osc.frequency.setValueAtTime(900, now)

  // 補強オシレーター（1オクターブ下。厚みと遠達性を足す）
  const sub = ctx.createOscillator()
  sub.type = 'square'
  sub.frequency.setValueAtTime(450, now)

  // LFO で周波数を上下させ「ピーポー」サイレンにする
  const lfo = ctx.createOscillator()
  lfo.type = 'sine'
  lfo.frequency.setValueAtTime(2, now) // 1秒に2回上下

  const lfoGain = ctx.createGain()
  lfoGain.gain.setValueAtTime(450, now) // ±450Hz スイープ
  lfo.connect(lfoGain)
  lfoGain.connect(osc.frequency)
  lfoGain.connect(sub.frequency)

  osc.connect(gain)
  sub.connect(gain)

  osc.start(now)
  sub.start(now)
  lfo.start(now)

  sirenOsc = osc
  sirenSubOsc = sub
  sirenGain = gain
  sirenLfo = lfo
  sirenLfoGain = lfoGain
}

/** サイレンを止める（フェードアウトしてノードを破棄）。 */
export function stopSiren(): void {
  if (!ctx) return
  const now = ctx.currentTime

  if (sirenGain) {
    try {
      sirenGain.gain.cancelScheduledValues(now)
      sirenGain.gain.setValueAtTime(sirenGain.gain.value, now)
      sirenGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)
    } catch {
      // 値が 0 等で ramp できなくても無視
    }
  }

  const stopAt = now + 0.1
  for (const node of [sirenOsc, sirenSubOsc, sirenLfo]) {
    if (node) {
      try {
        node.stop(stopAt)
      } catch {
        // 既に停止済みなら無視
      }
    }
  }

  sirenOsc = null
  sirenSubOsc = null
  sirenLfo = null
  sirenGain = null
  sirenLfoGain = null
}

/**
 * 「チリン」と一度だけ鳴る鈴音。短い減衰する正弦波を重ねる。
 */
export function playBellOnce(): void {
  if (!ctx) return
  const now = ctx.currentTime

  // 鈴らしい高めの倍音を2つ重ねる
  const partials = [
    { freq: 2200, gain: 0.5 },
    { freq: 3300, gain: 0.25 },
  ]

  for (const p of partials) {
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(p.freq, now)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(p.gain, now + 0.005)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 1.0)
  }
}

/**
 * 鈴モード開始。一定間隔で鈴を鳴らし続ける（歩行中の予防用）。
 * @param intervalMs 鳴らす間隔（ミリ秒）
 */
export function startBellMode(intervalMs = 3000): void {
  stopBellMode()
  playBellOnce() // 押した瞬間に1回鳴らす
  bellTimer = setInterval(() => {
    playBellOnce()
  }, intervalMs)
}

/** 鈴モード停止。 */
export function stopBellMode(): void {
  if (bellTimer !== null) {
    clearInterval(bellTimer)
    bellTimer = null
  }
}
