import type { Animal, Kind } from './sightings'

export const ANIMAL_LABEL: Record<Animal, string> = {
  bear: 'クマ',
  boar: 'イノシシ',
  deer: 'シカ',
}

export const ANIMAL_EMOJI: Record<Animal, string> = {
  bear: '🐻',
  boar: '🐗',
  deer: '🦌',
}

export const KIND_LABEL: Record<Kind, string> = {
  sighting: '見た（目撃）',
  trace: '足あと・あと',
  injury: '被害があった',
}

export const ANIMALS: Animal[] = ['bear', 'boar', 'deer']
export const KINDS: Kind[] = ['sighting', 'trace', 'injury']
