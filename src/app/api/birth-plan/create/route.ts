import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendBirthPlanEmail } from '@/lib/email/send-birth-plan'
import { generateBirthPlanPDF } from '@/lib/pdf/generator'
import { quizQuestions } from '@/lib/quiz/questions'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      name,
      dueDate,
      marketingConsent,
      sessionId,
      answers,
      customNotes,
      birthTeam,
      templateStyle,
      unsureTopics,
    } = body

    // Validate required fields
    if (!email || !name || !sessionId || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create or update user
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .upsert(
        {
          email,
          name,
          due_date: dueDate || null,
          marketing_consent: marketingConsent,
          unsure_topics: unsureTopics || [],
        },
        { onConflict: 'email' }
      )
      .select()
      .single()

    if (userError) {
      console.error('User creation error:', userError)
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Create birth plan
    const { data: birthPlan, error: planError } = await supabaseAdmin
      .from('birth_plans')
      .insert({
        user_id: user.id,
        session_id: sessionId,
        template_style: templateStyle || 'minimal',
        birth_team: birthTeam,
        custom_notes: customNotes,
        status: 'completed',
      })
      .select()
      .single()

    if (planError) {
      console.error('Birth plan creation error:', planError)
      return NextResponse.json(
        { error: 'Failed to create birth plan' },
        { status: 500 }
      )
    }

    // Save decisions
    const decisions = Object.entries(answers).map(([key, value]) => ({
      birth_plan_id: birthPlan.id,
      decision_key: key,
      answer: value as string,
      custom_note: customNotes?.[key] || null,
    }))

    const { error: decisionsError } = await supabaseAdmin
      .from('decisions')
      .insert(decisions)

    if (decisionsError) {
      console.error('Decisions creation error:', decisionsError)
      // Don't fail the whole request for this
    }

    // Generate PDF
    const pdfBuffer = await generateBirthPlanPDF({
      answers,
      customNotes,
      birthTeam,
      templateStyle,
      questions: quizQuestions,
    })

    // Send email with PDF
    await sendBirthPlanEmail({
      to: email,
      name,
      pdfBuffer,
      unsureTopics,
    })

    // Track email send
    await supabaseAdmin.from('email_sends').insert({
      user_id: user.id,
      birth_plan_id: birthPlan.id,
      email_type: 'birth_plan_delivery',
    })

    return NextResponse.json({
      success: true,
      birthPlanId: birthPlan.id,
    })
  } catch (error) {
    console.error('Birth plan creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
