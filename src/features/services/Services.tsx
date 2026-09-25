import { useTranslation } from 'react-i18next'
import { Icon, type IconName } from '../../shared/ui/Icon'
import { Reveal } from '../../shared/ui/Reveal'
import { Section, SectionHeading } from '../../shared/ui/Section'

const SERVICES: { key: string; icon: IconName }[] = [
  { key: 'implementation', icon: 'rocket' },
  { key: 'support', icon: 'headset' },
  { key: 'custom', icon: 'code' },
  { key: 'integrations', icon: 'plug' },
  { key: 'training', icon: 'graduation' },
  { key: 'consulting', icon: 'compass' },
]

export const Services = () => {
  const { t } = useTranslation()

  return (
    <Section id="services" labelledBy="services-title">
      <Reveal>
        <SectionHeading
          id="services-title"
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />
      </Reveal>

      <ul className="grid gap-px overflow-hidden rounded-[28px] bg-(--border) ring-1 ring-(--border) sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ key, icon }, i) => (
          <Reveal as="li" key={key} delay={(i % 3) * 0.06} className="group bg-(--bg) p-8 md:p-10">
            <Icon name={icon} className="size-7 text-(--accent) transition-transform duration-300 group-hover:-translate-y-0.5" />
            <h3 className="mt-8 text-xl font-semibold tracking-tight">{t(`services.items.${key}.title`)}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-(--fg-muted)">{t(`services.items.${key}.text`)}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
