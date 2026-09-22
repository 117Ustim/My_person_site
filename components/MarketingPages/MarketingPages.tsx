'use client'

import Link from 'next/link'
import { useI18n } from '../../lib/i18n'
import { aiPracticeFeatures, asset, consolidatorFeatures, custodyFeatures, homeCapabilities, homeSlides, homeTechnologies, independentFeatures, mobileFeatures, pricingFeatures, securityCards, securityGroups, type CapabilityItem, type FeatureItem, type PortfolioCategory } from '../../lib/page-data'
import BookingCta from '../BookingCta/BookingCta'
import CapabilitiesEssay from '../CapabilitiesEssay/CapabilitiesEssay'
import CapabilityShowcase from '../CapabilityShowcase/CapabilityShowcase'
import FeatureGrid from '../FeatureGrid/FeatureGrid'
import FeatureSlider from '../FeatureSlider/FeatureSlider'
import FaqSection from '../FaqSection/FaqSection'
import MarketingHero from '../MarketingHero/MarketingHero'
import PageSection from '../PageSection/PageSection'
import PortfolioCarousel from '../PortfolioCarousel/PortfolioCarousel'
import PortfolioCta from '../PortfolioCta/PortfolioCta'
import SectionHeading from '../SectionHeading/SectionHeading'
import TechnologyMarquee from '../TechnologyMarquee/TechnologyMarquee'
import styles from './MarketingPages.module.css'

