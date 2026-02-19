import { useEffect, useRef, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import type { EditorState, EditorAction } from './editorTypes'

const AUTOSAVE_DELAY = 2000
const LOCAL_STORAGE_KEY = 'birthplan_editor_state'

interface UseAutoSaveOptions {
  state: EditorState
  dispatch: React.Dispatch<EditorAction>
  user: User | null
  isLoading: boolean
}

interface UseAutoSaveReturn {
  isSaving: boolean
  lastSaved: string | null
  error: string | null
  savedLocally: boolean
}

export function useAutoSave({ state, dispatch, user, isLoading }: UseAutoSaveOptions): UseAutoSaveReturn {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedLocally, setSavedLocally] = useState(false)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const migrationAttempted = useRef(false)

  // Layer 1: Auto-save to Supabase for logged-in users
  useEffect(() => {
    if (!user || isLoading || !state.isDirty || isSaving) return

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)

    debounceTimerRef.current = setTimeout(async () => {
      setIsSaving(true)
      setError(null)

      try {
        const response = await fetch('/api/editor/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
        dispatch({
          type: 'MARK_SAVED',
          payload: { id: data.id, savedAt: data.lastSaved || new Date().toISOString() },
        })

        // Clear localStorage after successful cloud save
        try { localStorage.removeItem(LOCAL_STORAGE_KEY) } catch {}
        setSavedLocally(false)
        setError(null)
      } catch (err) {
        console.error('Auto-save error:', err)
        setError(err instanceof Error ? err.message : 'Failed to save')
      } finally {
        setIsSaving(false)
      }
    }, AUTOSAVE_DELAY)

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    }
  }, [state, dispatch, user, isLoading, isSaving])

  // Layer 2: Auto-save to localStorage for anonymous users
  useEffect(() => {
    if (user || isLoading || !state.isDirty) return

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)

    debounceTimerRef.current = setTimeout(() => {
      try {
        const dataToSave = {
          title: state.title,
          templateStyle: state.templateStyle,
          birthTeam: state.birthTeam,
          sections: state.sections,
          createdFromQuiz: state.createdFromQuiz,
          savedAt: new Date().toISOString(),
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave))
        setSavedLocally(true)
      } catch (err) {
        console.error('localStorage save error:', err)
      }
    }, AUTOSAVE_DELAY)

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    }
  }, [state, user, isLoading])

  // Layer 3: Migrate localStorage data to database when user logs in
  useEffect(() => {
    if (!user || isLoading || migrationAttempted.current) return
    migrationAttempted.current = true

    // Only migrate if we don't already have a plan loaded from DB
    if (state.id) return

    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (!savedData) return

      const parsed = JSON.parse(savedData)
      // Check if there's meaningful content (not just defaults)
      const hasMeaningfulContent = parsed.birthTeam?.mother_name ||
        parsed.title !== 'My Birth Plan' ||
        parsed.createdFromQuiz

      if (hasMeaningfulContent) {
        dispatch({
          type: 'LOAD_STATE',
          payload: {
            ...parsed,
            id: null,
            isDirty: true,
            lastSaved: null,
          },
        })
        // The isDirty: true will trigger the cloud auto-save above
      }
    } catch (err) {
      console.error('Migration error:', err)
    }
  }, [user, isLoading, state.id, dispatch])

  return {
    isSaving,
    lastSaved: state.lastSaved,
    error,
    savedLocally,
  }
}
