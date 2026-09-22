'use client'

import Link from 'next/link'
import { I18nProvider, useI18n } from '../../lib/i18n'
import styles from '../../app/not-found.module.css'

export default function NotFoundContent() {
  return (
    <I18nProvider>
      <LocalizedNotFound />
    </I18nProvider>
  )
}

function LocalizedNotFound() {
  const { t } = useI18n()

  return (
    <main className={styles.notFound}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.copy}>{t('notFound.copy')}</p>
        <Link className={styles.link} href="/">{t('notFound.backHome')}</Link>
      </div>
    </main>
  )
}
