import { useTranslation } from 'react-i18next'
import { Reveal } from '../../shared/ui/Reveal'

export const Statement = () => {
  const { t } = useTranslation()
  return (
    <section aria-label={t('statement.lead')} className="px-4 py-24 sm:px-6 md:py-40">
      <Reveal className="mx-auto max-w-4xl">
        <p className="text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.18] font-semibold tracking-[-0.03em] text-balance">
          <span className="text-(--fg)">{t('statement.lead')} </span>
          <span className="text-(--fg-muted)">{t('statement.body')}</span>
        </p>
      </Reveal>
    </section>
  )
}
