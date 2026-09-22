'use client'

import { useI18n } from '../../lib/i18n'
import { useProjectInquiry } from '../ProjectInquiry/ProjectInquiry'
import styles from './BookingCta.module.css'

type BookingCtaProps = {
  title?: string
  description?: string
}

export default function BookingCta({ title, description }: BookingCtaProps) {
  const { t, localize } = useI18n()
  const { openInquiry } = useProjectInquiry()

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2>{title ? localize(title) : t('cta.ready')}</h2>
        <p>{description ? localize(description) : t('cta.description')}</p>
        <button className={styles.action} type="button" onClick={openInquiry}>{t('common.getStarted')}</button>
      </div>
    </section>
  )
}
