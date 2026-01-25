'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { QuizState } from '@/types'
import type { EditorState } from './editorTypes'
import { mapQuizToEditorState } from './mapQuizToEditor'

const QUIZ_STORAGE_KEY = 'birthplan_quiz_state'

interface UseEditorLoaderResult {
  initialState: Partial<EditorState> | null
  isLoading: boolean
  fromQuiz: boolean
  fromExisting: boolean
  error: string | null
  clearQuizData: () => void
}

export function useEditorLoader(): UseEditorLoaderResult {
  const searchParams = useSearchParams()
  const [initialState, setInitialState] = useState<Partial<EditorState> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const planId = searchParams.get('id')
  const fromQuiz = searchParams.get('from') === 'quiz'
  const fromExisting = !!planId

  useEffect(() => {
    const loadEditor = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Priority 1: Load existing plan by ID
        if (planId) {
          const response = await fetch(`/api/editor/${planId}`)

          if (!response.ok) {
            if (response.status === 404) {
              setError('Birth plan not found')
            } else if (response.status === 401) {
              setError('Please log in to view this birth plan')
            } else if (response.status === 403) {
              setError('You do not have permission to view this birth plan')
            } else {
              setError('Failed to load birth plan')
            }
            setIsLoading(false)
            return
          }

          const data = await response.json()
          if (data.success && data.editorState) {
            setInitialState(data.editorState)
          } else {
            setError('Invalid response from server')
          }
          setIsLoading(false)
          return
        }

        // Priority 2: Load from quiz localStorage
        if (fromQuiz) {
          const savedQuizState = localStorage.getItem(QUIZ_STORAGE_KEY)
          if (savedQuizState) {
            const quizState: QuizState = JSON.parse(savedQuizState)
            const editorState = mapQuizToEditorState(quizState)
            setInitialState(editorState)
          }
          setIsLoading(false)
          return
        }

        // Priority 3: Start with empty editor
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to load editor:', err)
        setError('An unexpected error occurred while loading the editor')
        setIsLoading(false)
      }
    }

    loadEditor()
  }, [planId, fromQuiz])

  const clearQuizData = () => {
    localStorage.removeItem(QUIZ_STORAGE_KEY)
  }

  return { initialState, isLoading, fromQuiz, fromExisting, error, clearQuizData }
}

// Export alias for backward compatibility
export const useQuizLoader = useEditorLoader
