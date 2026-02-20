import type { EditorState } from './editorTypes'
import type { BirthTeam } from '@/types'
import { getPreferenceById, getPreferencesBySection } from './preferences'
import { getSectionsForBirthType } from './sections'

/**
 * Data structure expected by PDF templates
 */
export interface PlanItem {
  category: string
  title: string
  answer: string
  birthPlanText: string
  customNote?: string
  stance?: 'desired' | 'declined' | null
}

export interface PDFData {
  birthTeam: BirthTeam
  groupedContent: Record<string, PlanItem[]>
  disclaimerText: string
}

/**
 * Converts editor state to the format expected by PDF templates
 */
export function editorStateToPDFData(state: EditorState): PDFData {
  const allItems: PlanItem[] = []

  // Get visible sections for this birth type
  const visibleSections = getSectionsForBirthType(state.birthType || 'vaginal')
  const visiblePrefIds = new Set(
    visibleSections.flatMap(s => getPreferencesBySection(s.id, state.birthType || 'vaginal').map(p => p.id))
  )

  // Process each section in order
  visibleSections.forEach(section => {
    const sectionState = state.sections[section.id]
    if (!sectionState) return

    // Process preferences (filter by birth type visibility)
    const sortedPreferences = [...sectionState.preferences]
      .filter(pref => !pref.isOmitted && visiblePrefIds.has(pref.preferenceId))
      .sort((a, b) => a.sortOrder - b.sortOrder)

    sortedPreferences.forEach(prefValue => {
      const prefDef = getPreferenceById(prefValue.preferenceId)
      if (!prefDef) return

      // Get the selected option
      const selectedOption = prefDef.options.find(
        opt => opt.value === prefValue.selectedOption
      )

      // Skip if no option selected and no custom text
      if (!selectedOption && !prefValue.customText) return

      // Build the birth plan text
      let birthPlanText = selectedOption?.birthPlanText || ''
      if (prefValue.customText) {
        birthPlanText = prefValue.customText
      }

      // Skip empty birth plan text
      if (!birthPlanText) return

      allItems.push({
        category: section.displayTitle,
        title: prefValue.customTitle || prefDef.title,
        answer: selectedOption?.label || 'Custom',
        birthPlanText,
        stance: prefValue.stance,
      })
    })

    // Process custom items
    const sortedCustomItems = [...sectionState.customItems]
      .sort((a, b) => a.sortOrder - b.sortOrder)

    sortedCustomItems.forEach(item => {
      if (!item.text) return

      allItems.push({
        category: section.displayTitle,
        title: item.title,
        answer: 'Custom',
        birthPlanText: item.text,
      })
    })

    // Add section notes if present
    if (sectionState.notes && sectionState.notes.trim()) {
      allItems.push({
        category: section.displayTitle,
        title: 'Additional Notes',
        answer: 'Custom',
        birthPlanText: sectionState.notes,
      })
    }
  })

  // Group by category
  const groupedContent = allItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, PlanItem[]>)

  return {
    birthTeam: state.birthTeam,
    groupedContent,
    disclaimerText: state.disclaimerText,
  }
}
