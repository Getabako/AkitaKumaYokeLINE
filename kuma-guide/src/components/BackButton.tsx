import { useGuide } from '../stores/guide'

export function BackButton() {
  const back = useGuide((s) => s.back)
  return (
    <button className="btn-outline" onClick={back}>
      メニューにもどる
    </button>
  )
}
