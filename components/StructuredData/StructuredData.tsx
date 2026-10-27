import { siteUrl } from '../../lib/site-config'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}#service`,
      name: 'AU Studio',
      url: siteUrl,
      description: 'Website, CRM system, and mobile app development for businesses worldwide.',
      areaServed: 'Worldwide',
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

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