export function HomePageContent() {
  const { locale, localize, t } = useI18n()
  const localizedHomeSlides = homeSlides.slice(0, 4).map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        frameTone: 'coral' as const,
        category: 'crm' as const,
        portfolioProject: 'vetscanct',
        image: locale === 'en' ? '/assets/portfolio/vet-clinic-crm-en.png' : item.image,
        imageAlt: locale === 'en' ? 'VetScanCT custom CRM system for veterinary clinic appointments, payments, and access control' : item.imageAlt,
        imageFit: locale === 'en' ? 'cover' as const : item.imageFit,
        imagePosition: locale === 'en' ? 'top' as const : item.imagePosition,
        imageSized: locale === 'en' ? true : item.imageSized,
      }
    }

    if (index === 1) {
      return {
        ...item,
        title: t('portfolio.projectBeautyTitle'),
        description: t('portfolio.projectBeautyDescription'),
        image: '/assets/portfolio/beauty-master-crm.png',
        imageFit: 'cover' as const,
        frameTone: 'coral' as const,
        category: 'crm' as const,
        portfolioProject: 'beauty-master-crm',
        imageAlt: t('portfolio.projectBeautyAlt'),
      }
    }

    if (index === 2) {
      return {
        ...item,
        title: t('portfolio.projectSportBaseTitle'),
        description: t('portfolio.projectSportBaseDescription'),
        image: '/assets/portfolio/sports-crm.png',
        imageFit: 'cover' as const,
        frameTone: 'coral' as const,
        category: 'crm' as const,
        portfolioProject: 'sport-base-crm',
        imageAlt: t('portfolio.projectSportBaseAlt'),
      }
    }

    if (index === 3) {
      return {
        ...item,
        title: t('portfolio.projectAutoTitle'),
        description: t('portfolio.projectAutoDescription'),
        image: '/assets/portfolio/auto-service-crm-promo-uk.png',
        imageFit: 'cover' as const,
        frameTone: 'coral' as const,
        category: 'crm' as const,
        portfolioProject: 'auto-service-crm',
        imageAlt: t('portfolio.projectAutoAlt'),
      }
    }

    return item
  })
  const localizedWebsiteSlides = [...consolidatorFeatures.slice(0, 6), consolidatorFeatures[0], consolidatorFeatures[0]].map((item, index) => {
    const websiteItem = {
      ...item,
      showPortfolioCard: true,
    }

    if (index === 0) {
      return {
        ...websiteItem,
        title: t('portfolio.projectTravelTitle'),
        description: t('portfolio.projectTravelDescription'),
        image: '/assets/portfolio/luxury-travel.png',
        imageFit: 'cover' as const,
        imagePosition: 'top' as const,
        imageSized: true,
        frameTone: 'coral' as const,
        category: 'sites' as const,
        portfolioProject: 'luxury-travel',
        imageAlt: t('portfolio.projectTravelAlt'),
      }
    }

    if (index === 1) {
      return {
        ...websiteItem,
        title: t('portfolio.projectVetSiteTitle'),
        description: t('portfolio.projectVetSiteDescription'),
        image: '/assets/portfolio/vetscan-ua-promo.png',
        imageFit: 'cover' as const,
        imagePosition: 'top' as const,
        frameTone: 'coral' as const,
        category: 'sites' as const,
        portfolioProject: 'vetscanct-site',
        imageAlt: t('portfolio.projectVetSiteAlt'),
      }
    }

    if (index === 2) {
      return {
        ...websiteItem,
        title: t('portfolio.projectOliveTitle'),
        description: t('portfolio.projectOliveDescription'),
        image: '/assets/portfolio/olive-oil-promo.png',
        imageFit: 'cover' as const,
        imagePosition: 'top' as const,
        frameTone: 'coral' as const,
        category: 'sites' as const,
        portfolioProject: 'olive-oil',
        imageAlt: t('portfolio.projectOliveAlt'),
      }
    }

    if (index === 3) {
      return {
        ...websiteItem,
        title: t('portfolio.projectChildrenTitle'),
        description: t('portfolio.projectChildrenDescription'),
        image: '/assets/portfolio/childrens-party-promo.png',
        imageFit: 'cover' as const,
        imagePosition: 'top' as const,
        frameTone: 'coral' as const,
        category: 'sites' as const,
        portfolioProject: 'childrens-party',
        imageAlt: t('portfolio.projectChildrenAlt'),
      }
    }

    if (index === 4) {
      return {
        ...websiteItem,
        title: t('portfolio.projectModularHouseTitle'),
        description: t('portfolio.projectModularHouseDescription'),
        image: '/assets/portfolio/modular-house-promo.png',
        imageFit: 'cover' as const,
        imagePosition: 'top' as const,
        frameTone: 'coral' as const,
        category: 'sites' as const,
        portfolioProject: 'modular-house',
        imageAlt: t('portfolio.projectModularHouseAlt'),
      }
    }

    if (index === 5) {
      return {
        ...websiteItem,
        title: t('portfolio.projectIdentoTitle'),
        description: t('portfolio.projectIdentoDescription'),
        image: '/assets/portfolio/idento-promo.png',
        imageFit: 'cover' as const,
        imagePosition: 'top' as const,
        frameTone: 'coral' as const,
        category: 'sites' as const,
        portfolioProject: 'idento',
        imageAlt: t('portfolio.projectIdentoAlt'),
      }
    }

    if (index === 6) {
      return {
        ...websiteItem,
        title: t('portfolio.projectDiamantTitle'),
        description: t('portfolio.projectDiamantDescription'),
        image: '/assets/portfolio/diamant-ukr-card.png',
        imageFit: 'cover' as const,
        imagePosition: 'top' as const,
        frameTone: 'coral' as const,
        category: 'sites' as const,
        portfolioProject: 'diamant',
        imageAlt: t('portfolio.projectDiamantAlt'),
      }
    }

    if (index === 7) {
      return {
        ...websiteItem,
        title: t('portfolio.projectBoostifyTitle'),
        description: t('portfolio.projectBoostifyDescription'),
        image: '/assets/portfolio/boostify-ukr-card.png',
        imageFit: 'cover' as const,
        imagePosition: 'top' as const,
        frameTone: 'coral' as const,
        category: 'sites' as const,
        portfolioProject: 'boostify',
        imageAlt: t('portfolio.projectBoostifyAlt'),
      }
    }

    return websiteItem
  })
  const localizedHomeCapabilities = homeCapabilities.map((item, index) => {
    if (index === 1 && locale === 'en') {
      return {
        ...item,
        image: '/assets/portfolio/contra-crm-en.png',
        imagePosition: 'top' as const,
        imageAlt: 'Custom CRM system dashboard for clients, appointments, and business growth',
      }
    }

    if (index !== 2) return item

    return {
      ...item,
      image: locale === 'en' ? '/assets/portfolio/medscanner-ad-en-3d.png' : '/assets/portfolio/medscanner-ukr.png',
      imagePosition: 'top' as const,
      imageAlt: locale === 'en'
        ? 'MedScanner mobile application for medication scanning, reminders, and health tracking'
        : 'MedScanner — мобільний застосунок для сканування ліків, нагадувань і контролю показників здоров’я',
    }
  })

  return (
    <main className={styles.main}>
      <MarketingHero
        variant="home"
        title={localize('Перетворюю ідеї на готові цифрові продукти')}
        description={localize('Full-stack розробник. Сайти, CRM-системи та мобільні застосунки для реальних бізнес-завдань')}
        actionLabel={localize('Переглянути роботи')}
        actionHref="#projects"
        image={asset('vetscanct-dashboard-anna-14-uniform.png')}
        imageAlt={localize('Головна панель VetScanCT для керування записами, пацієнтами та оплатами Ани')}
        showEarthGlobe
        rightImage={asset('hero-founder-transparent-graphite-v2.png')}
      />
      <TechnologyMarquee technologies={homeTechnologies} label={localize('Технології, з якими я працюю')} withHeroFade />
      <PageSection id="projects" className={styles.capabilitySection}>
        <SectionHeading
          title={localize('Що я створюю')}
          description={localize('Від першої ідеї до готового цифрового продукту — створюю рішення, які допомагають бізнесу працювати ефективніше.')}
        />
        <CapabilityShowcase items={localizeCapabilities(localizedHomeCapabilities, localize)} />
      </PageSection>
      <PageSection tone="raised">
        <SectionHeading
          title={localize('Вибрані проєкти')}
          description={localize('Реальні цифрові продукти для бізнесу — від CRM-систем і вебсайтів до мобільних застосунків')}
        />
        <div className={`${styles.sliderWrap} ${styles.homeSliderWrap}`}>
          <FeatureSlider
            items={localizeFeatures(localizedHomeSlides, localize)}
            label={localize('Practice management features')}
            title={t('portfolio.categoryCrm')}
            headingGap="spacious"
          />
        </div>
      </PageSection>
      <PageSection className={styles.homeAudienceSection}>
        <FeatureSlider
          items={localizeFeatures(localizedWebsiteSlides, localize)}
          label={localize('Consolidator features')}
          title={localize('Вебсайти та лендинги')}
          headingGap="spacious"
          scrollableControls
          reverse
        />
      </PageSection>
      <PageSection tone="raised">
        <FeatureSlider
          items={localizeFeatures(mobileFeatures, localize)}
          label={localize('Mobile application features')}
          title={localize('Мобільні застосунки')}
          description={localize('Зручні мобільні продукти для iOS та Android із продуманим користувацьким досвідом.')}
          compact
        />
      </PageSection>
      <PageSection id="capabilities" className={styles.capabilitiesSection}>
        <CapabilitiesEssay />
      </PageSection>
    </main>
  )
}

