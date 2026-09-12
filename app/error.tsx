'use client'

import styles from './error.module.css'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className={styles.error}>
      <div className={styles.content}>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.copy}>The page could not be loaded. Please try again.</p>
        <button className={styles.button} type="button" onClick={reset}>Try again</button>
      </div>
    </main>
  )
}
