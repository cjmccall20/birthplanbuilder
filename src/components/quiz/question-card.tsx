'use client'

import { useState, useMemo } from 'react'
import { QuizQuestion } from '@/lib/quiz/questions'
import { useQuiz } from '@/lib/quiz/context'
import { QuizLearnMore } from '@/components/quiz/QuizLearnMore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronDown, ChevronUp, ArrowRight, ArrowLeft, SkipForward, CheckCircle2, XCircle, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SupportPeopleChecklist } from './SupportPeopleChecklist'
import { MultiSelectChecklist } from './MultiSelectChecklist'

// Engagement-only questions collect data but have no medical stance/opinion
const ENGAGEMENT_ONLY_QUESTIONS = new Set([
  'planned_birth_type',
  'baby_sex',
  'baby_name',
  'facility_name',
  'due_date',
])

interface QuestionCardProps {
  question: QuizQuestion
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { state, setAnswer, setStance, nextStep, prevStep } = useQuiz()

  // Resolve birth type variant for dynamic C-section framing
  const effectiveQuestion = useMemo(() => {
    if (!question.birthTypeVariant) return question

    const birthType = state.answers['planned_birth_type']
    const variantKey = birthType === 'csection' ? 'csection' : 'vaginal'
    const variant = question.birthTypeVariant[variantKey]
    if (!variant) return question

    // Merge variant overrides into the question
    const merged = { ...question }
    if (variant.subtitle) {
      merged.subtitle = variant.subtitle
    }
    if (variant.learnMoreOverrides && merged.learnMoreData) {
      merged.learnMoreData = { ...merged.learnMoreData, ...variant.learnMoreOverrides }
    }
    if (variant.optionOverrides) {
      merged.options = question.options.map(opt => {
        const override = variant.optionOverrides?.[opt.value]
        if (override) {
          return { ...opt, ...override }
        }
        return opt
      })
    }
    return merged
  }, [question, state.answers])

  const [showLearnMore, setShowLearnMore] = useState(false)

  const currentAnswer = state.answers[question.id]

  // Initialize text input from saved custom text (answer that doesn't match any option value)
  const [textInput, setTextInput] = useState(() => {
    if (effectiveQuestion.textInputOnOption && currentAnswer && !effectiveQuestion.options.some(o => o.value === currentAnswer)) {
      return currentAnswer
    }
    return ''
  })

  const handleAnswer = (value: string) => {
    if (effectiveQuestion.textInputOnOption && value !== effectiveQuestion.textInputOnOption) {
      setTextInput('')
    }
    setAnswer(question.id, value)
  }

  const handleTextChange = (value: string) => {
    setTextInput(value)
    if (value.trim()) {
      setAnswer(question.id, value.trim())
    } else if (effectiveQuestion.textInputOnOption) {
      setAnswer(question.id, effectiveQuestion.textInputOnOption)
    }
  }

  const handleNext = () => {
    // If this question has a text input trigger and user selected it but hasn't typed anything, don't advance
    if (
      effectiveQuestion.textInputOnOption &&
      currentAnswer === effectiveQuestion.textInputOnOption &&
      !textInput.trim()
    ) {
      // Focus the text input instead of advancing
      const input = document.querySelector<HTMLInputElement>(`input[placeholder*="Type"]`)
      input?.focus()
      return
    }
    nextStep()
  }

  // Determine which radio button to highlight
  const radioValue = (() => {
    if (!currentAnswer) return ''
    if (effectiveQuestion.options.some(o => o.value === currentAnswer)) return currentAnswer
    // Custom text answer - highlight the text input option
    if (effectiveQuestion.textInputOnOption) return effectiveQuestion.textInputOnOption
    return currentAnswer
  })()

  // Show text input when the textInputOnOption is active
  const showTextInput = effectiveQuestion.textInputOnOption && (
    currentAnswer === effectiveQuestion.textInputOnOption ||
    (currentAnswer && !effectiveQuestion.options.some(o => o.value === currentAnswer))
  )

