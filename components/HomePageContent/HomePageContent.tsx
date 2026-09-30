'use client'

import { useI18n } from '../../lib/i18n'
import { asset, homeCapabilities, homeTechnologies, type CapabilityItem, type FeatureItem } from '../../lib/page-data'
import CapabilitiesEssay from '../CapabilitiesEssay/CapabilitiesEssay'
import CapabilityShowcase from '../CapabilityShowcase/CapabilityShowcase'
import FeatureSlider from '../FeatureSlider/FeatureSlider'
import MarketingHero from '../MarketingHero/MarketingHero'
import PageSection from '../PageSection/PageSection'
import SectionHeading from '../SectionHeading/SectionHeading'
import TechnologyMarquee from '../TechnologyMarquee/TechnologyMarquee'
import styles from '../MarketingPages/MarketingPages.module.css'

export default function HomePageContent() {
  const { locale, localize, t } = useI18n()

  const homeSlides: FeatureItem[] = [
    {
      title: t('portfolio.projectVetTitle'),
      mobileLabel: 'VetScanCT',
      description: t('portfolio.projectVetDescription'),
      image: locale === 'en' ? '/assets/portfolio/vet-clinic-crm-en.png' : '/assets/portfolio/vetscanct-home-crm.png',
      imageAlt: t('portfolio.projectVetAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      mobileImagePosition: 'left',
      imageSized: true,
      frameTone: 'coral',
      category: 'crm',
      portfolioProject: 'vetscanct',
    },
    {
      title: t('portfolio.projectBeautyTitle'),
      mobileLabel: 'Beauty Master',
      description: t('portfolio.projectBeautyDescription'),
      image: locale === 'en' ? '/assets/portfolio/beauty-master-crm-en.png' : '/assets/portfolio/beauty-master-crm.png',
      imageAlt: t('portfolio.projectBeautyAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      frameTone: 'coral',
      category: 'crm',
      portfolioProject: 'beauty-master-crm',
    },
    {
      title: t('portfolio.projectSportBaseTitle'),
      mobileLabel: 'Sport Base',
      description: t('portfolio.projectSportBaseDescription'),
      image: locale === 'en' ? '/assets/portfolio/sport-base-crm-en.png' : '/assets/portfolio/sports-crm.png',
      imageAlt: t('portfolio.projectSportBaseAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      frameTone: 'coral',
      category: 'crm',
      portfolioProject: 'sport-base-crm',
    },
    {
      title: t('portfolio.projectAutoTitle'),
      mobileLabel: 'Auto Service',
      description: t('portfolio.projectAutoDescription'),
      image: locale === 'en' ? '/assets/portfolio/auto-service-crm-en.png' : '/assets/portfolio/auto-service-crm-promo-uk.png',
      imageAlt: t('portfolio.projectAutoAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      frameTone: 'coral',
      category: 'crm',
      portfolioProject: 'auto-service-crm',
    },
  ]

  const websiteSlides: FeatureItem[] = [
    {
      title: t('portfolio.projectTravelTitle'),
      mobileLabel: 'Luxury Travel',
      description: t('portfolio.projectTravelDescription'),
      image: '/assets/portfolio/luxury-travel.png',
      imageAlt: t('portfolio.projectTravelAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      imageSized: true,
      frameTone: 'coral',
      category: 'sites',
      portfolioProject: 'luxury-travel',
      showPortfolioCard: true,
    },
    {
      title: t('portfolio.projectVetSiteTitle'),
      mobileLabel: 'VetScanCT',
      description: t('portfolio.projectVetSiteDescription'),
      image: locale === 'en' ? '/assets/portfolio/vetscan-site-en.png' : '/assets/portfolio/vetscan-ua-promo.png',
      imageAlt: t('portfolio.projectVetSiteAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      frameTone: 'coral',
      category: 'sites',
      portfolioProject: 'vetscanct-site',
      showPortfolioCard: true,
    },
    {
      title: t('portfolio.projectOliveTitle'),
      mobileLabel: 'Olive Oil',
      description: t('portfolio.projectOliveDescription'),
      image: '/assets/portfolio/olive-oil-promo.png',
      imageAlt: t('portfolio.projectOliveAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      frameTone: 'coral',
      category: 'sites',
      portfolioProject: 'olive-oil',
      liveUrl: 'https://www.konstolymp.gr/',
      showPortfolioCard: true,
    },
    {
      title: t('portfolio.projectChildrenTitle'),
      mobileLabel: "Children's Party",
      description: t('portfolio.projectChildrenDescription'),
      image: '/assets/portfolio/childrens-party-promo.png',
      imageAlt: t('portfolio.projectChildrenAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      frameTone: 'coral',
      category: 'sites',
      portfolioProject: 'childrens-party',
      showPortfolioCard: true,
    },
    {
      title: t('portfolio.projectModularHouseTitle'),
      mobileLabel: 'Modular House',
      description: t('portfolio.projectModularHouseDescription'),
      image: locale === 'en' ? '/assets/portfolio/modular-house-en.png' : '/assets/portfolio/modular-house-promo.png',
      imageAlt: t('portfolio.projectModularHouseAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      frameTone: 'coral',
      category: 'sites',
      portfolioProject: 'modular-house',
      liveUrl: 'https://bazainvest.com.ua/',
      showPortfolioCard: true,
    },
    {
      title: t('portfolio.projectIdentoTitle'),
      mobileLabel: 'Idento',
      description: t('portfolio.projectIdentoDescription'),
      image: '/assets/portfolio/idento-promo.png',
      imageAlt: t('portfolio.projectIdentoAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      frameTone: 'coral',
      category: 'sites',
      portfolioProject: 'idento',
      liveUrl: 'https://employment-2.vercel.app/',
      showPortfolioCard: true,
    },
    {
      title: t('portfolio.projectDiamantTitle'),
      mobileLabel: 'Diamant',
      description: t('portfolio.projectDiamantDescription'),
      image: locale === 'en' ? '/assets/portfolio/diamant-natural-cosmetics-ad-en-3d.png' : '/assets/portfolio/diamant-ukr-card.png',
      imageAlt: t('portfolio.projectDiamantAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      frameTone: 'coral',
      category: 'sites',
      portfolioProject: 'diamant',
      showPortfolioCard: true,
    },
    {
      title: t('portfolio.projectBoostifyTitle'),
      mobileLabel: 'Boostify',
      description: t('portfolio.projectBoostifyDescription'),
      image: locale === 'en' ? '/assets/portfolio/boostify-advertising-cover-en-strict-3d.png' : '/assets/portfolio/boostify-ukr-card.png',
      imageAlt: t('portfolio.projectBoostifyAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      frameTone: 'coral',
      category: 'sites',
      portfolioProject: 'boostify',
      showPortfolioCard: true,
    },
  ]

  const mobileSlides: FeatureItem[] = [
    {
      title: t('portfolio.projectMedScannerTitle'),
      mobileLabel: 'MedScanner',
      description: t('portfolio.projectMedScannerDescription'),
      image: locale === 'en' ? '/assets/portfolio/medscanner-ad-en-3d.png' : '/assets/portfolio/medscanner-ukr.png',
      imageAlt: t('portfolio.projectMedScannerAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      imageSized: true,
      category: 'mobile',
      portfolioProject: 'medscanner',
    },
    {
      title: t('portfolio.projectSportsTitle'),
      mobileLabel: 'Sports CRM',
      description: t('portfolio.projectSportsDescription'),
      image: locale === 'en' ? '/assets/portfolio/fitness-mobile-app-creative-v4-en-swapped-labels.png' : '/assets/portfolio/fitness-mobile-app-ukr.png',
      imageAlt: t('portfolio.projectSportsAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      imageSized: true,
      category: 'mobile',
      portfolioProject: 'sports-crm',
    },
    {
      title: t('portfolio.projectAirScannerTitle'),
      mobileLabel: 'Air Scanner',
      description: t('portfolio.projectAirScannerDescription'),
      image: locale === 'en' ? '/assets/portfolio/air-scanner-mobile-ad-en-3d.png' : '/assets/portfolio/air-scanner-mobile-ad-ua-3d.png',
      imageAlt: t('portfolio.projectAirScannerAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      imageSized: true,
      category: 'mobile',
      portfolioProject: 'air-scanner',
    },
    {
      title: t('portfolio.projectSwipeShotTitle'),
      mobileLabel: 'SwipeShot',
      description: t('portfolio.projectSwipeShotDescription'),
      image: locale === 'en' ? '/assets/portfolio/swipeshot-mobile-ad-en-3d.png' : '/assets/portfolio/swipeshot-mobile-ad-ua-3d.png',
      imageAlt: t('portfolio.projectSwipeShotAlt'),
      imageFit: 'cover',
      imagePosition: 'top',
      imageSized: true,
      category: 'mobile',
      portfolioProject: 'swipeshot',
    },
  ]

  const localizedCapabilities = homeCapabilities.map((item, index) => {
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
      imageAlt: t('portfolio.projectMedScannerAlt'),
    }
  })

  return (
    <main className={styles.main}>
      <MarketingHero
        variant="home"
        title={localize('Перетворюю ідеї на готові цифрові продукти')}
        description={localize('Full-stack розробник. Сайти, CRM-системи та мобільні застосунки для реальних бізнес-завдань')}
        actionLabel={localize('Переглянути роботи')}
        actionHref="/portfolio"
        image={asset(locale === 'en' ? 'vetscanct-dashboard-anna-14-uniform-en.png' : 'vetscanct-dashboard-anna-14-uniform.png')}
        imageAlt={localize('Головна панель VetScanCT для керування записами, пацієнтами та оплатами')}
        showEarthGlobe
        rightImage={asset('hero-founder-transparent-graphite-v2.png')}
      />
      <TechnologyMarquee technologies={homeTechnologies} label={localize('Технології, з якими я працюю')} withHeroFade />
      <PageSection id="projects" className={styles.capabilitySection}>
        <SectionHeading
          title={localize('Що я створюю')}
          description={localize('Від першої ідеї до готового цифрового продукту — створюю рішення, які допомагають бізнесу працювати ефективніше.')}
        />
        <CapabilityShowcase items={localizeCapabilities(localizedCapabilities, localize)} />
      </PageSection>
      <PageSection tone="raised" className={styles.projectsSection}>
        <SectionHeading
          title={localize('Вибрані проєкти')}
          description={localize('Реальні цифрові продукти для бізнесу — від CRM-систем і вебсайтів до мобільних застосунків')}
        />
        <div className={`${styles.sliderWrap} ${styles.homeSliderWrap}`}>
          <FeatureSlider
            items={homeSlides}
            label={localize('Вибрані CRM-проєкти')}
            title={t('portfolio.categoryCrm')}
            headingGap="spacious"
            mobileCategoryGroups={[
              { id: 'crm', label: t('portfolio.categoryCrm'), items: homeSlides },
              { id: 'sites', label: t('portfolio.categorySites'), items: websiteSlides },
              { id: 'mobile', label: t('portfolio.categoryMobile'), items: mobileSlides },
            ]}
          />
        </div>
      </PageSection>
      <PageSection className={`${styles.homeAudienceSection} ${styles.mobileCategorySecondarySection}`}>
        <FeatureSlider items={websiteSlides} label={localize('Вебсайти та лендинги')} title={localize('Вебсайти та лендинги')} headingGap="spacious" scrollableControls reverse />
      </PageSection>
      <PageSection tone="raised" className={styles.mobileCategorySecondarySection}>
        <FeatureSlider items={mobileSlides} label={localize('Мобільні застосунки')} title={localize('Мобільні застосунки')} description={localize('Зручні мобільні продукти для iOS та Android із продуманим користувацьким досвідом.')} compact />
      </PageSection>
      <PageSection id="capabilities" className={styles.capabilitiesSection}>
        <CapabilitiesEssay />
      </PageSection>
    </main>
  )
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
