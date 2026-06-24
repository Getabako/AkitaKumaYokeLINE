import { useGuide } from '../../stores/guide'
import { SlideCarousel } from '../../components/SlideCarousel'
import type { Slide } from '../../components/SlideCarousel'

const SLIDES: Slide[] = [
  {
    badge: '1',
    title: '時間',
    body: '明るい日中に動く。朝早く・夕方・夜はさける。クマは朝と夕方によく動きます。',
    cardBg: 'linear-gradient(160deg, #FFFDF7 0%, #FBF6EC 55%, #EFE6D3 100%)',
    badgeBg: 'linear-gradient(135deg, #06C755, #04a948)',
    titleColor: '#2A2320',
  },
  {
    badge: '2',
    title: '季節',
    body: '春と秋はとくに注意する。秋は冬ごもり前で、里に下りてきやすいです。',
    cardBg: 'linear-gradient(160deg, #FFF7E6 0%, #FBEFD6 55%, #F2E2BE 100%)',
    badgeBg: 'linear-gradient(135deg, #F2A900, #D98A00)',
    titleColor: '#5E4023',
  },
  {
    badge: '3',
    title: '場所',
    body: '開けた道を通る。やぶ・川ぞいはさける。やぶや川ぞいはクマの通り道です。',
    cardBg: 'linear-gradient(160deg, #F3FBEF 0%, #E6F4DE 55%, #D6EBC9 100%)',
    badgeBg: 'linear-gradient(135deg, #3f7d4e, #2f6a3e)',
    titleColor: '#2f6a3e',
  },
  {
    badge: '4',
    title: '天気',
    body: '雨や風の日は山ぎわに近づかない。雨・風の日はおたがい気づきにくいです。',
    cardBg: 'linear-gradient(160deg, #FFFDF7 0%, #F0F2EC 55%, #E0E4D6 100%)',
    badgeBg: 'linear-gradient(135deg, #06C755, #04a948)',
    titleColor: '#2A2320',
  },
  {
    badge: '5',
    title: '行動',
    body: '何人かで、音を出して歩く。音でクマが先に気づいて離れます。',
    cardBg: 'linear-gradient(160deg, #FBF4EA 0%, #F2E7D3 55%, #E6D5B8 100%)',
    badgeBg: 'linear-gradient(135deg, #8B5E3C, #5E4023)',
    titleColor: '#5E4023',
  },
  {
    badge: '6',
    title: '家のまわり',
    body: '生ゴミ・柿・栗を片付ける。いちばん効きます。エサをなくすのが、いちばんの対策です。',
    cardBg: 'linear-gradient(160deg, #FFFDF7 0%, #EAF6E2 55%, #D6EBC9 100%)',
    badgeBg: 'linear-gradient(135deg, #06C755, #F2A900)',
    titleColor: '#2f6a3e',
  },
]

export function Avoid() {
  const back = useGuide((s) => s.back)
  return (
    <>
      <header className="app-header">
        <span className="brand-tag">クマ避けAKITA</span>
        <h1 className="app-title mt-2">クマに遭わない6つのこと</h1>
        <p className="app-sub">この6つで、クマに遭いにくくなります</p>
      </header>

      <div className="px-4 py-7">
        <SlideCarousel slides={SLIDES} onFinish={back} />
      </div>
    </>
  )
}
