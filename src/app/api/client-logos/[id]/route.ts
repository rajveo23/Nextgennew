import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '../../../../lib/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { company_name, company_subtitle, logo_url, logo_path, website_url, order_index, is_active } = body

    const logo = await DatabaseService.updateClientLogo(params.id, {
      company_name,
      company_subtitle,
      logo_url,
      logo_path,
      website_url,
      order_index,
      is_active
    })

    return NextResponse.json(logo)
  } catch (error) {
    console.error('Error updating client logo:', error)
    return NextResponse.json(
      { error: 'Failed to update client logo' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await DatabaseService.deleteClientLogo(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting client logo:', error)
    return NextResponse.json(
      { error: 'Failed to delete client logo' },
      { status: 500 }
    )
  }
}
