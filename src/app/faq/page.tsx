import { Metadata } from 'next'
import Link from 'next/link'
import { DatabaseService } from '../../lib/database'
import { generateMetadata as generateSEOMetadata } from '../../lib/seo'
import FAQPageClient from './FAQPageClient'

export interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: 'Frequently Asked Questions - RTA Services & ISIN Creation',
    description: 'Find answers to common questions about NextGen Registry RTA services, ISIN creation, compliance requirements, and share registry processes.',
    keywords: ['FAQ', 'RTA services', 'ISIN creation', 'compliance', 'share registry', 'questions'],
    url: '/faq'
  })
}


// Server component with static generation
export const revalidate = 3600 // Revalidate every hour
export const dynamic = 'force-static'

export default async function FAQPage() {
  try {
    // Fetch FAQs at build time
    const supabaseFAQs = await DatabaseService.getAllFAQs()
    
    // Convert to legacy format for compatibility
    const faqs: FAQ[] = supabaseFAQs.map(faq => ({
      id: parseInt(faq.id.replace(/-/g, '').substring(0, 8), 16),
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order_index,
      isActive: faq.is_active,
      createdAt: faq.created_at,
      updatedAt: faq.updated_at
    }))
    
    // Return the client component with FAQ data
    return <FAQPageClient faqs={faqs} />
  } catch (error) {
    console.error('Error loading FAQs:', error)
    // Return empty FAQs on error
    return <FAQPageClient faqs={[]} />
  }
}
