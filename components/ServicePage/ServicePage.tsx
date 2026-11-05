import Link from 'next/link'
import { localizePath } from '../../lib/locale-routing'
import { isPortfolioCaseSlug } from '../../lib/portfolio-case-content'
import type { ServiceContent } from '../../lib/service-content'
import ServiceStructuredData from '../ServiceStructuredData/ServiceStructuredData'
import ServiceInquiryButton from '../ServiceInquiryButton/ServiceInquiryButton'
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
          <ServiceInquiryButton>{content.ctaAction}</ServiceInquiryButton>
        </section>

        <section className={styles.section}>
          <div className={styles.introBlock}>
            <h2 className={styles.introTitle}>{content.introTitle}</h2>
            <div className={styles.textStack}>
              {(content.introParagraphs ?? [content.intro]).map(paragraph => (
                <p className={styles.intro} key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {content.details ? (
          <>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{content.details.optionsTitle}</h2>
                <p className={styles.sectionDescription}>{content.details.optionsDescription}</p>
              </div>
              <div className={styles.detailGrid}>
                {content.details.options.map(item => (
                  <article className={styles.detailCard} key={item.title}>
                    <h3 className={styles.detailTitle}>{item.title}</h3>
                    <p className={styles.detailDescription}>{item.description}</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : null}

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

        {content.details ? (
          <>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{content.details.includedTitle}</h2>
                {content.details.includedDescription ? <p className={styles.sectionDescription}>{content.details.includedDescription}</p> : null}
              </div>
              <div className={styles.detailGrid}>
                {content.details.included.map(item => (
                  <article className={styles.detailCard} key={item.title}>
                    <h3 className={styles.detailTitle}>{item.title}</h3>
                    <p className={styles.detailDescription}>{item.description}</p>
                  </article>
                ))}
              </div>
            </section>

            {content.details.technologyTitle && content.details.technologyParagraphs ? (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>{content.details.technologyTitle}</h2>
                </div>
                <div className={styles.textStack}>
                  {content.details.technologyParagraphs.map(paragraph => (
                    <p className={styles.longCopy} key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ) : null}

            {content.details.outcomesTitle && content.details.outcomes ? (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>{content.details.outcomesTitle}</h2>
                  {content.details.outcomesDescription ? <p className={styles.sectionDescription}>{content.details.outcomesDescription}</p> : null}
                </div>
                <div className={styles.detailGrid}>
                  {content.details.outcomes.map(item => (
                    <article className={styles.detailCard} key={item.title}>
                      <h3 className={styles.detailTitle}>{item.title}</h3>
                      <p className={styles.detailDescription}>{item.description}</p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

          </>
        ) : null}

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
                <Link
                  className={styles.caseLink}
                  href={isPortfolioCaseSlug(project.project)
                    ? localizePath(content.locale, `/portfolio/${project.project}`)
                    : `${portfolioPath}?category=${content.portfolioCategory}&project=${encodeURIComponent(project.project)}`}
                >
                  {content.locale === 'uk' ? 'Відкрити кейс →' : content.locale === 'ru' ? 'Открыть кейс →' : 'Open case →'}
                </Link>
              </article>
            ))}
          </div>
        </section>

        {content.details ? (
          <>
            {content.details.developerTitle && content.details.developerParagraphs ? (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>{content.details.developerTitle}</h2>
                </div>
                <div className={styles.textStack}>
                  {content.details.developerParagraphs.map(paragraph => (
                    <p className={styles.longCopy} key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {content.details.relatedLinks?.length ? (
                  <div className={styles.relatedLinks}>
                    {content.details.relatedLinksTitle ? <h3 className={styles.relatedLinksTitle}>{content.details.relatedLinksTitle}</h3> : null}
                    {content.details.relatedLinksDescription ? <p className={styles.relatedLinksDescription}>{content.details.relatedLinksDescription}</p> : null}
                    <div className={styles.relatedLinkList}>
                      {content.details.relatedLinks.map(link => (
                        <Link className={styles.relatedLink} href={localizePath(content.locale, link.path)} key={link.path}>
                          {link.label} →
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </section>
            ) : null}

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{content.details.investmentTitle}</h2>
              </div>
              <div className={styles.textStack}>
                {content.details.investment.map(paragraph => <p className={styles.longCopy} key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          </>
        ) : null}

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

        {content.details ? (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{content.details.afterLaunchTitle}</h2>
            </div>
            <div className={styles.textStack}>
              {content.details.afterLaunch.map(paragraph => <p className={styles.longCopy} key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ) : null}

        <section className={`${styles.section} ${styles.ctaSection}`}>
          <h2 className={styles.ctaTitle}>{content.ctaTitle}</h2>
          <div>
            <p className={styles.ctaCopy}>{content.ctaDescription}</p>
            <ServiceInquiryButton>{content.ctaAction}</ServiceInquiryButton>
          </div>
        </section>
      </div>
    </main>
  )
}
