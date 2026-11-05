'use client'

import type { ReactNode } from 'react'
import { useProjectInquiry } from '../ProjectInquiry/ProjectInquiry'
import styles from '../ServicePage/ServicePage.module.css'

export default function ServiceInquiryButton({ children }: { children: ReactNode }) {
  const { openInquiry } = useProjectInquiry()

  return (
    <button className={styles.ctaLink} type="button" aria-haspopup="dialog" onClick={openInquiry}>
      {children}
    </button>
  )
}
