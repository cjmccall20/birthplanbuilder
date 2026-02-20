'use client'

import { useState, useEffect } from 'react'
import { SectionBrowser } from './SectionBrowser'
import { DecisionDetail } from './DecisionDetail'
import { CustomDecisionDetail } from './CustomDecisionDetail'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

type SidebarView =
  | { mode: 'browse' }
  | { mode: 'detail'; sectionId: EditorSectionId; preferenceId: string }
  | { mode: 'custom-detail'; sectionId: EditorSectionId; customItemId: string }

interface EditorSidebarProps {
  /** When the canvas selects a preference, navigate to its detail view */
  selectedPreferenceId?: string | null
  selectedSectionId?: EditorSectionId | null
  onClearSelection?: () => void
  /** Auto-expand a specific section in browse mode (from "Add decision" button) */
  filterToSection?: EditorSectionId | null
}

export function EditorSidebar({
  selectedPreferenceId,
  selectedSectionId,
  onClearSelection,
  filterToSection,
}: EditorSidebarProps) {
  const [view, setView] = useState<SidebarView>({ mode: 'browse' })

  // When a preference is selected externally (from canvas click), switch to detail
  useEffect(() => {
    if (selectedPreferenceId && selectedSectionId) {
      // Check if it's a custom item (prefixed with custom_)
      if (selectedPreferenceId.startsWith('custom_')) {
        const customItemId = selectedPreferenceId.replace('custom_', '')
        setView({ mode: 'custom-detail', sectionId: selectedSectionId, customItemId })
      } else {
        setView({ mode: 'detail', sectionId: selectedSectionId, preferenceId: selectedPreferenceId })
      }
    }
  }, [selectedPreferenceId, selectedSectionId])

  // When filterToSection changes, switch to browse mode
  useEffect(() => {
    if (filterToSection) {
      setView({ mode: 'browse' })
    }
  }, [filterToSection])

  const handleSelectPreference = (sectionId: EditorSectionId, preferenceId: string) => {
    setView({ mode: 'detail', sectionId, preferenceId })
  }

  const handleSelectCustomItem = (sectionId: EditorSectionId, customItemId: string) => {
    setView({ mode: 'custom-detail', sectionId, customItemId })
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

  if (view.mode === 'custom-detail') {
    return (
      <CustomDecisionDetail
        sectionId={view.sectionId}
        customItemId={view.customItemId}
        onBack={handleBack}
      />
    )
  }

  return (
    <SectionBrowser
      onSelectPreference={handleSelectPreference}
      onSelectCustomItem={handleSelectCustomItem}
      selectedPreferenceId={selectedPreferenceId}
      expandSection={filterToSection}
    />
  )
}
