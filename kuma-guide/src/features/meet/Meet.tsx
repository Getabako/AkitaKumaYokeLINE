import { useGuide } from '../../stores/guide'
import { SlideCarousel } from '../../components/SlideCarousel'
import type { Slide } from '../../components/SlideCarousel'

const SLIDES: Slide[] = [
  {
    badge: '1',
    title: 'さわがない',
    body: 'さわがない・走らない。走ると追いかけてきます。まず落ち着くことがいちばん大切です。',
    cardBg: 'linear-gradient(160deg, #FFF6F4 0%, #FBE9E6 55%, #F4D7D2 100%)',
    badgeBg: 'linear-gradient(135deg, #E2483D, #C5392F)',
    titleColor: '#C5392F',
    bgImage: '/slides/meet-1.jpg',
  },
  {
    badge: '2',
    title: 'ゆっくり下がる',
    body: '背中を向けず、クマを見ながらゆっくり後ろへさがる。急な動きはしないこと。',
    cardBg: 'linear-gradient(160deg, #FFFDF7 0%, #FBF6EC 55%, #EFE6D3 100%)',
    badgeBg: 'linear-gradient(135deg, #06C755, #04a948)',
    titleColor: '#2A2320',
    bgImage: '/slides/meet-2.jpg',
  },
  {
    badge: '3',
    title: '子グマに注意',
    body: '子グマがいたら、近くに母グマがいる。とても危険です。すぐ離れましょう。',
    cardBg: 'linear-gradient(160deg, #FFF7E6 0%, #FBEFD6 55%, #F2E2BE 100%)',
    badgeBg: 'linear-gradient(135deg, #F2A900, #D98A00)',
    titleColor: '#5E4023',
    bgImage: '/slides/meet-3.jpg',
  },
  {
    badge: '4',
    title: '熊スプレー',
    body: '熊スプレーがあれば、最後の手段に使う。近づかれた時にそなえて持っておくと安心です。',
    cardBg: 'linear-gradient(160deg, #F3FBEF 0%, #E6F4DE 55%, #D6EBC9 100%)',
    badgeBg: 'linear-gradient(135deg, #3f7d4e, #2f6a3e)',
    titleColor: '#2f6a3e',
    bgImage: '/slides/meet-4.jpg',
  },
  {
    badge: '5',
    title: '知らせる',
    body: '少し離れたら、大きな音や声で人がいると知らせる。まわりの人にも危険を伝えましょう。',
    cardBg: 'linear-gradient(160deg, #FFFDF7 0%, #EAF6E2 55%, #D6EBC9 100%)',
    badgeBg: 'linear-gradient(135deg, #06C755, #F2A900)',
    titleColor: '#2f6a3e',
    bgImage: '/slides/meet-5.jpg',
  },
]

export function Meet() {
  const back = useGuide((s) => s.back)
  return (
    <>
      <header className="app-header">
        <span className="brand-tag">クマ避けAKITA</span>
        <h1 className="app-title mt-2">もしクマに会ったら</h1>
        <p className="app-sub">あわてず、この通りに</p>
      </header>

      <div className="px-4 py-7">
        <SlideCarousel slides={SLIDES} onFinish={back} />
      </div>
    </>
  )
}
