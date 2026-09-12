import Image from 'next/image'
import type { FeatureItem } from '../../lib/page-data'
import styles from './FeatureGrid.module.css'

type FeatureGridProps = {
  items: FeatureItem[]
  columns?: 2 | 3
}

export default function FeatureGrid({ items, columns = 3 }: FeatureGridProps) {
  return (
    <div className={`${styles.grid} ${columns === 2 ? styles.twoColumns : ''}`}>
      {items.map(item => (
        <article className={styles.card} key={item.title}>
          <div className={styles.imageFrame}>
            <Image src={item.image} alt={item.imageAlt} fill sizes={columns === 2 ? '(max-width: 820px) 100vw, 50vw' : '(max-width: 820px) 100vw, 33vw'} />
          </div>
          <div className={styles.copy}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