export function PortfolioPageContent() {
  const { locale, t } = useI18n()
  const projects: FeatureItem[] = [
    {
      title: t('portfolio.projectBeautyTitle'),
      description: t('portfolio.projectBeautyDescription'),
      portfolioProject: 'beauty-master-crm',
      image: '/assets/portfolio/beauty-master-crm-portfolio.webp',
      previewImage: '/assets/portfolio/beauty-master-crm-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/beauty-master-crm-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1600,
      imageHeight: 7240,
      category: 'crm',
      imageAlt: t('portfolio.projectBeautyAlt'),
    },
    {
      title: t('portfolio.projectVetTitle'),
      description: t('portfolio.projectVetDescription'),
      image: '/assets/portfolio/vetscanct-crm-portfolio.webp',
      previewImage: '/assets/portfolio/vetscanct-crm-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/vetscanct-crm-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1640,
      imageHeight: 5037,
      category: 'crm',
      portfolioProject: 'vetscanct',
      imageAlt: t('portfolio.projectVetAlt'),
    },
    {
      title: t('portfolio.projectTravelTitle'),
      description: t('portfolio.projectTravelDescription'),
      image: '/assets/portfolio/luxury-travel-vertical-portfolio.webp',
      previewImage: '/assets/portfolio/luxury-travel-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/luxury-travel-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1528,
      imageHeight: 6798,
      category: 'sites',
      portfolioProject: 'luxury-travel',
      imageAlt: t('portfolio.projectTravelAlt'),
    },
    {
      title: t('portfolio.projectVetSiteTitle'),
      description: t('portfolio.projectVetSiteDescription'),
      image: '/assets/portfolio/vetscanct-site-vertical-portfolio.webp',
      previewImage: '/assets/portfolio/vetscanct-site-preview-card-ua.jpg',
      previewImageMobile: '/assets/portfolio/vetscanct-site-preview-card-ua-mobile.jpg',
      scrollable: true,
      imageWidth: 2112,
      imageHeight: 7010,
      category: 'sites',
      portfolioProject: 'vetscanct-site',
      imageAlt: t('portfolio.projectVetSiteAlt'),
    },
    {
      title: t('portfolio.projectChildrenTitle'),
      description: t('portfolio.projectChildrenDescription'),
      image: '/assets/portfolio/childrens-party-vertical-portfolio.webp',
      previewImage: '/assets/portfolio/childrens-party-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/childrens-party-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1496,
      imageHeight: 5194,
      category: 'sites',
      portfolioProject: 'childrens-party',
      imageAlt: t('portfolio.projectChildrenAlt'),
    },
    {
      title: t('portfolio.projectOliveTitle'),
      description: t('portfolio.projectOliveDescription'),
      image: '/assets/portfolio/olive-oil-vertical-portfolio.webp',
      previewImage: '/assets/portfolio/olive-oil-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/olive-oil-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1496,
      imageHeight: 4490,
      category: 'sites',
      portfolioProject: 'olive-oil',
      imageAlt: t('portfolio.projectOliveAlt'),
    },
    {
      title: t('portfolio.projectModularHouseTitle'),
      description: t('portfolio.projectModularHouseDescription'),
      image: '/assets/portfolio/modular-house-vertical-portfolio.webp',
      previewImage: '/assets/portfolio/modular-house-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/modular-house-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1604,
      imageHeight: 5540,
      category: 'sites',
      portfolioProject: 'modular-house',
      imageAlt: t('portfolio.projectModularHouseAlt'),
    },
    {
      title: t('portfolio.projectDiamantTitle'),
      description: t('portfolio.projectDiamantDescription'),
      image: locale === 'en' ? '/assets/portfolio/diamant-website-screens-collage-en.png' : '/assets/portfolio/diamant-ukr-portfolio.png',
      previewImage: locale === 'en' ? '/assets/portfolio/diamant-natural-cosmetics-ad-en-3d.png' : '/assets/portfolio/diamant-ukr-card.png',
      scrollable: true,
      imageWidth: 2200,
      imageHeight: 9390,
      category: 'sites',
      portfolioProject: 'diamant',
      imageAlt: t('portfolio.projectDiamantAlt'),
    },
    {
      title: t('portfolio.projectIdentoTitle'),
      description: t('portfolio.projectIdentoDescription'),
      image: '/assets/portfolio/idento-vertical-collage.webp',
      previewImage: '/assets/portfolio/idento-presentation-dark-preview.webp',
      scrollable: true,
      imageWidth: 1623,
      imageHeight: 5197,
      category: 'sites',
      portfolioProject: 'idento',
      imageAlt: t('portfolio.projectIdentoAlt'),
    },
    {
      title: t('portfolio.projectBoostifyTitle'),
      description: t('portfolio.projectBoostifyDescription'),
      image: '/assets/portfolio/boostify-website-screens-collage.png',
      previewImage: locale === 'en' ? '/assets/portfolio/boostify-advertising-cover-en-strict-3d.png' : '/assets/portfolio/boostify-ukr-card.png',
      scrollable: true,
      imageWidth: 2200,
      imageHeight: 5975,
      category: 'sites',
      portfolioProject: 'boostify',
      imageAlt: t('portfolio.projectBoostifyAlt'),
    },
    {
      title: t('portfolio.projectSportBaseTitle'),
      description: t('portfolio.projectSportBaseDescription'),
      image: '/assets/portfolio/sport-base-crm-vertical-portfolio-1600.webp',
      previewImage: '/assets/portfolio/sports-crm-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/sports-crm-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1600,
      imageHeight: 13984,
      category: 'crm',
      portfolioProject: 'sport-base-crm',
      imageAlt: t('portfolio.projectSportBaseAlt'),
    },
    {
      title: t('portfolio.projectAutoTitle'),
      description: t('portfolio.projectAutoDescription'),
      image: '/assets/portfolio/ukr-auto-service-crm-vertical-portfolio.webp',
      previewImage: '/assets/portfolio/auto-service-crm-promo-uk-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/auto-service-crm-promo-uk-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1600,
      imageHeight: 7550,
      category: 'crm',
      portfolioProject: 'auto-service-crm',
      imageAlt: t('portfolio.projectAutoAlt'),
    },
    {
      title: t('portfolio.projectSportsTitle'),
      description: t('portfolio.projectSportsDescription'),
      image: locale === 'en' ? '/assets/portfolio/fitness-iphone-grid-english.png' : '/assets/portfolio/iphone-ukr-collage.png',
      previewImage: locale === 'en' ? '/assets/portfolio/fitness-mobile-app-en.png' : '/assets/portfolio/fitness-mobile-app-ukr.png',
      previewImageMobile: locale === 'en' ? '/assets/portfolio/fitness-mobile-app-en.png' : '/assets/portfolio/fitness-mobile-app-ukr.png',
      scrollable: true,
      imageWidth: locale === 'en' ? 2136 : 2160,
      imageHeight: locale === 'en' ? 13010 : 12898,
      category: 'mobile',
      portfolioProject: 'sports-crm',
      imageAlt: t('portfolio.projectSportsAlt'),
    },
    {
      title: t('portfolio.projectAirScannerTitle'),
      description: t('portfolio.projectAirScannerDescription'),
      image: locale === 'en' ? '/assets/portfolio/air-scanner-iphone-vertical-collage-batch2.png' : '/assets/portfolio/air-scanner-iphone-vertical-collage-v2.png',
      previewImage: locale === 'en' ? '/assets/portfolio/air-scanner-mobile-ad-en-3d.png' : '/assets/portfolio/air-scanner-mobile-ad-ua-3d.png',
      previewImageMobile: locale === 'en' ? '/assets/portfolio/air-scanner-mobile-ad-en-3d.png' : '/assets/portfolio/air-scanner-mobile-ad-ua-3d.png',
      scrollable: true,
      imageWidth: 1282,
      imageHeight: 4860,
      category: 'mobile',
      portfolioProject: 'air-scanner',
      imageAlt: t('portfolio.projectAirScannerAlt'),
    },
  ]

  return (
    <main className={styles.main}>
      <MarketingHero
        compact
        variant="portfolio"
        eyebrow={t('portfolio.eyebrow')}
        title={t('portfolio.title')}
        description={t('portfolio.description')}
        actionLabel=""
      />
      <PortfolioCarousel
        projects={projects}
        heading={t('portfolio.sectionTitle')}
        actionLabel={t('portfolio.projectCta')}
        previousLabel={t('portfolio.previousProject')}
        nextLabel={t('portfolio.nextProject')}
        selectProjectLabel={t('portfolio.selectProject')}
        scrollHintLabel={t('portfolio.scrollHint')}
        liveSiteLabel={t('portfolio.liveSiteLabel')}
        liveSitePlaceholderLabel={t('portfolio.liveSitePlaceholder')}
        categoryOptions={[
          { id: 'sites' satisfies PortfolioCategory, label: t('portfolio.categorySites') },
          { id: 'crm' satisfies PortfolioCategory, label: t('portfolio.categoryCrm') },
          { id: 'mobile' satisfies PortfolioCategory, label: t('portfolio.categoryMobile') },
        ]}
      />
      <PortfolioCta />
    </main>
  )
}

