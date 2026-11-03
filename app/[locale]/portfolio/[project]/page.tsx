import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PortfolioCasePage from '../../../../components/PortfolioCasePage/PortfolioCasePage'
import SiteShell from '../../../../components/SiteShell/SiteShell'
import { defaultLocale, isLocale, locales, type Locale } from '../../../../lib/locale-routing'
import { getPortfolioCaseContent, isPortfolioCaseSlug, portfolioCaseSlugs } from '../../../../lib/portfolio-case-content'
import { getLocalizedPortfolioCaseMetadata } from '../../../../lib/seo'

type LocalizedPortfolioCasePageProps = {
  params: Promise<{ locale: string; project: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales
    .filter(locale => locale !== defaultLocale)
    .flatMap(locale => portfolioCaseSlugs.map(project => ({ locale, project })))
}

function resolveLocale(value: string): Locale {
  if (!isLocale(value) || value === defaultLocale) notFound()

  return value
}

function resolveProject(value: string) {
  if (!isPortfolioCaseSlug(value)) notFound()

  return value
}

export async function generateMetadata({ params }: LocalizedPortfolioCasePageProps): Promise<Metadata> {
  const values = await params
  return getLocalizedPortfolioCaseMetadata(resolveLocale(values.locale), resolveProject(values.project))
}

export default async function LocalizedPortfolioCaseRoute({ params }: LocalizedPortfolioCasePageProps) {
  const values = await params
  const locale = resolveLocale(values.locale)
  const project = resolveProject(values.project)

  return (
    <SiteShell>
      <PortfolioCasePage content={getPortfolioCaseContent(locale, project)} />
    </SiteShell>
  )
}
