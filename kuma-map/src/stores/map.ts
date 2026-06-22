import { create } from 'zustand'
import type { Animal, Kind, Sighting } from '../lib/sightings'
import type { LiffProfile } from '../lib/liff'

type LoadStatus = 'idle' | 'loading' | 'ready' | 'error'

type State = {
  sightings: Sighting[]
  status: LoadStatus
  error: string | null
  profile: LiffProfile | null
  // フィルタ：オンになっている獣種・種別のみ表示
  animals: Record<Animal, boolean>
  kinds: Record<Kind, boolean>
}

type Actions = {
  setProfile: (p: LiffProfile | null) => void
  setLoading: () => void
  setSightings: (list: Sighting[]) => void
  fail: (msg: string) => void
  toggleAnimal: (a: Animal) => void
  toggleKind: (k: Kind) => void
}

const initial: State = {
  sightings: [],
  status: 'idle',
  error: null,
  profile: null,
  animals: { bear: true, boar: true, deer: true },
  kinds: { sighting: true, trace: true, injury: true },
}

export const useMap = create<State & Actions>((set) => ({
  ...initial,
  setProfile: (profile) => set({ profile }),
  setLoading: () => set({ status: 'loading', error: null }),
  setSightings: (sightings) => set({ sightings, status: 'ready', error: null }),
  fail: (error) => set({ status: 'error', error }),
  toggleAnimal: (a) =>
    set((s) => ({ animals: { ...s.animals, [a]: !s.animals[a] } })),
  toggleKind: (k) =>
    set((s) => ({ kinds: { ...s.kinds, [k]: !s.kinds[k] } })),
}))

// フィルタ適用後の出没情報を返すセレクタ
export function selectVisibleSightings(s: State): Sighting[] {
  return s.sightings.filter(
    (item) => s.animals[item.animal] && s.kinds[item.kind],
  )
}
