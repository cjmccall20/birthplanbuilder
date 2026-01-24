'use client'

import { useState } from 'react'
import { QuizQuestion } from '@/lib/quiz/questions'
import { useQuiz } from '@/lib/quiz/context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ChevronDown, ChevronUp, ArrowRight, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuestionCardProps {
  question: QuizQuestion
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { state, setAnswer, setCustomNote, nextStep, prevStep } = useQuiz()
  const [showLearnMore, setShowLearnMore] = useState(false)
  const [showCustomNote, setShowCustomNote] = useState(false)

  const currentAnswer = state.answers[question.id]
  const currentNote = state.customNotes[question.id] || ''

  const handleAnswer = (value: string) => {
    setAnswer(question.id, value)
  }

  const handleNext = () => {
    if (currentAnswer) {
      nextStep()
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="text-sm text-primary font-medium mb-1">{question.category}</div>
        <CardTitle className="font-serif text-2xl">{question.title}</CardTitle>
        <CardDescription className="text-base">{question.description}</CardDescription>

        {question.learnMoreContent && (
          <button
            onClick={() => setShowLearnMore(!showLearnMore)}
            className="flex items-center gap-1 text-sm text-primary hover:underline mt-2 w-fit"
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

        {showLearnMore && question.learnMoreContent && (
          <div className="mt-3 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
            {question.learnMoreContent}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={currentAnswer || ''}
          onValueChange={handleAnswer}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors",
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
                  "flex-1 cursor-pointer",
                  option.isUnsure && "italic text-muted-foreground"
                )}
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div>
          <button
            onClick={() => setShowCustomNote(!showCustomNote)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showCustomNote ? '- Hide custom note' : '+ Add a custom note for this section'}
          </button>

          {showCustomNote && (
            <Textarea
              value={currentNote}
              onChange={(e) => setCustomNote(question.id, e.target.value)}
              placeholder="Add any specific instructions or notes for your care team..."
              className="mt-2"
              rows={3}
            />
          )}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={state.currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!currentAnswer}
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
