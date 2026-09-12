import type { MetadataRoute } from 'next'
import { pageRoutes } from '../lib/site-content'

export default function sitemap(): MetadataRoute.Sitemap {
  return pageRoutes.map(route => ({
    url: `https://obsidianos.com${route.path}`,
    changeFrequency: 'monthly',
    priority: route.path === '/' ? 1 : 0.7,
  }))
}
