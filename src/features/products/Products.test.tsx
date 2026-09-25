import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { createI18n } from '../../shared/i18n'
import { Products } from './Products'

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
globalThis.IntersectionObserver ??= IO as unknown as typeof IntersectionObserver

const renderProducts = () =>
  render(
    <I18nextProvider i18n={createI18n()}>
      <Products />
    </I18nextProvider>,
  )

describe('Products', () => {
  it('sells software: no hardware photos, only UI mockups', () => {
    const { container } = renderProducts()
    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelectorAll('[data-mock]').length).toBeGreaterThanOrEqual(4)
  })

  it('localizes the mockup labels', () => {
    renderProducts()
    expect(screen.getAllByText('Cobrar').length).toBeGreaterThan(0)
  })
})
