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

// カテゴリの表示メタ情報（ラベル・色）
// 識別は色分けバッジ＋テキストで行う（絵文字は使わない）
export const CATEGORY_META: Record<
  InfoCategory,
  { label: string; color: string }
> = {
  roadblock: { label: '通行止め', color: '#ea580c' }, // オレンジ
  snow: { label: '除雪', color: '#0891b2' }, // 水色
  bus: { label: 'バス運休', color: '#7c3aed' }, // 紫
  bear: { label: 'クマ規制', color: '#dc2626' }, // 赤
}

// 秋田県内の現実的なモックデータ（各カテゴリ混在）
const MOCK: InfoItem[] = [
  {
    id: 'r1',
    category: 'roadblock',
    title: '国道46号 仙岩峠 通行止め',
    place: '仙北市 ～ 岩手県境',
    detail: '路面凍結のため終日通行止め。迂回してください。',
    lat: 39.6985,
    lng: 140.7325,
    updatedAt: '2026-06-22T07:30:00+09:00',
  },
  {
    id: 's1',
    category: 'snow',
    title: '秋田市内 幹線道路 除雪作業中',
    place: '秋田市 山王・川尻地区',
    detail: '深夜から早朝に除雪作業。路肩駐車はお控えください。',
    lat: 39.7186,
    lng: 140.1024,
    updatedAt: '2026-06-22T05:10:00+09:00',
  },
  {
    id: 'b1',
    category: 'bus',
    title: '秋北バス 大館・鷹巣線 運休',
    place: '大館市 ～ 北秋田市',
    detail: '大雪のため本日全便運休。再開は明日朝の予定。',
    lat: 40.2716,
    lng: 140.5641,
    updatedAt: '2026-06-22T06:00:00+09:00',
  },
  {
    id: 'k1',
    category: 'bear',
    title: 'クマ出没のため市道を通行止め',
    place: '北秋田市 阿仁地区',
    detail: 'クマ出没のため市道を一時通行止め。ご注意ください。',
    lat: 40.0211,
    lng: 140.4179,
    updatedAt: '2026-06-22T08:15:00+09:00',
  },
  {
    id: 'r2',
    category: 'roadblock',
    title: '県道 鳥海ブルーライン 冬季閉鎖',
    place: '由利本荘市 鳥海山',
    detail: '冬季閉鎖中。開通は春の予定です。',
    lat: 39.1011,
    lng: 140.0489,
    updatedAt: '2026-06-21T16:00:00+09:00',
  },
  {
    id: 's2',
    category: 'snow',
    title: '横手市 生活道路 排雪作業',
    place: '横手市 中央町周辺',
    detail: '排雪作業中。誘導員の指示に従ってください。',
    lat: 39.3109,
    lng: 140.5667,
    updatedAt: '2026-06-22T04:40:00+09:00',
  },
  {
    id: 'b2',
    category: 'bus',
    title: '羽後交通 湯沢・院内線 一部運休',
    place: '湯沢市 院内方面',
    detail: '道路状況により午前便運休。午後便は運行予定。',
    lat: 39.1644,
    lng: 140.4889,
    updatedAt: '2026-06-22T06:45:00+09:00',
  },
  {
    id: 'k2',
    category: 'bear',
    title: 'クマ目撃により遊歩道を閉鎖',
    place: '能代市 きみまち阪',
    detail: '親子グマの目撃あり。遊歩道と周辺道路を閉鎖中。',
    lat: 40.1869,
    lng: 140.1444,
    updatedAt: '2026-06-22T09:00:00+09:00',
  },
  {
    id: 'r3',
    category: 'roadblock',
    title: '国道105号 落石のため片側通行',
    place: '大仙市 ～ 北秋田市',
    detail: '落石のため片側交互通行。時間に余裕を持ってください。',
    lat: 39.6531,
    lng: 140.4744,
    updatedAt: '2026-06-22T07:55:00+09:00',
  },
  {
    id: 's3',
    category: 'snow',
    title: '男鹿市 海沿い道路 凍結注意',
    place: '男鹿市 船川港地区',
    detail: '夜間から早朝に路面凍結。スリップにご注意ください。',
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
