'use client'

import { useState, useEffect } from 'react'
import { QuizQuestion } from '@/lib/quiz/questions'
import { useQuiz } from '@/lib/quiz/context'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SupportPerson {
  role: string
  name: string
}

interface SupportPeopleChecklistProps {
  question: QuizQuestion
}

function parseAnswer(answer: string | undefined): SupportPerson[] {
  if (!answer) return []
  try {
    const parsed = JSON.parse(answer)
    if (Array.isArray(parsed)) return parsed
  } catch {
    // Legacy string answer - try to infer
    if (answer === 'unsure') return []
  }
  return []
}

export function SupportPeopleChecklist({ question }: SupportPeopleChecklistProps) {
  const { state, setAnswer } = useQuiz()
  const currentAnswer = state.answers[question.id]

  const [selected, setSelected] = useState<SupportPerson[]>(() => parseAnswer(currentAnswer))
  const [extraSlots, setExtraSlots] = useState(0)
  const [isUnsure, setIsUnsure] = useState(currentAnswer === 'unsure')

  // Sync to quiz state when selection changes
  useEffect(() => {
    if (isUnsure) {
      setAnswer(question.id, 'unsure')
    } else if (selected.length > 0) {
      setAnswer(question.id, JSON.stringify(selected))
    }
  }, [selected, isUnsure, question.id, setAnswer])

  const mainRoles = question.options.filter(o => !o.isUnsure)

  const isRoleSelected = (role: string) => selected.some(s => s.role === role)

  const toggleRole = (role: string) => {
    setIsUnsure(false)
    if (isRoleSelected(role)) {
      setSelected(prev => prev.filter(s => s.role !== role))
    } else {
      setSelected(prev => [...prev, { role, name: '' }])
    }
  }

  const setName = (role: string, name: string) => {
    setSelected(prev => prev.map(s => s.role === role ? { ...s, name } : s))
  }

  const handleUnsure = () => {
    setIsUnsure(!isUnsure)
    if (!isUnsure) {
      setSelected([])
    }
  }

  const addExtraSlot = () => {
    if (extraSlots < 2) {
      const slotRole = `support_person_${extraSlots + 1}`
      setExtraSlots(prev => prev + 1)
      setSelected(prev => [...prev, { role: slotRole, name: '' }])
      setIsUnsure(false)
    }
  }

  const extraPersonRoles = Array.from({ length: extraSlots }, (_, i) => `support_person_${i + 1}`)

  return (
    <div className="space-y-3">
      {mainRoles.map((option) => (
        <div key={option.value}>
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg border p-3 sm:p-4 cursor-pointer transition-colors min-h-[44px]",
              isRoleSelected(option.value)
                ? "border-primary bg-primary/5"
                : "hover:bg-muted/50"
            )}
            onClick={() => toggleRole(option.value)}
          >
            <Checkbox
              checked={isRoleSelected(option.value)}
              className="pointer-events-none"
            />
            <span
              className="flex-1 cursor-pointer text-sm sm:text-base"
            >
              {option.label}
            </span>
          </div>
          {isRoleSelected(option.value) && (
            <div className="ml-10 mt-1.5 mb-1">
              <Input
                type="text"
                placeholder={`${option.label}'s name (optional)`}
                value={selected.find(s => s.role === option.value)?.name || ''}
                onChange={(e) => setName(option.value, e.target.value)}
                className="min-h-[36px] text-sm"
              />
            </div>
          )}
        </div>
      ))}

      {/* Extra support person slots */}
      {extraPersonRoles.map((role, i) => (
        <div key={role}>
          <div
            className="flex items-center gap-3 rounded-lg border border-primary bg-primary/5 p-3 sm:p-4 min-h-[44px]"
          >
            <Checkbox checked={true} onCheckedChange={() => {
              setSelected(prev => prev.filter(s => s.role !== role))
              setExtraSlots(prev => prev - 1)
            }} />
            <span className="text-sm sm:text-base">Support Person {i + 1}</span>
          </div>
          <div className="ml-10 mt-1.5 mb-1">
            <Input
              type="text"
              placeholder="Their name"
              value={selected.find(s => s.role === role)?.name || ''}
              onChange={(e) => setName(role, e.target.value)}
              className="min-h-[36px] text-sm"
              autoFocus
            />
          </div>
        </div>
      ))}

      {/* Add another button */}
      {extraSlots < 2 && selected.length > 0 && !isUnsure && (
        <button
          onClick={addExtraSlot}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors py-2 pl-1"
        >
          <Plus className="w-4 h-4" />
          Add another support person
        </button>
      )}

      {/* Divider */}
      <div className="border-t border-dashed my-2" />

      {/* Unsure option */}
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
          I still need to think about this
        </span>
      </div>
    </div>
  )
}
