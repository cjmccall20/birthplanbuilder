import { renderToBuffer } from '@react-pdf/renderer'
import { MinimalTemplate } from './templates/minimal'
import { QuizQuestion } from '@/lib/quiz/questions'
import { BirthTeam, TemplateStyle } from '@/types'

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

  // For now, we use the minimal template regardless of selection
  // In production, you'd switch based on templateStyle
  const Template = MinimalTemplate

  const buffer = await renderToBuffer(
    Template({ birthTeam, groupedContent })
  )

  return Buffer.from(buffer)
}
