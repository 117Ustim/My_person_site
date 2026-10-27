import type { ReactNode } from 'react'
import 'lenis/dist/lenis.css'
import GoogleAnalytics from '../GoogleAnalytics/GoogleAnalytics'
import LenisScroll from '../LenisScroll/LenisScroll'
import StructuredData from '../StructuredData/StructuredData'
import { I18nProvider } from '../../lib/i18n'
import type { Locale } from '../../lib/locale-routing'
import styles from '../../app/layout.module.css'

type SiteRootLayoutProps = {
  children: ReactNode
  locale: Locale
}

export default function SiteRootLayout({ children, locale }: SiteRootLayoutProps) {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang={locale} className={`dark ${styles.html}`}>
      <body className={styles.body}>
        <I18nProvider>
          <LenisScroll />
          <StructuredData />
          {children}
          {googleAnalyticsId ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
        </I18nProvider>
      </body>
    </html>
  )
}
