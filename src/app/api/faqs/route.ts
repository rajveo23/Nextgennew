import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { FAQ } from '@/lib/adminData'

// GET /api/faqs - Get all FAQs
export async function GET() {
  try {
    const db = await getDatabase()
    const faqs = await db.collection<FAQ>('faqs').find({}).sort({ order: 1 }).toArray()
    
    // Convert MongoDB _id to id for consistency
    const formattedFAQs = faqs.map(faq => ({
      ...faq,
      id: faq.id || Math.floor(Math.random() * 1000000),
      _id: undefined
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
    const db = await getDatabase()
    
    // Generate new ID
    const lastFAQ = await db.collection('faqs').findOne({}, { sort: { id: -1 } })
    const newId = (lastFAQ?.id || 0) + 1
    
    const now = new Date().toISOString()
    const newFAQ: FAQ = {
      ...body,
      id: newId,
      createdAt: now,
      updatedAt: now
    }
    
    await db.collection('faqs').insertOne(newFAQ)
    
    return NextResponse.json(newFAQ, { status: 201 })
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
    const db = await getDatabase()
    
    const result = await db.collection('faqs').updateOne(
      { id: parseInt(id) },
      { $set: { ...updateData, updatedAt: new Date().toISOString() } }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }
    
    const updatedFAQ = await db.collection('faqs').findOne({ id: parseInt(id) })
    return NextResponse.json(updatedFAQ)
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
    
    const db = await getDatabase()
    const result = await db.collection('faqs').deleteOne({ id: parseInt(id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting FAQ:', error)
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
  }
}
