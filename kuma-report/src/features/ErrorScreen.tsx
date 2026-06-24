type Props = {
  message: string | null
  onRetry: () => void
  onBack: () => void
}

export default function ErrorScreen({ message, onRetry, onBack }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <div
        className="flex items-center justify-center rounded-full border-4 border-kuma-red text-kuma-red font-extrabold"
        style={{ width: '88px', height: '88px', fontSize: '3rem', lineHeight: 1 }}
        aria-hidden
      >
        !
      </div>
      <p className="text-2xl font-bold text-slate-800">
        位置情報をオンに
        <br />
        してください
      </p>
      <p className="text-base text-slate-500">
        スマホの設定で「位置情報」を許可して、もう一度おためしください。
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
