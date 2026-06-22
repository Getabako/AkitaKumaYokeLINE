import { create } from 'zustand'

export type Screen = 'menu' | 'avoid' | 'meet' | 'risk'

type GuideState = {
  screen: Screen
  go: (screen: Screen) => void
  back: () => void
}

export const useGuide = create<GuideState>((set) => ({
  screen: 'menu',
  go: (screen) => set({ screen }),
  back: () => set({ screen: 'menu' }),
}))