export function AiPracticePageContent() {
  const { localize } = useI18n()

  return (
    <main className={styles.main}>
      <MarketingHero title={localize('AI Practice Management for Financial Advisors')} description={localize('Client records, meeting notes, and tasks — captured automatically, searchable instantly.')} image={asset('0608-ai-crm-showcase-1.BA7DqGyJ_Z4RGTS-9c86c2a878.avif')} imageAlt={localize('AI practice management workspace')} />
      <PageSection>
        <div className={styles.featureIntro}><SectionHeading title={localize('Find anything, fast')} /><FeatureGrid items={localizeFeatures(aiPracticeFeatures.slice(0, 2), localize)} columns={2} /></div>
      </PageSection>
      <PageSection tone="raised">
        <SectionHeading title={localize('Beyond the essentials')} description={localize('Spend less time on admin and more time delivering advice that matters.')} />
        <FeatureSlider items={localizeFeatures(aiPracticeFeatures.slice(2), localize)} label={localize('AI practice management features')} />
      </PageSection>
      <PageSection>
        <SectionHeading title={localize('Plan and Prioritise')} />
        <FeatureGrid items={localizeFeatures(homeSlides.slice(0, 2), localize)} columns={2} />
        <Link className={styles.nextLink} href="/what-we-offer/custody-and-execution">{localize('What else we offer')} <span>{localize('Custody & Execution')} →</span></Link>
      </PageSection>
    </main>
  )
}

