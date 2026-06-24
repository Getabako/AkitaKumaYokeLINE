import { useGuide } from '../stores/guide'

export function BackButton() {
  const back = useGuide((s) => s.back)
  return (
    <button className="big-btn-outline" onClick={back}>
      もどる
    </button>
  )
}
