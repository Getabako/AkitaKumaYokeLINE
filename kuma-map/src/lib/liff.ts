import liff from '@line/liff'

export type LiffProfile = {
  userId: string
  displayName: string
  pictureUrl?: string
}

let initialized = false

export async function initLiff(): Promise<LiffProfile | null> {
  const liffId = import.meta.env.VITE_LIFF_ID as string | undefined
  if (!liffId) return null
  if (!initialized) {
    await liff.init({ liffId })
    initialized = true
  }
  if (!liff.isLoggedIn()) {
    liff.login()
    return null
  }
  const p = await liff.getProfile()
  return { userId: p.userId, displayName: p.displayName, pictureUrl: p.pictureUrl }
}

export function closeLiff() {
  if (initialized && liff.isInClient()) liff.closeWindow()
}
