import Link from 'next/link'
import { localizePath } from '../../lib/locale-routing'
import type { ServiceContent } from '../../lib/service-content'
import ServiceStructuredData from '../ServiceStructuredData/ServiceStructuredData'
import styles from './ServicePage.module.css'

type ServicePageProps = {
  content: ServiceContent
}

export default function ServicePage({ content }: ServicePageProps) {
  const homePath = localizePath(content.locale, '/')
  const portfolioPath = localizePath(content.locale, '/portfolio')

  return (
    <main className={styles.page} lang={content.locale}>
      <ServiceStructuredData content={content} />
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label={content.breadcrumbCurrent}>
          <Link href={homePath}>{content.breadcrumbHome}</Link>
          <span aria-hidden="true">/</span>
          <span>{content.breadcrumbCurrent}</span>
        </nav>

        <section className={styles.hero}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.heroDescription}>{content.description}</p>
          <a className={styles.ctaLink} href="#contacts">{content.ctaAction}</a>
        </section>

        <section className={styles.section}>
          <div className={styles.introBlock}>
            <h2 className={styles.introTitle}>{content.introTitle}</h2>
            <p className={styles.intro}>{content.intro}</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.problemsTitle}</h2>
          </div>
          <div className={styles.problemGrid}>
            {content.problems.map(problem => (
              <article className={styles.problem} key={problem.title}>
                <h3 className={styles.problemTitle}>{problem.title}</h3>
                <p className={styles.problemDescription}>{problem.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.capabilitiesTitle}</h2>
          </div>
          <ul className={styles.capabilityGrid}>
            {content.capabilities.map(capability => (
              <li className={styles.capability} key={capability}>{capability}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.processTitle}</h2>
          </div>
          <ol className={styles.processList}>
            {content.process.map((step, index) => (
              <li className={styles.processItem} key={step.title}>
                <h3 className={styles.processTitle}>{`${String(index + 1).padStart(2, '0')} / ${step.title}`}</h3>
                <p className={styles.processDescription}>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.casesTitle}</h2>
            <p className={styles.sectionDescription}>{content.casesDescription}</p>
          </div>
          <div className={styles.caseGrid}>
            {content.cases.map(project => (
              <article className={styles.case} key={project.project}>
                <h3 className={styles.caseTitle}>{project.title}</h3>
                <p className={styles.caseDescription}>{project.description}</p>
                <Link className={styles.caseLink} href={`${portfolioPath}?category=crm&project=${encodeURIComponent(project.project)}`}>
                  {content.locale === 'uk' ? 'Відкрити кейс →' : content.locale === 'ru' ? 'Открыть кейс →' : 'Open case →'}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.faqTitle}</h2>
          </div>
          <div className={styles.faqList}>
            {content.faq.map(item => (
              <details className={styles.faqItem} key={item.question}>
                <summary className={styles.faqQuestion}>{item.question}</summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.ctaSection}`}>
          <h2 className={styles.ctaTitle}>{content.ctaTitle}</h2>
          <div>
            <p className={styles.ctaCopy}>{content.ctaDescription}</p>
            <a className={styles.ctaLink} href="#contacts">{content.ctaAction}</a>
          </div>
        </section>
      </div>
    </main>
  )
}
