import { useId } from 'react'
import { MARK_BOTTOM, MARK_TOP, WORDMARK } from './paths'

type Tone = 'color' | 'mono'

type Props = {
  /** `imagotype` = mark + wordmark, `isotype` = mark only. */
  kind?: 'imagotype' | 'isotype'
  /** `color` = official gradient mark, `mono` = everything in currentColor (negative/positive). */
  tone?: Tone
  className?: string
  title?: string
}

export const Logo = ({ kind = 'imagotype', tone = 'color', className, title = 'Nextocode' }: Props) => {
  const id = useId()
  const topId = `${id}-top`
  const bottomId = `${id}-bottom`
  const isColor = tone === 'color'

  return (
    <svg
      viewBox={kind === 'imagotype' ? '0 0 1416.58 180' : '0 0 180 180'}
      className={className}
      role="img"
      aria-label={title}
    >
      {isColor && (
        <defs>
          <linearGradient id={topId} x1="90.93" y1="29.07" x2="180.93" y2="119.07" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#00f0ba" />
            <stop offset="1" stopColor="#16009b" />
          </linearGradient>
          <linearGradient id={bottomId} x1="-.93" y1="60.93" x2="89.07" y2="150.93" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#16009b" />
            <stop offset=".99" stopColor="#00f0ba" />
          </linearGradient>
        </defs>
      )}
      <path d={MARK_TOP} fill={isColor ? `url(#${topId})` : 'currentColor'} />
      <path d={MARK_BOTTOM} fill={isColor ? `url(#${bottomId})` : 'currentColor'} />
      {kind === 'imagotype' && (
        <g fill={isColor ? 'var(--logo-word)' : 'currentColor'}>
          {WORDMARK.map((d) => (
            <path key={d.slice(0, 12)} d={d} />
          ))}
        </g>
      )}
    </svg>
  )
}
