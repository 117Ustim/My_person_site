'use client'

import Image from 'next/image'
import { useI18n } from '../../lib/i18n'
import type { CapabilityItem } from '../../lib/page-data'
import styles from './CapabilityShowcase.module.css'

type CapabilityShowcaseProps = {
  items: CapabilityItem[]
}

type CardPosition = 'top' | 'bottom'

const TOP_SHAPE_PATH =
  'M 28 0 H 972 Q 1000 0 1000 28 V 126 Q 1000 154 972 154 H 578 Q 550 154 550 182 V 376 Q 550 404 522 404 H 28 Q 0 404 0 376 V 28 Q 0 0 28 0 Z'

const BOTTOM_SHAPE_PATH =
  'M 478 0 H 972 Q 1000 0 1000 28 V 376 Q 1000 404 972 404 H 28 Q 0 404 0 376 V 278 Q 0 250 28 250 H 422 Q 450 250 450 222 V 28 Q 450 0 478 0 Z'

function ShapeDefinitions() {
  return (
    <svg className={styles.shapeDefinitions} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="capability-top-shape" clipPathUnits="objectBoundingBox">
          <path d="M .028 0 H .972 Q 1 0 1 .0693 V .3119 Q 1 .3812 .972 .3812 H .578 Q .55 .3812 .55 .4505 V .9307 Q .55 1 .522 1 H .028 Q 0 1 0 .9307 V .0693 Q 0 0 .028 0 Z" />
        </clipPath>
        <clipPath id="capability-bottom-shape" clipPathUnits="objectBoundingBox">
          <path d="M .478 0 H .972 Q 1 0 1 .0693 V .9307 Q 1 1 .972 1 H .028 Q 0 1 0 .9307 V .6881 Q 0 .6188 .028 .6188 H .422 Q .45 .6188 .45 .5495 V .0693 Q .45 0 .478 0 Z" />
        </clipPath>
      </defs>
    </svg>
  )
}

function CapabilityCard({ item, position }: { item: CapabilityItem; position: CardPosition }) {
  const { t } = useI18n()
  const isTop = position === 'top'
  const imageDimmedClass = item.imageDimmed === 'light'
    ? styles.imageDimmedLight
    : item.imageDimmed === 'medium'
      ? styles.imageDimmedMedium
      : item.imageDimmed === 'strong'
        ? styles.imageDimmedStrong
        : ''

  return (
    <article className={`${styles.card} ${isTop ? styles.topCard : styles.bottomCard}`}>
      <div className={`${styles.surface} ${isTop ? styles.topSurface : styles.bottomSurface}`}>
        <div className={styles.visual}>
          <div className={styles.visualFrame}>
            <div className={styles.imageViewport}>
              <Image
                className={`${styles.image} ${item.imagePosition === 'top' ? styles.imageTop : ''} ${imageDimmedClass}`}
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 56vw"
              />
            </div>
          </div>
        </div>
        <div className={styles.copy}>
          <div className={styles.meta}>
            <span className={styles.number}>{item.number}</span>
            <span className={styles.category}>{item.category}</span>
          </div>
          <div className={styles.copyBody}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className={styles.stack} aria-label={`${t('capability.technologies')}: ${item.technologies.join(', ')}`}>
              {item.technologies.map(technology => <span key={technology}>{technology}</span>)}
            </div>
          </div>
        </div>
      </div>
      <svg
        className={styles.outline}
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1000 404"
        preserveAspectRatio="none"
      >
        <path className={styles.outlinePath} d={isTop ? TOP_SHAPE_PATH : BOTTOM_SHAPE_PATH} vectorEffect="non-scaling-stroke" />
      </svg>
    </article>
  )
}

export default function CapabilityShowcase({ items }: CapabilityShowcaseProps) {
  const pairs = Array.from({ length: Math.ceil(items.length / 2) }, (_, index) => items.slice(index * 2, index * 2 + 2))

  return (
    <div className={styles.pairs}>
      <ShapeDefinitions />
      {pairs.map(pair => {
        const [topItem, bottomItem] = pair

        if (!topItem || !bottomItem) return null

        return (
          <div className={styles.pair} key={`${topItem.title}-${bottomItem.title}`}>
            <CapabilityCard item={topItem} position="top" />
            <CapabilityCard item={bottomItem} position="bottom" />
          </div>
        )
      })}
    </div>
  )
}
