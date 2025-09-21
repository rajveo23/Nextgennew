import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

// Initial data from the original adminData.ts file
const initialBlogs = [
  {
    id: 1,
    title: 'MCA Rule 9A: A Breakdown for Private Companies',
    slug: 'mca-rule-9a-breakdown-for-private-companies',
    excerpt: 'Prior to the enforcement of Rule 9A by the Ministry of Corporate Affairs (MCA), dematerialization of shares was merely an optional process for private companies.',
    content: 'Prior to the enforcement of Rule 9A by the Ministry of Corporate Affairs (MCA), dematerialization of shares was merely an optional process for private companies. It was only a mandatory requirement for listed companies and select large companies. However, with the introduction of Rule 9A, the landscape has changed significantly.',
    status: 'published',
    author: 'Admin',
    publishDate: '2024-01-15',
    category: 'Regulatory Updates',
    views: 1250,
    image: '/api/placeholder/800/400',
    tags: ['MCA', 'Rule 9A', 'Dematerialization', 'Private Companies']
  },
  {
    id: 2,
    title: 'Get Expert Tips & Updates On How To Get ISIN For Private Company',
    slug: 'get-expert-tips-updates-on-how-to-get-isin-for-private-company',
    excerpt: 'NextGen Registry provides the best insight on how to get an ISIN for a Private Company. The NextGen Registry blog offers expert tips and keeps you updated.',
    content: 'Getting an ISIN for a private company is a crucial step in the dematerialization process. This comprehensive guide will walk you through the entire process, requirements, and best practices.',
    status: 'published',
    author: 'Admin',
    publishDate: '2024-01-10',
    category: 'ISIN Services',
    views: 890,
    image: '/api/placeholder/800/400',
    tags: ['ISIN', 'Private Company', 'Dematerialization']
  }
]

const initialFAQs = [
  {
    id: 1,
    question: 'What is ISIN and why do I need it?',
    answer: 'ISIN (International Securities Identification Number) is a unique 12-character alphanumeric code that identifies a security. It is required for all securities that are traded or held in dematerialized form.',
    category: 'ISIN Services',
    order: 1,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 2,
    question: 'How long does the ISIN creation process take?',
    answer: 'The ISIN creation process typically takes 7-10 working days from the date of submission of complete documents, subject to regulatory approvals.',
    category: 'ISIN Services',
    order: 2,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

const initialClients = [
  {
    id: 1,
    serialNumber: 1563,
    issuerClientCompanyName: 'TIME TODAY MEDIA NETWORK PRIVATE LIMITED',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE263B04014',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  },
  {
    id: 2,
    serialNumber: 1562,
    issuerClientCompanyName: 'SHRIJI POWER & AUTOMATION PRIVATE LIMITED',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE5ARVY01014',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  },
  {
    id: 3,
    serialNumber: 1561,
    issuerClientCompanyName: 'TEEYRA EDUTECH PRIVATE LIMITED',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE5NKMJ012',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  },
  {
    id: 4,
    serialNumber: 1560,
    issuerClientCompanyName: 'FELIX HEALTHCARE PRIVATE LIMITED',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE5LL901011',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  },
  {
    id: 5,
    serialNumber: 1559,
    issuerClientCompanyName: 'MYLO HEALTHCARE PRIVATE LIMITED',
    typeOfSecurity: 'EQUITY',
    isinOfTheCompany: 'INE5KCZ01016',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isActive: true
  }
]

// POST /api/init - Initialize database with default data
export async function POST() {
  try {
    const db = await getDatabase()
    
    // Check if data already exists
    const existingBlogs = await db.collection('blogs').countDocuments()
    const existingFAQs = await db.collection('faqs').countDocuments()
    const existingClients = await db.collection('clients').countDocuments()
    
    let initialized = []
    
    // Initialize blogs if empty
    if (existingBlogs === 0) {
      await db.collection('blogs').insertMany(initialBlogs)
      initialized.push('blogs')
    }
    
    // Initialize FAQs if empty
    if (existingFAQs === 0) {
      await db.collection('faqs').insertMany(initialFAQs)
      initialized.push('faqs')
    }
    
    // Initialize clients if empty
    if (existingClients === 0) {
      await db.collection('clients').insertMany(initialClients)
      initialized.push('clients')
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      initialized,
      counts: {
        blogs: await db.collection('blogs').countDocuments(),
        faqs: await db.collection('faqs').countDocuments(),
        clients: await db.collection('clients').countDocuments(),
        contacts: await db.collection('contacts').countDocuments(),
        images: await db.collection('images').countDocuments()
      }
    })
  } catch (error) {
    console.error('Error initializing database:', error)
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 })
  }
}
