'use client'

import { createContext, useContext, useReducer, useCallback, useEffect, useRef, type ReactNode } from 'react'
import type {
  EditorState,
  EditorAction,
  EditorSectionId,
  PreferenceValue,
  CustomPreferenceItem,
  TemplateStyle,
  EditorSectionState,
} from './editorTypes'
import type { BirthTeam } from '@/types'
import { SECTION_ORDER } from './sections'
import { getDefaultPreferencesForSection } from './preferences'

// Initial section state with default preferences populated
function createSectionState(sectionId: EditorSectionId): EditorSectionState {
  return {
    sectionId,
    preferences: getDefaultPreferencesForSection(sectionId) as PreferenceValue[],
    customItems: [],
    notes: '',
  }
}

// Initial state
function createInitialState(): EditorState {
  const sections = {} as Record<EditorSectionId, EditorSectionState>
  SECTION_ORDER.forEach(id => {
    sections[id] = createSectionState(id)
  })

  return {
    id: null,
    title: 'My Birth Plan',
    templateStyle: 'minimal',
    birthTeam: {
      mother_name: '',
      partner_name: '',
      provider_name: '',
      hospital_name: '',
      due_date: '',
    },
    sections,
    isDirty: false,
    lastSaved: null,
    createdFromQuiz: false,
  }
}

// Reducer
function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload, isDirty: true }

    case 'SET_TEMPLATE':
      return { ...state, templateStyle: action.payload, isDirty: true }

    case 'SET_BIRTH_TEAM':
      return {
        ...state,
        birthTeam: { ...state.birthTeam, ...action.payload },
        isDirty: true
      }

    case 'SET_PREFERENCE': {
      const { sectionId, preferenceId, value } = action.payload
      const section = state.sections[sectionId]
      const existingIndex = section.preferences.findIndex(p => p.preferenceId === preferenceId)

      let newPreferences: PreferenceValue[]
      if (existingIndex >= 0) {
        newPreferences = [...section.preferences]
        newPreferences[existingIndex] = { ...newPreferences[existingIndex], ...value }
      } else {
        newPreferences = [
          ...section.preferences,
          {
            preferenceId,
            selectedOption: null,
            isOmitted: false,
            sortOrder: section.preferences.length,
            ...value
          }
        ]
      }

      return {
        ...state,
        sections: {
          ...state.sections,
          [sectionId]: { ...section, preferences: newPreferences }
        },
        isDirty: true
      }
    }

    case 'ADD_CUSTOM_ITEM': {
      const { sectionId, item } = action.payload
      const section = state.sections[sectionId]
      const newItem: CustomPreferenceItem = {
        ...item,
        id: crypto.randomUUID(),
        sortOrder: section.customItems.length
      }

      return {
        ...state,
        sections: {
          ...state.sections,
          [sectionId]: {
            ...section,
            customItems: [...section.customItems, newItem]
          }
        },
        isDirty: true
      }
    }

    case 'REMOVE_CUSTOM_ITEM': {
      const { sectionId, itemId } = action.payload
      const section = state.sections[sectionId]

      return {
        ...state,
        sections: {
          ...state.sections,
          [sectionId]: {
            ...section,
            customItems: section.customItems.filter(i => i.id !== itemId)
          }
        },
        isDirty: true
      }
    }

    case 'UPDATE_CUSTOM_ITEM': {
      const { sectionId, itemId, updates } = action.payload
      const section = state.sections[sectionId]

      return {
        ...state,
        sections: {
          ...state.sections,
          [sectionId]: {
            ...section,
            customItems: section.customItems.map(item =>
              item.id === itemId ? { ...item, ...updates } : item
            )
          }
        },
        isDirty: true
      }
    }

    case 'SET_SECTION_NOTES': {
      const { sectionId, notes } = action.payload
      return {
        ...state,
        sections: {
          ...state.sections,
          [sectionId]: { ...state.sections[sectionId], notes }
        },
        isDirty: true
      }
    }

    case 'REORDER_PREFERENCES': {
      const { sectionId, preferenceIds } = action.payload
      const section = state.sections[sectionId]
      const reordered = preferenceIds.map((id, index) => {
        const pref = section.preferences.find(p => p.preferenceId === id)
        return pref ? { ...pref, sortOrder: index } : null
      }).filter(Boolean) as PreferenceValue[]

      return {
        ...state,
        sections: {
          ...state.sections,
          [sectionId]: { ...section, preferences: reordered }
        },
        isDirty: true
      }
    }

    case 'REORDER_CUSTOM_ITEMS': {
      const { sectionId, itemIds } = action.payload
      const section = state.sections[sectionId]
      const reordered = itemIds.map((id, index) => {
        const item = section.customItems.find(i => i.id === id)
        return item ? { ...item, sortOrder: index } : null
      }).filter(Boolean) as CustomPreferenceItem[]

      return {
        ...state,
        sections: {
          ...state.sections,
          [sectionId]: { ...section, customItems: reordered }
        },
        isDirty: true
      }
    }

    case 'APPLY_PRESET': {
      const presetMap = action.payload
      const newSections = { ...state.sections }
      for (const sectionId of SECTION_ORDER) {
        const section = newSections[sectionId]
        const updatedPrefs = section.preferences.map(pref => {
          const presetValue = presetMap[pref.preferenceId]
          if (presetValue !== undefined) {
            return { ...pref, selectedOption: presetValue, isOmitted: false }
          }
          return pref
        })
        newSections[sectionId] = { ...section, preferences: updatedPrefs }
      }
      return { ...state, sections: newSections, isDirty: true }
    }

    case 'LOAD_STATE':
      return { ...action.payload, isDirty: false }

    case 'MARK_SAVED':
      return {
        ...state,
        id: action.payload.id,
        lastSaved: action.payload.savedAt,
        isDirty: false
      }

    case 'RESET':
      return createInitialState()

    default:
      return state
  }
}

