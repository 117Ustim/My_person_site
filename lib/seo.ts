import type { Metadata } from 'next'
import { defaultLocale, localizePath, locales, type Locale } from './locale-routing'
import { siteUrl } from './site-config'

export type SeoPage = 'home' | 'portfolio' | 'about'

type SeoPageData = {
  path: string
  title: string
  description: string
  openGraphLocale: string
}

const pageSeo: Record<Locale, Record<SeoPage, SeoPageData>> = {
  uk: {
    home: {
      path: '/',
      title: 'Розробка сайтів, CRM і мобільних застосунків | AU Studio',
      description: 'Розробляю сайти, CRM-системи та мобільні застосунки для бізнесу по всьому світу — від структури й дизайну до backend, інтеграцій і запуску.',
      openGraphLocale: 'uk_UA',
    },
    portfolio: {
      path: '/portfolio',
      title: 'Портфоліо: сайти, CRM-системи та мобільні застосунки | AU Studio',
      description: 'Портфоліо цифрових продуктів для бізнесу: сайти, CRM-системи, внутрішні кабінети та мобільні застосунки.',
      openGraphLocale: 'uk_UA',
    },
    about: {
      path: '/about',
      title: 'Full-stack розробник: сайти, CRM і мобільні застосунки | AU Studio',
      description: 'Full-stack розробник, який створює сайти, CRM-системи та мобільні застосунки від структури й дизайну до backend, інтеграцій і запуску.',
      openGraphLocale: 'uk_UA',
    },
  },
  ru: {
    home: {
      path: '/',
      title: 'Разработка сайтов, CRM и мобильных приложений | AU Studio',
      description: 'Разрабатываю сайты, CRM-системы и мобильные приложения для бизнеса по всему миру — от структуры и дизайна до backend, интеграций и запуска.',
      openGraphLocale: 'ru_RU',
    },
    portfolio: {
      path: '/portfolio',
      title: 'Портфолио: сайты, CRM-системы и мобильные приложения | AU Studio',
      description: 'Портфолио цифровых продуктов для бизнеса: сайты, CRM-системы, внутренние кабинеты и мобильные приложения.',
      openGraphLocale: 'ru_RU',
    },
    about: {
      path: '/about',
      title: 'Full-stack разработчик: сайты, CRM и мобильные приложения | AU Studio',
      description: 'Full-stack разработчик, который создаёт сайты, CRM-системы и мобильные приложения от структуры и дизайна до backend, интеграций и запуска.',
      openGraphLocale: 'ru_RU',
    },
  },
  en: {
    home: {
      path: '/',
      title: 'Website, CRM and Mobile App Development | AU Studio',
      description: 'I build websites, CRM systems, and mobile apps for businesses worldwide — from structure and design to backend, integrations, and launch.',
      openGraphLocale: 'en_US',
    },
    portfolio: {
      path: '/portfolio',
      title: 'Portfolio: Websites, CRM Systems and Mobile Apps | AU Studio',
      description: 'A portfolio of digital products for businesses: websites, CRM systems, internal workspaces, and mobile applications.',
      openGraphLocale: 'en_US',
    },
    about: {
      path: '/about',
      title: 'Full-stack Developer: Websites, CRM and Mobile Apps | AU Studio',
      description: 'A full-stack developer creating websites, CRM systems, and mobile apps from structure and design to backend, integrations, and launch.',
      openGraphLocale: 'en_US',
    },
  },
}

function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString()
}

function getLocalizedUrls(pathname: string) {
  return Object.fromEntries(
    locales.map(locale => [locale, absoluteUrl(localizePath(locale, pathname))]),
  )
}

export function getPageMetadata(locale: Locale, page: SeoPage): Metadata {
  const data = pageSeo[locale][page]
  const canonicalPath = localizePath(locale, data.path)
  const canonicalUrl = absoluteUrl(canonicalPath)
  const localizedUrls = getLocalizedUrls(data.path)

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...localizedUrls,
        'x-default': absoluteUrl(data.path),
      },
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: canonicalUrl,
      siteName: 'AU Studio',
      type: 'website',
      locale: data.openGraphLocale,
      images: [
        {
          url: absoluteUrl('/og-image.png'),
          width: 1200,
          height: 630,
          alt: 'AU Studio — digital products and development',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [absoluteUrl('/og-image.png')],
    },
  }
}

export function getLocalizedPageMetadata(locale: Locale, page: SeoPage): Metadata {
  return getPageMetadata(locale, page)
}

export function getDefaultPageMetadata(page: SeoPage): Metadata {
  return getPageMetadata(defaultLocale, page)
}
