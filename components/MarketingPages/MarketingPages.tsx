import Image from 'next/image'
import Link from 'next/link'
import { aiPracticeFeatures, asset, consolidatorFeatures, custodyFeatures, homeLogos, homeModules, homeSlides, homeTechnologies, independentFeatures, pricingFeatures, securityCards, securityGroups, teamMembers, principles } from '../../lib/page-data'
import BookingCta from '../BookingCta/BookingCta'
import FeatureGrid from '../FeatureGrid/FeatureGrid'
import FeatureSlider from '../FeatureSlider/FeatureSlider'
import FaqSection from '../FaqSection/FaqSection'
import LogoStrip from '../LogoStrip/LogoStrip'
import MarketingHero from '../MarketingHero/MarketingHero'
import ModuleShowcase from '../ModuleShowcase/ModuleShowcase'
import PageSection from '../PageSection/PageSection'
import SectionHeading from '../SectionHeading/SectionHeading'
import TechnologyMarquee from '../TechnologyMarquee/TechnologyMarquee'
import styles from './MarketingPages.module.css'

export function HomePageContent() {
  return (
    <main className={styles.main}>
      <MarketingHero
        variant="home"
        title="Перетворюю ідеї на готові цифрові продукти"
        description="Full-stack розробник. Сайти, CRM-системи та мобільні застосунки для реальних бізнес-завдань"
        actionLabel=""
        image={asset('vetscanct-dashboard-anna-14-uniform.png')}
        imageAlt="Головна панель VetScanCT для керування записами, пацієнтами та оплатами Ани"
        showEarthGlobe
        rightImage={asset('hero-founder-transparent-graphite-v2.png')}
      />
      <TechnologyMarquee technologies={homeTechnologies} label="Технології, з якими я працюю" withHeroFade />
      <PageSection>
        <SectionHeading title="Save Time & Grow AUM" />
        <ModuleShowcase items={homeModules} />
      </PageSection>
      <PageSection tone="raised">
        <SectionHeading title="The platform that scales your firm" />
        <div className={`${styles.sliderWrap} ${styles.homeSliderWrap}`}>
          <FeatureSlider
            items={homeSlides}
            label="Practice management features"
            title="Independent firms"
            description="Spend less time on admin and more time delivering advice that matters."
          />
        </div>
      </PageSection>
      <PageSection className={styles.homeAudienceSection}>
        <div className={styles.audienceSectionHeading}>
          <SectionHeading title="Who it&apos;s for" />
        </div>
        <FeatureSlider
          items={consolidatorFeatures}
          label="Consolidator features"
          title="Consolidators"
          description="Unify firms, data, and controls to scale faster — without operational drag."
          reverse
        />
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Built for regulated environments" title="Trust is part of the product." />
        <div className={styles.trustGrid}>
          <TrustPoint title="Built to industry standards" text="SOC 2 Type 2 and ISO 27001 certified. FCA authorisation in progress." />
          <TrustPoint title="Security by default" text="Two-factor authentication is required for every user." />
          <TrustPoint title="Zero data leakage" text="Built in-house and hosted entirely on Obsidian's infrastructure." />
        </div>
      </PageSection>
    </main>
  )
}

export function AiPracticePageContent() {
  return (
    <main className={styles.main}>
      <MarketingHero title="AI Practice Management for Financial Advisors" description="Client records, meeting notes, and tasks — captured automatically, searchable instantly." image={asset('0608-ai-crm-showcase-1.BA7DqGyJ_Z4RGTS-9c86c2a878.avif')} imageAlt="AI practice management workspace" />
      <PageSection>
        <div className={styles.featureIntro}><SectionHeading title="Find anything, fast" /><FeatureGrid items={aiPracticeFeatures.slice(0, 2)} columns={2} /></div>
      </PageSection>
      <PageSection tone="raised">
        <SectionHeading title="Beyond the essentials" description="Spend less time on admin and more time delivering advice that matters." />
        <FeatureSlider items={aiPracticeFeatures.slice(2)} label="AI practice management features" />
      </PageSection>
      <PageSection>
        <SectionHeading title="Plan and Prioritise" />
        <FeatureGrid items={homeSlides.slice(0, 2)} columns={2} />
        <Link className={styles.nextLink} href="/what-we-offer/custody-and-execution">What else we offer <span>Custody &amp; Execution →</span></Link>
      </PageSection>
    </main>
  )
}

