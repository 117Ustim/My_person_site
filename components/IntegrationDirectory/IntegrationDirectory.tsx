'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { IntegrationDefinition } from '../../lib/page-data'
import styles from './IntegrationDirectory.module.css'

type IntegrationDirectoryProps = {
  integrations: IntegrationDefinition[]
}

const categories = ['All', 'Email & Calendar', 'CRM', 'Storage', 'Wealth Platforms', 'AI assistants']

export default function IntegrationDirectory({ integrations }: IntegrationDirectoryProps) {
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
        <div className={styles.filters} role="tablist" aria-label="Integration categories">
          {categories.map(item => (
            <button className={`${styles.filter} ${category === item ? styles.activeFilter : ''}`} key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <label className={styles.search}>
          <span className={styles.searchIcon} aria-hidden="true" />
          <span className={styles.visuallyHidden}>Search integrations</span>
          <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search integrations..." />
        </label>
      </div>

      <div className={styles.groups}>
        {grouped.map(group => (
          <section className={styles.group} key={group.name}>
            <div className={styles.groupIntro}>
              <h2>{group.name}</h2>
              <p>{getCategoryDescription(group.name)}</p>
            </div>
            <div className={styles.cards}>
              {group.items.map(item => <IntegrationCard item={item} key={item.slug} />)}
            </div>
          </section>
        ))}
        {!grouped.length ? <p className={styles.empty}>No integrations match your search.</p> : null}
      </div>
    </div>
  )
}

function IntegrationCard({ item }: { item: IntegrationDefinition }) {
  return (
    <Link className={styles.card} href={`/integrations/${item.slug}`}>
      <Image className={styles.logo} src={item.logo} alt={`${item.name} logo`} width={40} height={40} />
      <h3>{item.name}</h3>
      <p>{item.cardDescription}</p>
    </Link>
  )
}

function getCategoryDescription(category: string) {
  if (category === 'Email & Calendar') return 'Connect your email and calendar to keep client communications and meetings in sync with Obsidian.'
  if (category === 'CRM') return 'Sync client records between Obsidian and your existing CRM from one source of truth.'
  if (category === 'Storage') return 'Automatically save meeting notes, reports, and client documents to your cloud storage.'
  if (category === 'AI assistants') return 'Connect AI assistants to your practice data securely via natural language.'
  return 'Aggregate client portfolio valuations from major UK wealth platforms into a single unified view.'
}
