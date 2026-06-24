type Props = {
  onClose: () => void
}

export default function Done({ onClose }: Props) {
  return (
    <div className="flex flex-col items-center gap-7 py-12 text-center">
      <div
        className="flex items-center justify-center rounded-full bg-line-green text-white font-extrabold"
        style={{ width: '96px', height: '96px', fontSize: '3rem', lineHeight: 1 }}
        aria-hidden
      >
        OK
      </div>
      <p className="text-2xl font-extrabold text-slate-800">
        ありがとうございます
      </p>
      <p className="text-lg text-slate-600">
        近くの人にすぐ伝わります。
      </p>
      <button className="btn-primary" onClick={onClose}>
        とじる
      </button>
    </div>
  )
}
