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
  stance?: 'desired' | 'declined' | 'cautious' | null
  assignedTo?: string
}

export interface PDFData {
  birthTeam: BirthTeam
  groupedContent: Record<string, PlanItem[]>
  disclaimerText: string
  philosophyStatement?: string
  showPhilosophy?: boolean
}

/**
 * Converts editor state to the format expected by PDF templates
 */
export function editorStateToPDFData(state: EditorState): PDFData {
  const allItems: PlanItem[] = []

  // Get visible sections for this birth type
  const visibleSections = getSectionsForBirthType(state.birthType || 'vaginal', state.birthVenue)
  const visiblePrefIds = new Set(
    visibleSections.flatMap(s => getPreferencesBySection(s.id, state.birthType || 'vaginal', state.birthVenue).map(p => p.id))
  )

  // Hidden sections (user toggled off)
  const hiddenSectionIds = new Set(state.hiddenSections || [])

  // Process each section in order
  visibleSections.forEach(section => {
    // Skip hidden sections
    if (hiddenSectionIds.has(section.id)) return

    const sectionState = state.sections[section.id]
    if (!sectionState) return

    // Use custom section title if set
    const categoryTitle = state.customSectionTitles?.[section.id] || section.displayTitle

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
        category: categoryTitle,
        title: prefValue.customTitle || prefDef.title,
        answer: selectedOption?.label || 'Custom',
        birthPlanText,
        stance: prefValue.stance,
        assignedTo: prefValue.assignedTo,
      })
    })

    // Process custom items
    const sortedCustomItems = [...sectionState.customItems]
      .sort((a, b) => a.sortOrder - b.sortOrder)

    sortedCustomItems.forEach(item => {
      if (!item.text) return

      allItems.push({
        category: categoryTitle,
        title: item.title,
        answer: 'Custom',
        birthPlanText: item.text,
        stance: item.stance,
        assignedTo: item.assignedTo,
      })
    })

    // Add section notes if present
    if (sectionState.notes && sectionState.notes.trim()) {
      allItems.push({
        category: categoryTitle,
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
    philosophyStatement: state.philosophyStatement,
    showPhilosophy: state.showPhilosophy !== false, // Default to true
  }
}
