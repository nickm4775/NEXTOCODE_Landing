import { useTranslation } from 'react-i18next'
import { Reveal } from '../../shared/ui/Reveal'
import { Section } from '../../shared/ui/Section'

const VALUES = ['focus', 'reliability', 'closeness'] as const

export const Values = () => {
  const { t } = useTranslation()

  return (
    <Section labelledBy="values-title">
      <Reveal>
        <h2 id="values-title" className="mb-14 text-center text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.035em]">
          {t('values.title')}
        </h2>
      </Reveal>
      <div className="grid gap-12 md:grid-cols-3 md:gap-10">
        {VALUES.map((key, i) => (
          <Reveal key={key} delay={i * 0.08} className="border-t border-(--border) pt-8">
            <h3 className="text-[28px] font-semibold tracking-[-0.03em]">{t(`values.items.${key}.title`)}</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-(--fg-muted)">{t(`values.items.${key}.text`)}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
