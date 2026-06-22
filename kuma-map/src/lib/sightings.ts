// クマ出没情報のデータ契約と取得処理
//
// 取得の優先順位:
//   1. VITE_API_BASE があれば `${base}/api/sightings` から GET
//   2. 無ければ localStorage('neokuma_sightings') を読む
//   3. それも空なら秋田県内のモックを seed して返す

export type Animal = 'bear' | 'boar' | 'deer'
export type Kind = 'sighting' | 'trace' | 'injury'

export type Sighting = {
  id: string
  lat: number
  lng: number
  animal: Animal
  kind: Kind
  note?: string
  reportedAt: string // ISO8601
  confidence: number // 0〜1（うそ情報チェック後の信頼度）
  reporter?: string
}

const STORAGE_KEY = 'neokuma_sightings'

// 秋田県内の現実的な緯度経度でのモックデータ（クマ中心）
const MOCK_SIGHTINGS: Sighting[] = [
  {
    id: 'mock-1',
    lat: 39.7186,
    lng: 140.1024,
    animal: 'bear',
    kind: 'sighting',
    note: '秋田市・住宅地近くの河川敷で成獣1頭を目撃',
    reportedAt: '2026-06-22T06:40:00+09:00',
    confidence: 0.92,
    reporter: '通行人',
  },
  {
    id: 'mock-2',
    lat: 39.3107,
    lng: 140.5536,
    animal: 'bear',
    kind: 'trace',
    note: '横手市・畑のトウモロコシに食害の痕跡',
    reportedAt: '2026-06-21T18:10:00+09:00',
    confidence: 0.8,
    reporter: '農家',
  },
  {
    id: 'mock-3',
    lat: 40.2716,
    lng: 140.5642,
    animal: 'bear',
    kind: 'injury',
    note: '大館市・山菜採り中に遭遇し軽傷。病院搬送済み',
    reportedAt: '2026-06-21T08:25:00+09:00',
    confidence: 0.98,
    reporter: '消防',
  },
  {
    id: 'mock-4',
    lat: 40.2231,
    lng: 140.3705,
    animal: 'bear',
    kind: 'sighting',
    note: '北秋田市・林道で親子グマを目撃',
    reportedAt: '2026-06-20T16:55:00+09:00',
    confidence: 0.75,
    reporter: '林業従事者',
  },
  {
    id: 'mock-5',
    lat: 39.6071,
    lng: 140.7286,
    animal: 'bear',
    kind: 'sighting',
    note: '仙北市・田沢湖近くの道路を横断する1頭を確認',
    reportedAt: '2026-06-20T05:30:00+09:00',
    confidence: 0.6,
    reporter: 'ドライバー',
  },
  {
    id: 'mock-6',
    lat: 39.7553,
    lng: 140.0682,
    animal: 'boar',
    kind: 'trace',
    note: '秋田市郊外・水田のあぜに掘り返しの痕跡',
    reportedAt: '2026-06-19T19:40:00+09:00',
    confidence: 0.55,
    reporter: '住民',
  },
  {
    id: 'mock-7',
    lat: 39.4513,
    lng: 140.4892,
    animal: 'deer',
    kind: 'sighting',
    note: '美郷町付近・早朝に2頭の群れを目撃',
    reportedAt: '2026-06-19T05:05:00+09:00',
    confidence: 0.7,
    reporter: '通勤者',
  },
  {
    id: 'mock-8',
    lat: 40.1148,
    lng: 140.0019,
    animal: 'bear',
    kind: 'trace',
    note: '能代市・養蜂箱が荒らされた痕跡を確認',
    reportedAt: '2026-06-18T07:15:00+09:00',
    confidence: 0.85,
    reporter: '養蜂業者',
  },
  {
    id: 'mock-9',
    lat: 39.2876,
    lng: 140.4738,
    animal: 'bear',
    kind: 'sighting',
    note: '湯沢市・小学校の通学路付近で目撃。注意喚起中',
    reportedAt: '2026-06-18T07:00:00+09:00',
    confidence: 0.9,
    reporter: '学校関係者',
  },
  {
    id: 'mock-10',
    lat: 39.8862,
    lng: 140.3055,
    animal: 'boar',
    kind: 'sighting',
    note: '五城目町・里山のふもとで成獣を目撃',
    reportedAt: '2026-06-17T17:20:00+09:00',
    confidence: 0.65,
    reporter: '住民',
  },
]

function readFromStorage(): Sighting[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Sighting[]
    if (!Array.isArray(parsed)) return null
    return parsed
  } catch {
    return null
  }
}

function seedStorage(): Sighting[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_SIGHTINGS))
  } catch {
    // localStorage が使えない環境でもモックは返す
  }
  return MOCK_SIGHTINGS
}

export async function fetchSightings(): Promise<Sighting[]> {
  const base = import.meta.env.VITE_API_BASE as string | undefined

  if (base) {
    const res = await fetch(`${base}/api/sightings`)
    if (!res.ok) throw new Error(`出没情報の取得に失敗しました（${res.status}）`)
    return (await res.json()) as Sighting[]
  }

  const stored = readFromStorage()
  if (stored && stored.length > 0) return stored
  return seedStorage()
}
