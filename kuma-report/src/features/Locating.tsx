export default function Locating() {
  return (
    <div className="panel panel-accent flex flex-col items-center justify-center gap-6 py-16 text-center">
      <div
        className="rounded-full border-8 border-cream-deep border-t-line-green animate-spin"
        style={{ width: '72px', height: '72px' }}
        aria-hidden
      />
      <h2 className="emboss">場所をさがしています</h2>
      <p className="text-bear-soft">
        少しお待ちください。
      </p>
    </div>
  )
}
