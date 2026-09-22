'use client'

import { useI18n } from '../../lib/i18n'
import type { ArticleDefinition } from '../../lib/page-data'
import styles from './ArticlePage.module.css'

type ArticlePageProps = {
  article: ArticleDefinition
}

export default function ArticlePage({ article }: ArticlePageProps) {
  const { t, localize } = useI18n()

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        {article.updated ? <p className={styles.updated}>{t('article.lastUpdated')}: {article.updated}</p> : null}
        {article.eyebrow ? <p className={styles.eyebrow}>{localize(article.eyebrow)}</p> : null}
        <h1>{localize(article.title)}</h1>
        {article.intro ? <p className={styles.intro}>{localize(article.intro)}</p> : null}
        <div className={styles.sections}>
          {article.sections.map(section => (
            <section className={styles.section} key={section.title}>
              <h2>{localize(section.title)}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{localize(paragraph)}</p>)}
              {section.bullets ? <ul>{section.bullets.map(bullet => <li key={bullet}>{localize(bullet)}</li>)}</ul> : null}
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}
