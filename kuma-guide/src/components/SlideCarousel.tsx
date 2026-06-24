import { useRef, useState } from 'react'
import type { ReactNode } from 'react'

export type Slide = {
  /** スライド上部に出す大きな番号や記号 */
  badge: string
  title: string
  body: string
  /** カード背景（クリーム/緑/茶などのグラデ）。CSSの background 値 */
  cardBg: string
  /** 番号バッジの背景。CSSの background 値 */
  badgeBg: string
  /** 見出しの文字色 */
  titleColor: string
}

type Props = {
  slides: Slide[]
  /** 最後のスライドで出す「メニューにもどる」ボタン */
  onFinish: () => void
}

// ドラッグで「次へ」と判定する移動量のしきい値(px)
const SWIPE_THRESHOLD = 60

export function SlideCarousel({ slides, onFinish }: Props): ReactNode {
  const [index, setIndex] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragDx, setDragDx] = useState(0)

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const startXRef = useRef(0)
  const pointerActiveRef = useRef(false)

  const last = slides.length - 1
  const clamp = (i: number): number => Math.max(0, Math.min(last, i))

  const goTo = (i: number): void => setIndex(clamp(i))
  const prev = (): void => goTo(index - 1)
  const next = (): void => goTo(index + 1)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    pointerActiveRef.current = true
    startXRef.current = e.clientX
    setDragging(true)
    setDragDx(0)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!pointerActiveRef.current) return
    setDragDx(e.clientX - startXRef.current)
  }

  const endDrag = (): void => {
    if (!pointerActiveRef.current) return
    pointerActiveRef.current = false
    const dx = dragDx
    setDragging(false)
    setDragDx(0)
    if (dx <= -SWIPE_THRESHOLD) next()
    else if (dx >= SWIPE_THRESHOLD) prev()
  }

  // 窓幅に対するドラッグ量の割合（%）。トラックを指に追従させる。
  const width = viewportRef.current?.clientWidth ?? 1
  const dragPercent = dragging ? (dragDx / width) * 100 : 0
  const translate = -index * 100 + dragPercent

  return (
    <div className="flex flex-col">
      <div
        ref={viewportRef}
        className="carousel-viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          className={`carousel-track${dragging ? ' is-dragging' : ''}`}
          style={{ transform: `translateX(${translate}%)` }}
        >
          {slides.map((s, i) => (
            <div className="carousel-slide" key={i} aria-hidden={i !== index}>
              <div className="slide-card" style={{ background: s.cardBg }}>
                <span
                  className="slide-badge"
                  style={{ background: s.badgeBg }}
                >
                  {s.badge}
                </span>
                <h2 className="slide-title mt-6" style={{ color: s.titleColor }}>
                  {s.title}
                </h2>
                <div className="divider" />
                <p className="slide-body text-ink">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ドットインジケータ */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${i + 1}枚目へ`}
            className={`dot${i === index ? ' dot-on' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* 前へ／次へ */}
      <div className="mt-5 flex items-stretch gap-3">
        <button
          type="button"
          className="nav-btn flex-1"
          onClick={prev}
          disabled={index === 0}
        >
          前へ
        </button>
        {index < last ? (
          <button type="button" className="nav-btn flex-1" onClick={next}>
            次へ
          </button>
        ) : (
          <button type="button" className="btn-primary flex-1" onClick={onFinish}>
            メニューにもどる
          </button>
        )}
      </div>
    </div>
  )
}
