type Props = {
  onClose: () => void
}

export default function Done({ onClose }: Props) {
  return (
    <div className="panel panel-accent flex flex-col items-center gap-6 py-12 text-center">
      <div
        className="flex items-center justify-center rounded-full bg-line-green font-rounded font-black text-white"
        style={{
          width: '96px',
          height: '96px',
          fontSize: '2.6rem',
          lineHeight: 1,
          boxShadow: '0 12px 26px rgba(6,199,85,0.40), inset 0 2px 0 rgba(255,255,255,0.45)',
        }}
        aria-hidden
      >
        OK
      </div>
      <h2 className="emboss">ありがとうございます</h2>
      <p className="text-bear-soft">
        近くの人にすぐ伝わります。
      </p>
      <button className="btn-primary" onClick={onClose}>
        とじる
      </button>
    </div>
  )
}
