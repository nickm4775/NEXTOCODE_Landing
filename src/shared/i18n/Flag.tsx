import type { ReactNode } from 'react'
import type { Language } from './language'

// Inline SVG flags: emoji flags don't render on Windows (they fall back to letters).
// Each language maps to the country of its primary audience.
const FLAGS: Record<Language, ReactNode> = {
  pt: (
    <>
      <rect width="21" height="15" fill="#009b3a" />
      <path d="M10.5 1.8 19 7.5l-8.5 5.7L2 7.5z" fill="#fedf00" />
      <circle cx="10.5" cy="7.5" r="3.2" fill="#002776" />
    </>
  ),
  es: (
    <>
      <rect width="21" height="15" fill="#aa151b" />
      <rect y="3.75" width="21" height="7.5" fill="#f1bf00" />
    </>
  ),
  it: (
    <>
      <rect width="21" height="15" fill="#fff" />
      <rect width="7" height="15" fill="#009246" />
      <rect x="14" width="7" height="15" fill="#ce2b37" />
    </>
  ),
  en: (
    <>
      <rect width="21" height="15" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 15) / 13} width="21" height={15 / 13} fill="#b22234" />
      ))}
      <rect width="9" height={(15 / 13) * 7} fill="#3c3b6e" />
    </>
  ),
}

type Props = { lng: Language; className?: string }

export const Flag = ({ lng, className = '' }: Props) => (
  <svg
    aria-hidden="true"
    data-flag={lng}
    viewBox="0 0 21 15"
    className={`h-[15px] w-[21px] shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10 dark:ring-white/15 ${className}`}
  >
    {FLAGS[lng]}
  </svg>
)
