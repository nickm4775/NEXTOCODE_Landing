import { useTranslation } from 'react-i18next'
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type Language } from './language'

type Props = { className?: string }

/**
 * Compact trigger (globe + code) with the native <select> stretched invisibly on top:
 * keeps native keyboard/screen-reader behavior without the select sizing to its longest option.
 */
export const LanguageSwitcher = ({ className = '' }: Props) => {
  const { i18n, t } = useTranslation()
  const current = i18n.resolvedLanguage as Language

  return (
    <label
      className={`relative inline-flex h-8 items-center gap-1.5 rounded-full px-2 text-xs font-medium tracking-wide text-(--fg-muted) transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-(--accent) hover:bg-(--surface-2) hover:text-(--fg) ${className}`}
    >
      <span className="sr-only">{t('nav.language')}</span>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.75 5.7 3.75 9S14.5 18.3 12 21M12 3C9.5 5.7 8.25 8.7 8.25 12S9.5 18.3 12 21" />
      </svg>
      <span aria-hidden="true">{current.toUpperCase()}</span>
      <select
        value={current}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="absolute inset-0 cursor-pointer appearance-none opacity-0"
      >
        {SUPPORTED_LANGUAGES.map((lng) => (
          <option key={lng} value={lng}>
            {LANGUAGE_LABELS[lng]}
          </option>
        ))}
      </select>
    </label>
  )
}
