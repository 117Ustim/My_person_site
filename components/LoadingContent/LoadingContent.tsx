'use client'

import { I18nProvider, useI18n } from '../../lib/i18n'
import styles from '../../app/loading.module.css'

export default function LoadingContent() {
  return (
    <I18nProvider>
      <LocalizedLoading />
    </I18nProvider>
  )
}

function LocalizedLoading() {
  const { t } = useI18n()

  return <main className={styles.loading}>{t('loading')}</main>
}
