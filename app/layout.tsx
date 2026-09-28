import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import 'lenis/dist/lenis.css'
import LenisScroll from '../components/LenisScroll/LenisScroll'
import { I18nProvider } from '../lib/i18n'
import { siteUrl } from '../lib/site-config'
import styles from './layout.module.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Цифровые продукты и разработка',
    template: '%s',
  },
  description: 'Сайты, CRM-системы и мобильные приложения для реальных бизнес-задач.',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="uk" className="dark">
      <body className={styles.body}>
        <I18nProvider>
          <LenisScroll />
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
