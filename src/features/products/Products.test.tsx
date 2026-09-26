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

  it('shows a framed example in every feature card, not only the AI one', () => {
    const { container } = renderProducts()
    const panels = container.querySelectorAll('[data-example]')
    expect([...panels].map((p) => p.getAttribute('data-example'))).toEqual(['ecommerce', 'ai', 'whatsapp'])
    expect(screen.getByText('Olá! Meu pedido #1042 já saiu?')).toBeInTheDocument()
    expect(screen.getByText('Estoque sincronizado com o caixa')).toBeInTheDocument()
  })

  it('links to the Negocenda website in a new tab', () => {
    renderProducts()
    const link = screen.getByRole('link', { name: /negocenda\.com/i })
    expect(link).toHaveAttribute('href', 'https://negocenda.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
