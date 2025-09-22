import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('Direct CSV upload started')
    
    const formData = await request.formData()
    const file = formData.get('csvFile') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No CSV file uploaded' },
        { status: 400 }
      )
    }

    // Read and parse CSV content
    const csvContent = await file.text()
    const lines = csvContent.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      return NextResponse.json(
        { error: 'CSV file must contain header and at least one data row' },
        { status: 400 }
      )
    }

    // Parse header
    const header = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    console.log('CSV Header:', header)
    
    // Parse data rows
    const clients = []
    const errors = []
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue // Skip empty lines
      
      const row = line.split(',').map(cell => cell.trim().replace(/"/g, ''))
      
      if (row.length !== header.length) {
        errors.push(`Row ${i + 1}: Column count mismatch`)
        continue
      }

      const clientData: any = {}
      
      // Map CSV columns to client object
      header.forEach((col, index) => {
        clientData[col] = row[index]
      })

      // Validate required fields
      if (!clientData.serial_number || !clientData.issuer_client_company_name || 
          !clientData.type_of_security || !clientData.isin_of_the_company) {
        errors.push(`Row ${i + 1}: Missing required fields`)
        continue
      }

      // Convert to Supabase format
      const serialNumber = parseInt(clientData.serial_number)
      if (isNaN(serialNumber)) {
        errors.push(`Row ${i + 1}: Invalid serial number`)
        continue
      }

      clients.push({
        serial_number: serialNumber,
        issuer_client_company_name: clientData.issuer_client_company_name,
        type_of_security: clientData.type_of_security,
        isin_of_the_company: clientData.isin_of_the_company,
        is_active: true
      })
    }

    console.log('Parsed clients:', clients.length)

    if (clients.length === 0) {
      return NextResponse.json(
        { 
          error: 'No valid client records found in CSV',
          errors 
        },
        { status: 400 }
      )
    }

    // Insert directly into Supabase
    const results = {
      successful: 0,
      failed: 0,
      errors: [...errors]
    }

    for (const client of clients) {
      try {
        console.log('Inserting client:', client.issuer_client_company_name)
        
        console.log('About to insert client data:', JSON.stringify(client, null, 2))
        
        const { data, error } = await supabaseAdmin
          .from('clients')
          .insert(client)
          .select()
          .single()
          
        console.log('Supabase response - data:', data, 'error:', error)

        if (error) {
          console.error('Supabase error:', error)
          results.failed++
          results.errors.push(`Failed to create client ${client.issuer_client_company_name}: ${error.message}`)
        } else {
          results.successful++
          console.log('Client inserted successfully:', data)
        }
      } catch (error) {
        console.error('Insert error:', error)
        results.failed++
        results.errors.push(`Failed to create client ${client.issuer_client_company_name}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    return NextResponse.json({
      success: results.successful > 0,
      message: `CSV upload completed: ${results.successful} successful, ${results.failed} failed`,
      results: {
        totalRows: lines.length - 1,
        validRows: clients.length,
        successful: results.successful,
        failed: results.failed,
        errors: results.errors
      }
    })

  } catch (error) {
    console.error('CSV upload error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process CSV file',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
