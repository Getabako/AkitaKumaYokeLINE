import type { Animal, Kind } from './sightings'

export const ANIMAL_LABEL: Record<Animal, string> = {
  bear: 'クマ',
  boar: 'イノシシ',
  deer: 'シカ',
}

// 獣種ごとの色（絵文字の代わりに色付きの丸で見分ける）
export const ANIMAL_COLOR: Record<Animal, string> = {
  bear: '#b91c1c',
  boar: '#92400e',
  deer: '#15803d',
}

export const KIND_LABEL: Record<Kind, string> = {
  sighting: '見た（目撃）',
  trace: '足あと・あと',
  injury: '被害があった',
}

export const ANIMALS: Animal[] = ['bear', 'boar', 'deer']
export const KINDS: Kind[] = ['sighting', 'trace', 'injury']
