'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useI18n } from '../../lib/i18n'
import type { IntegrationDefinition } from '../../lib/page-data'
import FaqSection from '../FaqSection/FaqSection'
import MarketingHero from '../MarketingHero/MarketingHero'
import SectionHeading from '../SectionHeading/SectionHeading'
import styles from './IntegrationDetail.module.css'

type IntegrationDetailProps = {
  integration: IntegrationDefinition
}

export default function IntegrationDetail({ integration }: IntegrationDetailProps) {
  const { t, localize } = useI18n()
  const categoryLabel = getCategoryLabel(integration.category, t)

  return (
    <main className={styles.main}>
      <MarketingHero
        compact
        title={integration.name}
        description={`${categoryLabel} ${t('integration.categorySuffix')}`}
        image="/sitegrab/assets/0708-independent-firms-stone-top.CzfPSXxC_eSAGJ-232b10fd15.webp"
        imageAlt={t('integration.stoneAlt')}
        actionLabel=""
      />

      <div className={styles.content}>
        <div className={styles.breadcrumbs}><Link href="/integrations">{t('nav.integrations')}</Link><span>/</span><span>{integration.name}</span></div>
        <div className={styles.introGrid}>
          <aside className={styles.sidebar}>
            <Image className={styles.logo} src={integration.logo} alt={`${integration.name} ${t('common.logoSuffix')}`} width={64} height={64} />
            <span className={styles.category}>{categoryLabel}</span>
            <a href={`https://${integration.slug === 'gmail-and-google-calendar' ? 'workspace.google.com' : 'obsidianos.com'}`} target="_blank" rel="noreferrer">{t('integration.learnMore')}</a>
          </aside>
          <div className={styles.copy}>
            <p className={styles.lead}>{localize(integration.summary)}</p>
            <h2>{t('integration.whatItDoes', { name: integration.name })}</h2>
            <p>{localize(integration.howItWorks)}</p>
            <h2>{t('integration.whatAdvisersCanDo')}</h2>
            <ul className={styles.capabilities}>
              {integration.capabilities.map(capability => <li key={capability}>{localize(capability)}</li>)}
            </ul>
            <h2>{t('integration.howItWorks')}</h2>
            <p>{localize(integration.howItWorks)}</p>
            <h2>{t('integration.howToConnect')}</h2>
            <ol className={styles.steps}>{integration.connectionSteps.map(step => <li key={step}>{localize(step)}</li>)}</ol>
            <h2>{t('integration.worksWith')}</h2>
            <div className={styles.tags}>{integration.worksWith.map(tag => <span key={tag}>{localize(tag)}</span>)}</div>
            <h2>{t('integration.availability')}</h2>
            <p>{t('integration.availabilityCopy')}</p>
            <Link className={styles.action} href="mailto:ustik72@gmail.com">{t('common.getStartedFree')}</Link>
          </div>
        </div>

        <section className={styles.faqSection}>
          <SectionHeading eyebrow={t('integration.faqEyebrow')} title={t('integration.faqTitle')} />
          <FaqSection items={integration.faq.map(item => ({ question: localize(item.question), answer: localize(item.answer) }))} />
        </section>

        <section className={styles.moreSection}>
          <SectionHeading eyebrow={t('integration.exploreMore')} title={t('integration.allIntegrations')} />
          <Link className={styles.moreLink} href="/integrations">{t('common.viewAllIntegrations')}</Link>
        </section>
      </div>
    </main>
  )
}

function getCategoryLabel(category: string, t: (key: string) => string) {
  if (category === 'Email & Calendar') return t('directory.emailCalendar')
  if (category === 'CRM') return t('directory.crm')
  if (category === 'Storage') return t('directory.storage')
  if (category === 'AI assistants') return t('directory.aiAssistants')
  return t('directory.wealthPlatforms')
}
