import Image from 'next/image'
import Link from 'next/link'
import type { IntegrationDefinition } from '../../lib/page-data'
import FaqSection from '../FaqSection/FaqSection'
import MarketingHero from '../MarketingHero/MarketingHero'
import SectionHeading from '../SectionHeading/SectionHeading'
import styles from './IntegrationDetail.module.css'

type IntegrationDetailProps = {
  integration: IntegrationDefinition
}

export default function IntegrationDetail({ integration }: IntegrationDetailProps) {
  return (
    <main className={styles.main}>
      <MarketingHero
        compact
        title={integration.name}
        description={`${integration.category} integration`}
        image="/sitegrab/assets/0708-independent-firms-stone-top.CzfPSXxC_eSAGJ-232b10fd15.webp"
        imageAlt="Obsidian stone texture"
        actionLabel=""
      />

      <div className={styles.content}>
        <div className={styles.breadcrumbs}><Link href="/integrations">Integrations</Link><span>/</span><span>{integration.name}</span></div>
        <div className={styles.introGrid}>
          <aside className={styles.sidebar}>
            <Image className={styles.logo} src={integration.logo} alt={`${integration.name} logo`} width={64} height={64} />
            <span className={styles.category}>{integration.category}</span>
            <a href={`https://${integration.slug === 'gmail-and-google-calendar' ? 'workspace.google.com' : 'obsidianos.com'}`} target="_blank" rel="noreferrer">Learn more ↗</a>
          </aside>
          <div className={styles.copy}>
            <p className={styles.lead}>{integration.summary}</p>
            <h2>What the {integration.name} integration does</h2>
            <p>{integration.howItWorks}</p>
            <h2>What advisers can do</h2>
            <ul className={styles.capabilities}>
              {integration.capabilities.map(capability => <li key={capability}>{capability}</li>)}
            </ul>
            <h2>How it works</h2>
            <p>{integration.howItWorks}</p>
            <h2>How to connect</h2>
            <ol className={styles.steps}>{integration.connectionSteps.map(step => <li key={step}>{step}</li>)}</ol>
            <h2>Works with</h2>
            <div className={styles.tags}>{integration.worksWith.map(tag => <span key={tag}>{tag}</span>)}</div>
            <h2>Availability</h2>
            <p>This is a supported integration included with Obsidian&apos;s free AI Practice Management module.</p>
            <Link className={styles.action} href="mailto:support@obsidianos.com">Get Started For Free</Link>
          </div>
        </div>

        <section className={styles.faqSection}>
          <SectionHeading eyebrow="Frequently asked questions" title="FAQ" />
          <FaqSection items={integration.faq} />
        </section>

        <section className={styles.moreSection}>
          <SectionHeading eyebrow="Explore more" title="All Integrations" />
          <Link className={styles.moreLink} href="/integrations">View all integrations →</Link>
        </section>
      </div>
    </main>
  )
}
