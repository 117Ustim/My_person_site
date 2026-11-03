import Image from 'next/image'
import Link from 'next/link'
import { localizePath } from '../../lib/locale-routing'
import type { PortfolioCaseContent } from '../../lib/portfolio-case-content'
import PortfolioCaseStructuredData from '../PortfolioCaseStructuredData/PortfolioCaseStructuredData'
import styles from './PortfolioCasePage.module.css'

export default function PortfolioCasePage({ content }: { content: PortfolioCaseContent }) {
  const homePath = localizePath(content.locale, '/')
  const portfolioPath = localizePath(content.locale, '/portfolio')
  const servicePath = localizePath(content.locale, content.relatedServicePath)

  return (
    <main className={styles.page} lang={content.locale}>
      <PortfolioCaseStructuredData content={content} />
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label={content.breadcrumbCurrent}>
          <Link href={homePath}>{content.breadcrumbHome}</Link>
          <span aria-hidden="true">/</span>
          <Link href={portfolioPath}>{content.portfolioLabel}</Link>
          <span aria-hidden="true">/</span>
          <span>{content.breadcrumbCurrent}</span>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h1 className={styles.title}>{content.title}</h1>
            <p className={styles.heroDescription}>{content.description}</p>
            <div className={styles.heroLinks}>
              <Link className={styles.primaryLink} href={servicePath}>{content.relatedServiceLabel}</Link>
              <a className={styles.secondaryLink} href="#contacts">{content.ctaAction}</a>
            </div>
          </div>

          <figure className={styles.heroMedia}>
            <Image
              src={content.heroImage}
              alt={content.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </figure>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.details}>
            <h2 className={styles.sectionTitle}>{content.detailsTitle}</h2>
            {content.details.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <aside className={styles.highlights}>
            <h2 className={styles.sectionTitle}>{content.highlightsTitle}</h2>
            <ul>
              {content.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}
            </ul>
          </aside>
        </section>

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>{content.ctaTitle}</h2>
          <div>
            <p className={styles.ctaDescription}>{content.ctaDescription}</p>
            <a className={styles.primaryLink} href="#contacts">{content.ctaAction}</a>
          </div>
        </section>
      </div>
    </main>
  )
}
