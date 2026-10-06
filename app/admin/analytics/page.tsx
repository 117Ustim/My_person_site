import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getAdminSession } from '../../../lib/admin-auth'
import { getAnalyticsSnapshot, type VisitEvent } from '../../../lib/visit-analytics'
import { logoutAdmin } from './actions'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Аналитика сайта',
  robots: {
    index: false,
    follow: false,
  },
}

const pageLabels: Record<string, string> = {
  home: 'Главная',
  portfolio: 'Портфолио',
  about: 'Обо мне',
}

function formatVisitedAt(value: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}

function formatLocation(event: VisitEvent) {
  const location = [event.city, event.country].filter(value => value && value !== 'unknown')
  return location.length ? location.join(', ') : 'Не определено'
}

export default async function AdminAnalyticsPage() {
  if (!(await getAdminSession())) {
    redirect('/admin/login')
  }

  const snapshot = await getAnalyticsSnapshot()

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>PRIVATE AREA</p>
            <h1 className={styles.title}>Аналитика сайта</h1>
            <p className={styles.subtitle}>Последние события и счётчики посещений.</p>
          </div>
          <div className={styles.headerActions}>
            <a className={styles.secondaryButton} href="/admin/analytics">
              Обновить
            </a>
            <form action={logoutAdmin}>
              <button className={styles.secondaryButton} type="submit">
                Выйти
              </button>
            </form>
          </div>
        </header>

        <section className={styles.stats} aria-label="Счётчики страниц">
          {Object.entries(snapshot.pageCounts).map(([page, count]) => (
            <article className={styles.statCard} key={page}>
              <span className={styles.statLabel}>{pageLabels[page] ?? page}</span>
              <strong className={styles.statValue}>{count}</strong>
              <span className={styles.statHint}>реальные визиты</span>
            </article>
          ))}
          <article className={styles.statCard}>
            <span className={styles.statLabel}>Боты</span>
            <strong className={styles.statValue}>{snapshot.botEvents.length}</strong>
            <span className={styles.statHint}>последние события</span>
          </article>
          <article className={styles.statCard}>
            <span className={styles.statLabel}>Мои визиты</span>
            <strong className={styles.statValue}>{snapshot.ownerEvents.length}</strong>
            <span className={styles.statHint}>последние события</span>
          </article>
        </section>

        <section className={styles.section} aria-labelledby="recent-visits-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>HUMAN VISITS</p>
              <h2 className={styles.sectionTitle} id="recent-visits-title">
                Последние визиты
              </h2>
            </div>
            <span className={styles.sectionHint}>Хранение: до 90 дней или 2000 событий</span>
          </div>

          {snapshot.humanEvents.length ? (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Время</th>
                    <th>Место</th>
                    <th>Устройство</th>
                    <th>Страница</th>
                    <th>Источник</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.humanEvents.map(event => (
                    <tr key={event.id}>
                      <td>{formatVisitedAt(event.visitedAt)}</td>
                      <td>{formatLocation(event)}</td>
                      <td>
                        {event.device} · {event.browser}
                      </td>
                      <td>{pageLabels[event.page] ?? event.page}</td>
                      <td>{event.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className={styles.empty}>Визитов пока нет.</p>
          )}
        </section>

        <section className={styles.section} aria-labelledby="owner-visits-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>OWNER VISITS</p>
              <h2 className={styles.sectionTitle} id="owner-visits-title">
                Мои визиты
              </h2>
            </div>
          </div>

          {snapshot.ownerEvents.length ? (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Время</th>
                    <th>Место</th>
                    <th>Устройство</th>
                    <th>Страница</th>
                    <th>Источник</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.ownerEvents.map(event => (
                    <tr key={event.id}>
                      <td>{formatVisitedAt(event.visitedAt)}</td>
                      <td>{formatLocation(event)}</td>
                      <td>
                        {event.device} · {event.browser}
                      </td>
                      <td>{pageLabels[event.page] ?? event.page}</td>
                      <td>{event.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className={styles.empty}>Ваших визитов пока нет.</p>
          )}
        </section>

        <section className={styles.section} aria-labelledby="bot-visits-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>BOT FILTER</p>
              <h2 className={styles.sectionTitle} id="bot-visits-title">
                Отфильтрованные боты
              </h2>
            </div>
          </div>

          {snapshot.botEvents.length ? (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Время</th>
                    <th>Место</th>
                    <th>Страница</th>
                    <th>Причина</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.botEvents.map(event => (
                    <tr key={event.id}>
                      <td>{formatVisitedAt(event.visitedAt)}</td>
                      <td>{formatLocation(event)}</td>
                      <td>{pageLabels[event.page] ?? event.page}</td>
                      <td>{event.botReason ?? 'Неизвестно'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className={styles.empty}>Отфильтрованных запросов пока нет.</p>
          )}
        </section>
      </div>
    </main>
  )
}
