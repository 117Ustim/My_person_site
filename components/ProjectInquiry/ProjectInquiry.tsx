'use client'

import Image from 'next/image'
import { Mail } from 'lucide-react'
import { createContext, type FormEvent, type ReactNode, type UIEvent, useContext, useEffect, useRef, useState } from 'react'
import { type Locale, useI18n } from '../../lib/i18n'
import BrandLogo from '../BrandLogo/BrandLogo'
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

type ContactChannel = 'email' | 'telegram' | 'whatsapp'

const invalidNameCharacters = /[^\p{L}\p{M}\s'’ʼ-]/gu
const invalidEmailCharacters = /[^A-Za-z0-9._%+@-]/g

function capitalizeFirstLetter(value: string, locale: Locale) {
  return value.replace(/\p{L}/u, letter => letter.toLocaleUpperCase(locale))
}

function sanitizeName(value: string, locale: Locale) {
  return capitalizeFirstLetter(value.replace(invalidNameCharacters, '').replace(/\s{2,}/g, ' '), locale)
}

function ProjectInquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { locale, t } = useI18n()
  const firstInputRef = useRef<HTMLInputElement>(null)
  const messageFieldRef = useRef<HTMLLabelElement>(null)
  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '' })
  const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [scrollIndicatorOffset, setScrollIndicatorOffset] = useState(0)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setDeliveryStatus('idle')
    setScrollIndicatorOffset(0)
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

  const handleDelivery = async (channel: ContactChannel) => {
    setDeliveryStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel, ...values }),
      })

      if (!response.ok) throw new Error('Contact delivery failed')

      setDeliveryStatus('success')
    } catch {
      setDeliveryStatus('error')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void handleDelivery('email')
  }

  const updateField = (field: keyof FormValues, value: string) => {
    setValues(current => ({ ...current, [field]: value }))
    setDeliveryStatus('idle')
  }

  const handleNameChange = (value: string) => {
    updateField('name', sanitizeName(value, locale))
  }

  const handleEmailChange = (value: string) => {
    updateField('email', value.replace(invalidEmailCharacters, ''))
  }

  const handleMessageChange = (value: string) => {
    updateField('message', capitalizeFirstLetter(value, locale))
  }

  const handleMessageScroll = (event: UIEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget
    const scrollRange = textarea.scrollHeight - textarea.clientHeight
    const progress = scrollRange > 0 ? textarea.scrollTop / scrollRange : 0
    const fieldHeight = messageFieldRef.current?.clientHeight ?? 148
    const maxOffset = Math.max(0, fieldHeight - 15 - 42 - 30)
    setScrollIndicatorOffset(progress * maxOffset)
  }

  return (
    <div className={styles.backdrop} data-lenis-prevent role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className={styles.dialog} lang={locale} role="dialog" aria-modal="true" aria-labelledby="project-inquiry-title">
        <div className={styles.linework} aria-hidden="true">
          <Image src="/assets/project-inquiry-linework.png?v=20260927-4" alt="" fill priority unoptimized sizes="(max-width: 620px) 100vw, 1180px" />
        </div>
        <div className={styles.decorativeArc} aria-hidden="true" />
        <BrandLogo className={styles.watermarkLogo} aria-label={t('common.auStudio')} />
        <button className={styles.close} type="button" aria-label={t('contact.close')} onClick={onClose}>×</button>

        <div className={styles.intro}>
          <p className={styles.eyebrow}>{t('contact.modalEyebrow')}</p>
          <h2 id="project-inquiry-title">
            <span>{t('contact.modalTitleLead')}</span>
            <span className={styles.titleSecondLine}>{t('contact.modalTitleSecondLead')} <em>{t('contact.modalTitleAccent')}</em></span>
          </h2>
          <p className={styles.description}>{t('contact.modalDescription')}</p>
        </div>

        <aside className={styles.conversation} aria-label={t('contact.modalConversation')}>
          <div className={styles.avatar}>
            <Image src="/assets/home-founder-avatar.png" alt={t('contact.modalPortraitAlt')} fill sizes="92px" />
          </div>
          <p className={styles.conversationLabel}>{t('contact.modalConversation')}</p>
          <ol className={styles.steps}>
            <li>{t('contact.modalStepIdea')}</li>
            <li>{t('contact.modalStepDetails')}</li>
            <li>{t('contact.modalStepReply')}</li>
          </ol>
        </aside>

        <p className={styles.footnote}>{t('contact.modalFootnote')}</p>
        <p className={styles.signature}>{t('contact.modalSignature')}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            <span>{t('contact.nameLabel')}</span>
            <input ref={firstInputRef} required minLength={2} maxLength={80} autoComplete="name" autoCapitalize="words" inputMode="text" lang={locale} value={values.name} onChange={event => handleNameChange(event.target.value)} placeholder={t('contact.namePlaceholder')} />
          </label>
          <label>
            <span>{t('contact.emailLabel')}</span>
            <input required type="email" minLength={5} maxLength={254} autoComplete="email" autoCapitalize="none" autoCorrect="off" spellCheck={false} inputMode="email" lang="en" dir="ltr" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}" value={values.email} onChange={event => handleEmailChange(event.target.value)} placeholder={t('contact.emailPlaceholder')} />
          </label>
          <label ref={messageFieldRef} className={styles.messageField}>
            <span>{t('contact.messageLabel')}</span>
            <textarea required rows={5} minLength={3} maxLength={3000} autoCapitalize="sentences" lang={locale} value={values.message} onChange={event => handleMessageChange(event.target.value)} onScroll={handleMessageScroll} placeholder={t('contact.messagePlaceholder')} />
            <span className={styles.scrollIndicator} style={{ transform: `translateY(${scrollIndicatorOffset}px)` }} aria-hidden="true" />
          </label>
          <div className={styles.formActions}>
            <button className={styles.channelButton} type="submit" disabled={deliveryStatus === 'sending'}>
              <Mail className={styles.emailIcon} aria-hidden="true" strokeWidth={1.7} />
              <span>{t('contact.emailAction')}</span>
            </button>
            <button className={styles.channelButton} type="button" disabled={deliveryStatus === 'sending'} onClick={() => void handleDelivery('telegram')}>
              <TelegramIcon />
              <span>{t('contact.telegramAction')}</span>
            </button>
            <button className={styles.channelButton} type="button" disabled={deliveryStatus === 'sending'} onClick={() => void handleDelivery('whatsapp')}>
              <WhatsAppIcon />
              <span>{t('contact.whatsappAction')}</span>
            </button>
          </div>
        </form>

        {deliveryStatus === 'success' ? <p className={styles.status} role="status">{t('contact.deliveryStubStatus')}</p> : null}
        {deliveryStatus === 'error' ? <p className={`${styles.status} ${styles.statusError}`} role="alert">{t('contact.deliveryError')}</p> : null}
      </section>
    </div>
  )
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m21.3 3.2-18.5 7.1c-1.3.5-1.3 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.3.8.7.8.3 0 .5-.1.7-.3l2.3-2.2 4.8 3.5c.9.5 1.5.3 1.7-.8l3.1-14.5c.3-1.4-.5-2-1.6-1.5Zm-11 9.8 9.3-5.9c.5-.3.9-.1.5.2l-7.6 6.8-.3 3.4-1.9-4.5Z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.25a9.75 9.75 0 0 0-8.37 14.77L2.5 21.5l4.65-1.18A9.75 9.75 0 1 0 12 2.25Zm0 17.75a7.94 7.94 0 0 1-4.04-1.1l-.29-.17-2.76.7.74-2.68-.19-.29A8 8 0 1 1 12 20Zm4.42-5.98c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.15 1.52.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}
