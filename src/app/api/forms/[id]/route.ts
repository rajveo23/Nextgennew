import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '../../../../lib/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { id } = params

    const form = await DatabaseService.updateForm(id, body)
    return NextResponse.json(form)
  } catch (error) {
    console.error('Error updating form:', error)
    return NextResponse.json(
      { error: 'Failed to update form' },
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
    console.log('DELETE /api/forms/[id] - Deleting form:', id)
    
    await DatabaseService.deleteForm(id)
    console.log('Form deleted successfully:', id)
    
    return NextResponse.json({ success: true, message: 'Form deleted successfully' })
  } catch (error) {
    console.error('Error deleting form:', error)
    return NextResponse.json(
      { 
        error: 'Failed to delete form',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
