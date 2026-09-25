export type Theme = 'light' | 'dark'
export const THEME_STORAGE_KEY = 'nextocode.theme'

export const resolveInitialTheme = (stored: string | null, prefersDark: boolean): Theme =>
  stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light'

export const readStoredTheme = (): string | null => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}

export const storeTheme = (theme: Theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* storage unavailable: theme still applies for this visit */
  }
}
