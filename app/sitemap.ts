import type { MetadataRoute } from 'next'
import { defaultLocale, localizePath, locales } from '../lib/locale-routing'
import { pageRoutes } from '../lib/site-content'
import { siteUrl } from '../lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = pageRoutes.flatMap(route => [
    route.path,
    ...locales
      .filter(locale => locale !== defaultLocale)
      .map(locale => localizePath(locale, route.path)),
  ])
  return routes.map(path => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))
}
