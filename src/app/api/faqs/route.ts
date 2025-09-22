import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '../../../lib/database'

// GET /api/faqs - Get all FAQs
export async function GET() {
  try {
    const faqs = await DatabaseService.getAllFAQs()
    
    // Convert Supabase format to legacy format for compatibility
    const formattedFAQs = faqs.map(faq => ({
      id: parseInt(faq.id.replace(/-/g, '').substring(0, 8), 16),
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order_index,
      isActive: faq.is_active,
      createdAt: faq.created_at,
      updatedAt: faq.updated_at
    }))
    
    return NextResponse.json(formattedFAQs)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}

// POST /api/faqs - Create new FAQ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Convert legacy format to Supabase format
    const faqData = {
      question: body.question,
      answer: body.answer,
      category: body.category,
      order_index: body.order,
      is_active: body.isActive ?? true
    }
    
    const newFAQ = await DatabaseService.createFAQ(faqData)
    
    // Convert back to legacy format
    const legacyFAQ = {
      id: parseInt(newFAQ.id.replace(/-/g, '').substring(0, 8), 16),
      question: newFAQ.question,
      answer: newFAQ.answer,
      category: newFAQ.category,
      order: newFAQ.order_index,
      isActive: newFAQ.is_active,
      createdAt: newFAQ.created_at,
      updatedAt: newFAQ.updated_at
    }
    
    return NextResponse.json(legacyFAQ, { status: 201 })
  } catch (error) {
    console.error('Error creating FAQ:', error)
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
  }
}

// PUT /api/faqs - Update existing FAQ
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    // Find the actual UUID for this FAQ
    const faqs = await DatabaseService.getAllFAQs()
    const existingFAQ = faqs.find(f => 
      parseInt(f.id.replace(/-/g, '').substring(0, 8), 16) === parseInt(id)
    )
    
    if (!existingFAQ) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }
    
    // Convert legacy format to Supabase format
    const supabaseUpdateData = {
      question: updateData.question,
      answer: updateData.answer,
      category: updateData.category,
      order_index: updateData.order,
      is_active: updateData.isActive
    }
    
    const updatedFAQ = await DatabaseService.updateFAQ(existingFAQ.id, supabaseUpdateData)
    
    // Convert back to legacy format
    const legacyFAQ = {
      id: parseInt(updatedFAQ.id.replace(/-/g, '').substring(0, 8), 16),
      question: updatedFAQ.question,
      answer: updatedFAQ.answer,
      category: updatedFAQ.category,
      order: updatedFAQ.order_index,
      isActive: updatedFAQ.is_active,
      createdAt: updatedFAQ.created_at,
      updatedAt: updatedFAQ.updated_at
    }
    
    return NextResponse.json(legacyFAQ)
  } catch (error) {
    console.error('Error updating FAQ:', error)
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 })
  }
}

// DELETE /api/faqs - Delete FAQ
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'FAQ ID is required' }, { status: 400 })
    }
    
    // Find the actual UUID for this FAQ
    const faqs = await DatabaseService.getAllFAQs()
    const existingFAQ = faqs.find(f => 
      parseInt(f.id.replace(/-/g, '').substring(0, 8), 16) === parseInt(id)
    )
    
    if (!existingFAQ) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }
    
    await DatabaseService.deleteFAQ(existingFAQ.id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting FAQ:', error)
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
  }
}
