import { siteUrl } from '../../lib/site-config'
import type { Locale } from '../../lib/locale-routing'

function getStructuredData(locale: Locale) {
  const isWorldwide = locale === 'en'

  return {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}#service`,
      name: 'AU Studio',
      url: siteUrl,
      description: isWorldwide
        ? 'Website, CRM system, and mobile app development for businesses worldwide.'
        : 'Website, CRM system, and mobile app development for businesses in Ukraine.',
      areaServed: isWorldwide ? 'Worldwide' : 'Ukraine',
      serviceType: [
        'Website development',
        'CRM system development',
        'Mobile app development',
      ],
      sameAs: ['https://t.me/ustikm'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      url: siteUrl,
      name: 'AU Studio',
      publisher: { '@id': `${siteUrl}#service` },
      inLanguage: ['uk', 'ru', 'en'],
    },
  ],
  }
}

export default function StructuredData({ locale }: { locale: Locale }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData(locale)) }}
    />
  )
}