export function CustodyPageContent() {
  const { localize } = useI18n()

  return (
    <main className={styles.main}>
      <MarketingHero title={localize('Custody & Execution')} description={localize('Trade, rebalance, and custody — all in one place. With instant account opening.')} leftImage={asset('0678-custody-stone-left.DepH_mVM_BmKt9-bc97e4a917.webp')} rightImage={asset('0679-custody-stone-right.bb0PbSrX_27c1Ex-e94a35c725.webp')} />
      <PageSection>
        <SectionHeading eyebrow={localize('Trade with control')} title={localize('Trading')} />
        <div className={styles.highlightGrid}><TrustPoint title={localize('Execute at Scale')} text={localize('Bulk rebalancing across unlimited client portfolios.')} /><TrustPoint title={localize('Models & Wrappers Built In')} text={localize('GIA, ISA, and SIPP — with firm-wide model portfolios.')} /><TrustPoint title={localize('Simple, Secure Custody')} text={localize('Pending FCA authorisation.')} /></div>
      </PageSection>
      <PageSection tone="raised">
        <SectionHeading title={localize('Execution')} description={localize('A clear, controlled workflow for every portfolio.')} />
        <FeatureGrid items={localizeFeatures(custodyFeatures, localize)} columns={3} />
      </PageSection>
    </main>
  )
}

