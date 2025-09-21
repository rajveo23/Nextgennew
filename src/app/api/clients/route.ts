import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { Client } from '@/lib/adminData'

// GET /api/clients - Get all clients
export async function GET() {
  try {
    const db = await getDatabase()
    const clients = await db.collection<Client>('clients').find({}).sort({ serialNumber: -1 }).toArray()
    
    // Convert MongoDB _id to id for consistency
    const formattedClients = clients.map(client => ({
      ...client,
      id: client.id || Math.floor(Math.random() * 1000000),
      _id: undefined
    }))
    
    return NextResponse.json(formattedClients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}

// POST /api/clients - Create new client
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = await getDatabase()
    
    // Generate new ID
    const lastClient = await db.collection('clients').findOne({}, { sort: { id: -1 } })
    const newId = (lastClient?.id || 0) + 1
    
    const now = new Date().toISOString()
    const newClient: Client = {
      ...body,
      id: newId,
      createdAt: now,
      updatedAt: now
    }
    
    await db.collection('clients').insertOne(newClient)
    
    return NextResponse.json(newClient, { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}

// PUT /api/clients - Update existing client
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    const db = await getDatabase()
    
    const result = await db.collection('clients').updateOne(
      { id: parseInt(id) },
      { $set: { ...updateData, updatedAt: new Date().toISOString() } }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }
    
    const updatedClient = await db.collection('clients').findOne({ id: parseInt(id) })
    return NextResponse.json(updatedClient)
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 })
  }
}

// DELETE /api/clients - Delete client
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Client ID is required' }, { status: 400 })
    }
    
    const db = await getDatabase()
    const result = await db.collection('clients').deleteOne({ id: parseInt(id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 })
  }
}
