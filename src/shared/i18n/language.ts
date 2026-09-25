export const SUPPORTED_LANGUAGES = ['pt', 'es', 'it', 'en'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: Language = 'pt'
export const LANGUAGE_STORAGE_KEY = 'nextocode.lang'

export const LANGUAGE_LABELS: Record<Language, string> = {
  pt: 'Português',
  es: 'Español',
  it: 'Italiano',
  en: 'English',
}

const normalize = (value: string | null | undefined): Language | null => {
  if (!value) return null
  const base = value.toLowerCase().split('-')[0]
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(base) ? (base as Language) : null
}

/** Query param wins (shareable links), then the stored choice, then Portuguese. */
export const resolveInitialLanguage = (search: string, stored: string | null): Language =>
  normalize(new URLSearchParams(search).get('lang')) ?? normalize(stored) ?? DEFAULT_LANGUAGE

export const readStoredLanguage = (): string | null => {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY)
  } catch {
    return null
  }
}

export const storeLanguage = (lng: Language) => {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lng)
  } catch {
    /* storage unavailable: keep the in-memory choice */
  }
}