export function IndependentFirmsPageContent() {
  return <AudiencePage title="Independent firms" description="Spend less time on admin and more time delivering advice that matters." features={independentFeatures} image={asset('0708-independent-firms-stone-top.CzfPSXxC_eSAGJ-232b10fd15.webp')} />
}

export function ConsolidatorsPageContent() {
  return <AudiencePage title="Consolidators" description="Unify firms, data, and controls to scale faster — without operational drag." features={consolidatorFeatures} image={asset('0718-consolidators-stone.RSPYn7Fr_8q8gN-c414976993.webp')} />
}

function AudiencePage({ title, description, features, image }: { title: string; description: string; features: typeof independentFeatures; image: string }) {
  const { localize } = useI18n()
  const translatedTitle = localize(title)
  const translatedDescription = localize(description)

  return (
    <main className={styles.main}>
      <MarketingHero title={translatedTitle} description={translatedDescription} image={image} imageAlt={`${translatedTitle} Obsidian workspace`} />
      <PageSection>
        <SectionHeading title={localize(title === 'Independent firms' ? 'The platform that scales with your firm' : 'Unlock rapid growth')} description={translatedDescription} />
        <FeatureSlider items={localizeFeatures(features, localize)} label={`${translatedTitle} features`} title={translatedTitle} description={translatedDescription} />
      </PageSection>
      <BookingCta />
    </main>
  )
}

