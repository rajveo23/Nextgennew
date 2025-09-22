import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('Testing direct client insert...')
    
    // Test data
    const testClient = {
      serial_number: 9999,
      issuer_client_company_name: 'TEST UPLOAD COMPANY LIMITED',
      type_of_security: 'EQUITY',
      isin_of_the_company: 'INE999T01999',
      is_active: true
    }

    console.log('Inserting test client:', testClient)

    const { data, error } = await supabaseAdmin
      .from('clients')
      .insert(testClient)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error
      }, { status: 400 })
    }

    console.log('Test client inserted successfully:', data)

    return NextResponse.json({
      success: true,
      message: 'Test client inserted successfully',
      data: data
    })

  } catch (error) {
    console.error('Test insert error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
