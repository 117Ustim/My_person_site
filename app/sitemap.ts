import type { MetadataRoute } from 'next'
import { defaultLocale, localizePath, locales } from '../lib/locale-routing'
import { pageRoutes } from '../lib/site-content'
import { siteUrl } from '../lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const basePaths = [
    ...pageRoutes.map(route => route.path),
    '/services/crm-development',
    '/services/web-development',
    '/services/mobile-app-development',
  ]
  const routes = basePaths.flatMap(path => [
    path,
    ...locales
      .filter(locale => locale !== defaultLocale)
      .map(locale => localizePath(locale, path)),
  ])
  return routes.map(path => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))
}
