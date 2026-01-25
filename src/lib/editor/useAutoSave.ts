import { useEffect, useRef, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import type { EditorState } from './editorTypes'

interface UseAutoSaveOptions {
  state: EditorState
  dispatch: React.Dispatch<any>
  user: User | null
  isLoading: boolean
}

interface UseAutoSaveReturn {
  isSaving: boolean
  lastSaved: string | null
  error: string | null
}

const AUTOSAVE_DELAY = 2000 // 2 seconds

export function useAutoSave({ state, dispatch, user, isLoading }: UseAutoSaveOptions): UseAutoSaveReturn {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const previousDirtyRef = useRef(state.isDirty)

  useEffect(() => {
    // Don't auto-save if:
    // - User is not logged in
    // - Auth is still loading
    // - State is not dirty
    // - Currently saving
    if (!user || isLoading || !state.isDirty || isSaving) {
      return
    }

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new timer for debounced save
    debounceTimerRef.current = setTimeout(async () => {
      setIsSaving(true)
      setError(null)

      try {
        const response = await fetch('/api/editor/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: state.id,
            title: state.title,
            templateStyle: state.templateStyle,
            birthTeam: state.birthTeam,
            sections: state.sections,
            createdFromQuiz: state.createdFromQuiz,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to save')
        }

        const data = await response.json()

        // Update state with new ID and saved timestamp from server
        dispatch({
          type: 'MARK_SAVED',
          payload: {
            id: data.id,
            savedAt: data.lastSaved || new Date().toISOString(),
          },
        })

        setError(null)
      } catch (err) {
        console.error('Auto-save error:', err)
        setError(err instanceof Error ? err.message : 'Failed to save')
      } finally {
        setIsSaving(false)
      }
    }, AUTOSAVE_DELAY)

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [state, dispatch, user, isLoading, isSaving])

  // Track when dirty state changes
  useEffect(() => {
    previousDirtyRef.current = state.isDirty
  }, [state.isDirty])

  return {
    isSaving,
    lastSaved: state.lastSaved,
    error,
  }
}
