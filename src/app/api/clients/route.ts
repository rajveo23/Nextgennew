import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '../../../lib/database'

// GET /api/clients - Get all clients
export async function GET() {
  try {
    const clients = await DatabaseService.getClients()
    
    // Convert Supabase format to legacy format for compatibility
    const formattedClients = clients.map(client => ({
      id: parseInt(client.id.replace(/-/g, '').substring(0, 8), 16),
      serialNumber: client.serial_number,
      issuerClientCompanyName: client.issuer_client_company_name,
      typeOfSecurity: client.type_of_security,
      isinOfTheCompany: client.isin_of_the_company,
      createdAt: client.created_at,
      updatedAt: client.updated_at,
      isActive: client.is_active
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
    
    // Convert legacy format to Supabase format
    const clientData = {
      serial_number: body.serialNumber,
      issuer_client_company_name: body.issuerClientCompanyName,
      type_of_security: body.typeOfSecurity,
      isin_of_the_company: body.isinOfTheCompany,
      is_active: body.isActive ?? true
    }
    
    const newClient = await DatabaseService.createClient(clientData)
    
    // Convert back to legacy format
    const legacyClient = {
      id: parseInt(newClient.id.replace(/-/g, '').substring(0, 8), 16),
      serialNumber: newClient.serial_number,
      issuerClientCompanyName: newClient.issuer_client_company_name,
      typeOfSecurity: newClient.type_of_security,
      isinOfTheCompany: newClient.isin_of_the_company,
      createdAt: newClient.created_at,
      updatedAt: newClient.updated_at,
      isActive: newClient.is_active
    }
    
    return NextResponse.json(legacyClient, { status: 201 })
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
    
    // Find the actual UUID for this client
    const clients = await DatabaseService.getClients()
    const existingClient = clients.find(c => 
      parseInt(c.id.replace(/-/g, '').substring(0, 8), 16) === parseInt(id)
    )
    
    if (!existingClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }
    
    // Convert legacy format to Supabase format
    const supabaseUpdateData = {
      serial_number: updateData.serialNumber,
      issuer_client_company_name: updateData.issuerClientCompanyName,
      type_of_security: updateData.typeOfSecurity,
      isin_of_the_company: updateData.isinOfTheCompany,
      is_active: updateData.isActive
    }
    
    const updatedClient = await DatabaseService.updateClient(existingClient.id, supabaseUpdateData)
    
    // Convert back to legacy format
    const legacyClient = {
      id: parseInt(updatedClient.id.replace(/-/g, '').substring(0, 8), 16),
      serialNumber: updatedClient.serial_number,
      issuerClientCompanyName: updatedClient.issuer_client_company_name,
      typeOfSecurity: updatedClient.type_of_security,
      isinOfTheCompany: updatedClient.isin_of_the_company,
      createdAt: updatedClient.created_at,
      updatedAt: updatedClient.updated_at,
      isActive: updatedClient.is_active
    }
    
    return NextResponse.json(legacyClient)
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
    
    // Find the actual UUID for this client
    const clients = await DatabaseService.getClients()
    const existingClient = clients.find(c => 
      parseInt(c.id.replace(/-/g, '').substring(0, 8), 16) === parseInt(id)
    )
    
    if (!existingClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }
    
    await DatabaseService.deleteClient(existingClient.id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 })
  }
}
