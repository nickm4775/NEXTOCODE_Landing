import pt from './locales/pt.json'
import es from './locales/es.json'
import it from './locales/it.json'
import en from './locales/en.json'
import type { Language } from './language'

export const resources: Record<Language, { translation: typeof pt }> = {
  pt: { translation: pt },
  es: { translation: es },
  it: { translation: it },
  en: { translation: en },
}