export function SecurityPageContent() {
  const { localize } = useI18n()
  const faqs = [
    ['How is client data protected?', 'All client data is processed and stored within Obsidian’s own AWS infrastructure.'],
    ['Does a meeting bot join calls?', 'No. Obsidian captures meetings through system audio on the adviser’s own device.'],
    ['Is client data used to train AI models?', 'No. Your clients’ data is never used to train, fine-tune, or improve AI models.'],
    ['Where is data hosted?', 'All data is hosted on AWS in the EU, in Obsidian-controlled infrastructure.'],
  ].map(([question, answer]) => ({ question: localize(question), answer: localize(answer) }))

  return (
    <main className={styles.main}>
      <MarketingHero title={localize('The most private AI for advisers.')} description={localize("From encryption to access management, Obsidian enforces rigorous standards to keep your clients' data secure, private, and compliant.")} image={asset('0708-independent-firms-stone-top.CzfPSXxC_eSAGJ-232b10fd15.webp')} imageAlt={localize('Obsidian security and privacy')} />
      <PageSection>
        <div className={styles.securityCards}>{securityCards.map(([title, text]) => <article key={title}><h3>{localize(title)}</h3><p>{localize(text)}</p></article>)}</div>
        <div className={styles.securityGroups}>{securityGroups.map(group => <section key={group.title}><h2>{localize(group.title)}</h2><div className={styles.securityList}>{group.items.map(([title, text]) => <article key={title}><h3>{localize(title)}</h3><p>{localize(text)}</p></article>)}</div></section>)}</div>
      </PageSection>
      <PageSection tone="raised">
        <div className={styles.faqLayout}><SectionHeading eyebrow={localize('Frequently asked questions')} title="FAQ" /><FaqSection items={faqs} /></div>
      </PageSection>
      <BookingCta title="Security you can explain to your clients." />
    </main>
  )
}

