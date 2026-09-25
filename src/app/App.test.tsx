import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
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
})
