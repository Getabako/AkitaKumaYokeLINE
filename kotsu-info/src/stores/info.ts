import { create } from 'zustand'
import type { InfoCategory, InfoItem } from '../lib/info'

// 'all' は全カテゴリ表示
export type Filter = InfoCategory | 'all'

type State = {
  items: InfoItem[]
  loading: boolean
  error: string | null
  filter: Filter
  selectedId: string | null
}

type Actions = {
  setItems: (items: InfoItem[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilter: (filter: Filter) => void
  select: (id: string | null) => void
}

export const useInfo = create<State & Actions>((set) => ({
  items: [],
  loading: true,
  error: null,
  filter: 'all',
  selectedId: null,
  setItems: (items) => set({ items }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilter: (filter) => set({ filter }),
  select: (selectedId) => set({ selectedId }),
}))
