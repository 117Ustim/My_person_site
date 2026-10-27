export const locales = ['uk', 'ru', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'uk'

export const localeLabels: Record<Locale, string> = {
  uk: 'UA',
  ru: 'RU',
  en: 'EN',
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function getLocaleFromPathname(pathname: string | null): Locale {
  const segment = pathname?.split('/')[1] ?? ''

  return isLocale(segment) ? segment : defaultLocale
}

export function stripLocalePrefix(pathname: string | null): string {
  const normalizedPathname = pathname && pathname.startsWith('/') ? pathname : '/'
  const segment = normalizedPathname.split('/')[1] ?? ''

  if (!isLocale(segment)) return normalizedPathname

  const pathWithoutLocale = normalizedPathname.slice(segment.length + 1)

  return pathWithoutLocale || '/'
}

export function localizePath(locale: Locale, pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`

  if (locale === defaultLocale) return path

  return path === '/' ? `/${locale}` : `/${locale}${path}`
}
