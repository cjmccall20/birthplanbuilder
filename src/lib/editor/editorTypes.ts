import type { BirthTeam } from '@/types'

// The 6 editor sections
export type EditorSectionId =
  | 'pre_hospital'
  | 'during_labor'
  | 'at_birth'
  | 'newborn_procedures'
  | 'hospital_stay'
  | 'csection'

export type BirthType = 'vaginal' | 'planned_csection'

export type TemplateStyle = 'minimal' | 'floral' | 'professional' | 'elegant' | 'rustic' | 'botanical' | 'ocean' | 'boho' | 'printer'

export interface EditorSection {
  id: EditorSectionId
  title: string
  description: string
  icon: string // Lucide icon name
}

export interface PreferenceOption {
  value: string
  label: string
  birthPlanText: string // Text that appears in the PDF
  isPopular?: boolean // For sorting common options to top
  icon?: string // Lucide icon name for this specific choice
  defaultStance?: 'desired' | 'declined' // Auto-infer stance from this option
}

export interface PreferenceDefinition {
  id: string
  sectionId: EditorSectionId
  title: string
  description?: string
  options: PreferenceOption[]
  allowCustom: boolean
  icon?: string
  quizQuestionId?: string // Maps to quiz question for importing
  hiddenFor?: BirthType[] // Hide this preference for certain birth types
}

export interface PreferenceValue {
  preferenceId: string
  selectedOption: string | null // null = using custom text only
  customText?: string
  customTitle?: string
  isOmitted: boolean
  sortOrder: number
  stance?: 'desired' | 'declined' | null  // Green check / Red X / neutral
  customIcon?: string                      // User-chosen Lucide icon name
}

export interface CustomPreferenceItem {
  id: string
  title: string
  text: string
  sortOrder: number
  stance?: 'desired' | 'declined' | null
  customIcon?: string
}

export interface EditorSectionState {
  sectionId: EditorSectionId
  preferences: PreferenceValue[]
  customItems: CustomPreferenceItem[]
  notes: string
}

export type BirthVenue = 'hospital' | 'birth_center' | 'home'

export interface EditorState {
  id: string | null // Birth plan ID (null if unsaved)
  title: string
  templateStyle: TemplateStyle
  birthType: BirthType
  birthVenue: BirthVenue | null
  birthTeam: BirthTeam
  sections: Record<EditorSectionId, EditorSectionState>
  isDirty: boolean
  lastSaved: string | null
  createdFromQuiz: boolean
  disclaimerText: string  // Editable bottom disclaimer
  showAllDecisions: boolean
  hiddenSections: string[]  // Section IDs hidden from canvas/PDF but data preserved
}

// Action types for reducer
export type EditorAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_TEMPLATE'; payload: TemplateStyle }
  | { type: 'SET_BIRTH_TEAM'; payload: Partial<BirthTeam> }
  | { type: 'SET_PREFERENCE'; payload: { sectionId: EditorSectionId; preferenceId: string; value: Partial<PreferenceValue> } }
  | { type: 'ADD_CUSTOM_ITEM'; payload: { sectionId: EditorSectionId; item: Omit<CustomPreferenceItem, 'id' | 'sortOrder'> } }
  | { type: 'REMOVE_CUSTOM_ITEM'; payload: { sectionId: EditorSectionId; itemId: string } }
  | { type: 'UPDATE_CUSTOM_ITEM'; payload: { sectionId: EditorSectionId; itemId: string; updates: Partial<CustomPreferenceItem> } }
  | { type: 'SET_SECTION_NOTES'; payload: { sectionId: EditorSectionId; notes: string } }
  | { type: 'REORDER_PREFERENCES'; payload: { sectionId: EditorSectionId; preferenceIds: string[] } }
  | { type: 'REORDER_CUSTOM_ITEMS'; payload: { sectionId: EditorSectionId; itemIds: string[] } }
  | { type: 'APPLY_PRESET'; payload: Record<string, string> }
  | { type: 'LOAD_STATE'; payload: EditorState }
  | { type: 'MARK_SAVED'; payload: { id: string; savedAt: string } }
  | { type: 'RESET' }
  | { type: 'SET_DISCLAIMER'; payload: string }
  | { type: 'SET_BIRTH_TEAM_FIELD'; payload: { fieldId: string; value: string } }
  | { type: 'ADD_BIRTH_TEAM_FIELD'; payload: { label: string } }
  | { type: 'REMOVE_BIRTH_TEAM_FIELD'; payload: { fieldId: string } }
  | { type: 'RENAME_BIRTH_TEAM_FIELD'; payload: { fieldId: string; label: string } }
  | { type: 'SET_STANCE'; payload: { sectionId: EditorSectionId; preferenceId: string; stance: 'desired' | 'declined' | null } }
  | { type: 'SET_CUSTOM_ICON'; payload: { sectionId: EditorSectionId; preferenceId: string; icon: string } }
  | { type: 'SET_BIRTH_TYPE'; payload: BirthType }
  | { type: 'SET_BIRTH_VENUE'; payload: BirthVenue | null }
  | { type: 'TOGGLE_SHOW_ALL_DECISIONS' }
  | { type: 'TOGGLE_SECTION_VISIBILITY'; payload: { sectionId: string } }
  | { type: 'UNDO' }
  | { type: 'REDO' }
