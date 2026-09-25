import { useTranslation } from 'react-i18next'
import { Logo } from '../../shared/brand/Logo'
import { LanguageSwitcher } from '../../shared/i18n/LanguageSwitcher'
import { useTheme } from '../../shared/theme/ThemeProvider'
import { NAV_LINKS } from '../navbar/Navbar'

export const Footer = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-(--border) bg-(--bg-alt) px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Logo tone={theme === 'dark' ? 'mono' : 'color'} className="h-6 w-auto text-(--fg)" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-(--fg-muted)">{t('footer.tagline')}</p>
        </div>
        <nav aria-label={t('footer.company')}>
          <p className="mb-4 text-xs font-semibold tracking-wide text-(--fg) uppercase">{t('footer.company')}</p>
          <ul className="grid grid-cols-2 gap-3">
            {NAV_LINKS.map((key) => (
              <li key={key}>
                <a href={`#${key}`} className="text-sm text-(--fg-muted) transition-colors hover:text-(--fg)">
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1120px] flex-col-reverse items-start justify-between gap-4 border-t border-(--border) pt-6 text-xs text-(--fg-muted) sm:flex-row sm:items-center">
        <p>
          © {year} Nextocode. {t('footer.rights')}
        </p>
        <LanguageSwitcher />
      </div>
    </footer>
  )
}