export function PricingPageContent() {
  const { t, localize } = useI18n()
  const faqs = [
    ['Is AI Practice Management really free?', 'Yes. There are no per-seat fees, trial periods, or feature gates.'],
    ['Will custody be free too?', 'Custody & Execution will be a separate paid product when it launches.'],
    ['Are there client or seat caps?', 'No. Add as many team members and clients as you need.'],
  ].map(([question, answer]) => ({ question: localize(question), answer: localize(answer) }))

  return (
    <main className={styles.main}>
      <MarketingHero title={localize('Always free for advisers.')} description={localize('Big or small. AI Practice Management with no per-seat fees, no trial periods, and no feature gates.')} />
      <PageSection>
        <div className={styles.pricingCards}><TrustPoint title={localize('AI Practice Management')} text={localize('Everything you need to run your firm — meetings, CRM, documents, portfolios, and 65+ AI tools.')} /><TrustPoint title={localize('Custody & Execution')} text={localize('Trade, rebalance, and custody — all in one place. With instant account opening.')} /></div>
      </PageSection>
      <PageSection tone="raised">
        <SectionHeading title={localize('Compare features')} />
        <div className={styles.featureTable}>{pricingFeatures.map(([title, text]) => <div key={title}><strong>{localize(title)}</strong><span>{localize(text)}</span><b>{t('common.included')}</b></div>)}</div>
      </PageSection>
      <PageSection><div className={styles.faqLayout}><SectionHeading eyebrow={localize('Frequently asked questions')} title="FAQ" /><FaqSection items={faqs} /></div></PageSection>
      <BookingCta />
    </main>
  )
}

export function AboutPageContent() {
  const { t } = useI18n()

  return (
    <main className={styles.main}>
      <MarketingHero compact eyebrow={t('aboutMe.eyebrow')} title={t('aboutMe.title')} description={t('aboutMe.description')} image="/assets/founder-avatar.png" imageAlt={t('aboutMe.imageAlt')} />
      <PageSection>
        <SectionHeading title={t('aboutMe.introTitle')} />
        <div className={styles.aboutCopy}>
          <p>{t('aboutMe.introFirst')}</p>
          <p>{t('aboutMe.introSecond')}</p>
        </div>
      </PageSection>
      <PageSection tone="raised">
        <SectionHeading title={t('aboutMe.skillsTitle')} />
        <div className={styles.principleGrid}>
          {['aboutMe.skillWeb', 'aboutMe.skillSystems', 'aboutMe.skillMobile'].map(key => (
            <article key={key}><h3>{t(`${key}Title`)}</h3><p>{t(`${key}Description`)}</p></article>
          ))}
        </div>
      </PageSection>
    </main>
  )
}

export function MediaPageContent() {
  const { localize } = useI18n()

  return (
    <main className={styles.main}>
      <MarketingHero title={localize('Media center')} description={localize('News, updates, and resources from Obsidian.')} image={asset('0679-custody-stone-right.bb0PbSrX_27c1Ex-e94a35c725.webp')} imageAlt={localize('Obsidian media center')} />
      <PageSection><SectionHeading title={localize('Built for the way advice works now')} description={localize('CRMs that do not talk to portfolios. Risk platforms detached from execution. Emails, documents, meetings, and decisions scattered across systems. Obsidian brings them together in a single, continuously learning platform.')} /><div className={styles.downloads}><DownloadCard title={localize('Download Brand Kit')} type={localize('Brand assets')} /><DownloadCard title={localize('Download Obsidian Logo')} type={localize('Logo files')} /></div></PageSection>
    </main>
  )
}

function TrustPoint({ title, text }: { title: string; text: string }) {
  return <article className={styles.trustPoint}><span className={styles.pointIcon} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>
}

function DownloadCard({ title, type }: { title: string; type: string }) {
  const { t } = useI18n()

  return <article className={styles.downloadCard}><span>{type}</span><h3>{title}</h3><Link href="mailto:ustik72@gmail.com">{t('common.requestFiles')}</Link></article>
}

function localizeFeatures(items: FeatureItem[], localize: (source: string) => string): FeatureItem[] {
  return items.map(item => ({
    ...item,
    title: localize(item.title),
    description: localize(item.description),
    imageAlt: localize(item.imageAlt),
  }))
}

function localizeCapabilities(items: CapabilityItem[], localize: (source: string) => string): CapabilityItem[] {
  return items.map(item => ({
    ...item,
    category: localize(item.category),
    title: localize(item.title),
    description: localize(item.description),
    imageAlt: localize(item.imageAlt),
  }))
}
