export default function Locating() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <div
        className="rounded-full border-8 border-slate-200 border-t-kuma-red animate-spin"
        style={{ width: '72px', height: '72px' }}
        aria-hidden
      />
      <p className="text-2xl font-bold text-slate-700">
        場所をさがしています
      </p>
      <p className="text-base text-slate-500">
        少しお待ちください。
      </p>
    </div>
  )
}
