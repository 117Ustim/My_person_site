'use client'

import { useI18n } from '../../lib/i18n'
import IntegrationDirectory from '../IntegrationDirectory/IntegrationDirectory'
import MarketingHero from '../MarketingHero/MarketingHero'
import styles from './IntegrationsPage.module.css'
import type { IntegrationDefinition } from '../../lib/page-data'

type IntegrationsPageProps = {
  integrations: IntegrationDefinition[]
}

export default function IntegrationsPage({ integrations }: IntegrationsPageProps) {
  const { t, localize } = useI18n()

  return (
    <main className={styles.main}>
      <MarketingHero compact title={t('nav.integrations')} description={t('integrations.description')} image="/sitegrab/assets/0708-independent-firms-stone-top.CzfPSXxC_eSAGJ-232b10fd15.webp" imageAlt={localize('Obsidian integration platform')} actionLabel="" />
      <IntegrationDirectory integrations={integrations} />
    </main>
  )
}
