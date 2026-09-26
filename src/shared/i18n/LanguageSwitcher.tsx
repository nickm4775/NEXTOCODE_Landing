import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flag } from './Flag'
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type Language } from './language'

type Props = { className?: string }

/**
 * Flag-only disclosure menu. Flags are decorative (aria-hidden); every button
 * carries the language name as its accessible label.
 */
export const LanguageSwitcher = ({ className = '' }: Props) => {
  const { i18n, t } = useTranslation()
  const current = i18n.resolvedLanguage as Language
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      triggerRef.current?.focus()
    }
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const select = (lng: Language) => {
    i18n.changeLanguage(lng)
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t('nav.language')}: ${LANGUAGE_LABELS[current]}`}
        onClick={() => setOpen((v) => !v)}
        className="grid size-8 place-items-center rounded-full transition-colors hover:bg-(--surface-2) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
      >
        <Flag lng={current} />
      </button>

      {open && (
        <ul
          id={menuId}
          className="absolute right-0 top-full z-10 mt-2 flex flex-col gap-1 rounded-2xl bg-(--surface) p-1.5 shadow-lg ring-1 ring-(--border)"
        >
          {SUPPORTED_LANGUAGES.map((lng) => (
            <li key={lng}>
              <button
                type="button"
                lang={lng}
                aria-label={LANGUAGE_LABELS[lng]}
                aria-current={lng === current ? 'true' : undefined}
                onClick={() => select(lng)}
                className={`grid size-9 place-items-center rounded-xl transition-colors hover:bg-(--surface-2) focus-visible:outline-2 focus-visible:outline-(--accent) ${
                  lng === current ? 'bg-(--surface-2)' : ''
                }`}
              >
                <Flag lng={lng} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
