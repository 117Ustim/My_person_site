import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import SiteRootLayout from '../../components/SiteRootLayout/SiteRootLayout'
import { defaultLocale, isLocale, locales, type Locale } from '../../lib/locale-routing'
import { siteMetadata, siteViewport } from '../../lib/site-layout'

type LocalizedLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = siteMetadata
export const viewport: Viewport = siteViewport
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

export default async function LocalizedLayout({ children, params }: LocalizedLayoutProps) {
  const { locale: value } = await params

  return <SiteRootLayout locale={resolveLocale(value)}>{children}</SiteRootLayout>
}
