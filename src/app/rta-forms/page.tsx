import { Metadata } from 'next'
import { DatabaseService } from '../../lib/database'
import RTAFormsPageClient from './RTAFormsPageClient'

export const metadata: Metadata = {
  title: 'RTA Forms & Documents | NextGen Registry',
  description: 'Download all necessary RTA forms and documents for compliance, ISIN creation, demat services, and investor relations. Essential forms for companies registered with NextGen Registry.',
  keywords: 'RTA forms, ISIN forms, demat forms, compliance documents, investor forms, share transfer forms, NextGen Registry',
  openGraph: {
    title: 'RTA Forms & Documents | NextGen Registry',
    description: 'Download all necessary RTA forms and documents for compliance, ISIN creation, demat services, and investor relations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RTA Forms & Documents | NextGen Registry',
    description: 'Download all necessary RTA forms and documents for compliance, ISIN creation, demat services, and investor relations.',
  },
  alternates: {
    canonical: '/rta-forms'
  }
}

interface Form {
  id: string
  name: string
  file_type: string
  file_size: string
  file_url?: string
  file_path?: string
  category_id: string
  order_index: number
}

interface FormCategory {
  id: string
  title: string
  description: string
  icon_name: string
  color_gradient: string
  is_important_document?: boolean
  forms: Form[]
}

// Fallback important documents for when database is empty
const fallbackImportantDocuments: FormCategory[] = [
  {
    id: 'investor-charter',
    title: 'Investor Charter',
    description: '',
    icon_name: 'DocumentTextIcon',
    color_gradient: 'from-blue-500 to-blue-700',
    is_important_document: true,
    forms: [
      { id: '1', name: 'RTA Investor Charter', file_type: 'PDF', file_size: '245 KB', category_id: 'investor-charter', order_index: 0 },
      { id: '2', name: 'Grievance Redressal Policy', file_type: 'PDF', file_size: '180 KB', category_id: 'investor-charter', order_index: 1 }
    ]
  },
  {
    id: 'regulatory-docs',
    title: 'Regulatory Documents',
    description: '',
    icon_name: 'DocumentTextIcon',
    color_gradient: 'from-green-500 to-green-700',
    is_important_document: true,
    forms: [
      { id: '3', name: 'SEBI Registration Certificate', file_type: 'PDF', file_size: '320 KB', category_id: 'regulatory-docs', order_index: 0 },
      { id: '4', name: 'Service Level Agreement', file_type: 'PDF', file_size: '275 KB', category_id: 'regulatory-docs', order_index: 1 }
    ]
  },
  {
    id: 'process-guides',
    title: 'Process Guides',
    description: '',
    icon_name: 'DocumentTextIcon',
    color_gradient: 'from-purple-500 to-purple-700',
    is_important_document: true,
    forms: [
      { id: '5', name: 'ISIN Creation Process Guide', file_type: 'PDF', file_size: '450 KB', category_id: 'process-guides', order_index: 0 },
      { id: '6', name: 'Demat Process Guide', file_type: 'PDF', file_size: '380 KB', category_id: 'process-guides', order_index: 1 }
    ]
  }
]

// Server component for static generation
export default async function RTAFormsPage() {
  try {
    // Fetch form categories with forms at build time
    const categoriesWithForms = await DatabaseService.getFormCategoriesWithForms()

    // Separate regular forms and important documents
    const formCategories = categoriesWithForms.filter(
      (category) => !category.is_important_document
    )

    const importantDocuments = categoriesWithForms.filter(
      (category) => category.is_important_document
    )

    // Use fallback if no important documents in database
    const finalImportantDocs = importantDocuments.length > 0
      ? importantDocuments
      : fallbackImportantDocuments

    return (
      <RTAFormsPageClient
        formCategories={formCategories}
        importantDocuments={finalImportantDocs}
      />
    )
  } catch (error) {
    console.error('Error loading RTA forms:', error)
    return (
      <RTAFormsPageClient
        formCategories={[]}
        importantDocuments={fallbackImportantDocuments}
      />
    )
  }
}

// Force static generation with ISR
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour
