'use client'

import { ArrowUp, MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useI18n } from '../../lib/i18n'
import { useProjectInquiry } from '../ProjectInquiry/ProjectInquiry'
import styles from './FloatingActions.module.css'

export default function FloatingActions() {
  const { t } = useI18n()
  const { openInquiry } = useProjectInquiry()
  const pathname = usePathname()
  const [showScrollButton, setShowScrollButton] = useState(false)
  const isAboutPage = pathname === '/about'

  useEffect(() => {
    if (isAboutPage) {
      return
    }

    const handleScroll = () => setShowScrollButton(window.scrollY > 240)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isAboutPage])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isAboutPage) {
    return null
  }

  return (
    <div className={styles.actions} role="group" aria-label={t('common.quickActions')}>
      <button
        className={`${styles.action} ${styles.scrollAction} ${showScrollButton ? styles.visible : ''}`}
        type="button"
        aria-label={t('common.scrollToTop')}
        tabIndex={showScrollButton ? 0 : -1}
        onClick={scrollToTop}
      >
        <ArrowUp aria-hidden="true" size={20} strokeWidth={1.8} />
      </button>
      <button className={`${styles.action} ${styles.messageAction}`} type="button" aria-label={t('common.openMessage')} onClick={openInquiry}>
        <MessageCircle aria-hidden="true" size={20} strokeWidth={1.8} />
      </button>
    </div>
  )
}
