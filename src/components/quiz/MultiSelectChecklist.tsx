'use client'

import { useState, useEffect, useRef } from 'react'
import { QuizQuestion } from '@/lib/quiz/questions'
import { useQuiz } from '@/lib/quiz/context'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { PenLine, X } from 'lucide-react'

const CUSTOM_PREFIX = 'custom:'

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
  const [writeInText, setWriteInText] = useState('')
  const writeInRef = useRef<HTMLInputElement>(null)

  // Track all custom entries ever added (persists unchecked ones for re-checking)
  const [customPool, setCustomPool] = useState<string[]>(() => {
    return parseAnswer(currentAnswer).filter(v => v.startsWith(CUSTOM_PREFIX))
  })

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

  const addWriteIn = () => {
    const trimmed = writeInText.trim()
    if (!trimmed) return
    const customValue = `${CUSTOM_PREFIX}${trimmed}`
    // Add to customPool if not already there
    if (!customPool.includes(customValue)) {
      setCustomPool(prev => [...prev, customValue])
    }
    // Add to selected if not already there
    if (!selected.includes(customValue)) {
      setIsUnsure(false)
      setSelected(prev => [...prev, customValue])
    }
    setWriteInText('')
  }

  const removeCustomEntry = (customValue: string) => {
    // Permanently remove from pool and from selected
    setCustomPool(prev => prev.filter(v => v !== customValue))
    setSelected(prev => prev.filter(v => v !== customValue))
  }

  const handleWriteInKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addWriteIn()
    }
  }

  const handleUnsure = () => {
    setIsUnsure(!isUnsure)
    if (!isUnsure) {
      setSelected([])
      setWriteInText('')
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

      {/* Custom write-in entries from the pool (includes unchecked ones) */}
      {customPool.map((entry) => {
        const checked = isSelected(entry)
        return (
          <div
            key={entry}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-3 sm:p-4 cursor-pointer transition-colors min-h-[44px]",
              checked
                ? "border-primary bg-primary/5"
                : "border-muted hover:bg-muted/50 opacity-60"
            )}
            onClick={() => toggleOption(entry)}
          >
            <Checkbox checked={checked} className="pointer-events-none" />
            <span className={cn(
              "flex-1 text-sm sm:text-base italic",
              !checked && "text-muted-foreground"
            )}>
              {entry.slice(CUSTOM_PREFIX.length)}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeCustomEntry(entry)
              }}
              className="p-1 rounded hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
              title="Remove"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}

      {/* Write my own input */}
      <div className="border-t border-dashed my-2" />
      <div className="flex items-center gap-3 rounded-lg border border-dashed p-3 sm:p-4 min-h-[44px]">
        <PenLine className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <Input
          ref={writeInRef}
          type="text"
          placeholder="Write my own..."
          value={writeInText}
          onChange={(e) => setWriteInText(e.target.value)}
          onKeyDown={handleWriteInKeyDown}
          onBlur={addWriteIn}
          className="border-0 shadow-none p-0 h-auto text-sm sm:text-base focus-visible:ring-0 placeholder:italic placeholder:text-muted-foreground"
        />
      </div>

      {/* Divider before unsure */}
      {unsureOption && (
        <>
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
