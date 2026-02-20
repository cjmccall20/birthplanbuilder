'use client'

import { useState } from 'react'
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

interface QuestionCardProps {
  question: QuizQuestion
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { state, setAnswer, setStance, nextStep, prevStep } = useQuiz()
  const [showLearnMore, setShowLearnMore] = useState(false)

  const currentAnswer = state.answers[question.id]

  // Initialize text input from saved custom text (answer that doesn't match any option value)
  const [textInput, setTextInput] = useState(() => {
    if (question.textInputOnOption && currentAnswer && !question.options.some(o => o.value === currentAnswer)) {
      return currentAnswer
    }
    return ''
  })

  const handleAnswer = (value: string) => {
    if (question.textInputOnOption && value !== question.textInputOnOption) {
      setTextInput('')
    }
    setAnswer(question.id, value)
  }

  const handleTextChange = (value: string) => {
    setTextInput(value)
    if (value.trim()) {
      setAnswer(question.id, value.trim())
    } else if (question.textInputOnOption) {
      setAnswer(question.id, question.textInputOnOption)
    }
  }

  const handleNext = () => {
    nextStep()
  }

  // Determine which radio button to highlight
  const radioValue = (() => {
    if (!currentAnswer) return ''
    if (question.options.some(o => o.value === currentAnswer)) return currentAnswer
    // Custom text answer - highlight the text input option
    if (question.textInputOnOption) return question.textInputOnOption
    return currentAnswer
  })()

  // Show text input when the textInputOnOption is active
  const showTextInput = question.textInputOnOption && (
    currentAnswer === question.textInputOnOption ||
    (currentAnswer && !question.options.some(o => o.value === currentAnswer))
  )

  const hasLearnMore = !!question.learnMoreData

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="px-4 sm:px-6">
        <Badge variant="secondary" className="w-fit text-xs mb-2">
          {question.category}
        </Badge>
        <CardTitle className="font-serif text-xl sm:text-2xl">{question.title}</CardTitle>
        <p className="text-sm sm:text-base text-muted-foreground">
          {question.subtitle}
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

        {showLearnMore && question.learnMoreData && (
          <div className="mt-3">
            <QuizLearnMore data={question.learnMoreData} />
          </div>
        )}

      </CardHeader>
      <CardContent className="space-y-6 px-4 sm:px-6">
        {/* Support people checklist */}
        {question.inputType === 'checklist_with_names' ? (
          <SupportPeopleChecklist question={question} />
        ) : (
        /* Option buttons */
        <RadioGroup
          value={radioValue}
          onValueChange={handleAnswer}
          className="space-y-3"
        >
          {question.options.map((option) => (
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
              {showTextInput && question.textInputOnOption === option.value && (
                <div className="ml-8 mt-2 mb-1 space-y-2">
                  <Input
                    type="text"
                    placeholder={
                      question.id === 'baby_name'
                        ? "Type baby's name..."
                        : 'Type your preference...'
                    }
                    value={textInput}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="min-h-[44px] text-base"
                    autoFocus
                  />
                  {question.id !== 'baby_name' && (
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
