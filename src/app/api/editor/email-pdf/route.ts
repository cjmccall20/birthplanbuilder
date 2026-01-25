import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { Resend } from 'resend'
import { MinimalTemplate } from '@/lib/pdf/templates/minimal'
import { FloralTemplate } from '@/lib/pdf/templates/floral'
import { ProfessionalTemplate } from '@/lib/pdf/templates/professional'
import { ElegantTemplate } from '@/lib/pdf/templates/elegant'
import { RusticTemplate } from '@/lib/pdf/templates/rustic'
import type { EditorState } from '@/lib/editor/editorTypes'
import type { BirthTeam, TemplateStyle } from '@/types'
import { getPreferenceById } from '@/lib/editor/preferences'
import { EDITOR_SECTIONS } from '@/lib/editor/sections'

const resend = new Resend(process.env.RESEND_API_KEY)

// Map template styles to their corresponding template components
const templateMap = {
  minimal: MinimalTemplate,
  floral: FloralTemplate,
  professional: ProfessionalTemplate,
  elegant: ElegantTemplate,
  rustic: RusticTemplate,
} as const

interface PlanItem {
  category: string
  title: string
  answer: string
  birthPlanText: string
  customNote?: string
}

interface PDFData {
  birthTeam: BirthTeam
  groupedContent: Record<string, PlanItem[]>
}

// Convert editor state to PDF data format (server-side version)
function editorStateToPDFData(state: EditorState): PDFData {
  const allItems: PlanItem[] = []

  EDITOR_SECTIONS.forEach(section => {
    const sectionState = state.sections[section.id]
    if (!sectionState) return

    // Process preferences
    const sortedPreferences = [...sectionState.preferences]
      .filter(pref => !pref.isOmitted)
      .sort((a, b) => a.sortOrder - b.sortOrder)

    sortedPreferences.forEach(prefValue => {
      const prefDef = getPreferenceById(prefValue.preferenceId)
      if (!prefDef) return

      const selectedOption = prefDef.options.find(
        opt => opt.value === prefValue.selectedOption
      )

      if (!selectedOption && !prefValue.customText) return

      let birthPlanText = selectedOption?.birthPlanText || ''
      if (prefValue.customText) {
        birthPlanText = prefValue.customText
      }

      if (!birthPlanText) return

      allItems.push({
        category: section.title,
        title: prefDef.title,
        answer: selectedOption?.label || 'Custom',
        birthPlanText,
      })
    })

    // Process custom items
    const sortedCustomItems = [...sectionState.customItems]
      .sort((a, b) => a.sortOrder - b.sortOrder)

    sortedCustomItems.forEach(item => {
      if (!item.text) return

      allItems.push({
        category: section.title,
        title: item.title,
        answer: 'Custom',
        birthPlanText: item.text,
      })
    })

    // Add section notes
    if (sectionState.notes && sectionState.notes.trim()) {
      allItems.push({
        category: section.title,
        title: 'Additional Notes',
        answer: 'Custom',
        birthPlanText: sectionState.notes,
      })
    }
  })

  // Group by category
  const groupedContent = allItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, PlanItem[]>)

  return {
    birthTeam: state.birthTeam,
    groupedContent,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, editorState } = body

    console.log('[API] Starting editor PDF email for:', email)

    // Validate required fields
    if (!email || !name || !editorState) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Ensure mother_name is set
    const updatedEditorState: EditorState = {
      ...editorState,
      birthTeam: {
        ...editorState.birthTeam,
        mother_name: name,
      },
    }

    // Generate PDF
    console.log('[API] Generating PDF from editor state...')
    const pdfData = editorStateToPDFData(updatedEditorState)
    const templateStyle = (updatedEditorState.templateStyle || 'minimal') as TemplateStyle
    const Template = templateMap[templateStyle] || MinimalTemplate

    const buffer = await renderToBuffer(Template(pdfData))
    const pdfBuffer = Buffer.from(buffer)
    console.log('[API] PDF generated, size:', pdfBuffer.length, 'bytes')

    // Send email
    console.log('[API] Sending email...')
    const { error: emailError } = await resend.emails.send({
      from: 'Birth Plan Builder <noreply@birthplanbuilder.com>',
      to: [email],
      subject: `${name}, Your Birth Plan is Ready!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #d4a5a5; margin-bottom: 5px;">Birth Plan Builder</h1>
            </div>

            <h2 style="color: #333;">Hi ${name}!</h2>

            <p>
              Your personalized birth plan is ready! We've attached it as a PDF that you can
              print or share with your care team.
            </p>

            <div style="background-color: #f8f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #d4a5a5;">What's next?</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Print a few copies for your hospital bag</li>
                <li>Share with your partner and support person</li>
                <li>Discuss with your provider at your next visit</li>
                <li>Remember, it's okay if plans change - this is a starting point</li>
              </ul>
            </div>

            <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">Want to Edit Later?</h3>
              <p style="margin-bottom: 15px;">
                Create a <strong>free account</strong> to save your birth plan and come back to edit it anytime as your preferences evolve.
              </p>
              <a href="https://birthplanbuilder.com/auth/login?email=${encodeURIComponent(email)}&redirect=/editor"
                 style="display: inline-block; background-color: #1e40af; color: white;
                        padding: 12px 24px; text-decoration: none; border-radius: 6px;
                        font-weight: bold;">
                Create Free Account
              </a>
            </div>

            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Questions or feedback? Just reply to this email.
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

            <p style="color: #999; font-size: 12px; text-align: center;">
              Birth Plan Builder | <a href="https://birthplanbuilder.com" style="color: #d4a5a5;">birthplanbuilder.com</a>
              <br>
              This is not medical advice. Always consult with your healthcare provider.
            </p>

          </body>
        </html>
      `,
      attachments: [
        {
          filename: `${updatedEditorState.title || 'Birth-Plan'}.pdf`,
          content: pdfBuffer.toString('base64'),
        },
      ],
    })

    if (emailError) {
      console.error('[API] Email send error:', emailError)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    console.log('[API] Email sent successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
