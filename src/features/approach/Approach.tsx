import { useTranslation } from 'react-i18next'
import { Reveal } from '../../shared/ui/Reveal'
import { Section, SectionHeading } from '../../shared/ui/Section'

const STEPS = ['discover', 'design', 'build', 'evolve'] as const

export const Approach = () => {
  const { t } = useTranslation()

  return (
    <Section id="approach" alt labelledBy="approach-title">
      <Reveal>
        <SectionHeading id="approach-title" eyebrow={t('approach.eyebrow')} title={t('approach.title')} />
      </Reveal>

      <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
        {STEPS.map((key, i) => (
          <Reveal as="li" key={key} delay={i * 0.08} className="relative">
            <div className="mb-6 flex items-center gap-4">
              <span className="text-gradient-brand font-display text-5xl font-semibold tracking-[-0.04em] tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className="hidden h-px flex-1 bg-gradient-to-r from-(--border) to-transparent md:block" />
              )}
            </div>
            <h3 className="text-xl font-semibold tracking-tight">{t(`approach.steps.${key}.title`)}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-(--fg-muted)">{t(`approach.steps.${key}.text`)}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
