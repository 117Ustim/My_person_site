'use client'

import { I18nProvider, useI18n } from '../lib/i18n'
import styles from './error.module.css'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <I18nProvider>
      <ErrorContent reset={reset} />
    </I18nProvider>
  )
}

function ErrorContent({ reset }: { reset: () => void }) {
  const { t } = useI18n()

  return (
    <main className={styles.error}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('error.title')}</h1>
        <p className={styles.copy}>{t('error.copy')}</p>
        <button className={styles.button} type="button" onClick={reset}>{t('error.retry')}</button>
      </div>
    </main>
  )
}
