import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Logo } from '../../shared/brand/Logo'
import { Button } from '../../shared/ui/Button'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 70, damping: 20, delay },
})

export const Hero = () => {
  const { t } = useTranslation()

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-20 text-center sm:px-6"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[18%] left-1/2 size-[42rem] -translate-x-[70%] rounded-full bg-(--primary-50) opacity-20 blur-[120px] dark:opacity-40" />
        <div className="absolute top-[30%] left-1/2 size-[36rem] -translate-x-[20%] rounded-full bg-(--secondary-50) opacity-15 blur-[120px] dark:opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-(--bg)" />
      </div>

      <motion.div {...rise(0)} className="mb-10">
        <Logo kind="isotype" className="size-20 animate-[float_6s_ease-in-out_infinite] drop-shadow-[0_20px_40px_rgb(0_240_186/0.25)] md:size-24" title="" />
      </motion.div>

      <motion.p {...rise(0.08)} className="mb-5 text-sm font-semibold tracking-wide text-(--accent) md:text-base">
        {t('hero.eyebrow')}
      </motion.p>

      <motion.h1
        {...rise(0.16)}
        id="hero-title"
        className="max-w-5xl text-[clamp(2.75rem,8vw,6rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance"
      >
        {t('hero.titleLead')} <span className="text-gradient">{t('hero.titleAccent')}</span>
      </motion.h1>

      <motion.p
        {...rise(0.24)}
        className="mt-7 max-w-2xl text-[clamp(1.0625rem,2.2vw,1.375rem)] leading-relaxed text-pretty text-(--fg-muted)"
      >
        {t('hero.subtitle')}
      </motion.p>

      <motion.div {...rise(0.32)} className="mt-10">
        <Button href="#contact" size="lg">
          {t('hero.cta')}
        </Button>
      </motion.div>
    </section>
  )
}
