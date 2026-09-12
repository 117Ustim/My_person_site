import type { Metadata } from 'next'
import SiteShell from '../components/SiteShell/SiteShell'
import PageRenderer from '../components/PageRenderer/PageRenderer'
import { getRouteByPath } from '../lib/site-content'

export const metadata: Metadata = {
  title: 'Obsidian — The all-in-one platform for financial advisers',
  description: 'AI-powered practice management available now, with integrated custody and execution launching soon.',
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
