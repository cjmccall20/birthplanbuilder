'use client'

import { useState, useEffect } from 'react'
import { SectionBrowser } from './SectionBrowser'
import { DecisionDetail } from './DecisionDetail'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

type SidebarView =
  | { mode: 'browse' }
  | { mode: 'detail'; sectionId: EditorSectionId; preferenceId: string }

interface EditorSidebarProps {
  /** When the canvas selects a preference, navigate to its detail view */
  selectedPreferenceId?: string | null
  selectedSectionId?: EditorSectionId | null
  onClearSelection?: () => void
}

export function EditorSidebar({
  selectedPreferenceId,
  selectedSectionId,
  onClearSelection,
}: EditorSidebarProps) {
  const [view, setView] = useState<SidebarView>({ mode: 'browse' })

  // When a preference is selected externally (from canvas click), switch to detail
  useEffect(() => {
    if (selectedPreferenceId && selectedSectionId) {
      setView({ mode: 'detail', sectionId: selectedSectionId, preferenceId: selectedPreferenceId })
    }
  }, [selectedPreferenceId, selectedSectionId])

  const handleSelectPreference = (sectionId: EditorSectionId, preferenceId: string) => {
    setView({ mode: 'detail', sectionId, preferenceId })
  }

  const handleBack = () => {
    setView({ mode: 'browse' })
    onClearSelection?.()
  }

  if (view.mode === 'detail') {
    return (
      <DecisionDetail
        sectionId={view.sectionId}
        preferenceId={view.preferenceId}
        onBack={handleBack}
      />
    )
  }

  return (
    <SectionBrowser
      onSelectPreference={handleSelectPreference}
      selectedPreferenceId={selectedPreferenceId}
    />
  )
}
