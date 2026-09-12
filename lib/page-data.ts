import { integrationRoutes } from './site-content'

export const asset = (file: string) => `/sitegrab/assets/${file}`

export type FeatureItem = {
  title: string
  description: string
  image: string
  imageAlt: string
}

export type ModuleShowcaseItem = {
  badge: string
  badgeTone?: 'green'
  title: string
  description: string
  image: string
  backgroundImage?: string
  imageAlt: string
  href: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type ArticleSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export type ArticleDefinition = {
  eyebrow?: string
  title: string
  updated?: string
  intro?: string
  sections: ArticleSection[]
}

export const homeSlides: FeatureItem[] = [
  {
    title: 'Day plan',
    description: 'Kanban view of meetings, tasks, and client communications.',
    image: asset('0413-day-plan.pRAWub-J_Z1EnmSo-cf85045a33.webp'),
    imageAlt: 'Obsidian day plan with meetings and tasks',
  },
  {
    title: 'AI search',
    description: 'Find relevant client information in seconds, with intelligent unified search.',
    image: asset('0414-ai-search.BMM0yPyY_Z5gSex-d370fc1f32.webp'),
    imageAlt: 'Obsidian AI search interface',
  },
  {
    title: 'AI meeting assistant',
    description: 'Every client meeting becomes context, insight, and action automatically.',
    image: asset('0415-ai-meeting-assistant.CwDhRG_r_22SBpv-6c48e41a43.webp'),
    imageAlt: 'Obsidian AI meeting assistant',
  },
  {
    title: 'Document digitisation',
    description: 'Turn paper records and scanned documents into searchable structured data.',
    image: asset('0416-document-digitisation.BD5uC3Ah_fVJAt-fc101b6519.webp'),
    imageAlt: 'Obsidian document digitisation workflow',
  },
  {
    title: 'Suitability report',
    description: 'Generate compliant suitability reports with AI assistance.',
    image: asset('0417-suitability-report.B5TTyTgk_iOimB-661a8e7779.webp'),
    imageAlt: 'Obsidian suitability report workflow',
  },
  {
    title: 'Portfolio aggregation',
    description: "See every client's full portfolio across custodians and platforms in one view.",
    image: asset('0418-portfolio-aggregation.PunMrhnF_2epFa9-74c9f5780f.webp'),
    imageAlt: 'Obsidian portfolio aggregation view',
  },
  {
    title: 'Client-ready emails in your voice',
    description: 'Personalised drafts that match your tone and are ready to send.',
    image: asset('0419-client-emails.CKSV3bjd_evzaG-bf6ff661c0.webp'),
    imageAlt: 'Obsidian client email assistant',
  },
]

export const homeModules: ModuleShowcaseItem[] = [
  {
    badge: 'Free',
    badgeTone: 'green',
    title: 'AI Practice Management',
    description: 'AI meeting notes, CRM, and portfolio aggregation all in one free module.',
    backgroundImage: asset('ai-practice-management-bg.Cryy4Gi7_Zhl0Kg.avif'),
    image: asset('ai-practice-management.B-QTso8g_Z23fjdB.avif'),
    imageAlt: 'AI Practice Management',
    href: '/what-we-offer/ai-crm-for-financial-advisors',
  },
  {
    badge: 'Coming Soon',
    title: 'Execution & Custody',
    description: 'Trade, rebalance, and custody - all in one place. With instant account opening.',
    image: asset('custody-execution.dmFQEtaJ_Z1BGlHK.avif'),
    imageAlt: 'Execution & Custody',
    href: '/what-we-offer/custody-and-execution',
  },
]

export const homeLogos = [
  ['BlackRock', asset('0016-blackrock.CIy1ueqj_vL1j4-4e70f35ff1.svg')],
  ['Revolut', asset('0022-revolut.gYIcWU2b_Z1zhTLE-4e66c20a63.svg')],
  ['JPMorgan Chase', asset('0020-jpmorgan.SVoW66ww_Z7E196-cc9e08f475.svg')],
  ['Parmenion', asset('0017-parmenion.X7K3NN1c_vmB9V-5927f0ba5c.svg')],
  ['Wise', asset('0034-wise.CX8Tml1r_1pkwdO-dca5795ebb.svg')],
] as const

export const independentFeatures: FeatureItem[] = [
  {
    title: 'Day plan',
    description: 'Your command centre for the day: meetings, tasks, and client communications together.',
    image: asset('0413-day-plan.pRAWub-J_Z1EnmSo-cf85045a33.webp'),
    imageAlt: 'Day plan for an independent advisory firm',
  },
  ...homeSlides.slice(1),
]

export const consolidatorFeatures: FeatureItem[] = [
  {
    title: 'Multi-firm oversight',
    description: 'Manage multiple firms under one organisation with consolidated reporting, controls, and visibility.',
    image: asset('0420-multi-firm-oversight.VYriV9jz_ZBgx0J-13caba58f0.webp'),
    imageAlt: 'Multi-firm oversight dashboard',
  },
  {
    title: 'Rapid onboarding',
    description: 'Onboard new firms in minutes through automated data migration and structured setup.',
    image: asset('0421-rapid-onboarding.B_Nw05ZN_1DTEqw-e7660f5963.webp'),
    imageAlt: 'Rapid onboarding workflow',
  },
  {
    title: 'Document digitisation',
    description: 'Convert paper records into searchable, structured data across the organisation.',
    image: asset('0416-document-digitisation.BD5uC3Ah_fVJAt-fc101b6519.webp'),
    imageAlt: 'Document digitisation workflow',
  },
  {
    title: 'Data segregation',
    description: 'Maintain strict separation between firms, teams, and users, with tenant-level data isolation.',
    image: asset('0422-data-segregation.CUdFkn3M_ZudYYj-be69b90bcd.webp'),
    imageAlt: 'Firm data segregation controls',
  },
  {
    title: 'Role-based access',
    description: 'Fine-grained permissions ensure the right people see the right data.',
    image: asset('0423-role-based-access.DeH-k5Qd_Z2h9vAB-424b4e1311.webp'),
    imageAlt: 'Role-based access controls',
  },
  {
    title: 'Audit trails',
    description: 'Complete visibility into every action across your organisation for compliance and oversight.',
    image: asset('0424-audit-trails.C-jNeSZ1_1kIMDo-f67e065889.webp'),
    imageAlt: 'Audit trail activity log',
  },
  {
    title: 'Everything for Independent Firms and more',
    description: 'Built on the full Independent Firm feature set, with additional layers for oversight, scale, and control.',
    image: asset('0425-everything-independent-firms.B6vOtnnu_Z2q8llE-15ba5757ae.webp'),
    imageAlt: 'Everything for Independent Firms and more',
  },
]

export const aiPracticeFeatures: FeatureItem[] = [
  {
    title: 'AI Search',
    description: 'Unified search across your tools, documents, and client records.',
    image: asset('0600-ai-crm-showcase-1.BA7DqGyJ_Z1UWL8A-5f53190a32.webp'),
    imageAlt: 'AI search across client records',
  },
  {
    title: 'AI Meeting Summaries',
    description: 'Context-aware notes without a meeting bot listening in.',
    image: asset('0601-ai-crm-showcase-2.BgCme2To_1AEuRr-bb8b7adcb0.webp'),
    imageAlt: 'AI meeting summaries',
  },
  {
    title: 'Smart meeting prep',
    description: 'Auto-generated client briefs before every meeting.',
    image: asset('0602-smart-meeting-prep.Czp4G2bj_petKR-3b02a32490.webp'),
    imageAlt: 'Smart meeting preparation',
  },
  {
    title: 'Suitability report',
    description: 'Generate compliant suitability reports from meeting context.',
    image: asset('0417-suitability-report.B5TTyTgk_iOimB-661a8e7779.webp'),
    imageAlt: 'AI-assisted suitability report',
  },
  {
    title: 'Document digitisation',
    description: 'Convert paper records into searchable structured data.',
    image: asset('0416-document-digitisation.BD5uC3Ah_fVJAt-fc101b6519.webp'),
    imageAlt: 'Document digitisation',
  },
  {
    title: 'Client-ready emails in your voice',
    description: 'Draft personalised emails that match your tone and style.',
    image: asset('0419-client-emails.CKSV3bjd_evzaG-bf6ff661c0.webp'),
    imageAlt: 'Client-ready email draft',
  },
  {
    title: 'Client & household view',
    description: 'See every person, account, and interaction in one place.',
    image: asset('0603-client-household-view.BKldGp32_Z1K51Bu-f83dfb8bf1.webp'),
    imageAlt: 'Client and household view',
  },
  {
    title: 'Automated task generation',
    description: 'Turn meeting actions into tracked tasks without manual entry.',
    image: asset('0604-automated-task-generation.CJA3PVKW_Z2rq9Dt-00ba617109.webp'),
    imageAlt: 'Automated task generation',
  },
  {
    title: 'AI chat',
    description: 'Ask questions across your client data and get instant answers.',
    image: asset('0605-ai-chat.Byp0uBUa_1n7G6E-ce8c9072af.webp'),
    imageAlt: 'AI chat over client data',
  },
]

export const custodyFeatures: FeatureItem[] = [
  {
    title: 'Controlled Trading',
    description: 'Rebalance at scale with precision controls.',
    image: asset('0680-custody-showcase.Cil-6R0g_Z5GDGz-6bba8459f1.webp'),
    imageAlt: 'Controlled trading interface',
  },
  {
    title: 'Accounts and Wrappers',
    description: 'GIA, ISA, and SIPP — built in.',
    image: asset('0680-custody-showcase.Cil-6R0g_Z5GDGz-6bba8459f1.webp'),
    imageAlt: 'Accounts and wrappers interface',
  },
  {
    title: 'Safekeeping and Controls',
    description: 'Secure custody of client assets with clear ownership records.',
    image: asset('0680-custody-showcase.Cil-6R0g_Z5GDGz-6bba8459f1.webp'),
    imageAlt: 'Safekeeping and controls interface',
  },
]

export const securityCards = [
  ['GDPR', "We operate under GDPR — the world's strictest standard for data privacy — ensuring your clients' data is handled with the highest level of care."],
  ['SOC 2 Type 2', 'Independently audited to ensure secure and compliant management of data across all our systems.'],
  ['ISO 27001', 'Meeting the internationally recognised standard for information security management.'],
  ['ISO 22301', 'Working towards business continuity so your data remains protected and accessible.'],
] as const

export const securityGroups = [
  {
    title: 'Trusted data handling',
    items: [
      ['One subprocessor for client data', "All AI processing happens within Obsidian's own infrastructure."],
      ['No meeting bot', "No bot joins the call, and no third party ever hears the conversation."],
      ['Built entirely in-house', "Your clients' data never leaves our controlled infrastructure."],
    ],
  },
  {
    title: 'Enterprise-grade security',
    items: [
      ['Mandatory 2FA', 'Every user is required to authenticate with two factors on every login.'],
      ['Role-based access', 'Advisers, paraplanners, and administrators each see only relevant information.'],
      ['Built by experts', 'Our teams bring experience from Revolut, BlackRock, JPMorgan, and Parmenion.'],
    ],
  },
  {
    title: 'Regular security audits',
    items: [
      ['Encryption', 'Data is encrypted in transit with TLS 1.2+ and at rest with AES-256.'],
      ['Penetration testing', 'Weekly automated scans and an independent external pen test every year.'],
      ['Hosting & residency', 'All data is hosted on AWS in the EU, in Obsidian-controlled infrastructure.'],
    ],
  },
] as const

export const pricingFeatures = [
  ['Practice Management', 'Run your firm from a single platform.'],
  ['AI', 'AI that works across your entire client book.'],
  ['Meetings', 'Capture every conversation without a bot.'],
  ['Portfolio & Market Data', 'One view across every custodian.'],
  ['Integrations', 'Connect the tools you already use.'],
  ['Security & Compliance', 'Built for regulated environments.'],
  ['Platforms', 'Work from anywhere.'],
  ['Custody & Execution', 'Trade, rebalance, and custody in one place.'],
] as const

export const teamMembers = [
  ['Chief Executive Officer', 'Hasnain Bukhari', '0740-hasnain-bukhari.CEeZIq7b_1qRNnP-df7044b4b0.webp'],
  ['Chief Operating Officer', 'Samarth Aggarwal', '0741-samarth-aggarwal.Bsuz07Uy_1nsYyg-188377cab5.webp'],
  ['Head of Compliance', 'Ian Stone', '0742-ian-stone.CmuGvn5H_13TEz9-4489ade55a.webp'],
  ['Chief Technology Officer', 'Ronald Noble', '0743-ronald-noble.Lrekf5_G_Z1r0b90-d093d25350.webp'],
  ['Head of Operations', 'Emma Chisholm', '0744-emma-chisholm.DHF35fer_1DmNJ9-28f9fb4a4f.webp'],
  ['Head of Frontend Engineering', 'Lembit Lõpp', '0745-lembit-lopp.CP-yjsTQ_ZMEgOy-67d36a60ee.webp'],
  ['Head of Design', 'Laura Leon', '0746-laura-leon.40Oy7Kdp_Z1Tr8FW-99dacfe81e.webp'],
  ['Board Advisor', 'Asif Naidu', '0747-asif-naidu.BlUX9myT_21xhoq-9fead365e9.webp'],
] as const

export const principles = [
  ['Clarity first', "We simplify until only what matters remains. If something feels complex, the work isn't finished."],
  ['Explicit by default', "If it matters, we say it. If it's unclear, we fix it. No one's left guessing."],
  ['Finish strong', "Promises aren't goals. They're the starting point."],
] as const

export const integrationLogoFiles: Record<string, string> = {
  'gmail-and-google-calendar': '0125-Gmail-47fa5456fd.svg',
  outlook: '0126-Outlook-4250a28a23.svg',
  intelliflo: '0130-Intelliflo-8738abcac2.svg',
  salesforce: '0128-Salesforce-7894b56b8f.svg',
  onedrive: '0129-OneDrive-9f97efe880.svg',
  sharepoint: '0127-SharePoint-09ce41b381.svg',
  'seven-im': '0131-7IM-7c063a3544.svg',
  'abrdn-wrap': '0133-Aberdeen-6437a32483.svg',
  'abrdn-elevate': '0133-Aberdeen-6437a32483.svg',
  aegon: '0135-Aegon-00a0fed8d3.svg',
  'aj-bell': '0152-AJBell-2a0739a274.svg',
  aviva: '0134-Aviva-2d77c73450.svg',
  'brewin-dolphin': '0150-Brewin-20Dolphin-c099ee8d67.svg',
  'canada-life': '0137-Canada-20Life-2e4e1b544b.svg',
  cofunds: '0132-Cofunds-7e656610ee.svg',
  fidelity: '0138-Fidelity-811ad9b72e.svg',
  'host-capital': '0140-Host-20Capital-cdd13c43b8.svg',
  'james-hay': '0139-James-20Hay-fb026449e1.svg',
  'mg-wealth': '0143-M-26G-20Wealth-4e0f031956.svg',
  nucleus: '0136-Nucleus-8b338c173e.svg',
  parmenion: '0144-Parmenion-97a31d9de0.svg',
  quilter: '0147-Quilter-7d74a24a13.svg',
  'raymond-james': '0148-Raymond-20James-e561d672c9.svg',
  'ssc-hubwise': '0151-SSC-54609b6eb7.svg',
  'scottish-widows': '0142-Scottish-20widow-b7fe76b4e4.svg',
  transact: '0141-Transact-f480bbe713.svg',
  wealthtime: '0153-Wealthtime-974ab12664.svg',
  'wealthtime-classic': '0153-Wealthtime-974ab12664.svg',
  'standard-life': '0154-Standard-20Life-2f5af3f67c.svg',
  'royal-london': '0146-Royal-20London-a92315891c.svg',
  prudential: '0145-Prudential-d7e6605d6e.svg',
  claude: '0149-Claude-073142e76d.svg',
}

const categoryBySlug: Record<string, string> = {
  'gmail-and-google-calendar': 'Email & Calendar',
  outlook: 'Email & Calendar',
  intelliflo: 'CRM',
  salesforce: 'CRM',
  onedrive: 'Storage',
  sharepoint: 'Storage',
  claude: 'AI assistants',
}

export type IntegrationDefinition = {
  slug: string
  name: string
  category: string
  logo: string
  cardDescription: string
  summary: string
  capabilities: string[]
  howItWorks: string
  connectionSteps: string[]
  worksWith: string[]
  faq: FaqItem[]
}

export const integrationDefinitions: IntegrationDefinition[] = integrationRoutes.map(([slug, name]) => {
  const category = categoryBySlug[slug] ?? 'Wealth Platforms'
  const isEmail = category === 'Email & Calendar'
  const isCrm = category === 'CRM'
  const isStorage = category === 'Storage'
  const isAssistant = category === 'AI assistants'
  const objectName = isEmail ? 'email and calendar' : isCrm ? 'client records' : isStorage ? 'documents' : isAssistant ? 'practice data' : 'portfolio valuations'
  const capabilities = isEmail
    ? ['Email access', 'Email drafts', 'Calendar sync']
    : isCrm
      ? ['Client record sync', 'Meeting notes', 'Documents']
      : isStorage
        ? ['Automatic document saving', 'Meeting notes', 'Reports']
        : isAssistant
          ? ['Clients and households', 'Meetings and day plan', 'Tasks and portfolios']
          : ['Portfolio valuations']

  return {
    slug,
    name,
    category,
    logo: asset(integrationLogoFiles[slug]),
    cardDescription: isAssistant ? 'Work with your practice data directly inside Claude.' : `${category} connection for ${name}.`,
    summary: `Yes. Obsidian supports ${name} for ${objectName}, keeping information available alongside the rest of your practice.`,
    capabilities,
    howItWorks: `Obsidian connects securely to ${name} and keeps the relevant ${objectName} synchronised. Data is mapped into the Obsidian workspace so advisers can work from one reliable view without switching between systems.`,
    connectionSteps: ['Go to Playbook → Apps in Obsidian.', `Find ${name} and click Connect to submit a connection request.`, 'Authorise access through the provider.', 'The connection is ready and data begins syncing automatically.'],
    worksWith: isAssistant ? ['Client records', 'Meetings', 'Tasks'] : isEmail ? ['AI Meeting Notes', 'CRM', 'Day Plan'] : ['AI Practice Management', 'Day Plan', 'Portfolio view'],
    faq: [
      { question: `Does Obsidian integrate with ${name}?`, answer: `Yes. ${name} is available as a ${category.toLowerCase()} integration in Obsidian.` },
      { question: `What can I do with the ${name} integration?`, answer: `You can keep ${objectName} in sync and use it in the workflows that already run inside Obsidian.` },
      { question: `Is the ${name} integration free?`, answer: 'AI Practice Management is free for advisers. Availability of individual integrations may depend on the connected service.' },
      { question: `How do I connect ${name} to Obsidian?`, answer: 'Open Playbook → Apps, select the integration, and follow the authorisation steps.' },
    ],
  }
})

export function getIntegrationDefinition(slug: string) {
  return integrationDefinitions.find(item => item.slug === slug)
}

export const articleDefinitions: Record<string, ArticleDefinition> = {
  '/legal/privacy-policy': {
    updated: '16 Jan 2026',
    title: 'Privacy Policy',
    sections: [
      { title: 'Information We Collect', paragraphs: ['We may collect limited personal information you provide to us, such as your name and email address. We may also collect basic usage data to improve our services.'] },
      { title: 'How We Use Information', paragraphs: ['We use your information to:'], bullets: ['Provide and operate our services', 'Communicate with you', 'Improve product performance and reliability', 'Maintain security and prevent misuse'] },
      { title: 'Data Sharing', paragraphs: ['We may share information with trusted service providers only when necessary to operate our services. These providers are required to protect your data.'] },
      { title: 'Data Security', paragraphs: ['We take reasonable measures to protect your information, but no system is completely secure.'] },
      { title: 'Your Choices', paragraphs: ['You may request access, correction, or deletion of your personal information by contacting us.'] },
      { title: 'Changes', paragraphs: ['We may update this Privacy Policy from time to time. Updates will be posted on this page.'] },
      { title: 'Contact', paragraphs: ['If you have questions about this Privacy Policy, please contact us.'] },
    ],
  },
  '/legal/terms-of-service': {
    updated: '16 Jan 2026',
    title: 'Terms of Service',
    sections: [
      { title: 'Use of the Service', paragraphs: ['You may use the service only for lawful purposes and in accordance with these terms.'] },
      { title: 'Availability', paragraphs: ['We aim to provide reliable access, but we do not guarantee uninterrupted or error-free service.'] },
      { title: 'Data Sharing', paragraphs: ['We may share information with trusted service providers only when necessary to operate our services. These providers are required to protect your data.'] },
      { title: 'Intellectual Property', paragraphs: ['All content, software, and materials provided as part of the service are owned by us or our licensors and may not be copied or reused without permission.'] },
      { title: 'Limitation of Liability', paragraphs: ['The service is provided “as is.” We are not liable for any indirect, incidental, or consequential damages resulting from your use of the service.'] },
      { title: 'Termination', paragraphs: ['We may suspend or terminate access if these terms are violated.'] },
      { title: 'Changes', paragraphs: ['We may update these Terms from time to time. Continued use of the service means you accept the updated terms.'] },
      { title: 'Governing Law', paragraphs: ['These terms and conditions shall be governed by and construed in accordance with the laws of England and Wales.'] },
    ],
  },
  '/legal/cookie-policy': {
    updated: '16 Jan 2026',
    title: 'Cookie Policy',
    sections: [
      { title: 'About Cookies', paragraphs: ['We use technologies that allow us to access and store information or use resources on your device as they interact with this Website. For simplicity, all such technologies are defined as “Cookies” within this document.', 'Some purposes for which Cookies are used may also require your consent. Whenever consent is given, it can be freely withdrawn at any time.'] },
      { title: 'Why does Obsidian use cookies?', paragraphs: ['We use cookies for technical operations, optional functionality, analytics, and advertising measurement. Essential cookies are required for the operation of the Websites and to store consent preferences.'] },
      { title: 'Disabling Cookies', paragraphs: ['You can change your browser settings to control what cookies the browser stores. If you disable cookies, you may still visit our Websites, but some features may be limited.'] },
      { title: 'Cookies we use', paragraphs: ['Essential cookies store consent preferences. Functional cookies support performance and optional features. Analytics cookies help us understand how the Websites are used. Advertisement cookies measure campaign effectiveness.'] },
      { title: 'Tag management', paragraphs: ['We use Google Tag Manager to manage website tags. Google Tag Manager does not itself set analytics cookies; it is used to load tools such as Google Analytics.'] },
    ],
  },
  '/security/subprocessors': {
    updated: '31 May 2026',
    title: 'Subprocessors',
    sections: [
      { title: 'Our approach to subprocessors', paragraphs: ["Obsidian keeps its subprocessor list short by design. All core AI processing happens within Obsidian's own AWS infrastructure — client data does not pass through multiple third-party AI services.", 'This page lists every third-party entity that processes data on Obsidian’s behalf. Before appointing a new subprocessor, we give at least 30 days’ advance notice to subscribers.'] },
      { title: 'Client data subprocessor', paragraphs: ['Amazon Web Services — cloud infrastructure, AI processing, and data storage. Data residency: EU (eu-west-2, London).'] },
      { title: 'Ancillary subprocessors', paragraphs: ['Twilio supports outbound phone calls. Sentry supports application error monitoring. Google Analytics supports website analytics. These services do not process client data.'] },
      { title: 'User-authorised integrations', paragraphs: ['When an adviser connects a third-party service such as Gmail, Outlook, OneDrive, or Intelliflo, data flows directly between Obsidian and that service under the adviser’s own authorisation.'] },
      { title: 'Infrastructure services', paragraphs: ['Infrastructure-level services such as DNS, CDN, and email delivery are not listed as subprocessors because they do not process client data.'] },
    ],
  },
}

export function getArticleDefinition(path: string) {
  return articleDefinitions[path]
}
