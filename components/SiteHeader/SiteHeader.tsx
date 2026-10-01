'use client'

import Link from 'next/link'
import { ArrowUpRight, Lightbulb, PanelsTopLeft, Smartphone, Sparkles } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { type MouseEvent, useEffect, useRef, useState } from 'react'
import { localeLabels, type Locale, useI18n } from '../../lib/i18n'
import BrandLogo from '../BrandLogo/BrandLogo'
import { useProjectInquiry } from '../ProjectInquiry/ProjectInquiry'
import styles from './SiteHeader.module.css'

const simpleLinks = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.portfolio', href: '/portfolio' },
  { labelKey: 'nav.aboutMe', href: '/about' },
]

type NavigationLink = (typeof simpleLinks)[number]

export default function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { t, locale, setLocale } = useI18n()
  const { openInquiry } = useProjectInquiry()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileClosing, setMobileClosing] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mobileNavigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigationLinks: NavigationLink[] = [
    ...simpleLinks,
    { labelKey: 'nav.contacts', href: `${pathname ?? '/'}#contacts` },
  ]

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
    document.body.classList.add('mobile-menu-open')

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.classList.remove('mobile-menu-open')
    }
  }, [mobileOpen])

  useEffect(() => () => {
    if (mobileNavigationTimer.current) clearTimeout(mobileNavigationTimer.current)
  }, [])

  const handleMobileToggle = () => {
    if (mobileClosing) return

    setMobileOpen(current => !current)
  }

  const closeMenus = () => {
    if (mobileNavigationTimer.current) {
      clearTimeout(mobileNavigationTimer.current)
      mobileNavigationTimer.current = null
    }

    setMobileClosing(false)
    setMobileOpen(false)
  }

  const handleMobileNavigation = (href: string) => {
    if (mobileClosing) return

    setMobileClosing(true)
    router.push(href)
    mobileNavigationTimer.current = setTimeout(() => {
      mobileNavigationTimer.current = null
      setMobileClosing(false)
      setMobileOpen(false)
    }, 280)
  }

  const scrollToContacts = () => {
    window.requestAnimationFrame(() => {
      const contacts = document.getElementById('contacts')

      if (!contacts) return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const startY = window.scrollY
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight
      const targetY = Math.min(Math.max(contacts.getBoundingClientRect().top + startY - 104, 0), maxScrollY)

      if (prefersReducedMotion || Math.abs(targetY - startY) < 1) {
        window.scrollTo(0, targetY)
      } else {
        const animationDuration = 900
        const animationStart = performance.now()

        const animateScroll = (timestamp: number) => {
          const progress = Math.min((timestamp - animationStart) / animationDuration, 1)
          const easedProgress = progress < 0.5
            ? 4 * progress ** 3
            : 1 - Math.pow(-2 * progress + 2, 3) / 2

          window.scrollTo(0, startY + (targetY - startY) * easedProgress)

          if (progress < 1) window.requestAnimationFrame(animateScroll)
        }

        window.requestAnimationFrame(animateScroll)
      }

      const url = new URL(window.location.href)
      url.hash = 'contacts'
      window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
    })
  }

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    closeMenus()
    scrollToContacts()
  }

  const handleMobileContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (mobileClosing) return

    setMobileClosing(true)
    mobileNavigationTimer.current = setTimeout(() => {
      mobileNavigationTimer.current = null
      setMobileClosing(false)
      setMobileOpen(false)
      scrollToContacts()
    }, 280)
  }

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <nav className={styles.nav} aria-label={t('common.mainNavigation')}>
            <Link className={styles.brand} href="/" aria-label={t('common.auHome')} onClick={closeMenus}>
              <BrandLogo className={styles.brandLogo} aria-label={t('common.auStudio')} />
            </Link>

            <div className={styles.desktopNav}>
              {navigationLinks.map(link => {
                const className = `${styles.navLink} ${pathname === link.href ? styles.activeLink : ''}`

                if (link.labelKey === 'nav.contacts') {
                  return <a className={className} key={link.href} href={link.href} onClick={handleContactClick}>{t(link.labelKey)}</a>
                }

                return <Link className={className} key={link.href} href={link.href} onClick={closeMenus}>{t(link.labelKey)}</Link>
              })}
            </div>

            <LanguageSwitcher locale={locale} onChange={setLocale} label={t('common.language')} variant="desktop" />

            <button className={styles.cta} type="button" onClick={() => { closeMenus(); openInquiry() }}>
              <span className={styles.ctaTrace} aria-hidden="true" />
              <span className={styles.ctaLabel}>{t('nav.discussProject')}</span>
              <span className={styles.ctaSignal} aria-hidden="true" />
              <ArrowUpRight className={styles.ctaIcon} aria-hidden="true" strokeWidth={1.8} />
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
      </header>

      <MobileMenu
        links={navigationLinks}
        open={mobileOpen}
        closing={mobileClosing}
        onClose={closeMenus}
        onNavigate={handleMobileNavigation}
        onContactClick={handleMobileContactClick}
        onOpenInquiry={openInquiry}
      />
    </>
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
  links: NavigationLink[]
  open: boolean
  closing: boolean
  onClose: () => void
  onNavigate: (href: string) => void
  onContactClick: (event: MouseEvent<HTMLAnchorElement>) => void
  onOpenInquiry: () => void
}

