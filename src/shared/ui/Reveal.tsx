import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' }

/** Fades content up once as it enters the viewport. Reduced motion is handled by <MotionConfig>. */
export const Reveal = ({ children, delay = 0, className, as = 'div' }: Props) => {
  const Component = as === 'li' ? motion.li : motion.div
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 20, mass: 0.9, delay }}
    >
      {children}
    </Component>
  )
}
