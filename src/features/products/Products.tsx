import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../shared/ui/Button'
import { Icon, type IconName } from '../../shared/ui/Icon'
import { Reveal } from '../../shared/ui/Reveal'
import { Section, SectionHeading } from '../../shared/ui/Section'
import { AiMock, DashboardMock, InventoryMock, PosMock } from './mocks'

type ShowcaseTile = { key: 'management' | 'pos' | 'inventory'; Mock: ComponentType; className: string }
type FeatureTile = { key: 'ecommerce' | 'ai' | 'whatsapp'; icon: IconName; Extra?: ComponentType }

const SHOWCASE: ShowcaseTile[] = [
  { key: 'management', Mock: DashboardMock, className: 'md:col-span-2' },
  { key: 'pos', Mock: PosMock, className: 'md:row-span-2' },
  { key: 'inventory', Mock: InventoryMock, className: 'md:col-span-2' },
]

const FEATURES: FeatureTile[] = [
  { key: 'ecommerce', icon: 'store' },
  { key: 'ai', icon: 'sparkles', Extra: AiMock },
  { key: 'whatsapp', icon: 'chat' },
]

export const Products = () => {
  const { t } = useTranslation()

  return (
    <Section id="products" alt labelledBy="products-title">
      <Reveal>
        <SectionHeading
          id="products-title"
          eyebrow={t('products.eyebrow')}
          title={t('products.title')}
          subtitle={t('products.subtitle')}
        />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {SHOWCASE.map(({ key, Mock, className }, i) => (
          <Reveal key={key} delay={i * 0.06} className={className}>
            <article className="relative isolate flex h-full flex-col overflow-hidden rounded-[28px] bg-(--surface) ring-1 ring-(--border)">
              <div
                aria-hidden="true"
                className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-(--secondary-50) opacity-15 blur-[90px] dark:opacity-10"
              />
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-semibold tracking-tight md:text-[28px]">{t(`products.items.${key}.title`)}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-(--fg-muted) md:text-[17px]">
                  {t(`products.items.${key}.text`)}
                </p>
              </div>
              <div className="flex-1 px-6 pb-6 md:px-10 md:pb-10">
                <Mock />
              </div>
            </article>
          </Reveal>
        ))}

        {FEATURES.map(({ key, icon, Extra }, i) => (
          <Reveal key={key} delay={i * 0.06}>
            <article className="flex h-full flex-col rounded-[28px] bg-(--surface) p-8 ring-1 ring-(--border) md:p-10">
              <span className="mb-10 grid size-12 place-items-center rounded-2xl bg-(--surface-2) text-(--accent)">
                <Icon name={icon} />
              </span>
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{t(`products.items.${key}.title`)}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-(--fg-muted) md:text-[17px]">
                {t(`products.items.${key}.text`)}
              </p>
              {Extra && <Extra />}
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 text-center">
        <Button href="#contact" size="lg">
          {t('products.cta')}
        </Button>
      </Reveal>
    </Section>
  )
}
