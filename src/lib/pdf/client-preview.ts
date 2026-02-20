import { pdf } from '@react-pdf/renderer'
import { MinimalTemplate } from './templates/minimal'
import { QuizQuestion } from '@/lib/quiz/questions'
import { BirthTeam, TemplateStyle } from '@/types'

interface GeneratePreviewOptions {
  answers: Record<string, string>
  customNotes: Record<string, string>
  birthTeam: BirthTeam
  templateStyle: TemplateStyle
  questions: QuizQuestion[]
}

/**
 * Generates a PDF blob URL for client-side preview
 * This function is designed for browser use, unlike the server-side generateBirthPlanPDF
 */
export async function generatePDFPreview(options: GeneratePreviewOptions): Promise<string> {
  const { answers, customNotes, birthTeam, questions } = options

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
  const document = MinimalTemplate({ birthTeam, groupedContent, disclaimerText: '' })

  // Generate the PDF blob
  const blob = await pdf(document).toBlob()

  // Create and return the blob URL
  return URL.createObjectURL(blob)
}

/**
 * Cleans up a blob URL to prevent memory leaks
 */
export function revokePDFPreviewUrl(url: string): void {
  URL.revokeObjectURL(url)
}