// Context
interface EditorContextType {
  state: EditorState
  dispatch: React.Dispatch<EditorAction>
  // Convenience methods
  setTitle: (title: string) => void
  setTemplate: (style: TemplateStyle) => void
  setBirthTeam: (team: Partial<BirthTeam>) => void
  setPreference: (sectionId: EditorSectionId, preferenceId: string, value: Partial<PreferenceValue>) => void
  addCustomItem: (sectionId: EditorSectionId, title: string, text: string) => void
  removeCustomItem: (sectionId: EditorSectionId, itemId: string) => void
  updateCustomItem: (sectionId: EditorSectionId, itemId: string, updates: Partial<CustomPreferenceItem>) => void
  setSectionNotes: (sectionId: EditorSectionId, notes: string) => void
  reorderPreferences: (sectionId: EditorSectionId, preferenceIds: string[]) => void
  reorderCustomItems: (sectionId: EditorSectionId, itemIds: string[]) => void
  applyPreset: (presetMap: Record<string, string>) => void
  unsurePreferenceIds: string[]
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export function EditorProvider({ children, initialState, presetToApply, unsurePreferenceIds = [] }: { children: ReactNode; initialState?: Partial<EditorState>; presetToApply?: Record<string, string>; unsurePreferenceIds?: string[] }) {
  const [state, dispatch] = useReducer(
    editorReducer,
    initialState ? { ...createInitialState(), ...initialState } : createInitialState()
  )

  // Apply preset on initial mount if provided
  const presetApplied = useRef(false)
  useEffect(() => {
    if (presetToApply && !presetApplied.current) {
      presetApplied.current = true
      dispatch({ type: 'APPLY_PRESET', payload: presetToApply })
    }
  }, [presetToApply])

  const setTitle = useCallback((title: string) =>
    dispatch({ type: 'SET_TITLE', payload: title }), [])

  const setTemplate = useCallback((style: TemplateStyle) =>
    dispatch({ type: 'SET_TEMPLATE', payload: style }), [])

  const setBirthTeam = useCallback((team: Partial<BirthTeam>) =>
    dispatch({ type: 'SET_BIRTH_TEAM', payload: team }), [])

  const setPreference = useCallback((sectionId: EditorSectionId, preferenceId: string, value: Partial<PreferenceValue>) =>
    dispatch({ type: 'SET_PREFERENCE', payload: { sectionId, preferenceId, value } }), [])

  const addCustomItem = useCallback((sectionId: EditorSectionId, title: string, text: string) =>
    dispatch({ type: 'ADD_CUSTOM_ITEM', payload: { sectionId, item: { title, text } } }), [])

  const removeCustomItem = useCallback((sectionId: EditorSectionId, itemId: string) =>
    dispatch({ type: 'REMOVE_CUSTOM_ITEM', payload: { sectionId, itemId } }), [])

  const updateCustomItem = useCallback((sectionId: EditorSectionId, itemId: string, updates: Partial<CustomPreferenceItem>) =>
    dispatch({ type: 'UPDATE_CUSTOM_ITEM', payload: { sectionId, itemId, updates } }), [])

  const setSectionNotes = useCallback((sectionId: EditorSectionId, notes: string) =>
    dispatch({ type: 'SET_SECTION_NOTES', payload: { sectionId, notes } }), [])

  const reorderPreferences = useCallback((sectionId: EditorSectionId, preferenceIds: string[]) =>
    dispatch({ type: 'REORDER_PREFERENCES', payload: { sectionId, preferenceIds } }), [])

  const reorderCustomItems = useCallback((sectionId: EditorSectionId, itemIds: string[]) =>
    dispatch({ type: 'REORDER_CUSTOM_ITEMS', payload: { sectionId, itemIds } }), [])

  const applyPreset = useCallback((presetMap: Record<string, string>) =>
    dispatch({ type: 'APPLY_PRESET', payload: presetMap }), [])

  return (
    <EditorContext.Provider value={{
      state,
      dispatch,
      setTitle,
      setTemplate,
      setBirthTeam,
      setPreference,
      addCustomItem,
      removeCustomItem,
      updateCustomItem,
      setSectionNotes,
      reorderPreferences,
      reorderCustomItems,
      applyPreset,
      unsurePreferenceIds,
    }}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider')
  }
  return context
}
