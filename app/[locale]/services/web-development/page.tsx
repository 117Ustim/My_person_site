import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServicePage from '../../../../components/ServicePage/ServicePage'
import { defaultLocale, isLocale, locales, type Locale } from '../../../../lib/locale-routing'
import { getLocalizedServiceMetadata } from '../../../../lib/seo'
import { getServiceContent } from '../../../../lib/service-content'

type LocalizedServicePageProps = {
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

export async function generateMetadata({ params }: LocalizedServicePageProps): Promise<Metadata> {
  const { locale: value } = await params
  return getLocalizedServiceMetadata(resolveLocale(value), 'web-development')
}

export default async function LocalizedWebDevelopmentPage({ params }: LocalizedServicePageProps) {
  const locale = resolveLocale((await params).locale)

  return <ServicePage content={getServiceContent(locale, 'web-development')} />
}
