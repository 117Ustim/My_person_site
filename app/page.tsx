import type { Metadata } from 'next'
import SiteShell from '../components/SiteShell/SiteShell'
import PageRenderer from '../components/PageRenderer/PageRenderer'
import { getRouteByPath } from '../lib/site-content'

export const metadata: Metadata = {
  title: 'Головна',
  description: 'Сайти, CRM-системи та мобільні застосунки для реальних бізнес-завдань.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  const route = getRouteByPath('/')

  if (!route) return null

  return (
    <SiteShell>
      <PageRenderer route={route} />
    </SiteShell>
  )
}
