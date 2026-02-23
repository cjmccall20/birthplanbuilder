'use client'

import { useState, useEffect } from 'react'
import { QuizQuestion } from '@/lib/quiz/questions'
import { useQuiz } from '@/lib/quiz/context'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface MultiSelectChecklistProps {
  question: QuizQuestion
}

function parseAnswer(answer: string | undefined): string[] {
  if (!answer) return []
  try {
    const parsed = JSON.parse(answer)
    if (Array.isArray(parsed)) return parsed
  } catch {
    // Legacy single-value answer
    if (answer === 'unsure') return []
    return [answer]
  }
  return []
}

export function MultiSelectChecklist({ question }: MultiSelectChecklistProps) {
  const { state, setAnswer } = useQuiz()
  const currentAnswer = state.answers[question.id]

  const [selected, setSelected] = useState<string[]>(() => parseAnswer(currentAnswer))
  const [isUnsure, setIsUnsure] = useState(currentAnswer === 'unsure')

  // Sync to quiz state when selection changes
  useEffect(() => {
    if (isUnsure) {
      setAnswer(question.id, 'unsure')
    } else if (selected.length > 0) {
      setAnswer(question.id, JSON.stringify(selected))
    }
  }, [selected, isUnsure, question.id, setAnswer])

  const mainOptions = question.options.filter(o => !o.isUnsure && o.value !== 'custom')
  const unsureOption = question.options.find(o => o.isUnsure)

  const isSelected = (value: string) => selected.includes(value)

  const toggleOption = (value: string) => {
    setIsUnsure(false)
    if (isSelected(value)) {
      setSelected(prev => prev.filter(v => v !== value))
    } else {
      setSelected(prev => [...prev, value])
    }
  }

  const handleUnsure = () => {
    setIsUnsure(!isUnsure)
    if (!isUnsure) {
      setSelected([])
    }
  }

  return (
    <div className="space-y-3">
      {mainOptions.map((option) => (
        <div
          key={option.value}
          className={cn(
            "flex items-center gap-3 rounded-lg border p-3 sm:p-4 cursor-pointer transition-colors min-h-[44px]",
            isSelected(option.value)
              ? "border-primary bg-primary/5"
              : "hover:bg-muted/50"
          )}
          onClick={() => toggleOption(option.value)}
        >
          <Checkbox
            checked={isSelected(option.value)}
            className="pointer-events-none"
          />
          <span className="flex-1 cursor-pointer text-sm sm:text-base">
            {option.label}
          </span>
        </div>
      ))}

      {/* Divider before unsure */}
      {unsureOption && (
        <>
          <div className="border-t border-dashed my-2" />
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg border border-dashed p-3 sm:p-4 cursor-pointer transition-colors min-h-[44px]",
              isUnsure
                ? "border-primary bg-primary/5"
                : "hover:bg-muted/50"
            )}
            onClick={handleUnsure}
          >
            <Checkbox
              checked={isUnsure}
              className="pointer-events-none"
            />
            <span className="text-sm sm:text-base italic text-muted-foreground">
              {unsureOption.label}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
