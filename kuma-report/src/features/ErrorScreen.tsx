type Props = {
  message: string | null
  onRetry: () => void
  onBack: () => void
}

export default function ErrorScreen({ message, onRetry, onBack }: Props) {
  return (
    <div className="flex flex-col gap-6 py-8 text-center">
      <p className="text-5xl" aria-hidden>📍</p>
      <p className="text-2xl font-bold text-slate-800">
        位置情報を
        <br />
        オンにしてください
      </p>
      <p className="text-base text-slate-500 leading-relaxed">
        いまいる場所がわからないと、おしらせできません。
        スマホの設定で「位置情報」を許可してから、もう一度おためしください。
      </p>
      {message && (
        <p className="text-sm text-slate-400">（{message}）</p>
      )}
      <button className="btn-primary" onClick={onRetry}>
        もう一度ためす
      </button>
      <button className="btn-outline" onClick={onBack}>
        最初にもどる
      </button>
    </div>
  )
}
