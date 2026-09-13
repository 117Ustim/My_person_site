import styles from './TechnologyMarquee.module.css'

type TechnologyName =
  | 'React'
  | 'Next.js'
  | 'TypeScript'
  | 'Node.js'
  | 'React Native'
  | 'Swift'
  | 'Firebase'
  | 'PostgreSQL'
  | 'GitHub'

type TechnologyMarqueeProps = {
  technologies: ReadonlyArray<TechnologyName>
  label: string
  withHeroFade?: boolean
}

function TechnologyIcon({ technology }: { technology: TechnologyName }) {
  if (technology === 'React' || technology === 'React Native') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="3.2" fill="currentColor" />
        <ellipse cx="16" cy="16" rx="13" ry="5.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <ellipse cx="16" cy="16" rx="13" ry="5.2" fill="none" stroke="currentColor" strokeWidth="1.8" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5.2" fill="none" stroke="currentColor" strokeWidth="1.8" transform="rotate(120 16 16)" />
      </svg>
    )
  }

  if (technology === 'Next.js') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill="currentColor" />
        <path d="M11 22V10h2.3l7.5 8.2V10H23v12h-2.2l-7.5-8.2V22H11Z" fill="#171615" />
      </svg>
    )
  }

  if (technology === 'TypeScript') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="2.5" y="2.5" width="27" height="27" rx="5" fill="currentColor" />
        <path d="M8 13h9v3h-3v8h-3v-8H8v-3Zm11.2 0H24c1.9 0 3.2.9 3.7 2.5l-2.8 1.1c-.2-.6-.7-.9-1.3-.9h-1.4c-.7 0-1 .2-1 .6 0 .4.3.6 1 .8l1.7.5c1.9.5 2.9 1.5 2.9 3.1 0 2-1.5 3.3-4.1 3.3h-1c-2.1 0-3.5-.9-4.1-2.7l2.8-1.1c.3.7.9 1 1.7 1h.8c.8 0 1.2-.2 1.2-.6 0-.4-.3-.6-1-.8l-1.7-.5c-1.9-.5-2.9-1.6-2.9-3.2 0-1.9 1.4-3.1 3.7-3.1Z" fill="#171615" />
      </svg>
    )
  }

  if (technology === 'Node.js') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="m16 2.7 11.5 6.6v13.4L16 29.3 4.5 22.7V9.3L16 2.7Z" fill="currentColor" />
        <path d="m10 12 6 3.4 6-3.4v7.6l-6 3.4-6-3.4V12Z" fill="#171615" opacity=".72" />
        <path d="M13 17.1v2.2l3 1.7 3-1.7v-2.2l-3 1.7-3-1.7Z" fill="#171615" />
      </svg>
    )
  }

  if (technology === 'Swift') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M25.8 20.1c1-1.8 1.4-3.8 1.1-5.8-1.2 1.5-2.6 2.8-4.3 3.7-2.4-5.1-6.3-8.1-11.9-10.7 1.1 2.7 3.1 5.2 5.6 7.1-2.8-.9-5.5-2.3-7.8-4.1 1.6 3.1 4.2 5.7 7.4 7.3-2.7.6-5.6.3-8.2-.7 2.4 2.5 5.7 3.8 9.2 3.8 2.7 0 4.9-.7 6.5-2.1 1.3 1.3 2.1 2.9 2.4 4.7 1.1-.7 1.8-1.8 2-3.2-.6.1-1.3.1-2 .0Z" fill="currentColor" />
      </svg>
    )
  }

  if (technology === 'Firebase') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="m7.2 24.7 2.1-16.8c.1-.7 1-.9 1.4-.3l3.1 5.4 2.2-4.2c.3-.6 1.2-.5 1.4.1l7.4 15.8H7.2Z" fill="currentColor" />
        <path d="m7.2 24.7 9-5.7 8.6 5.7H7.2Z" fill="#171615" opacity=".28" />
      </svg>
    )
  }

  if (technology === 'PostgreSQL') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3.3c-5.6 0-9.2 3.8-8.7 8.7.3 2.8 1.8 4.2 3.4 5.3-1.1 2.6-.9 5.5.9 7.2 1.5 1.4 3.3.8 4.4-.3v3.2c0 1 .8 1.6 1.7 1.6 1 0 1.7-.6 1.7-1.6v-6.1c1.2 1.2 3.1 1.6 4.7.6 2-1.3 2.3-4.1 1.2-6.5 1.2-1.2 1.9-2.7 1.8-4.6-.2-4.6-4-7.5-9.1-7.5Z" fill="currentColor" />
        <path d="M12.2 10.1c1.2-.8 2.5-.8 3.8-.1M19.1 10c1.2-.8 2.5-.7 3.6.1" fill="none" stroke="#171615" strokeLinecap="round" strokeWidth="1.4" />
        <circle cx="13.5" cy="12.2" r="1.1" fill="#171615" />
        <circle cx="20.5" cy="12.2" r="1.1" fill="#171615" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3.2c-7.1 0-12.8 5.7-12.8 12.8 0 5.7 3.7 10.6 8.9 12.2.7.1 1-.3 1-.7v-2.4c-3.6.8-4.4-1.7-4.4-1.7-.6-1.5-1.4-1.9-1.4-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.1 2 2.9 1.4 3.6 1.1.1-.8.4-1.4.8-1.7-2.8-.3-5.8-1.4-5.8-6.3 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.6.1-3.3 0 0 1.1-.3 3.5 1.3 1-.3 2.1-.4 3.2-.4s2.2.1 3.2.4c2.4-1.6 3.5-1.3 3.5-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.4 0 4.9-3 6-5.8 6.3.5.4.9 1.2.9 2.4v3.5c0 .4.3.8 1 .7 5.2-1.6 8.9-6.5 8.9-12.2C28.8 8.9 23.1 3.2 16 3.2Z" fill="currentColor" />
    </svg>
  )
}

function TechnologyGroup({ technologies }: { technologies: ReadonlyArray<TechnologyName> }) {
  return (
    <div className={styles.group}>
      {technologies.map((technology) => (
        <div className={styles.item} key={technology}>
          <span className={`${styles.icon} ${styles[`icon${technology.replace(/[^a-z]/gi, '')}`]}`}>
            <TechnologyIcon technology={technology} />
          </span>
          <span>{technology}</span>
        </div>
      ))}
    </div>
  )
}

export default function TechnologyMarquee({ technologies, label, withHeroFade = false }: TechnologyMarqueeProps) {
  return (
    <section className={`${styles.section} ${withHeroFade ? styles.withHeroFade : ''}`} aria-label={label}>
      <p className={styles.label}>{label}</p>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <TechnologyGroup technologies={technologies} />
          <div aria-hidden="true">
            <TechnologyGroup technologies={technologies} />
          </div>
        </div>
      </div>
    </section>
  )
}
