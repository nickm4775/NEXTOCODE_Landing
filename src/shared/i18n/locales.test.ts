import { describe, expect, it } from 'vitest'
import { resources } from './resources'
import { SUPPORTED_LANGUAGES } from './language'

const keysOf = (value: unknown, prefix = ''): string[] => {
  if (Array.isArray(value)) return value.flatMap((item, i) => keysOf(item, `${prefix}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => keysOf(v, prefix ? `${prefix}.${k}` : k))
  }
  return [prefix]
}

describe('locales', () => {
  const reference = keysOf(resources.pt.translation).sort()

  it.each(SUPPORTED_LANGUAGES)('%s has the same keys as pt', (lng) => {
    expect(keysOf(resources[lng].translation).sort()).toEqual(reference)
  })

  it.each(SUPPORTED_LANGUAGES)('%s has no empty strings', (lng) => {
    const empty = keysOf(resources[lng].translation).filter((path) => {
      const value = path
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .reduce<unknown>((acc, key) => (acc as Record<string, unknown>)[key], resources[lng].translation)
      return typeof value === 'string' && value.trim() === ''
    })
    expect(empty).toEqual([])
  })
})
