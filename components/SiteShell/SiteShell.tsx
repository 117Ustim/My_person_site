import type { ReactNode } from 'react'
import CookieBanner from '../CookieBanner/CookieBanner'
import { ProjectInquiryProvider } from '../ProjectInquiry/ProjectInquiry'
import SiteFooter from '../SiteFooter/SiteFooter'
import SiteHeader from '../SiteHeader/SiteHeader'
import FloatingActions from '../FloatingActions/FloatingActions'
import styles from './SiteShell.module.css'

type SiteShellProps = {
  children: ReactNode
}

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <ProjectInquiryProvider>
      <div className={styles.shell}>
        <SiteHeader />
        {children}
        <SiteFooter />
        <CookieBanner />
        <FloatingActions />
      </div>
    </ProjectInquiryProvider>
  )
}
