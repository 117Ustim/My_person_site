import type { Metadata } from 'next'
import ServicePage from '../../../../components/ServicePage/ServicePage'
import { getDefaultServiceMetadata } from '../../../../lib/seo'
import { getServiceContent } from '../../../../lib/service-content'

export const metadata: Metadata = getDefaultServiceMetadata('mobile-app-development')

export default function MobileAppDevelopmentPage() {
  return <ServicePage content={getServiceContent('uk', 'mobile-app-development')} />
}
