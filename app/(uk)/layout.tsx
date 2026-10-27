import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import SiteRootLayout from '../../components/SiteRootLayout/SiteRootLayout'
import { defaultLocale } from '../../lib/locale-routing'
import { siteMetadata, siteViewport } from '../../lib/site-layout'

export const metadata: Metadata = siteMetadata
export const viewport: Viewport = siteViewport

export default function UkrainianLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <SiteRootLayout locale={defaultLocale}>{children}</SiteRootLayout>
}
