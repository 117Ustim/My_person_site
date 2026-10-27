import type { Metadata } from 'next'
import LoginForm from './LoginForm'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Вход в аналитику',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLoginPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="admin-login-title">
        <p className={styles.eyebrow}>PRIVATE AREA</p>
        <h1 className={styles.title} id="admin-login-title">
          Вход в аналитику
        </h1>
        <p className={styles.description}>Доступ только для администратора сайта.</p>
        <LoginForm />
      </section>
    </main>
  )
}
