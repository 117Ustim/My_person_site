import { localizePath } from '../../lib/locale-routing'
import type { PortfolioCaseContent } from '../../lib/portfolio-case-content'
import { siteUrl } from '../../lib/site-config'

export default function PortfolioCaseStructuredData({ content }: { content: PortfolioCaseContent }) {
  const caseUrl = new URL(localizePath(content.locale, content.path), siteUrl).toString()
  const homeUrl = new URL(localizePath(content.locale, '/'), siteUrl).toString()
  const portfolioUrl = new URL(localizePath(content.locale, '/portfolio'), siteUrl).toString()
  const serviceUrl = new URL(localizePath(content.locale, content.relatedServicePath), siteUrl).toString()
  const imageUrl = new URL(content.heroImage, siteUrl).toString()
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${caseUrl}#case`,
        name: content.title,
        description: content.description,
        url: caseUrl,
        image: imageUrl,
        creator: { '@id': `${siteUrl}#service` },
        about: { '@id': `${serviceUrl}#service` },
        inLanguage: content.locale,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${caseUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: content.breadcrumbHome, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: content.portfolioLabel, item: portfolioUrl },
          { '@type': 'ListItem', position: 3, name: content.breadcrumbCurrent, item: caseUrl },
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
