'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import BrandLogo from '../BrandLogo/BrandLogo'
import styles from './SiteHeader.module.css'

type MenuKey = 'offer' | 'audience' | null

const offerLinks = [
  {
    label: 'AI Practice Management',
    href: '/what-we-offer/ai-crm-for-financial-advisors',
    image: '/sitegrab/assets/0001-nav-ai-practice-management.DOLrS83x_1qYFPm-59a6813ee9.webp',
    description: 'Your clients, meetings, and tasks — captured by AI, searchable in seconds, ready to act on.',
  },
  {
    label: 'Custody & Execution',
    href: '/what-we-offer/custody-and-execution',
    image: '/sitegrab/assets/0004-nav-custody-execution.BBzLjn3v_ZHMNdI-3b5e8eeec9.webp',
    description: 'Trade, rebalance, and custody — all in one place, with instant account opening.',
  },
]

const audienceLinks = [
  {
    label: 'Independent firms',
    href: '/whos-it-for/independent-firms',
    image: '/sitegrab/assets/0010-nav-independent-firms.BlA20NJs_5rWs8-0f84e63066.webp',
    description: 'Spend less time on admin and more time delivering advice that matters.',
  },
  {
    label: 'Consolidators',
    href: '/whos-it-for/consolidators',
    image: '/sitegrab/assets/0007-nav-consolidators.CkmIfV3m_Z1EIYiR-0438f13718.webp',
    description: 'Unify firms, data, and controls to scale faster — without operational drag.',
  },
]

