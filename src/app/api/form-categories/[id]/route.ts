import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '../../../../lib/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { id } = params

    const category = await DatabaseService.updateFormCategory(id, body)
    return NextResponse.json(category)
  } catch (error) {
    console.error('Error updating form category:', error)
    return NextResponse.json(
      { error: 'Failed to update form category' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await DatabaseService.deleteFormCategory(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting form category:', error)
    return NextResponse.json(
      { error: 'Failed to delete form category' },
      { status: 500 }
    )
  }
}
