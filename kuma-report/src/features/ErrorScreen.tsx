type Props = {
  message: string | null
  onRetry: () => void
  onBack: () => void
}

export default function ErrorScreen({ message, onRetry, onBack }: Props) {
  return (
    <div className="panel panel-accent flex flex-col items-center gap-6 py-10 text-center">
      <div
        className="flex items-center justify-center rounded-full font-rounded font-black text-white"
        style={{
          width: '88px',
          height: '88px',
          fontSize: '2.8rem',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #F4584C, #C2362C)',
          boxShadow: '0 12px 24px rgba(194,54,44,0.38), inset 0 2px 0 rgba(255,255,255,0.40)',
        }}
        aria-hidden
      >
        !
      </div>
      <h2 className="emboss">
        位置情報をオンに
        <br />
        してください
      </h2>
      <p className="text-bear-soft">
        スマホの設定で「位置情報」を許可して、もう一度おためしください。
      </p>
      {message && (
        <p className="text-sm text-bear-soft/70">（{message}）</p>
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
