import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET() {
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

    // Fetch all birth plans for the user
    const { data: birthPlans, error: fetchError } = await supabase
      .from('birth_plans_v2')
      .select('id, title, template_style, updated_at, created_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (fetchError) {
      console.error('[API] Birth plans fetch error:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch birth plans' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      birthPlans: birthPlans || [],
    })
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
