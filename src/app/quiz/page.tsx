'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QuizProvider, useQuiz } from '@/lib/quiz/context'
import { Header } from '@/components/layout/header'
import { QuestionCard } from '@/components/quiz/question-card'
import { QuizProgressBar } from '@/components/quiz/progress-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Shield } from 'lucide-react'

function CsectionTransitionHeader() {
  return (
    <Card className="w-full max-w-2xl mx-auto mb-6 bg-muted/40 border-dashed">
      <CardContent className="pt-6 pb-5">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
              In case a C-section becomes necessary...
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Even if you are planning a vaginal birth, it helps to think about these preferences
              just in case. About 1 in 3 births involves a C-section, and having your wishes
              documented ahead of time means you stay in control even if plans change.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function QuizContent() {
  const { state, currentQuestion, isComplete, visibleQuestions } = useQuiz()
  const router = useRouter()

  useEffect(() => {
    if (isComplete || state.currentStep >= visibleQuestions.length) {
      router.push('/quiz-results')
    }
  }, [isComplete, state.currentStep, visibleQuestions.length, router])

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Determine if we should show the C-section transition header.
  // Show it when the current question is the FIRST deferred C-section question.
  const isFirstCsectionQuestion = currentQuestion.deferredFor === 'csection' && (() => {
    const currentIndex = visibleQuestions.indexOf(currentQuestion)
    if (currentIndex === 0) return true
    const prevQuestion = visibleQuestions[currentIndex - 1]
    return !prevQuestion?.deferredFor
  })()

  return (
    <div className="container py-6 sm:py-8 px-4">
      <QuizProgressBar />
      {isFirstCsectionQuestion && <CsectionTransitionHeader />}
      <QuestionCard key={currentQuestion.id} question={currentQuestion} />
    </div>
  )
}

export default function QuizPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <QuizProvider>
          <QuizContent />
        </QuizProvider>
      </main>
    </div>
  )
}
