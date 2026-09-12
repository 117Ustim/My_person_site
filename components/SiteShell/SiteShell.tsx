import type { ReactNode } from 'react'
import CookieBanner from '../CookieBanner/CookieBanner'
import SiteFooter from '../SiteFooter/SiteFooter'
import SiteHeader from '../SiteHeader/SiteHeader'
import styles from './SiteShell.module.css'

type SiteShellProps = {
  children: ReactNode
}

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className={styles.shell}>
      <SiteHeader />
      {children}
      <SiteFooter />
      <CookieBanner />
    </div>
  )
}

