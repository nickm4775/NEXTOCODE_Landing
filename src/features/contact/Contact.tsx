import { useTranslation } from 'react-i18next'
import { Logo } from '../../shared/brand/Logo'
import { CONTACT } from '../../shared/config/contact'
import { Icon } from '../../shared/ui/Icon'
import { Reveal } from '../../shared/ui/Reveal'

export const Contact = () => {
  const { t } = useTranslation()

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 pb-24 sm:px-6 md:pb-36">
      <Reveal className="mx-auto max-w-[1120px]">
        {/* Always a dark brand stage so the gradient mark keeps its contrast in both themes. */}
        <div className="relative isolate overflow-hidden rounded-[36px] bg-(--primary-10) px-6 ring-1 ring-white/10 py-20 text-center text-white md:px-16 md:py-28">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-(--primary-50) opacity-60 blur-[120px]" />
            <div className="absolute -bottom-48 left-1/2 size-[28rem] -translate-x-1/4 rounded-full bg-(--secondary-50) opacity-25 blur-[120px]" />
          </div>
          <Logo kind="isotype" className="mx-auto mb-10 size-14" title="" />
          <h2
            id="contact-title"
            className="mx-auto max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-balance"
          >
            {t('contact.title')}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{t('contact.subtitle')}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-(--secondary-50) px-7 text-[17px] font-medium text-(--primary-10) transition-colors hover:bg-(--secondary-60) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97]"
            >
              <Icon name="mail" className="size-5" />
              {t('contact.email')}
            </a>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white/10 px-7 text-[17px] font-medium text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97]"
            >
              <Icon name="chat" className="size-5" />
              {t('contact.whatsapp')}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
