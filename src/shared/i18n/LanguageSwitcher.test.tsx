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

    await userEvent.selectOptions(screen.getByRole('combobox'), 'en')

    expect(screen.getByTestId('probe')).toHaveTextContent('Contact')
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })
})
