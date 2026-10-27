import type { ServiceContent } from '../../lib/service-content'
import { localizePath } from '../../lib/locale-routing'
import { siteUrl } from '../../lib/site-config'

type ServiceStructuredDataProps = {
  content: ServiceContent
}

export default function ServiceStructuredData({ content }: ServiceStructuredDataProps) {
  const serviceUrl = new URL(localizePath(content.locale, content.path), siteUrl).toString()
  const homeUrl = new URL(localizePath(content.locale, '/'), siteUrl).toString()
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${serviceUrl}#service`,
        name: content.title,
        serviceType: content.breadcrumbCurrent,
        url: serviceUrl,
        description: content.description,
        provider: { '@id': `${siteUrl}#service` },
        areaServed: 'Worldwide',
        inLanguage: content.locale,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${serviceUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: content.breadcrumbHome, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: content.breadcrumbCurrent, item: serviceUrl },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
