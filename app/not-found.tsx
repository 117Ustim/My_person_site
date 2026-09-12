import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.copy}>This page does not exist.</p>
        <Link className={styles.link} href="/">Back to home</Link>
      </div>
    </main>
  )
}
