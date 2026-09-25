import { MotionConfig } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Navbar } from '../features/navbar/Navbar'
import { Hero } from '../features/hero/Hero'
import { Statement } from '../features/hero/Statement'
import { Products } from '../features/products/Products'
import { Services } from '../features/services/Services'
import { Approach } from '../features/approach/Approach'
import { Values } from '../features/approach/Values'
import { Contact } from '../features/contact/Contact'
import { Footer } from '../features/footer/Footer'

export const App = () => {
  const { t } = useTranslation()
  return (
  <MotionConfig reducedMotion="user">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-(--btn-bg) focus:px-4 focus:py-2 focus:text-(--btn-fg)"
    >
      {t('nav.skip')}
    </a>
    <Navbar />
    <main id="main">
      <Hero />
      <Statement />
      <Products />
      <Services />
      <Approach />
      <Values />
      <Contact />
    </main>
    <Footer />
  </MotionConfig>
  )
}
