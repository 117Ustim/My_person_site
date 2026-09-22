'use client'

import Link from 'next/link'
import { useI18n } from '../../lib/i18n'
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
  const { t, localize } = useI18n()

  return (
    <main className={styles.main}>
      <MarketingHero compact title={t('legal.title')} description={t('legal.description')} actionLabel="" />
      <PageSection>
        {groups.map(group => (
          <section className={styles.group} key={group.title}>
            <SectionHeading title={localize(group.title)} />
            <div className={styles.cards}>
              {group.items.map(([title, href, description]) => <Link className={styles.card} href={href} key={href}><h3>{localize(title)}</h3><p>{localize(description)}</p><span>{t('common.readMore')}</span></Link>)}
            </div>
          </section>
        ))}
      </PageSection>
    </main>
  )
}
