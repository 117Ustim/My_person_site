'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useI18n } from '../../lib/i18n'
import type { IntegrationDefinition } from '../../lib/page-data'
import styles from './IntegrationDirectory.module.css'

type IntegrationDirectoryProps = {
  integrations: IntegrationDefinition[]
}

const categories = ['All', 'Email & Calendar', 'CRM', 'Storage', 'Wealth Platforms', 'AI assistants'] as const

export default function IntegrationDirectory({ integrations }: IntegrationDirectoryProps) {
  const { t } = useI18n()
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const query = search.trim().toLowerCase()

  const filtered = useMemo(() => integrations.filter(item => {
    const matchesCategory = category === 'All' || item.category === category
    const matchesSearch = !query || `${item.name} ${item.category}`.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  }), [category, integrations, query])

  const grouped = categories.slice(1).map(name => ({
    name,
    items: filtered.filter(item => item.category === name),
  })).filter(group => group.items.length > 0)

  return (
    <div className={styles.directory}>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="tablist" aria-label={t('directory.categories')}>
          {categories.map(item => (
            <button className={`${styles.filter} ${category === item ? styles.activeFilter : ''}`} key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)}>
              {getCategoryLabel(item, t)}
            </button>
          ))}
        </div>
        <label className={styles.search}>
          <span className={styles.searchIcon} aria-hidden="true" />
          <span className={styles.visuallyHidden}>{t('directory.searchLabel')}</span>
          <input value={search} onChange={event => setSearch(event.target.value)} placeholder={t('directory.searchPlaceholder')} />
        </label>
      </div>

      <div className={styles.groups}>
        {grouped.map(group => (
          <section className={styles.group} key={group.name}>
            <div className={styles.groupIntro}>
              <h2>{getCategoryLabel(group.name, t)}</h2>
              <p>{getCategoryDescription(group.name, t)}</p>
            </div>
            <div className={styles.cards}>
              {group.items.map(item => <IntegrationCard item={item} key={item.slug} />)}
            </div>
          </section>
        ))}
        {!grouped.length ? <p className={styles.empty}>{t('directory.empty')}</p> : null}
      </div>
    </div>
  )
}

function IntegrationCard({ item }: { item: IntegrationDefinition }) {
  const { t } = useI18n()

  return (
    <Link className={styles.card} href={`/integrations/${item.slug}`}>
      <Image className={styles.logo} src={item.logo} alt={`${item.name} ${t('common.logoSuffix')}`} width={40} height={40} />
      <h3>{item.name}</h3>
      <p>{t('integration.cardDescription', { category: getCategoryLabel(item.category as typeof categories[number], t), name: item.name })}</p>
    </Link>
  )
}

function getCategoryLabel(category: typeof categories[number], t: (key: string) => string) {
  if (category === 'All') return t('directory.all')
  if (category === 'Email & Calendar') return t('directory.emailCalendar')
  if (category === 'CRM') return t('directory.crm')
  if (category === 'Storage') return t('directory.storage')
  if (category === 'AI assistants') return t('directory.aiAssistants')
  return t('directory.wealthPlatforms')
}

function getCategoryDescription(category: string, t: (key: string) => string) {
  if (category === 'Email & Calendar') return t('directory.emailCalendarDescription')
  if (category === 'CRM') return t('directory.crmDescription')
  if (category === 'Storage') return t('directory.storageDescription')
  if (category === 'AI assistants') return t('directory.aiAssistantsDescription')
  return t('directory.wealthPlatformsDescription')
}
