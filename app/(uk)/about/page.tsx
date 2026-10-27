import type { Metadata } from 'next'
import AboutLongform from '../../../components/AboutLongform/AboutLongform'
import SiteShell from '../../../components/SiteShell/SiteShell'
import { getDefaultPageMetadata } from '../../../lib/seo'

export const metadata: Metadata = getDefaultPageMetadata('about')

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutLongform />
    </SiteShell>
  )
}
