import type { ArticleDefinition } from '../../lib/page-data'
import styles from './ArticlePage.module.css'

type ArticlePageProps = {
  article: ArticleDefinition
}

export default function ArticlePage({ article }: ArticlePageProps) {
  return (
    <main className={styles.main}>
      <article className={styles.article}>
        {article.updated ? <p className={styles.updated}>Last updated: {article.updated}</p> : null}
        {article.eyebrow ? <p className={styles.eyebrow}>{article.eyebrow}</p> : null}
        <h1>{article.title}</h1>
        {article.intro ? <p className={styles.intro}>{article.intro}</p> : null}
        <div className={styles.sections}>
          {article.sections.map(section => (
            <section className={styles.section} key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul> : null}
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}
