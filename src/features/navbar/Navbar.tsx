import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Logo } from '../../shared/brand/Logo'
import { LanguageSwitcher } from '../../shared/i18n/LanguageSwitcher'
import { ThemeToggle } from '../../shared/theme/ThemeToggle'
import { useTheme } from '../../shared/theme/ThemeProvider'
import { Button } from '../../shared/ui/Button'

export const NAV_LINKS = ['products', 'services', 'approach', 'contact'] as const

export const Navbar = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const logoTone = theme === 'dark' ? 'mono' : 'color'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 ${
        scrolled || open ? 'border-(--border) bg-(--nav-bg)' : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-[1120px] items-center justify-between gap-4 px-4 sm:px-6" aria-label="Main">
        <a href="#top" aria-label={t('nav.home')} className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent)">
          <Logo tone={logoTone} className="hidden h-[18px] w-auto text-(--fg) sm:block" title="Nextocode" />
          <Logo kind="isotype" tone={logoTone} className="size-7 text-(--fg) sm:hidden" title="Nextocode" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((key) => (
            <li key={key}>
              <a href={`#${key}`} className="text-[13px] text-(--fg-muted) transition-colors hover:text-(--fg)">
                {t(`nav.${key}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher />
          <ThemeToggle labels={{ toDark: t('nav.toDark'), toLight: t('nav.toLight') }} />
          <Button href="#contact" size="sm" className="ml-1 hidden sm:inline-flex">
            {t('nav.cta')}
          </Button>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full text-(--fg) md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 9h16M4 15h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-(--border) px-4 pt-4 pb-8 md:hidden"
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map((key) => (
            <li key={key}>
              <a
                href={`#${key}`}
                onClick={() => setOpen(false)}
                className="block py-3 text-2xl font-semibold tracking-tight text-(--fg)"
              >
                {t(`nav.${key}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
