import type { Metadata } from 'next'
import HomePageContent from '../../components/HomePageContent/HomePageContent'
import SiteShell from '../../components/SiteShell/SiteShell'
import { getDefaultPageMetadata } from '../../lib/seo'

export const metadata: Metadata = getDefaultPageMetadata('home')

export default function HomePage() {
  return (
    <SiteShell>
      <HomePageContent />
    </SiteShell>
  )
}