export function CustodyPageContent() {
  return (
    <main className={styles.main}>
      <MarketingHero title="Custody & Execution" description="Trade, rebalance, and custody — all in one place. With instant account opening." leftImage={asset('0678-custody-stone-left.DepH_mVM_BmKt9-bc97e4a917.webp')} rightImage={asset('0679-custody-stone-right.bb0PbSrX_27c1Ex-e94a35c725.webp')} />
      <PageSection>
        <SectionHeading eyebrow="Trade with control" title="Trading" />
        <div className={styles.highlightGrid}><TrustPoint title="Execute at Scale" text="Bulk rebalancing across unlimited client portfolios." /><TrustPoint title="Models & Wrappers Built In" text="GIA, ISA, and SIPP — with firm-wide model portfolios." /><TrustPoint title="Simple, Secure Custody" text="Pending FCA authorisation." /></div>
      </PageSection>
      <PageSection tone="raised">
        <SectionHeading title="Execution" description="A clear, controlled workflow for every portfolio." />
        <FeatureGrid items={custodyFeatures} columns={3} />
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
  return (
    <main className={styles.main}>
      <MarketingHero title={title} description={description} image={image} imageAlt={`${title} Obsidian workspace`} />
      <PageSection>
        <SectionHeading title={title === 'Independent firms' ? 'The platform that scales with your firm' : 'Unlock rapid growth'} description={description} />
        <FeatureSlider items={features} label={`${title} features`} title={title} description={description} />
      </PageSection>
      <BookingCta />
    </main>
  )
}

export function SecurityPageContent() {
  const faqs = [
    ['How is client data protected?', 'All client data is processed and stored within Obsidian’s own AWS infrastructure.'],
    ['Does a meeting bot join calls?', 'No. Obsidian captures meetings through system audio on the adviser’s own device.'],
    ['Is client data used to train AI models?', 'No. Your clients’ data is never used to train, fine-tune, or improve AI models.'],
    ['Where is data hosted?', 'All data is hosted on AWS in the EU, in Obsidian-controlled infrastructure.'],
  ].map(([question, answer]) => ({ question, answer }))

  return (
    <main className={styles.main}>
      <MarketingHero title="The most private AI for advisers." description="From encryption to access management, Obsidian enforces rigorous standards to keep your clients' data secure, private, and compliant." image={asset('0708-independent-firms-stone-top.CzfPSXxC_eSAGJ-232b10fd15.webp')} imageAlt="Obsidian security and privacy" />
      <PageSection>
        <div className={styles.securityCards}>{securityCards.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className={styles.securityGroups}>{securityGroups.map(group => <section key={group.title}><h2>{group.title}</h2><div className={styles.securityList}>{group.items.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>)}</div>
      </PageSection>
      <PageSection tone="raised">
        <div className={styles.faqLayout}><SectionHeading eyebrow="Frequently asked questions" title="FAQ" /><FaqSection items={faqs} /></div>
      </PageSection>
      <BookingCta title="Security you can explain to your clients." />
    </main>
  )
}

export function PricingPageContent() {
  const faqs = [
    ['Is AI Practice Management really free?', 'Yes. There are no per-seat fees, trial periods, or feature gates.'],
    ['Will custody be free too?', 'Custody & Execution will be a separate paid product when it launches.'],
    ['Are there client or seat caps?', 'No. Add as many team members and clients as you need.'],
  ].map(([question, answer]) => ({ question, answer }))

  return (
    <main className={styles.main}>
      <MarketingHero title="Always free for advisers." description="Big or small. AI Practice Management with no per-seat fees, no trial periods, and no feature gates." />
      <PageSection>
        <div className={styles.pricingCards}><TrustPoint title="AI Practice Management" text="Everything you need to run your firm — meetings, CRM, documents, portfolios, and 65+ AI tools." /><TrustPoint title="Custody & Execution" text="Trade, rebalance, and custody — all in one place. With instant account opening." /></div>
      </PageSection>
      <PageSection tone="raised">
        <SectionHeading title="Compare features" />
        <div className={styles.featureTable}>{pricingFeatures.map(([title, text]) => <div key={title}><strong>{title}</strong><span>{text}</span><b>Included</b></div>)}</div>
      </PageSection>
      <PageSection><div className={styles.faqLayout}><SectionHeading eyebrow="Frequently asked questions" title="FAQ" /><FaqSection items={faqs} /></div></PageSection>
      <BookingCta />
    </main>
  )
}

export function AboutPageContent() {
  return (
    <main className={styles.main}>
      <MarketingHero title="A Family Office For Every Family" description="Obsidian helps advisers deliver a personalised service at a fraction of the cost." image={asset('0739-about-stone.CIU_KC6y_Z1peJd0-c9c65b3996.webp')} imageAlt="Obsidian team and family office" />
      <LogoStrip logos={homeLogos} label="Made by the people behind" />
      <PageSection>
        <SectionHeading title="Leadership" />
        <div className={styles.teamGrid}>{teamMembers.map(([role, name, image]) => <article key={name}><div className={styles.teamImage}><Image src={asset(image)} alt={name} fill sizes="(max-width: 600px) 100vw, 25vw" /></div><p>{role}</p><h3>{name}</h3></article>)}</div>
      </PageSection>
      <PageSection tone="raised"><SectionHeading title="Principles" /><div className={styles.principleGrid}>{principles.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></PageSection>
    </main>
  )
}

export function MediaPageContent() {
  return (
    <main className={styles.main}>
      <MarketingHero title="Media center" description="News, updates, and resources from Obsidian." image={asset('0679-custody-stone-right.bb0PbSrX_27c1Ex-e94a35c725.webp')} imageAlt="Obsidian media center" />
      <PageSection><SectionHeading title="Built for the way advice works now" description="CRMs that do not talk to portfolios. Risk platforms detached from execution. Emails, documents, meetings, and decisions scattered across systems. Obsidian brings them together in a single, continuously learning platform." /><div className={styles.downloads}><DownloadCard title="Download Brand Kit" type="Brand assets" /><DownloadCard title="Download Obsidian Logo" type="Logo files" /></div></PageSection>
    </main>
  )
}

function TrustPoint({ title, text }: { title: string; text: string }) {
  return <article className={styles.trustPoint}><span className={styles.pointIcon} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>
}

function DownloadCard({ title, type }: { title: string; type: string }) {
  return <article className={styles.downloadCard}><span>{type}</span><h3>{title}</h3><Link href="mailto:support@obsidianos.com">Request files →</Link></article>
}
