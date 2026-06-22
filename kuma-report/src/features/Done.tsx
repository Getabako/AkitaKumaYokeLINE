type Props = {
  onClose: () => void
}

export default function Done({ onClose }: Props) {
  return (
    <div className="flex flex-col items-center gap-7 py-12 text-center">
      <p className="text-6xl" aria-hidden>🙏</p>
      <p className="text-2xl font-extrabold text-slate-800 leading-relaxed">
        しらせてくれて
        <br />
        ありがとうございます
      </p>
      <p className="text-lg text-slate-600 leading-relaxed">
        近くの人に
        <br />
        すぐ伝わります。
      </p>
      <button className="btn-primary" onClick={onClose}>
        とじる
      </button>
    </div>
  )
}
