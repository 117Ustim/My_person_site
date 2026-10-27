import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomePageContent from '../../components/HomePageContent/HomePageContent'
import SiteShell from '../../components/SiteShell/SiteShell'
import { defaultLocale, isLocale, locales, type Locale } from '../../lib/locale-routing'
import { getLocalizedPageMetadata } from '../../lib/seo'

type LocalizedPageProps = {
  params: Promise<{ locale: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales
    .filter(locale => locale !== defaultLocale)
    .map(locale => ({ locale }))
}

function resolveLocale(value: string): Locale {
  if (!isLocale(value) || value === defaultLocale) notFound()

  return value
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale: value } = await params
  return getLocalizedPageMetadata(resolveLocale(value), 'home')
}

export default async function LocalizedHomePage({ params }: LocalizedPageProps) {
  resolveLocale((await params).locale)

  return (
    <SiteShell>
      <HomePageContent />
    </SiteShell>
  )
}
