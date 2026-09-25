import { describe, expect, it } from 'vitest'
import { DEFAULT_LANGUAGE, resolveInitialLanguage } from './language'

describe('resolveInitialLanguage', () => {
  it('defaults to Portuguese', () => {
    expect(DEFAULT_LANGUAGE).toBe('pt')
    expect(resolveInitialLanguage('', null)).toBe('pt')
  })

  it('prefers the ?lang= query param over the stored choice', () => {
    expect(resolveInitialLanguage('?lang=it', 'es')).toBe('it')
  })

  it('uses the stored choice when there is no query param', () => {
    expect(resolveInitialLanguage('', 'en')).toBe('en')
  })

  it('ignores unsupported values', () => {
    expect(resolveInitialLanguage('?lang=fr', 'de')).toBe('pt')
  })

  it('normalizes region tags', () => {
    expect(resolveInitialLanguage('?lang=pt-BR', null)).toBe('pt')
    expect(resolveInitialLanguage('', 'es-AR')).toBe('es')
  })
})
