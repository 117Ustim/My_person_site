import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PortfolioCasePage from '../../../../components/PortfolioCasePage/PortfolioCasePage'
import SiteShell from '../../../../components/SiteShell/SiteShell'
import { getPortfolioCaseContent, isPortfolioCaseSlug, portfolioCaseSlugs } from '../../../../lib/portfolio-case-content'
import { getDefaultPortfolioCaseMetadata } from '../../../../lib/seo'

type PortfolioCasePageProps = {
  params: Promise<{ project: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return portfolioCaseSlugs.map(project => ({ project }))
}

function resolveProject(value: string) {
  if (!isPortfolioCaseSlug(value)) notFound()

  return value
}

export async function generateMetadata({ params }: PortfolioCasePageProps): Promise<Metadata> {
  return getDefaultPortfolioCaseMetadata(resolveProject((await params).project))
}

export default async function PortfolioCaseRoute({ params }: PortfolioCasePageProps) {
  const project = resolveProject((await params).project)

  return (
    <SiteShell>
      <PortfolioCasePage content={getPortfolioCaseContent('uk', project)} />
    </SiteShell>
  )
}
