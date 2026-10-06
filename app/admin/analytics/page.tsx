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

function formatVisitedRange(firstVisitedAt: string, lastVisitedAt: string) {
  return firstVisitedAt === lastVisitedAt
    ? formatVisitedAt(firstVisitedAt)
    : `${formatVisitedAt(firstVisitedAt)} — ${formatVisitedAt(lastVisitedAt)}`
}

function groupHumanVisits(events: VisitEvent[]) {
  const grouped = new Map<string, VisitEvent[]>()

  for (const event of events) {
    const visitorEvents = grouped.get(event.visitorId) ?? []
    visitorEvents.push(event)
    grouped.set(event.visitorId, visitorEvents)
  }

  return Array.from(grouped.values())
    .map(visitorEvents => {
      const chronologicalEvents = [...visitorEvents].sort(
        (first, second) => new Date(first.visitedAt).getTime() - new Date(second.visitedAt).getTime(),
      )
      const firstEvent = chronologicalEvents[0]
      const lastEvent = chronologicalEvents[chronologicalEvents.length - 1]

      return {
        id: firstEvent.visitorId,
        firstVisitedAt: firstEvent.visitedAt,
        lastVisitedAt: lastEvent.visitedAt,
        location: formatLocation(lastEvent),
        device: `${lastEvent.device} · ${lastEvent.browser}`,
        pages: Array.from(new Set(chronologicalEvents.map(event => event.page))),
        source: lastEvent.source,
      }
    })
    .sort(
      (first, second) => new Date(second.lastVisitedAt).getTime() - new Date(first.lastVisitedAt).getTime(),
    )
}

export default async function AdminAnalyticsPage() {
  if (!(await getAdminSession())) {
    redirect('/admin/login')
  }

  const snapshot = await getAnalyticsSnapshot()
  const groupedHumanVisits = groupHumanVisits(snapshot.humanEvents)

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

        <details className={styles.section}>
          <summary className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>HUMAN VISITS</p>
              <h2 className={styles.sectionTitle} id="recent-visits-title">
                Последние визиты
              </h2>
            </div>
            <span className={styles.sectionHint}>Хранение: до 90 дней или 2000 событий</span>
          </summary>

          {groupedHumanVisits.length ? (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Время</th>
                    <th>Место</th>
                    <th>Устройство</th>
                    <th>Страницы</th>
                    <th>Источник</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedHumanVisits.map(visitor => (
                    <tr key={visitor.id}>
                      <td>{formatVisitedRange(visitor.firstVisitedAt, visitor.lastVisitedAt)}</td>
                      <td>{visitor.location}</td>
                      <td>{visitor.device}</td>
                      <td>
                        <div className={styles.pageTags} aria-label="Посещённые страницы">
                          {visitor.pages.map(page => (
                            <span className={styles.pageTag} key={page}>
                              {pageLabels[page] ?? page}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>{visitor.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className={styles.empty}>Визитов пока нет.</p>
          )}
        </details>

        <details className={styles.section}>
          <summary className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>OWNER VISITS</p>
              <h2 className={styles.sectionTitle} id="owner-visits-title">
                Мои визиты
              </h2>
            </div>
          </summary>

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
        </details>

        <details className={styles.section}>
          <summary className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>BOT FILTER</p>
              <h2 className={styles.sectionTitle} id="bot-visits-title">
                Отфильтрованные боты
              </h2>
            </div>
          </summary>

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
        </details>
      </div>
    </main>
  )
}
