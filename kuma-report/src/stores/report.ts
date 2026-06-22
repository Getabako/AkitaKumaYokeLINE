import { create } from 'zustand'
import type { LiffProfile } from '../lib/liff'
import type { Animal, Kind } from '../lib/sightings'

export type Step = 'home' | 'locating' | 'confirm' | 'done' | 'error'

type State = {
  step: Step
  profile: LiffProfile | null
  lat: number | null
  lng: number | null
  animal: Animal
  kind: Kind
  note: string
  error: string | null
  submitting: boolean
}

type Actions = {
  setProfile: (p: LiffProfile | null) => void
  startLocating: (animal: Animal) => void
  locatingSucceeded: (lat: number, lng: number) => void
  fail: (message: string) => void
  setAnimal: (animal: Animal) => void
  setKind: (kind: Kind) => void
  setNote: (note: string) => void
  setSubmitting: (submitting: boolean) => void
  done: () => void
  reset: () => void
}

const initial: State = {
  step: 'home',
  profile: null,
  lat: null,
  lng: null,
  animal: 'bear',
  kind: 'sighting',
  note: '',
  error: null,
  submitting: false,
}

export const useReport = create<State & Actions>((set) => ({
  ...initial,
  setProfile: (profile) => set({ profile }),
  startLocating: (animal) => set({ step: 'locating', animal, error: null }),
  locatingSucceeded: (lat, lng) => set({ step: 'confirm', lat, lng }),
  fail: (error) => set({ step: 'error', error }),
  setAnimal: (animal) => set({ animal }),
  setKind: (kind) => set({ kind }),
  setNote: (note) => set({ note }),
  setSubmitting: (submitting) => set({ submitting }),
  done: () => set({ step: 'done', submitting: false }),
  reset: () => set((s) => ({ ...initial, profile: s.profile })),
}))
