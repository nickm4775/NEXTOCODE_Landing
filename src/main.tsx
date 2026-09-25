import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import '@fontsource-variable/inter'
import './styles/index.css'
import { createI18n } from './shared/i18n'
import { ThemeProvider } from './shared/theme/ThemeProvider'
import { App } from './app/App'

const i18n = createI18n()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </I18nextProvider>
  </StrictMode>,
)
