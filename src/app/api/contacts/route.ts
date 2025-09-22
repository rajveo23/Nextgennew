import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '../../../lib/database'

// GET /api/contacts - Get all contact submissions
export async function GET() {
  try {
    const contacts = await DatabaseService.getContactSubmissions()
    
    // Convert Supabase format to legacy format for compatibility
    const formattedContacts = contacts.map(contact => ({
      id: parseInt(contact.id.replace(/-/g, '').substring(0, 8), 16),
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      service: contact.service,
      message: contact.message,
      timestamp: contact.created_at,
      status: contact.status,
      source: contact.source,
      newsletter: contact.newsletter
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
    
    await DatabaseService.createContactSubmission({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      service: body.service,
      message: body.message,
      source: body.source || 'api',
      newsletter: body.newsletter
    })
    
    // Return legacy format for compatibility
    const newContact = {
      id: Date.now(), // Temporary ID for legacy compatibility
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      service: body.service,
      message: body.message,
      timestamp: new Date().toISOString(),
      status: 'new',
      source: body.source || 'api',
      newsletter: body.newsletter
    }
    
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
    
    // Find the actual UUID for this contact
    const contacts = await DatabaseService.getContactSubmissions()
    const existingContact = contacts.find(c => 
      parseInt(c.id.replace(/-/g, '').substring(0, 8), 16) === parseInt(id)
    )
    
    if (!existingContact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }
    
    const updatedContact = await DatabaseService.updateContactSubmission(existingContact.id, {
      status: updateData.status
    })
    
    // Convert back to legacy format
    const legacyContact = {
      id: parseInt(updatedContact.id.replace(/-/g, '').substring(0, 8), 16),
      name: updatedContact.name,
      email: updatedContact.email,
      phone: updatedContact.phone,
      company: updatedContact.company,
      service: updatedContact.service,
      message: updatedContact.message,
      timestamp: updatedContact.created_at,
      status: updatedContact.status,
      source: updatedContact.source,
      newsletter: updatedContact.newsletter
    }
    
    return NextResponse.json(legacyContact)
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
    
    // Find the actual UUID for this contact
    const contacts = await DatabaseService.getContactSubmissions()
    const existingContact = contacts.find(c => 
      parseInt(c.id.replace(/-/g, '').substring(0, 8), 16) === parseInt(id)
    )
    
    if (!existingContact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }
    
    await DatabaseService.deleteContactSubmission(existingContact.id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting contact:', error)
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 })
  }
}
