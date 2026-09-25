import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Logo } from './Logo'

describe('Logo', () => {
  it('renders the imagotype with gradients in color tone', () => {
    const { container } = render(<Logo />)
    expect(screen.getByRole('img', { name: 'Nextocode' })).toHaveAttribute('viewBox', '0 0 1416.58 180')
    expect(container.querySelectorAll('linearGradient')).toHaveLength(2)
    expect(container.querySelectorAll('path')).toHaveLength(11)
  })

  it('renders only the mark in currentColor for a mono isotype', () => {
    const { container } = render(<Logo kind="isotype" tone="mono" />)
    expect(screen.getByRole('img')).toHaveAttribute('viewBox', '0 0 180 180')
    expect(container.querySelector('linearGradient')).toBeNull()
    const paths = container.querySelectorAll('path')
    expect(paths).toHaveLength(2)
    paths.forEach((p) => expect(p).toHaveAttribute('fill', 'currentColor'))
  })
})
