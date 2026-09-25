import i18next, { type i18n as I18n } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './resources'
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  readStoredLanguage,
  resolveInitialLanguage,
  storeLanguage,
  type Language,
} from './language'

const syncDocument = (instance: I18n) => {
  document.documentElement.lang = instance.language
  document.title = instance.t('meta.title')
  document.querySelector('meta[name="description"]')?.setAttribute('content', instance.t('meta.description'))
}

export const createI18n = (): I18n => {
  const instance = i18next.createInstance()
  instance.use(initReactI18next).init({
    resources,
    lng: resolveInitialLanguage(window.location.search, readStoredLanguage()),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: { escapeValue: false },
    initImmediate: false,
  })
  instance.on('languageChanged', (lng) => {
    storeLanguage(lng as Language)
    syncDocument(instance)
  })
  syncDocument(instance)
  return instance
}
