'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QuizProvider, useQuiz } from '@/lib/quiz/context'
import { quizQuestions } from '@/lib/quiz/questions'
import { Header } from '@/components/layout/header'
import { QuestionCard } from '@/components/quiz/question-card'
import { QuizProgressBar } from '@/components/quiz/progress-bar'

function QuizContent() {
  const { state, currentQuestion, isComplete } = useQuiz()
  const router = useRouter()

  useEffect(() => {
    if (isComplete || state.currentStep >= quizQuestions.length) {
      router.push('/preview')
    }
  }, [isComplete, state.currentStep, router])

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <QuizProgressBar />
      <QuestionCard question={currentQuestion} />
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
