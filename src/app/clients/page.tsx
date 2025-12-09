import { Metadata } from 'next'
import { DatabaseService } from '../../lib/database'
import ClientsPageClient from './ClientsPageClient'

export const metadata: Metadata = {
  title: 'Our Clients | NextGen Registry - Trusted RTA Service Provider',
  description: 'Explore our diverse client portfolio of 1500+ companies across India. NextGen Registry provides reliable RTA services for bonds, debentures, AIFs, NBFCs, and more.',
  keywords: 'RTA clients, ISIN clients, debenture companies, bond issuers, NextGen Registry clients, share registry clients',
  openGraph: {
    title: 'Our Clients | NextGen Registry - Trusted RTA Service Provider',
    description: 'Explore our diverse client portfolio of 1500+ companies across India. NextGen Registry provides reliable RTA services.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Clients | NextGen Registry',
    description: 'Explore our diverse client portfolio of 1500+ companies across India.',
  },
  alternates: {
    canonical: '/clients'
  }
}

interface Client {
  id: number
  serialNumber: number
  issuerClientCompanyName: string
  typeOfSecurity: string
  isinOfTheCompany: string
  isActive: boolean
}

interface ClientLogo {
  id: string
  company_name: string
  company_subtitle?: string
  logo_url?: string
  logo_path?: string
  website_url?: string
  order_index: number
  is_active: boolean
}

// Server component for static generation
export default async function ClientsPage() {
  try {
    // Fetch clients and logos at build time
    const [clientsData, clientLogos] = await Promise.all([
      DatabaseService.getClients(),
      DatabaseService.getClientLogos()
    ])

    // Transform and filter clients
    const clients: Client[] = clientsData
      .filter((client: any) => client.is_active)
      .map((client: any) => ({
        id: parseInt(client.id?.replace?.(/-/g, '').substring(0, 8) || '0', 16) || 0,
        serialNumber: client.serial_number || 0,
        issuerClientCompanyName: client.issuer_client_company_name || '',
        typeOfSecurity: client.type_of_security || '',
        isinOfTheCompany: client.isin_of_the_company || '',
        isActive: client.is_active
      }))
      .sort((a: Client, b: Client) => b.serialNumber - a.serialNumber)

    // Transform client logos
    const logos: ClientLogo[] = clientLogos.map((logo: any) => ({
      id: logo.id,
      company_name: logo.company_name,
      company_subtitle: logo.company_subtitle,
      logo_url: logo.logo_url,
      logo_path: logo.logo_path,
      website_url: logo.website_url,
      order_index: logo.order_index,
      is_active: logo.is_active
    }))

    return <ClientsPageClient clients={clients} clientLogos={logos} />
  } catch (error) {
    console.error('Error loading clients:', error)
    return <ClientsPageClient clients={[]} clientLogos={[]} />
  }
}

// Force static generation with ISR
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour
