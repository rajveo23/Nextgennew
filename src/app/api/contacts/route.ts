import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ContactSubmission } from '@/lib/adminData'

// GET /api/contacts - Get all contact submissions
export async function GET() {
  try {
    const db = await getDatabase()
    const contacts = await db.collection<ContactSubmission>('contacts').find({}).sort({ timestamp: -1 }).toArray()
    
    // Convert MongoDB _id to id for consistency
    const formattedContacts = contacts.map(contact => ({
      ...contact,
      id: contact.id || Math.floor(Math.random() * 1000000),
      _id: undefined
    }))
    
    return NextResponse.json(formattedContacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

// POST /api/contacts - Create new contact submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = await getDatabase()
    
    // Generate new ID
    const lastContact = await db.collection('contacts').findOne({}, { sort: { id: -1 } })
    const newId = (lastContact?.id || 0) + 1
    
    const newContact: ContactSubmission = {
      ...body,
      id: newId,
      timestamp: new Date().toISOString(),
      status: 'new'
    }
    
    await db.collection('contacts').insertOne(newContact)
    
    return NextResponse.json(newContact, { status: 201 })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
  }
}

// PUT /api/contacts - Update existing contact submission
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    const db = await getDatabase()
    
    const result = await db.collection('contacts').updateOne(
      { id: parseInt(id) },
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }
    
    const updatedContact = await db.collection('contacts').findOne({ id: parseInt(id) })
    return NextResponse.json(updatedContact)
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 })
  }
}

// DELETE /api/contacts - Delete contact submission
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 })
    }
    
    const db = await getDatabase()
    const result = await db.collection('contacts').deleteOne({ id: parseInt(id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting contact:', error)
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 })
  }
}
