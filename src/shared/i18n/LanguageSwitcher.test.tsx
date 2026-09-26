import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider, useTranslation } from 'react-i18next'
import { createI18n } from './index'
import { LANGUAGE_STORAGE_KEY } from './language'
import { LanguageSwitcher } from './LanguageSwitcher'

const Probe = () => {
  const { t } = useTranslation()
  return <p data-testid="probe">{t('nav.contact')}</p>
}

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    document.documentElement.lang = ''
  })

  it('starts in Portuguese and switches language, persisting the choice', async () => {
    const i18n = createI18n()
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
        <Probe />
      </I18nextProvider>,
    )

    expect(document.documentElement.lang).toBe('pt')
    expect(screen.getByTestId('probe')).toHaveTextContent('Contato')

    const trigger = screen.getByRole('button', { name: /Idioma.*Português/ })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('button', { name: 'English' })).toBeNull()

    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(screen.getByRole('button', { name: 'English' }))

    expect(screen.queryByRole('button', { name: 'Italiano' })).toBeNull()

    expect(screen.getByTestId('probe')).toHaveTextContent('Contact')
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })

  it('shows flags only, with no visible language text', () => {
    const { container } = render(
      <I18nextProvider i18n={createI18n()}>
        <LanguageSwitcher />
      </I18nextProvider>,
    )
    expect(container.querySelector('[data-flag="pt"]')).not.toBeNull()
    expect(container.querySelector('select')).toBeNull()
    expect(screen.queryByText('PT')).toBeNull()
  })

  it('closes the flag menu with Escape', async () => {
    render(
      <I18nextProvider i18n={createI18n()}>
        <LanguageSwitcher />
      </I18nextProvider>,
    )
    await userEvent.click(screen.getByRole('button', { name: /Idioma/ }))
    expect(screen.getByRole('button', { name: 'Español' })).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('button', { name: 'Español' })).toBeNull()
  })
})
