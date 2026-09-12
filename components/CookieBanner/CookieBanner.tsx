'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './CookieBanner.module.css'

const consentStorageKey = 'obsidian-cookie-consent'

export default function CookieBanner() {
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
    <aside className={styles.banner} role="dialog" aria-label="Cookie policy">
      <div className={styles.content}>
        <div className={styles.copy}>
          <p>We use cookies to improve your experience, measure site usage, and personalise content.</p>
          <Link href="/legal/cookie-policy">View our cookie policy</Link>
        </div>
        <div className={styles.actions}>
          <button className={styles.secondaryButton} type="button" onClick={accept}>Essential Only</button>
          <button className={styles.secondaryButton} type="button" onClick={accept}>Customise</button>
          <button className={styles.primaryButton} type="button" onClick={accept}>Accept All</button>
        </div>
      </div>
    </aside>
  )
}