const simpleLinks = [
  { label: 'Integrations', href: '/integrations' },
  { label: 'Security', href: '/security' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<MenuKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<MenuKey>(null)
  const [scrolled, setScrolled] = useState(false)
  const menuTimer = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!openMenu && !mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [openMenu, mobileOpen])

  useEffect(() => () => {
    if (menuTimer.current) window.clearTimeout(menuTimer.current)
  }, [])

  const clearMenuTimer = () => {
    if (menuTimer.current) window.clearTimeout(menuTimer.current)
    menuTimer.current = null
  }

  const scheduleMenu = (menu: MenuKey, delay: number) => {
    clearMenuTimer()
    menuTimer.current = window.setTimeout(() => setOpenMenu(menu), delay)
  }

  const handleMenuToggle = (menu: Exclude<MenuKey, null>) => {
    clearMenuTimer()
    setOpenMenu(current => (current === menu ? null : menu))
  }

  const handleMobileToggle = () => {
    clearMenuTimer()
    setMobileOpen(current => !current)
    setOpenMenu(null)
  }

  const closeMenus = () => {
    clearMenuTimer()
    setOpenMenu(null)
    setMobileOpen(false)
  }

  return (
    <header className={`${styles.header} ${scrolled && !openMenu ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link className={styles.brand} href="/" aria-label="Obsidian home" onClick={closeMenus}>
            <BrandLogo className={styles.brandLogo} aria-label="Obsidian" />
          </Link>

          <div className={styles.desktopNav}>
            <div
              className={styles.menuGroup}
              onMouseEnter={() => scheduleMenu('offer', 80)}
              onMouseLeave={() => scheduleMenu(null, 180)}
            >
              <button
                className={styles.navButton}
                type="button"
                aria-expanded={openMenu === 'offer'}
                aria-haspopup="menu"
                onClick={() => handleMenuToggle('offer')}
              >
                What we offer
                <span className={styles.chevron} aria-hidden="true" />
              </button>
              <NavMenu links={offerLinks} open={openMenu === 'offer'} onNavigate={closeMenus} />
            </div>

            <div
              className={styles.menuGroup}
              onMouseEnter={() => scheduleMenu('audience', 80)}
              onMouseLeave={() => scheduleMenu(null, 180)}
            >
              <button
                className={styles.navButton}
                type="button"
                aria-expanded={openMenu === 'audience'}
                aria-haspopup="menu"
                onClick={() => handleMenuToggle('audience')}
              >
                Who&apos;s it for
                <span className={styles.chevron} aria-hidden="true" />
              </button>
              <NavMenu links={audienceLinks} open={openMenu === 'audience'} onNavigate={closeMenus} />
            </div>

            {simpleLinks.map(link => (
              <Link
                className={`${styles.navLink} ${pathname === link.href ? styles.activeLink : ''}`}
                key={link.href}
                href={link.href}
                onClick={closeMenus}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link className={styles.cta} href="mailto:support@obsidianos.com" onClick={closeMenus}>
            Get started
          </Link>

          <button
            className={styles.mobileButton}
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={handleMobileToggle}
          >
            <span className={styles.menuIcon} aria-hidden="true" />
          </button>
        </nav>
      </div>

      <MobileMenu
        expanded={mobileExpanded}
        open={mobileOpen}
        onClose={closeMenus}
        onToggle={menu => setMobileExpanded(current => (current === menu ? null : menu))}
      />

      <div className={`${styles.dropdownBackdrop} ${openMenu ? styles.dropdownBackdropOpen : ''}`} aria-hidden="true" />
      <div className={`${styles.dropdownBar} ${openMenu ? styles.dropdownBarOpen : ''}`} aria-hidden="true" />
    </header>
  )
}

type NavMenuProps = {
  links: typeof offerLinks
  open: boolean
  onNavigate: () => void
}

function NavMenu({ links, open, onNavigate }: NavMenuProps) {
  return (
    <div className={`${styles.dropdown} ${open ? styles.dropdownOpen : ''}`} aria-hidden={!open}>
      {links.map(link => (
        <Link className={styles.dropdownLink} key={link.href} href={link.href} onClick={onNavigate} tabIndex={open ? 0 : -1}>
          <div className={styles.dropdownImageFrame}>
            <Image className={styles.dropdownImage} src={link.image} alt="" width={270} height={280} />
          </div>
          <span className={styles.dropdownText}>
            <span className={styles.dropdownTitle}>{link.label}</span>
            <span className={styles.dropdownDescription}>{link.description}</span>
          </span>
        </Link>
      ))}
    </div>
  )
}

type MobileMenuProps = {
  expanded: MenuKey
  open: boolean
  onClose: () => void
  onToggle: (menu: Exclude<MenuKey, null>) => void
}

function MobileMenu({ expanded, open, onClose, onToggle }: MobileMenuProps) {
  if (!open) return null

  return (
    <div className={styles.mobilePanel}>
      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <div className={styles.mobileMenuItem}>
          <button
            className={styles.mobileNavButton}
            type="button"
            aria-expanded={expanded === 'offer'}
            onClick={() => onToggle('offer')}
          >
            What we offer
            <span className={styles.mobileChevron} aria-hidden="true" />
          </button>
          {expanded === 'offer' ? <MobileChildren links={offerLinks} onNavigate={onClose} /> : null}
        </div>

        <div className={styles.mobileMenuItem}>
          <button
            className={styles.mobileNavButton}
            type="button"
            aria-expanded={expanded === 'audience'}
            onClick={() => onToggle('audience')}
          >
            Who&apos;s it for
            <span className={styles.mobileChevron} aria-hidden="true" />
          </button>
          {expanded === 'audience' ? <MobileChildren links={audienceLinks} onNavigate={onClose} /> : null}
        </div>

        {simpleLinks.map(link => (
          <div className={styles.mobileMenuItem} key={link.href}>
            <Link className={styles.mobileNavLink} href={link.href} onClick={onClose}>
              {link.label}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  )
}

type MobileChildrenProps = {
  links: typeof offerLinks
  onNavigate: () => void
}

function MobileChildren({ links, onNavigate }: MobileChildrenProps) {
  return (
    <div className={styles.mobileChildren}>
      {links.map(link => (
        <Link className={styles.mobileChild} key={link.href} href={link.href} onClick={onNavigate}>
          <span className={styles.mobileChildImage}>
            <Image src={link.image} alt="" width={40} height={40} />
          </span>
          <span className={styles.mobileChildLabel}>{link.label}</span>
        </Link>
      ))}
    </div>
  )
}
