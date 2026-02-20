'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { QuizProvider, useQuiz } from '@/lib/quiz/context'
import { Header } from '@/components/layout/header'
import { QuestionCard } from '@/components/quiz/question-card'
import { QuizProgressBar } from '@/components/quiz/progress-bar'
import { QuizPreviewPanel } from '@/components/quiz/QuizPreviewPanel'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Baby, Stethoscope, Hospital, Heart } from 'lucide-react'

const CATEGORY_TRANSITIONS: Record<string, { icon: typeof Shield; title: string; description: string }> = {
  'Your Birth': {
    icon: Heart,
    title: 'Now let\'s talk about your birth experience',
    description: 'These questions cover what happens during labor - pain management, monitoring, environment, and how you want to push.',
  },
  'After Birth': {
    icon: Baby,
    title: 'What happens right after baby arrives',
    description: 'The moments after birth are powerful. These questions cover skin-to-skin, cord clamping, and your first hour together.',
  },
  'Newborn Care': {
    icon: Stethoscope,
    title: 'Newborn procedures and screenings',
    description: 'Your baby will be offered several tests and treatments in the first hours. Here\'s where you decide what feels right for your family.',
  },
  'Hospital Stay': {
    icon: Hospital,
    title: 'Your hospital stay',
    description: 'From rooming-in to visitors to going home - let\'s set up your recovery the way you want it.',
  },
  'C-Section Planning': {
    icon: Shield,
    title: 'In case a C-section becomes necessary...',
    description: 'Even if you are planning a vaginal birth, it helps to think about these preferences just in case. About 1 in 3 births involves a C-section, and having your wishes documented ahead of time means you stay in control even if plans change.',
  },
}

function CategoryTransitionCard({ category }: { category: string }) {
  const config = CATEGORY_TRANSITIONS[category]
  if (!config) return null
  const Icon = config.icon

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6 bg-muted/40 border-dashed">
      <CardContent className="pt-6 pb-5">
        <div className="flex items-start gap-3">
          <Icon className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
              {config.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {config.description}
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

  // Determine if current question is the first in a new category
  const transitionCategory = useMemo(() => {
    if (!currentQuestion) return null
    const currentIndex = visibleQuestions.indexOf(currentQuestion)
    if (currentIndex === 0) return null // Don't show transition for the very first question
    const prevQuestion = visibleQuestions[currentIndex - 1]
    if (prevQuestion?.category !== currentQuestion.category) {
      return currentQuestion.category
    }
    return null
  }, [currentQuestion, visibleQuestions])

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
    <div className="container py-6 sm:py-8 px-4 pb-16">
      <QuizProgressBar />
      {transitionCategory && <CategoryTransitionCard category={transitionCategory} />}
      <QuestionCard key={currentQuestion.id} question={currentQuestion} />
      <QuizPreviewPanel />
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
