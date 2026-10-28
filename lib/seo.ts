import type { Metadata } from 'next'
import { defaultLocale, localizePath, locales, type Locale } from './locale-routing'
import { siteUrl } from './site-config'
import type { ServiceSlug } from './service-content'

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

const serviceSeo: Record<Locale, Record<ServiceSlug, SeoPageData>> = {
  uk: {
    'crm-development': {
      path: '/services/crm-development',
      title: 'Розробка CRM-систем на замовлення | AU Studio',
      description: 'Проєктую та розробляю CRM-системи під бізнес-процеси: клієнти, заявки, записи, оплати, ролі, звіти та інтеграції.',
      openGraphLocale: 'uk_UA',
    },
    'web-development': {
      path: '/services/web-development',
      title: 'Розробка сайтів для бізнесу | AU Studio',
      description: 'Створюю корпоративні сайти, лендинги та вебплатформи з продуманою структурою, адаптивним інтерфейсом і зрозумілим шляхом до цільової дії.',
      openGraphLocale: 'uk_UA',
    },
    'mobile-app-development': {
      path: '/services/mobile-app-development',
      title: 'Розробка мобільних застосунків для iOS та Android | AU Studio',
      description: 'Створюю мобільні застосунки для бізнесу: MVP, iOS та Android, авторизація, API, push-сповіщення, аналітика та підготовка до запуску.',
      openGraphLocale: 'uk_UA',
    },
  },
  ru: {
    'crm-development': {
      path: '/services/crm-development',
      title: 'Разработка CRM-систем на заказ | AU Studio',
      description: 'Проектирую и разрабатываю CRM-системы под бизнес-процессы: клиенты, заявки, записи, оплаты, роли, отчёты и интеграции.',
      openGraphLocale: 'ru_RU',
    },
    'web-development': {
      path: '/services/web-development',
      title: 'Разработка сайтов для бизнеса | AU Studio',
      description: 'Создаю корпоративные сайты, лендинги и веб-платформы с продуманной структурой, адаптивным интерфейсом и понятным путём к целевому действию.',
      openGraphLocale: 'ru_RU',
    },
    'mobile-app-development': {
      path: '/services/mobile-app-development',
      title: 'Разработка мобильных приложений для iOS и Android | AU Studio',
      description: 'Создаю мобильные приложения для бизнеса: MVP, iOS и Android, авторизация, API, push-уведомления, аналитика и подготовка к запуску.',
      openGraphLocale: 'ru_RU',
    },
  },
  en: {
    'crm-development': {
      path: '/services/crm-development',
      title: 'Custom CRM Development for Businesses | AU Studio',
      description: 'I design and develop custom CRM systems for business processes, including customers, leads, appointments, payments, roles, reports, and integrations.',
      openGraphLocale: 'en_US',
    },
    'web-development': {
      path: '/services/web-development',
      title: 'Website Development for Businesses | AU Studio',
      description: 'I create corporate websites, landing pages, and web platforms with clear structure, responsive interfaces, and a focused path to the next action.',
      openGraphLocale: 'en_US',
    },
    'mobile-app-development': {
      path: '/services/mobile-app-development',
      title: 'Mobile App Development for iOS and Android | AU Studio',
      description: 'I build mobile apps for businesses: MVPs, iOS and Android products, authentication, APIs, push notifications, analytics, and launch preparation.',
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

export function getServiceMetadata(locale: Locale, service: ServiceSlug): Metadata {
  const data = serviceSeo[locale][service]
  const canonicalPath = localizePath(locale, data.path)
  const canonicalUrl = absoluteUrl(canonicalPath)
  const localizedUrls = Object.fromEntries(
    locales.map(item => [item, absoluteUrl(localizePath(item, data.path))]),
  )

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

export function getLocalizedServiceMetadata(locale: Locale, service: ServiceSlug): Metadata {
  return getServiceMetadata(locale, service)
}

export function getDefaultServiceMetadata(service: ServiceSlug): Metadata {
  return getServiceMetadata(defaultLocale, service)
}
