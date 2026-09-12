import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import styles from './MarketingHero.module.css'

type MarketingHeroProps = {
  eyebrow?: string
  title: string
  description: string
  image?: string
  imageAlt?: string
  leftImage?: string
  rightImage?: string
  actionLabel?: string
  actionHref?: string
  children?: ReactNode
  compact?: boolean
  variant?: 'default' | 'home'
}

export default function MarketingHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  leftImage,
  rightImage,
  actionLabel = 'Get Started For Free',
  actionHref = 'mailto:support@obsidianos.com',
  children,
  compact = false,
  variant = 'default',
}: MarketingHeroProps) {
  const words = title.split(' ')
  const isFounderRock = rightImage?.includes('hero-founder-transparent')

  return (
    <section className={`${styles.hero} ${compact ? styles.compact : ''} ${variant === 'home' ? styles.homeHero : ''}`}>
      <div className={styles.backgroundGlow} aria-hidden="true" />
      {leftImage ? <div className={`${styles.rockFrame} ${styles.leftRock}`}><Image className={styles.rock} src={leftImage} alt="" fill sizes="42vw" priority /></div> : null}
      {rightImage ? <div className={`${styles.rockFrame} ${styles.rightRock} ${isFounderRock ? styles.founderRock : ''}`}><Image className={styles.rock} src={rightImage} alt="" fill sizes="42vw" priority /></div> : null}
      {image ? <div className={styles.heroImageFrame}><Image className={styles.heroImage} src={image} alt={imageAlt} fill sizes="min(100vw, 1000px)" priority /></div> : null}

      <div className={styles.content}>
        {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
        <h1 className={styles.title} aria-label={title}>
          {words.map((word, index) => (
            <span
              className={styles.word}
              key={`${word}-${index}`}
              style={{ '--word-delay': `${index * 45}ms` } as CSSProperties}
              aria-hidden="true"
            >
              {word}
            </span>
          ))}
        </h1>
        <p className={styles.description}>{description}</p>
        {actionLabel ? <Link className={styles.action} href={actionHref}>{actionLabel}</Link> : null}
        {children}
      </div>
    </section>
  )
}
