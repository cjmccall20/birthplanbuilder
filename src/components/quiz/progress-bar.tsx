'use client'

import { useQuiz } from '@/lib/quiz/context'
import { getCategories } from '@/lib/quiz/questions'
import { Progress } from '@/components/ui/progress'

export function QuizProgressBar() {
  const { state, progress, visibleQuestions } = useQuiz()
  const categories = getCategories()

  // Find current category
  const currentQuestion = visibleQuestions[state.currentStep]
  const currentCategory = currentQuestion?.category || categories[categories.length - 1]
  const currentCategoryIndex = categories.indexOf(currentCategory)

  return (
    <div className="w-full max-w-2xl mx-auto mb-6 sm:mb-8">
      <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
        <span>Question {Math.min(state.currentStep + 1, visibleQuestions.length)} of {visibleQuestions.length}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <Progress value={progress} className="h-2" />

      <div className="flex justify-between mt-4 gap-1 sm:gap-2 overflow-x-auto pb-2">
        {categories.map((category, index) => (
          <div
            key={category}
            className={`text-xs px-1.5 sm:px-2 py-1 rounded whitespace-nowrap ${
              index < currentCategoryIndex
                ? 'bg-primary/20 text-primary'
                : index === currentCategoryIndex
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  )
}
