import Link from 'next/link'
import MarketingHero from '../MarketingHero/MarketingHero'
import PageSection from '../PageSection/PageSection'
import SectionHeading from '../SectionHeading/SectionHeading'
import styles from './LegalIndex.module.css'

const groups = [
  {
    title: 'Website policies',
    items: [
      ['Privacy Policy', '/legal/privacy-policy', 'How we collect, use, and protect your personal information.'],
      ['Terms of Service', '/legal/terms-of-service', 'Terms governing your use of the Obsidian website.'],
      ['Cookie Policy', '/legal/cookie-policy', 'How we use cookies and similar technologies on our website.'],
    ],
  },
  {
    title: 'Security & compliance',
    items: [
      ['Security & Privacy', '/security', 'How Obsidian protects client data, encryption standards, and certifications.'],
      ['Subprocessors', '/security/subprocessors', 'Complete list of third-party entities that process data on our behalf.'],
    ],
  },
] as const

export default function LegalIndex() {
  return (
    <main className={styles.main}>
      <MarketingHero compact title="Legal" description="Policies, agreements, and regulatory information." actionLabel="" />
      <PageSection>
        {groups.map(group => (
          <section className={styles.group} key={group.title}>
            <SectionHeading title={group.title} />
            <div className={styles.cards}>
              {group.items.map(([title, href, description]) => <Link className={styles.card} href={href} key={href}><h3>{title}</h3><p>{description}</p><span>Read more →</span></Link>)}
            </div>
          </section>
        ))}
      </PageSection>
    </main>
  )
}
