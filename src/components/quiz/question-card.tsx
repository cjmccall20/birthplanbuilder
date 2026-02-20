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
import { ChevronDown, ChevronUp, ArrowRight, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuestionCardProps {
  question: QuizQuestion
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { state, setAnswer, nextStep, prevStep } = useQuiz()
  const [showLearnMore, setShowLearnMore] = useState(false)
  const [textInput, setTextInput] = useState('')

  const currentAnswer = state.answers[question.id]

  const handleAnswer = (value: string) => {
    setAnswer(question.id, value)
    // If picking a preset option on a text input question, clear the text
    if (question.inputType === 'text') {
      setTextInput('')
    }
  }

  const handleTextChange = (value: string) => {
    setTextInput(value)
    if (value.trim()) {
      // Save the text value directly as the answer
      setAnswer(question.id, value.trim())
    }
  }

  const handleNext = () => {
    if (currentAnswer) {
      nextStep()
    }
  }

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
        {/* Text input for questions like baby_name */}
        {question.inputType === 'text' && (
          <div className="space-y-2">
            <Input
              type="text"
              placeholder={question.subtitle || 'Type your answer...'}
              value={textInput}
              onChange={(e) => handleTextChange(e.target.value)}
              className="min-h-[44px] text-base"
            />
            <p className="text-xs text-muted-foreground">Or choose an option below:</p>
          </div>
        )}

        {/* Option buttons */}
        <RadioGroup
          value={
            // If there is text input and the answer matches the text, don't highlight any radio
            question.inputType === 'text' && textInput.trim() && currentAnswer === textInput.trim()
              ? ''
              : currentAnswer || ''
          }
          onValueChange={handleAnswer}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "flex items-center space-x-3 rounded-lg border p-3 sm:p-4 cursor-pointer transition-colors min-h-[44px]",
                currentAnswer === option.value
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
          ))}
        </RadioGroup>

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
            disabled={!currentAnswer}
            className="min-h-[44px] w-full sm:w-auto"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
