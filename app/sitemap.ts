import type { MetadataRoute } from 'next'
import { pageRoutes } from '../lib/site-content'
import { siteUrl } from '../lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  return pageRoutes.map(route => ({
    url: new URL(route.path, siteUrl).toString(),
    changeFrequency: 'monthly',
    priority: route.path === '/' ? 1 : 0.7,
  }))
}
