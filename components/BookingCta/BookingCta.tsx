import Link from 'next/link'
import styles from './BookingCta.module.css'

type BookingCtaProps = {
  title?: string
  description?: string
}

export default function BookingCta({ title = 'Ready to get started?', description = 'See how Obsidian can give your firm more time to focus on advice.' }: BookingCtaProps) {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link className={styles.action} href="mailto:support@obsidianos.com">Get started</Link>
      </div>
    </section>
  )
}
