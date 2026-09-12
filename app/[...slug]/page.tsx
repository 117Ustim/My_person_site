import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageRenderer from '../../components/PageRenderer/PageRenderer'
import SiteShell from '../../components/SiteShell/SiteShell'
import { dynamicRoutes, getRouteByPath } from '../../lib/site-content'

type DynamicPageProps = {
  params: Promise<{ slug: string[] }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return dynamicRoutes.map(route => ({
    slug: route.path.slice(1).split('/'),
  }))
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params
  const route = getRouteByPath(`/${slug.join('/')}`)

  if (!route) return {}

  return {
    title: route.title,
    description: route.description,
    alternates: {
      canonical: route.path,
    },
  }
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params
  const route = getRouteByPath(`/${slug.join('/')}`)

  if (!route || route.kind !== 'page') notFound()

  return (
    <SiteShell>
      <PageRenderer route={route} />
    </SiteShell>
  )
}
