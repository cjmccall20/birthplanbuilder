'use client'

import { useQuiz } from '@/lib/quiz/context'
import { getCategories } from '@/lib/quiz/questions'
import { Progress } from '@/components/ui/progress'

export function QuizProgressBar() {
  const { state, progress, visibleQuestions, goToStep } = useQuiz()
  const categories = getCategories(state.answers)

  // Find current category
  const currentQuestion = visibleQuestions[state.currentStep]
  const currentCategory = currentQuestion?.category || categories[categories.length - 1]
  const currentCategoryIndex = categories.indexOf(currentCategory)

  // Count questions within current category
  const categoryQuestions = visibleQuestions.filter(q => q.category === currentCategory)
  const questionInCategory = currentQuestion ? categoryQuestions.indexOf(currentQuestion) + 1 : 0
  const categoryTotal = categoryQuestions.length

  // Compute per-category progress
  const categoryStats = categories.map(category => {
    const questions = visibleQuestions.filter(q => q.category === category)
    const answered = questions.filter(q => state.answers[q.id] !== undefined).length
    const total = questions.length
    const firstIndex = visibleQuestions.indexOf(questions[0])
    return { category, answered, total, firstIndex, complete: answered === total && total > 0 }
  })

  return (
    <div className="w-full max-w-2xl mx-auto mb-6 sm:mb-8">
      <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
        <span>{currentCategory} - Question {questionInCategory} of {categoryTotal}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <Progress value={progress} className="h-2" />

      <div className="flex justify-between mt-4 gap-1 sm:gap-2 overflow-x-auto pb-2">
        {categoryStats.map(({ category, answered, total, firstIndex, complete }, index) => (
          <button
            key={category}
            type="button"
            onClick={() => { if (firstIndex >= 0) goToStep(firstIndex) }}
            className={`text-xs px-1.5 sm:px-2 py-1 rounded whitespace-nowrap text-center transition-colors cursor-pointer ${
              complete
                ? 'bg-pink-100 text-pink-700'
                : index === currentCategoryIndex
                ? 'bg-primary text-primary-foreground'
                : index < currentCategoryIndex
                ? 'bg-primary/20 text-primary'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <span className="block">{category}</span>
            <span className="block text-[10px] opacity-70">{answered}/{total}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
