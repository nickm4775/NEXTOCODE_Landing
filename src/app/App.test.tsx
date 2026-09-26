import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { createI18n } from '../shared/i18n'
import { ThemeProvider } from '../shared/theme/ThemeProvider'
import { App } from './App'

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
globalThis.IntersectionObserver ??= IO as unknown as typeof IntersectionObserver

describe('App', () => {
  it('renders every section in Portuguese by default', () => {
    render(
      <I18nextProvider i18n={createI18n()}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </I18nextProvider>,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Tecnologia que faz')
    for (const id of ['products', 'services', 'approach', 'contact']) {
      expect(document.getElementById(id)).toBeInTheDocument()
    }
    expect(document.title).toContain('Software especializado')
  })

  it('leads the hero with a single contact CTA, without the Negocenda button', () => {
    render(
      <I18nextProvider i18n={createI18n()}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </I18nextProvider>,
    )
    const hero = document.getElementById('top')!
    expect(within(hero).queryByText(/Negocenda/)).toBeNull()
    const links = within(hero).getAllByRole('link')
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAttribute('href', '#contact')
  })

  it('paints the step numbers with the logo gradient', () => {
    render(
      <I18nextProvider i18n={createI18n()}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </I18nextProvider>,
    )
    const numbers = document.querySelectorAll('#approach .text-gradient-brand')
    expect(numbers).toHaveLength(4)
  })

  it('signs the footer with the untranslated brand slogan in the display font', () => {
    render(
      <I18nextProvider i18n={createI18n()}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </I18nextProvider>,
    )
    const slogan = within(screen.getByRole('contentinfo')).getByText("Technology for what's next")
    expect(slogan).toHaveClass('font-display')
  })
})
