'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { QuizProvider, useQuiz } from '@/lib/quiz/context'
import { Header } from '@/components/layout/header'
import { QuestionCard } from '@/components/quiz/question-card'
import { QuizProgressBar } from '@/components/quiz/progress-bar'
import { QuizPreviewPanel } from '@/components/quiz/QuizPreviewPanel'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Baby, Stethoscope, Hospital, Heart, User } from 'lucide-react'

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
  'Personal': {
    icon: User,
    title: 'A few personal details',
    description: 'Almost done! These last questions help us personalize your birth plan.',
  },
  'C-Section Planning': {
    icon: Shield,
    title: 'In case a C-section becomes necessary...',
    description: 'Even if you are planning a vaginal birth, it helps to think about these preferences just in case. About 1 in 3 births involves a C-section, and having your wishes documented ahead of time means you stay in control even if plans change.',
  },
}

function CategoryTransitionCard({ category, birthType }: { category: string; birthType?: string }) {
  const config = CATEGORY_TRANSITIONS[category]
  if (!config) return null
  const Icon = config.icon

  // Override C-section transition text based on birth type
  let title = config.title
  let description = config.description
  if (category === 'C-Section Planning' && birthType === 'csection') {
    title = 'Your C-section preferences'
    description = 'Since you are planning a C-section, these preferences will help your surgical team understand what matters to you. You have more control than you might think.'
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mb-4 bg-muted/40 border-dashed">
      <CardContent className="pt-3 pb-2">
        <div className="flex items-start gap-3">
          <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-1 text-base">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-xs">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DevResetButton() {
  const { reset } = useQuiz()
  const handleReset = () => {
    localStorage.removeItem('birthplan_quiz_state')
    reset()
    window.location.reload()
  }
  return (
    <button
      onClick={handleReset}
      className="fixed bottom-4 right-4 z-50 px-3 py-1.5 text-xs bg-destructive/10 text-destructive border border-destructive/20 rounded-md hover:bg-destructive/20 transition-colors"
    >
      Reset Quiz (Dev)
    </button>
  )
}

function QuizContent() {
  const { state, currentQuestion, visibleQuestions } = useQuiz()
  const router = useRouter()

  useEffect(() => {
    // Only redirect when the user has advanced past all questions.
    // Do NOT redirect based on isComplete alone - the user may still be
    // viewing the last question (e.g. typing a facility name into a text
    // input, or navigating back from quiz-results to review answers).
    if (state.currentStep >= visibleQuestions.length) {
      router.push('/quiz-results')
    }
  }, [state.currentStep, visibleQuestions.length, router])

  // Determine category header: always show (except for very first "Getting Started" question)
  const categoryInfo = useMemo(() => {
    if (!currentQuestion) return null
    const currentIndex = visibleQuestions.indexOf(currentQuestion)
    // Don't show for the very first question overall
    if (currentIndex === 0) return null
    // Check if this is the first question in this category
    const prevQuestion = visibleQuestions[currentIndex - 1]
    return { category: currentQuestion.category }
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
      {categoryInfo && <CategoryTransitionCard category={categoryInfo.category} birthType={state.answers['planned_birth_type']} />}
      <QuestionCard key={currentQuestion.id} question={currentQuestion} />
      <QuizPreviewPanel />
      <DevResetButton />
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
