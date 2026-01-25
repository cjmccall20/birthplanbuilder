import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { EditorState, EditorSectionId } from '@/lib/editor/editorTypes'
import type { BirthTeam } from '@/types'

// Define the payload type (EditorState minus UI-only fields)
interface SaveBirthPlanPayload {
  id: string | null
  title: string
  templateStyle: string
  birthTeam: BirthTeam
  sections: EditorState['sections']
}

// Define the response type
interface SaveBirthPlanResponse {
  success: boolean
  id: string
  lastSaved: string
}

export async function POST(request: NextRequest) {
  try {
    // Create Supabase client
    const supabase = await createServerSupabaseClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const {
      id,
      title,
      templateStyle,
      birthTeam,
      sections,
    }: SaveBirthPlanPayload = body

    // Validate required fields
    if (!title || !templateStyle || !birthTeam || !sections) {
      console.error('[API] Validation failed - missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields: title, templateStyle, birthTeam, sections' },
        { status: 400 }
      )
    }

    // Validate template style
    const validTemplateStyles = ['minimal', 'floral', 'professional', 'elegant', 'rustic']
    if (!validTemplateStyles.includes(templateStyle)) {
      return NextResponse.json(
        { error: 'Invalid template style' },
        { status: 400 }
      )
    }

    // Validate birthTeam has mother_name
    if (!birthTeam.mother_name) {
      return NextResponse.json(
        { error: 'Birth team must include mother_name' },
        { status: 400 }
      )
    }

    // Prepare data for database
    const birthPlanData = {
      user_id: user.id,
      title,
      template_style: templateStyle,
      birth_team: birthTeam,
      sections_data: sections,
      updated_at: new Date().toISOString(),
    }

    let savedId: string
    let lastSaved: string

    if (id) {
      // UPDATE existing birth plan
      console.log('[API] Updating birth plan:', id)

      const { data, error } = await supabase
        .from('birth_plans_v2')
        .update(birthPlanData)
        .eq('id', id)
        .eq('user_id', user.id) // Ensure user owns this plan
        .select('id, updated_at')
        .single()

      if (error) {
        console.error('[API] Birth plan update error:', error)

        // Check if plan doesn't exist or doesn't belong to user
        if (error.code === 'PGRST116') {
          return NextResponse.json(
            { error: 'Birth plan not found or access denied' },
            { status: 404 }
          )
        }

        return NextResponse.json(
          { error: 'Failed to update birth plan' },
          { status: 500 }
        )
      }

      savedId = data.id
      lastSaved = data.updated_at
      console.log('[API] Birth plan updated successfully:', savedId)
    } else {
      // INSERT new birth plan
      console.log('[API] Creating new birth plan for user:', user.id)

      const { data, error } = await supabase
        .from('birth_plans_v2')
        .insert(birthPlanData)
        .select('id, updated_at')
        .single()

      if (error) {
        console.error('[API] Birth plan creation error:', error)
        return NextResponse.json(
          { error: 'Failed to create birth plan' },
          { status: 500 }
        )
      }

      savedId = data.id
      lastSaved = data.updated_at
      console.log('[API] Birth plan created successfully:', savedId)
    }

    // Return success response
    const response: SaveBirthPlanResponse = {
      success: true,
      id: savedId,
      lastSaved,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
