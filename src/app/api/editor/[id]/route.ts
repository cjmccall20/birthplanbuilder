import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { EditorState, EditorSectionId, EditorSectionState } from '@/lib/editor/editorTypes'
import { migrateBirthTeam, type BirthTeam } from '@/types'

interface BirthPlanV2Row {
  id: string
  user_id: string
  title: string
  template_style: string
  birth_team: BirthTeam | null
  sections_data: Record<EditorSectionId, EditorSectionState> | null
  created_at: string
  updated_at: string
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params as required by Next.js 15+
    const { id } = await context.params

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

    // Fetch birth plan by ID
    const { data: birthPlan, error: fetchError } = await supabase
      .from('birth_plans_v2')
      .select('*')
      .eq('id', id)
      .single<BirthPlanV2Row>()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        // No rows returned
        return NextResponse.json(
          { error: 'Birth plan not found' },
          { status: 404 }
        )
      }
      console.error('[API] Birth plan fetch error:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch birth plan' },
        { status: 500 }
      )
    }

    // Verify ownership
    if (birthPlan.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // Transform DB format to EditorState format
    const editorState: EditorState = {
      id: birthPlan.id,
      title: birthPlan.title,
      templateStyle: birthPlan.template_style as EditorState['templateStyle'],
      birthType: (birthPlan as any).birth_type || 'vaginal',
      birthTeam: migrateBirthTeam(birthPlan.birth_team || {}),
      sections: birthPlan.sections_data || {} as Record<EditorSectionId, EditorSectionState>,
      isDirty: false,
      lastSaved: birthPlan.updated_at,
      createdFromQuiz: false,
      disclaimerText: 'This birth plan represents my preferences for labor and delivery. I understand that circumstances may change and medical decisions may need to be made for the safety of myself and my baby. I trust my care team to keep us informed and involve us in any decisions when possible.',
      showAllDecisions: false,
    }

    return NextResponse.json({
      success: true,
      editorState,
    })
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
