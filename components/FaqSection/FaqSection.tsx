'use client'

import { useState } from 'react'
import type { FaqItem } from '../../lib/page-data'
import styles from './FaqSection.module.css'

type FaqSectionProps = {
  items: FaqItem[]
}

export default function FaqSection({ items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div className={`${styles.item} ${isOpen ? styles.open : ''}`} key={item.question}>
            <button className={styles.question} type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? null : index)}>
              <span>{item.question}</span>
              <span className={styles.icon} aria-hidden="true" />
            </button>
            <div className={styles.answerFrame}>
              <div className={styles.answer}>{item.answer}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