function MobileMenu({ links, open, closing, onClose, onNavigate, onContactClick, onOpenInquiry }: MobileMenuProps) {
  const { t, locale, setLocale } = useI18n()

  if (!open) return null

  return (
    <div className={`${styles.mobilePanel} ${closing ? styles.mobilePanelClosing : ''}`}>
      <nav className={styles.mobileNav} aria-label={t('common.mobileNavigation')}>
        <div className={styles.mobileMenuArtwork} aria-hidden="true">
          <div className={styles.mobileJourneyStage}>
            <Lightbulb className={styles.mobileJourneyIcon} strokeWidth={1.55} />
          </div>
          <span className={`${styles.mobileJourneyLink} ${styles.mobileJourneyLinkFirst}`} />
          <div className={`${styles.mobileJourneyStage} ${styles.mobileJourneyStageInterface}`}>
            <PanelsTopLeft className={styles.mobileJourneyIcon} strokeWidth={1.55} />
          </div>
          <span className={`${styles.mobileJourneyLink} ${styles.mobileJourneyLinkSecond}`} />
          <div className={`${styles.mobileJourneyStage} ${styles.mobileJourneyStageMobile}`}>
            <Smartphone className={styles.mobileJourneyIcon} strokeWidth={1.55} />
          </div>
        </div>
        <div className={styles.mobileMenuLead}>
          <span className={styles.mobileMenuKicker}>
            <Sparkles className={styles.mobileMenuKickerIcon} aria-hidden="true" strokeWidth={1.6} />
            {t('common.mobileNavigation')}
          </span>
          <span className={styles.mobileMenuLeadLine} aria-hidden="true" />
        </div>
        {links.map((link, index) => (
          <div className={styles.mobileMenuItem} data-menu-index={index} key={link.href}>
            {link.labelKey === 'nav.contacts' ? (
              <a className={styles.mobileNavLink} href={link.href} onClick={onContactClick}>
                <span className={styles.mobileNavLabel}>{t(link.labelKey)}</span>
                <span className={styles.mobileNavIconFrame} aria-hidden="true">
                  <ArrowUpRight className={styles.mobileNavIcon} strokeWidth={1.6} />
                </span>
              </a>
            ) : (
              <Link
                className={styles.mobileNavLink}
                href={link.href}
                onClick={event => {
                  event.preventDefault()
                  onNavigate(link.href)
                }}
              >
                <span className={styles.mobileNavLabel}>{t(link.labelKey)}</span>
                <span className={styles.mobileNavIconFrame} aria-hidden="true">
                  <ArrowUpRight className={styles.mobileNavIcon} strokeWidth={1.6} />
                </span>
              </Link>
            )}
          </div>
        ))}

        <div className={styles.mobileLanguageRow}>
          <span>{t('common.language')}</span>
          <LanguageSwitcher locale={locale} onChange={setLocale} label={t('common.language')} variant="mobile" />
        </div>
        <button className={styles.mobileCta} type="button" onClick={() => { onClose(); onOpenInquiry() }}>
          <span className={styles.ctaTrace} aria-hidden="true" />
          <span className={styles.mobileCtaLabel}>{t('nav.discussProject')}</span>
          <ArrowUpRight className={styles.mobileCtaIcon} aria-hidden="true" strokeWidth={1.7} />
        </button>
      </nav>
    </div>
  )
}
