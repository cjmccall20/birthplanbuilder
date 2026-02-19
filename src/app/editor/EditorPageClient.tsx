'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { EditorProvider } from '@/lib/editor/context'
import { EditorLayout } from '@/components/editor/EditorLayout'
import { useEditorLoader } from '@/lib/editor/useQuizLoader'
import { StartingPointSelector, type StartingPoint } from '@/components/editor/StartingPointSelector'
import { naturalPresets, hospitalPresets } from '@/lib/editor/presets'
import { Loader2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

function EditorWithLoader() {
  const { initialState, isLoading, fromQuiz, fromExisting, error, quizImportMeta } = useEditorLoader()
  const [startingPoint, setStartingPoint] = useState<StartingPoint | null>(null)
  const toastShown = useRef(false)

  // Show toast when quiz data is imported
  useEffect(() => {
    if (quizImportMeta && !toastShown.current) {
      toastShown.current = true
      const unsureCount = quizImportMeta.unsurePreferenceIds.length
      const message = unsureCount > 0
        ? `We imported ${quizImportMeta.importedCount} decisions from your quiz. ${unsureCount} marked "unsure" need your attention.`
        : `We imported ${quizImportMeta.importedCount} decisions from your quiz. Review and customize below.`
      toast.success('Quiz answers imported', { description: message, duration: 6000 })
    }
  }, [quizImportMeta])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            {fromExisting
              ? 'Loading your birth plan...'
              : fromQuiz
              ? 'Loading your quiz answers...'
              : 'Loading editor...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Unable to Load Birth Plan</h2>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/plans"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/editor"
              className="px-4 py-2 border border-input rounded-md hover:bg-accent transition-colors"
            >
              Start New Plan
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // New blank plan (not from quiz, not loading existing) — show starting point selector
  const isNewBlankPlan = !fromQuiz && !fromExisting && !initialState
  if (isNewBlankPlan && !startingPoint) {
    return <StartingPointSelector onSelect={setStartingPoint} />
  }

  // Build preset to apply after editor mounts
  const presetToApply = startingPoint === 'natural'
    ? naturalPresets
    : startingPoint === 'hospital'
    ? hospitalPresets
    : undefined

  return (
    <EditorProvider
      initialState={initialState || undefined}
      presetToApply={presetToApply}
      unsurePreferenceIds={quizImportMeta?.unsurePreferenceIds}
    >
      <EditorLayout />
    </EditorProvider>
  )
}

export function EditorPageClient() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <EditorWithLoader />
    </Suspense>
  )
}
