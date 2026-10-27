import type { Metadata } from 'next'
import ServicePage from '../../../../components/ServicePage/ServicePage'
import { getDefaultServiceMetadata } from '../../../../lib/seo'
import { getServiceContent } from '../../../../lib/service-content'

export const metadata: Metadata = getDefaultServiceMetadata('crm-development')

export default function CrmDevelopmentPage() {
  return <ServicePage content={getServiceContent('uk', 'crm-development')} />
}