  const hasLearnMore = !!effectiveQuestion.learnMoreData

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="px-4 sm:px-6">
        <Badge variant="secondary" className="w-fit text-xs mb-2">
          {question.category}
        </Badge>
        <CardTitle className="font-serif text-xl sm:text-2xl">{question.title}</CardTitle>
        <p className="text-sm sm:text-base text-muted-foreground">
          {effectiveQuestion.subtitle}
        </p>

        {hasLearnMore && (
          <button
            onClick={() => setShowLearnMore(!showLearnMore)}
            className="flex items-center gap-1 text-sm text-primary hover:underline mt-2 w-fit min-h-[44px]"
          >
            {showLearnMore ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Learn more about this decision
              </>
            )}
          </button>
        )}

        {showLearnMore && effectiveQuestion.learnMoreData && (
          <div className="mt-3">
            <QuizLearnMore data={effectiveQuestion.learnMoreData} />
          </div>
        )}

      </CardHeader>
      <CardContent className="space-y-6 px-4 sm:px-6">
        {/* Checklist variants */}
        {effectiveQuestion.inputType === 'checklist_with_names' ? (
          <SupportPeopleChecklist question={effectiveQuestion} />
        ) : effectiveQuestion.inputType === 'checklist' ? (
          <MultiSelectChecklist question={effectiveQuestion} />
        ) : (
        /* Option buttons */
        <RadioGroup
          value={radioValue}
          onValueChange={handleAnswer}
          className="space-y-3"
        >
          {effectiveQuestion.options.map((option) => (
            <div key={option.value}>
              <div
                className={cn(
                  "flex items-center space-x-3 rounded-lg border p-3 sm:p-4 cursor-pointer transition-colors min-h-[44px]",
                  radioValue === option.value
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/50",
                  option.isUnsure && "border-dashed"
                )}
                onClick={() => handleAnswer(option.value)}
              >
                <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                <Label
                  htmlFor={`${question.id}-${option.value}`}
                  className={cn(
                    "flex-1 cursor-pointer text-sm sm:text-base",
                    option.isUnsure && "italic text-muted-foreground"
                  )}
                >
                  {option.label}
                </Label>
              </div>

              {/* Inline text input when this option triggers it */}
              {showTextInput && effectiveQuestion.textInputOnOption === option.value && (
                <div className="ml-8 mt-2 mb-1 space-y-2">
                  <Input
                    type="text"
                    placeholder={
                      question.id === 'baby_name'
                        ? "Type baby's name..."
                        : question.id === 'facility_name'
                        ? 'Type facility name...'
                        : 'Type your preference...'
                    }
                    value={textInput}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="min-h-[44px] text-base"
                    autoFocus
                  />
                  {!ENGAGEMENT_ONLY_QUESTIONS.has(question.id) && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground mr-1">Stance:</span>
                      <button
                        type="button"
                        onClick={() => setStance(question.id, null)}
                        className={cn(
                          "p-1.5 rounded-md transition-colors",
                          (!state.stances?.[question.id]) ? "ring-2 ring-primary bg-primary/10" : "hover:bg-muted"
                        )}
                        title="Neutral"
                      >
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setStance(question.id, 'desired')}
                        className={cn(
                          "p-1.5 rounded-md transition-colors",
                          state.stances?.[question.id] === 'desired' ? "ring-2 ring-green-500 bg-green-50" : "hover:bg-muted"
                        )}
                        title="Desired"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setStance(question.id, 'declined')}
                        className={cn(
                          "p-1.5 rounded-md transition-colors",
                          state.stances?.[question.id] === 'declined' ? "ring-2 ring-red-500 bg-red-50" : "hover:bg-muted"
                        )}
                        title="Declined"
                      >
                        <XCircle className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={state.currentStep === 0}
            className="min-h-[44px] w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            variant={currentAnswer ? 'default' : 'ghost'}
            className="min-h-[44px] w-full sm:w-auto"
          >
            {currentAnswer ? (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Skip question
                <SkipForward className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
