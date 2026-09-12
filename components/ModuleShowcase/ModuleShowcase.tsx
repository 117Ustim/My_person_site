import Image from 'next/image'
import Link from 'next/link'
import type { ModuleShowcaseItem } from '../../lib/page-data'
import styles from './ModuleShowcase.module.css'

type ModuleShowcaseProps = {
  items: ModuleShowcaseItem[]
}

export default function ModuleShowcase({ items }: ModuleShowcaseProps) {
  return (
    <div className={styles.grid}>
      {items.map(item => (
        <article className={styles.card} key={item.title}>
          <div className={styles.visual}>
            {item.backgroundImage ? (
              <Image
                className={styles.background}
                src={item.backgroundImage}
                alt=""
                fill
                sizes="(max-width: 720px) 100vw, 50vw"
              />
            ) : null}
            <Image
              className={styles.foreground}
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
            />
          </div>
          <div className={styles.copy}>
            <div className={styles.copyBody}>
              <div className={styles.titleGroup}>
                <span className={`${styles.badge} ${item.badgeTone === 'green' ? styles.greenBadge : ''}`}>
                  {item.badge}
                </span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </div>
            <Link className={styles.action} href={item.href}>Learn more</Link>
          </div>
        </article>
      ))}
    </div>
  )
}
