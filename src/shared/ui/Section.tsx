import type { ReactNode } from 'react'

type Props = {
  id?: string
  children: ReactNode
  className?: string
  alt?: boolean
  labelledBy?: string
}

export const Section = ({ id, children, className = '', alt = false, labelledBy }: Props) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={`px-4 py-24 sm:px-6 md:py-36 ${alt ? 'bg-(--bg-alt)' : ''} ${className}`}
  >
    <div className="mx-auto max-w-[1120px]">{children}</div>
  </section>
)

type HeadingProps = { id: string; eyebrow?: string; title: string; subtitle?: string; center?: boolean }

export const SectionHeading = ({ id, eyebrow, title, subtitle, center = true }: HeadingProps) => (
  <header className={`mb-14 md:mb-20 ${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
    {eyebrow && <p className="mb-4 text-sm font-semibold tracking-wide text-(--accent)">{eyebrow}</p>}
    <h2
      id={id}
      className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance"
    >
      {title}
    </h2>
    {subtitle && (
      <p className="mt-5 text-[clamp(1.0625rem,2vw,1.3125rem)] leading-relaxed text-pretty text-(--fg-muted)">
        {subtitle}
      </p>
    )}
  </header>
)
