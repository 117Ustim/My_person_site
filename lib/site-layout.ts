import type { Metadata, Viewport } from 'next'
import { siteUrl } from './site-config'

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Розробка сайтів, CRM і мобільних застосунків | AU Studio',
    template: '%s',
  },
  description: 'Розробляю сайти, CRM-системи та мобільні застосунки для бізнесу по всьому світу — від структури й дизайну до backend, інтеграцій і запуску.',
  applicationName: 'AU Studio',
  creator: 'AU Studio',
  publisher: 'AU Studio',
}

export const siteViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
