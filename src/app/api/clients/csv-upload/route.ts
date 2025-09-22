import { NextRequest, NextResponse } from 'next/server'
import { AdminDataManager } from '../../../../lib/adminData'

export async function POST(request: NextRequest) {
  try {
    console.log('CSV upload started')
    
    // Initialize AdminDataManager
    await AdminDataManager.initializeData()
    
    const formData = await request.formData()
    const file = formData.get('csvFile') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No CSV file uploaded' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      return NextResponse.json(
        { error: 'Please upload a CSV file' },
        { status: 400 }
      )
    }

    // Read and parse CSV content
    const csvContent = await file.text()
    console.log('CSV content length:', csvContent.length)
    
    const lines = csvContent.split('\n').filter(line => line.trim())
    console.log('CSV lines found:', lines.length)
    
    if (lines.length < 2) {
      return NextResponse.json(
        { error: 'CSV file must contain header and at least one data row' },
        { status: 400 }
      )
    }

    // Parse header
    const header = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    
    // Expected columns
    const expectedColumns = [
      'serial_number',
      'issuer_client_company_name', 
      'type_of_security',
      'isin_of_the_company'
    ]

    // Validate header
    const missingColumns = expectedColumns.filter(col => !header.includes(col))
    if (missingColumns.length > 0) {
      return NextResponse.json(
        { 
          error: `Missing required columns: ${missingColumns.join(', ')}`,
          expectedColumns,
          foundColumns: header
        },
        { status: 400 }
      )
    }

    // Parse data rows
    const clients = []
    const errors = []
    
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',').map(cell => cell.trim().replace(/"/g, ''))
      
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

      // Convert serial_number to integer
      const serialNumber = parseInt(clientData.serial_number)
      if (isNaN(serialNumber)) {
        errors.push(`Row ${i + 1}: Invalid serial number`)
        continue
      }

      clients.push({
        serialNumber: serialNumber,
        issuerClientCompanyName: clientData.issuer_client_company_name,
        typeOfSecurity: clientData.type_of_security,
        isinOfTheCompany: clientData.isin_of_the_company,
        isActive: true
      })
    }

    if (clients.length === 0) {
      return NextResponse.json(
        { 
          error: 'No valid client records found in CSV',
          errors 
        },
        { status: 400 }
      )
    }

    // Insert clients into database
    const results = {
      successful: 0,
      failed: 0,
      errors: [...errors]
    }

    console.log('Processing clients:', clients.length)
    
    // Initialize AdminDataManager before processing
    await AdminDataManager.initializeData()
    
    for (const client of clients) {
      try {
        console.log('Saving client:', client.issuerClientCompanyName)
        
        // Create client with proper ID generation
        const clientWithId = {
          ...client,
          id: Date.now() + Math.random() // Generate unique ID
        }
        
        const savedClient = await AdminDataManager.saveClient(clientWithId)
        results.successful++
        console.log('Client saved successfully:', savedClient)
      } catch (error) {
        console.error('Failed to save client:', error)
        results.failed++
        results.errors.push(`Failed to create client ${client.issuerClientCompanyName}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: `CSV upload completed`,
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
      { error: 'Failed to process CSV file' },
      { status: 500 }
    )
  }
}
