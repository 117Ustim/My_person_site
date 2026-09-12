import IntegrationDirectory from '../IntegrationDirectory/IntegrationDirectory'
import MarketingHero from '../MarketingHero/MarketingHero'
import styles from './IntegrationsPage.module.css'
import type { IntegrationDefinition } from '../../lib/page-data'

type IntegrationsPageProps = {
  integrations: IntegrationDefinition[]
}

export default function IntegrationsPage({ integrations }: IntegrationsPageProps) {
  return (
    <main className={styles.main}>
      <MarketingHero compact title="Integrations" description="Connect your email, calendar, CRM, 25+ wealth platforms, and AI assistants to Obsidian." image="/sitegrab/assets/0708-independent-firms-stone-top.CzfPSXxC_eSAGJ-232b10fd15.webp" imageAlt="Obsidian integration platform" actionLabel="" />
      <IntegrationDirectory integrations={integrations} />
    </main>
  )
}
