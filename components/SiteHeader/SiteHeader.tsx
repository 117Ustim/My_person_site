'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { localeLabels, type Locale, useI18n } from '../../lib/i18n'
import BrandLogo from '../BrandLogo/BrandLogo'
import { useProjectInquiry } from '../ProjectInquiry/ProjectInquiry'
import styles from './SiteHeader.module.css'

const simpleLinks = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.portfolio', href: '/portfolio' },
  { labelKey: 'nav.aboutMe', href: '/about' },
  { labelKey: 'nav.contacts', href: '/#contacts' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const { t, locale, setLocale } = useI18n()
  const { openInquiry } = useProjectInquiry()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  const handleMobileToggle = () => {
    setMobileOpen(current => !current)
  }

  const closeMenus = () => {
    setMobileOpen(false)
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <nav className={styles.nav} aria-label={t('common.mainNavigation')}>
          <Link className={styles.brand} href="/" aria-label={t('common.auHome')} onClick={closeMenus}>
            <BrandLogo className={styles.brandLogo} aria-label={t('common.auStudio')} />
          </Link>

          <div className={styles.desktopNav}>
            {simpleLinks.map(link => (
              <Link
                className={`${styles.navLink} ${pathname === link.href ? styles.activeLink : ''}`}
                key={link.href}
                href={link.href}
                onClick={closeMenus}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          <LanguageSwitcher locale={locale} onChange={setLocale} label={t('common.language')} variant="desktop" />

          <button className={styles.cta} type="button" onClick={() => { closeMenus(); openInquiry() }}>
            {t('nav.discussProject')}
          </button>

          <button
            className={styles.mobileButton}
            type="button"
            aria-label={mobileOpen ? t('common.closeMenu') : t('common.openMenu')}
            aria-expanded={mobileOpen}
            onClick={handleMobileToggle}
          >
            <span className={styles.menuIcon} aria-hidden="true" />
          </button>
        </nav>
      </div>

      <MobileMenu open={mobileOpen} onClose={closeMenus} onOpenInquiry={openInquiry} />
    </header>
  )
}

function LanguageSwitcher({
  locale,
  onChange,
  label,
  variant,
}: {
  locale: Locale
  onChange: (locale: Locale) => void
  label: string
  variant: 'desktop' | 'mobile'
}) {
  const [motion, setMotion] = useState<'left' | 'right' | null>(null)
  const languageOptions = Object.keys(localeLabels) as Locale[]

  const handleLanguageChange = (nextLocale: Locale) => {
    if (nextLocale === locale) return

    setMotion(languageOptions.indexOf(nextLocale) > languageOptions.indexOf(locale) ? 'right' : 'left')
    onChange(nextLocale)
  }

  return (
    <div
      className={`${styles.languageSwitcher} ${variant === 'desktop' ? styles.desktopLanguageSwitcher : styles.mobileLanguageSwitcher} ${motion === 'right' ? styles.languageSwitchRight : motion === 'left' ? styles.languageSwitchLeft : ''}`}
      data-active-locale={locale}
      aria-label={label}
      role="group"
    >
      <span className={styles.languageIndicator} aria-hidden="true" onAnimationEnd={() => setMotion(null)} />
      {languageOptions.map(item => (
        <button
          className={`${styles.languageButton} ${locale === item ? styles.activeLanguage : ''}`}
          type="button"
          key={item}
          aria-pressed={locale === item}
          onClick={() => handleLanguageChange(item)}
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  )
}

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  onOpenInquiry: () => void
}

function MobileMenu({ open, onClose, onOpenInquiry }: MobileMenuProps) {
  const { t, locale, setLocale } = useI18n()

  if (!open) return null

  return (
    <div className={styles.mobilePanel}>
      <nav className={styles.mobileNav} aria-label={t('common.mobileNavigation')}>
        {simpleLinks.map(link => (
          <div className={styles.mobileMenuItem} key={link.href}>
            <Link className={styles.mobileNavLink} href={link.href} onClick={onClose}>
              {t(link.labelKey)}
            </Link>
          </div>
        ))}

        <div className={styles.mobileLanguageRow}>
          <span>{t('common.language')}</span>
          <LanguageSwitcher locale={locale} onChange={setLocale} label={t('common.language')} variant="mobile" />
        </div>
        <button className={styles.mobileCta} type="button" onClick={() => { onClose(); onOpenInquiry() }}>
          {t('nav.discussProject')}
        </button>
      </nav>
    </div>
  )
}
