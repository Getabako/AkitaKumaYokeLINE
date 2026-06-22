export type InfoCategory = 'roadblock' | 'snow' | 'bus' | 'bear'

export type InfoItem = {
  id: string
  category: InfoCategory
  title: string
  place: string
  detail: string
  lat?: number
  lng?: number
  updatedAt: string
}

// カテゴリの表示メタ情報（絵文字・ラベル・色）
export const CATEGORY_META: Record<
  InfoCategory,
  { emoji: string; label: string; color: string }
> = {
  roadblock: { emoji: '🚧', label: '通行止め', color: '#dc2626' },
  snow: { emoji: '❄️', label: '除雪', color: '#2563eb' },
  bus: { emoji: '🚌', label: 'バス運休', color: '#7c3aed' },
  bear: { emoji: '🐻', label: 'クマ規制', color: '#b45309' },
}

// 秋田県内の現実的なモックデータ（各カテゴリ混在）
const MOCK: InfoItem[] = [
  {
    id: 'r1',
    category: 'roadblock',
    title: '国道46号 仙岩峠 通行止め',
    place: '仙北市 ～ 岩手県境',
    detail: '路面凍結のため、終日通行止めです。迂回をお願いします。',
    lat: 39.6985,
    lng: 140.7325,
    updatedAt: '2026-06-22T07:30:00+09:00',
  },
  {
    id: 's1',
    category: 'snow',
    title: '秋田市内 幹線道路 除雪作業中',
    place: '秋田市 山王・川尻地区',
    detail: '深夜から早朝にかけて除雪車が作業します。路肩への駐車はお控えください。',
    lat: 39.7186,
    lng: 140.1024,
    updatedAt: '2026-06-22T05:10:00+09:00',
  },
  {
    id: 'b1',
    category: 'bus',
    title: '秋北バス 大館・鷹巣線 運休',
    place: '大館市 ～ 北秋田市',
    detail: '大雪のため、本日の便はすべて運休します。再開は明日朝の予定です。',
    lat: 40.2716,
    lng: 140.5641,
    updatedAt: '2026-06-22T06:00:00+09:00',
  },
  {
    id: 'k1',
    category: 'bear',
    title: 'クマ出没のため市道を通行止め',
    place: '北秋田市 阿仁地区',
    detail: 'クマの出没が確認されたため、安全確保のため市道を一時通行止めにしています。',
    lat: 40.0211,
    lng: 140.4179,
    updatedAt: '2026-06-22T08:15:00+09:00',
  },
  {
    id: 'r2',
    category: 'roadblock',
    title: '県道 鳥海ブルーライン 冬季閉鎖',
    place: '由利本荘市 鳥海山',
    detail: '冬季閉鎖中です。開通は春の予定です。',
    lat: 39.1011,
    lng: 140.0489,
    updatedAt: '2026-06-21T16:00:00+09:00',
  },
  {
    id: 's2',
    category: 'snow',
    title: '横手市 生活道路 排雪作業',
    place: '横手市 中央町周辺',
    detail: '雪寄せ場が満杯のため排雪作業を行います。通行時は誘導員の指示に従ってください。',
    lat: 39.3109,
    lng: 140.5667,
    updatedAt: '2026-06-22T04:40:00+09:00',
  },
  {
    id: 'b2',
    category: 'bus',
    title: '羽後交通 湯沢・院内線 一部運休',
    place: '湯沢市 院内方面',
    detail: '道路状況により午前便を運休します。午後便は運行予定です。',
    lat: 39.1644,
    lng: 140.4889,
    updatedAt: '2026-06-22T06:45:00+09:00',
  },
  {
    id: 'k2',
    category: 'bear',
    title: 'クマ目撃により遊歩道を閉鎖',
    place: '能代市 きみまち阪',
    detail: '親子グマの目撃情報があり、遊歩道および周辺道路を閉鎖しています。',
    lat: 40.1869,
    lng: 140.1444,
    updatedAt: '2026-06-22T09:00:00+09:00',
  },
  {
    id: 'r3',
    category: 'roadblock',
    title: '国道105号 落石のため片側通行',
    place: '大仙市 ～ 北秋田市',
    detail: '落石が確認されたため片側交互通行です。通行に時間がかかる場合があります。',
    lat: 39.6531,
    lng: 140.4744,
    updatedAt: '2026-06-22T07:55:00+09:00',
  },
  {
    id: 's3',
    category: 'snow',
    title: '男鹿市 海沿い道路 凍結注意',
    place: '男鹿市 船川港地区',
    detail: '夜間から早朝にかけて路面が凍結します。スリップ事故にご注意ください。',
    lat: 39.8869,
    lng: 139.8489,
    updatedAt: '2026-06-22T05:30:00+09:00',
  },
]

export async function fetchInfo(): Promise<InfoItem[]> {
  const base = import.meta.env.VITE_API_BASE as string | undefined
  if (base) {
    const res = await fetch(`${base}/api/info`)
    if (!res.ok) throw new Error(`情報の取得に失敗しました (${res.status})`)
    return (await res.json()) as InfoItem[]
  }
  // API 未設定時はモックを返す
  return new Promise((resolve) => setTimeout(() => resolve(MOCK), 300))
}
