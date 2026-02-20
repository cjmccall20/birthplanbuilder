'use client'

import { useState, useMemo } from 'react'
import { useQuiz } from '@/lib/quiz/context'
import { quizQuestions } from '@/lib/quiz/questions'
import { ChevronUp, ChevronDown, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

// Map quiz categories to birth plan section titles
const CATEGORY_SECTION_TITLE: Record<string, string> = {
  'Getting Started': 'Pre-Hospital Planning',
  'Your Birth': 'During Labor',
  'After Birth': 'At & After Birth',
  'Newborn Care': 'Newborn Procedures',
  'Hospital Stay': 'Hospital Stay',
  'Personal': 'Personal',
  'C-Section Planning': 'C-Section Preferences',
}

interface PreviewItem {
  title: string
  text: string
}

export function QuizPreviewPanel() {
  const { state } = useQuiz()
  const [isExpanded, setIsExpanded] = useState(false)

  // Build preview items grouped by section
  const { sections, totalAnswered } = useMemo(() => {
    const grouped: Record<string, PreviewItem[]> = {}
    let count = 0

    Object.entries(state.answers).forEach(([questionId, answer]) => {
      if (!answer || answer === 'unsure') return

      const question = quizQuestions.find(q => q.id === questionId)
      if (!question) return

      // Find the selected option to get birth plan text
      const option = question.options.find(o => o.value === answer)
      const text = option?.birthPlanText
      if (!text) {
        // Custom text answer
        if (answer && !question.options.some(o => o.value === answer)) {
          const sectionTitle = CATEGORY_SECTION_TITLE[question.category] || question.category
          if (!grouped[sectionTitle]) grouped[sectionTitle] = []
          grouped[sectionTitle].push({ title: question.title, text: answer })
          count++
        }
        return
      }

      // Skip items marked omitFromPlan
      if (option?.omitFromPlan) return

      const sectionTitle = CATEGORY_SECTION_TITLE[question.category] || question.category
      if (!grouped[sectionTitle]) grouped[sectionTitle] = []
      grouped[sectionTitle].push({ title: question.title, text })
      count++
    })

    return { sections: grouped, totalAnswered: count }
  }, [state.answers])

  // Don't show until at least one answer
  if (totalAnswered === 0) return null

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out',
        isExpanded ? 'max-h-[60vh]' : 'max-h-[48px]'
      )}
    >
      {/* Collapsed bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors',
          'bg-primary text-primary-foreground hover:bg-primary/90',
          isExpanded && 'rounded-t-lg'
        )}
      >
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Your Birth Plan: {totalAnswered} decision{totalAnswered !== 1 ? 's' : ''} made</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronUp className="h-4 w-4" />
        )}
      </button>

      {/* Expanded panel */}
      {isExpanded && (
        <div className="bg-white border-t shadow-lg overflow-y-auto max-h-[calc(60vh-48px)]">
          <div className="max-w-2xl mx-auto p-4 space-y-4">
            {Object.entries(sections).map(([sectionTitle, items]) => (
              <div key={sectionTitle}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  {sectionTitle}
                </h4>
                <div className="space-y-1.5">
                  {items.map((item, i) => (
                    <div key={i} className="pl-3 border-l-2 border-primary/20">
                      <p className="text-xs font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
