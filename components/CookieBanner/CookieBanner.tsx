'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useI18n } from '../../lib/i18n'
import styles from './CookieBanner.module.css'

const consentStorageKey = 'obsidian-cookie-consent'

export default function CookieBanner() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(window.localStorage.getItem(consentStorageKey) !== 'accepted')
  }, [])

  const accept = () => {
    window.localStorage.setItem(consentStorageKey, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside className={styles.banner} role="dialog" aria-label={t('cookie.label')}>
      <div className={styles.content}>
        <div className={styles.copy}>
          <p>{t('cookie.copy')}</p>
          <Link href="/legal/cookie-policy">{t('cookie.policy')}</Link>
        </div>
        <div className={styles.actions}>
          <button className={styles.secondaryButton} type="button" onClick={accept}>{t('cookie.essentialOnly')}</button>
          <button className={styles.secondaryButton} type="button" onClick={accept}>{t('cookie.customise')}</button>
          <button className={styles.primaryButton} type="button" onClick={accept}>{t('cookie.acceptAll')}</button>
        </div>
      </div>
    </aside>
  )
}
