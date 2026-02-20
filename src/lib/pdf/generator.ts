import { renderToBuffer } from '@react-pdf/renderer'
import { MinimalTemplate } from './templates/minimal'
import { FloralTemplate } from './templates/floral'
import { ProfessionalTemplate } from './templates/professional'
import { ElegantTemplate } from './templates/elegant'
import { RusticTemplate } from './templates/rustic'
import { QuizQuestion } from '@/lib/quiz/questions'
import { BirthTeam, TemplateStyle } from '@/types'

// Map template styles to their corresponding template components
const templateMap = {
  minimal: MinimalTemplate,
  floral: FloralTemplate,
  professional: ProfessionalTemplate,
  elegant: ElegantTemplate,
  rustic: RusticTemplate,
  botanical: FloralTemplate,
  ocean: ProfessionalTemplate,
  boho: RusticTemplate,
} as const

interface GeneratePDFOptions {
  answers: Record<string, string>
  customNotes: Record<string, string>
  birthTeam: BirthTeam
  templateStyle: TemplateStyle
  questions: QuizQuestion[]
}

export async function generateBirthPlanPDF(options: GeneratePDFOptions): Promise<Buffer> {
  const { answers, customNotes, birthTeam, templateStyle, questions } = options

  // Build the birth plan content
  const planContent = questions
    .filter((q) => answers[q.id])
    .map((q) => {
      const answer = answers[q.id]
      const option = q.options.find((o) => o.value === answer)
      return {
        category: q.category,
        title: q.title,
        answer: option?.label || answer,
        birthPlanText: option?.birthPlanText || '',
        customNote: customNotes[q.id],
      }
    })

  // Group by category
  const groupedContent = planContent.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof planContent>)

  // Select the template based on templateStyle, defaulting to minimal
  const Template = templateMap[templateStyle] || MinimalTemplate

  const buffer = await renderToBuffer(
    Template({ birthTeam, groupedContent, disclaimerText: '' })
  )

  return Buffer.from(buffer)
}
