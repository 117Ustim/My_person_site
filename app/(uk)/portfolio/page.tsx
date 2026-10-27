import type { Metadata } from 'next'
import PortfolioPageContent from '../../../components/PortfolioPageContent/PortfolioPageContent'
import SiteShell from '../../../components/SiteShell/SiteShell'
import { getDefaultPageMetadata } from '../../../lib/seo'

export const metadata: Metadata = getDefaultPageMetadata('portfolio')

export default function PortfolioPage() {
  return (
    <SiteShell>
      <PortfolioPageContent />
    </SiteShell>
  )
}
