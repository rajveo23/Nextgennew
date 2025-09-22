import { NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { supabaseAdmin } from '@/lib/supabase'

// Initial data converted to Supabase format
const initialBlogs = [
  {
    title: 'MCA Rule 9A: A Breakdown for Private Companies',
    slug: 'mca-rule-9a-breakdown-for-private-companies',
    excerpt: 'Prior to the enforcement of Rule 9A by the Ministry of Corporate Affairs (MCA), dematerialization of shares was merely an optional process for private companies.',
    content: 'Prior to the enforcement of Rule 9A by the Ministry of Corporate Affairs (MCA), dematerialization of shares was merely an optional process for private companies. It was only a mandatory requirement for listed companies and select large companies. However, with the introduction of Rule 9A, the landscape has changed significantly.',
    status: 'published' as const,
    author: 'NextGen Registry',
    published: true,
    publish_date: '2024-01-15',
    category: 'Regulatory Updates',
    views: 1250,
    featured_image_url: '/api/placeholder/800/400',
    tags: ['MCA', 'Rule 9A', 'Dematerialization', 'Private Companies']
  },
  {
    title: 'Get Expert Tips & Updates On How To Get ISIN For Private Company',
    slug: 'get-expert-tips-updates-on-how-to-get-isin-for-private-company',
    excerpt: 'NextGen Registry provides the best insight on how to get an ISIN for a Private Company. The NextGen Registry blog offers expert tips and keeps you updated.',
    content: 'Getting an ISIN for a private company is a crucial step in the dematerialization process. This comprehensive guide will walk you through the entire process, requirements, and best practices.',
    status: 'published' as const,
    author: 'NextGen Registry',
    published: true,
    publish_date: '2024-01-10',
    category: 'ISIN Services',
    views: 890,
    featured_image_url: '/api/placeholder/800/400',
    tags: ['ISIN', 'Private Company', 'Dematerialization']
  }
]

const initialFAQs = [
  {
    question: 'What is ISIN and why do I need it?',
    answer: 'ISIN (International Securities Identification Number) is a unique 12-character alphanumeric code that identifies a security. It is required for all securities that are traded or held in dematerialized form.',
    category: 'ISIN Services',
    order_index: 1,
    is_active: true
  },
  {
    question: 'How long does the ISIN creation process take?',
    answer: 'The ISIN creation process typically takes 7-10 working days from the date of submission of complete documents, subject to regulatory approvals.',
    category: 'ISIN Services',
    order_index: 2,
    is_active: true
  }
]

const initialClients = [
  {
    serial_number: 1563,
    issuer_client_company_name: 'TIME TODAY MEDIA NETWORK PRIVATE LIMITED',
    type_of_security: 'EQUITY',
    isin_of_the_company: 'INE263B04014',
    is_active: true
  },
  {
    serial_number: 1562,
    issuer_client_company_name: 'SHRIJI POWER & AUTOMATION PRIVATE LIMITED',
    type_of_security: 'EQUITY',
    isin_of_the_company: 'INE5ARVY01014',
    is_active: true
  },
  {
    serial_number: 1561,
    issuer_client_company_name: 'TEEYRA EDUTECH PRIVATE LIMITED',
    type_of_security: 'EQUITY',
    isin_of_the_company: 'INE5NKMJ012',
    is_active: true
  },
  {
    serial_number: 1560,
    issuer_client_company_name: 'FELIX HEALTHCARE PRIVATE LIMITED',
    type_of_security: 'EQUITY',
    isin_of_the_company: 'INE5LL901011',
    is_active: true
  },
  {
    serial_number: 1559,
    issuer_client_company_name: 'MYLO HEALTHCARE PRIVATE LIMITED',
    type_of_security: 'EQUITY',
    isin_of_the_company: 'INE5KCZ01016',
    is_active: true
  }
]

// POST /api/init - Initialize Supabase database with default data
export async function POST() {
  try {
    // Check if data already exists
    const { count: existingBlogs } = await supabaseAdmin
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })

    const { count: existingFAQs } = await supabaseAdmin
      .from('faqs')
      .select('*', { count: 'exact', head: true })

    const { count: existingClients } = await supabaseAdmin
      .from('clients')
      .select('*', { count: 'exact', head: true })

    let initialized = []
    
    // Initialize blogs if empty
    if (!existingBlogs || existingBlogs === 0) {
      const { error } = await supabaseAdmin
        .from('blog_posts')
        .insert(initialBlogs)
      
      if (error) throw error
      initialized.push('blogs')
    }
    
    // Initialize FAQs if empty
    if (!existingFAQs || existingFAQs === 0) {
      const { error } = await supabaseAdmin
        .from('faqs')
        .insert(initialFAQs)
      
      if (error) throw error
      initialized.push('faqs')
    }
    
    // Initialize clients if empty
    if (!existingClients || existingClients === 0) {
      const { error } = await supabaseAdmin
        .from('clients')
        .insert(initialClients)
      
      if (error) throw error
      initialized.push('clients')
    }
    
    // Get final counts
    const { count: finalBlogs } = await supabaseAdmin
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })

    const { count: finalFAQs } = await supabaseAdmin
      .from('faqs')
      .select('*', { count: 'exact', head: true })

    const { count: finalClients } = await supabaseAdmin
      .from('clients')
      .select('*', { count: 'exact', head: true })

    const { count: finalContacts } = await supabaseAdmin
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })

    const { count: finalFiles } = await supabaseAdmin
      .from('file_uploads')
      .select('*', { count: 'exact', head: true })
    
    return NextResponse.json({
      success: true,
      message: 'Supabase database initialized successfully',
      initialized,
      counts: {
        blogs: finalBlogs || 0,
        faqs: finalFAQs || 0,
        clients: finalClients || 0,
        contacts: finalContacts || 0,
        files: finalFiles || 0
      }
    })
  } catch (error) {
    console.error('Error initializing Supabase database:', error)
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 })
  }
}
