'use client'

import { createContext, type FormEvent, type ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { useI18n } from '../../lib/i18n'
import styles from './ProjectInquiry.module.css'

type ProjectInquiryContextValue = {
  openInquiry: () => void
}

const ProjectInquiryContext = createContext<ProjectInquiryContextValue | null>(null)

export function ProjectInquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ProjectInquiryContext.Provider value={{ openInquiry: () => setIsOpen(true) }}>
      {children}
      <ProjectInquiryModal open={isOpen} onClose={() => setIsOpen(false)} />
    </ProjectInquiryContext.Provider>
  )
}

export function useProjectInquiry() {
  const context = useContext(ProjectInquiryContext)
  if (!context) throw new Error('useProjectInquiry must be used inside ProjectInquiryProvider')
  return context
}

type FormValues = {
  name: string
  email: string
  message: string
}

function ProjectInquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n()
  const firstInputRef = useRef<HTMLInputElement>(null)
  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '' })
  const [isPrepared, setIsPrepared] = useState(false)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstInputRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, open])

  if (!open) return null

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const subject = encodeURIComponent(`Запит на проєкт від ${values.name}`)
    const body = encodeURIComponent(`Ім’я: ${values.name}\nEmail: ${values.email}\n\nОпис проєкту:\n${values.message}`)
    window.location.href = `mailto:ustik72@gmail.com?subject=${subject}&body=${body}`
    setIsPrepared(true)
  }

  const updateField = (field: keyof FormValues, value: string) => {
    setValues(current => ({ ...current, [field]: value }))
    setIsPrepared(false)
  }

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="project-inquiry-title">
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{t('contact.modalEyebrow')}</p>
            <h2 id="project-inquiry-title">{t('contact.modalTitle')}</h2>
          </div>
          <button className={styles.close} type="button" aria-label={t('contact.close')} onClick={onClose}>×</button>
        </div>

        <p className={styles.description}>{t('contact.modalDescription')}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            <span>{t('contact.nameLabel')}</span>
            <input ref={firstInputRef} required value={values.name} onChange={event => updateField('name', event.target.value)} placeholder={t('contact.namePlaceholder')} />
          </label>
          <label>
            <span>{t('contact.emailLabel')}</span>
            <input required type="email" value={values.email} onChange={event => updateField('email', event.target.value)} placeholder={t('contact.emailPlaceholder')} />
          </label>
          <label>
            <span>{t('contact.messageLabel')}</span>
            <textarea required rows={5} value={values.message} onChange={event => updateField('message', event.target.value)} placeholder={t('contact.messagePlaceholder')} />
          </label>
          <button className={styles.submit} type="submit">{t('contact.submit')} <span aria-hidden="true">→</span></button>
        </form>

        {isPrepared ? <p className={styles.status} role="status">{t('contact.mailClientStatus')}</p> : null}
      </section>
    </div>
  )
}
