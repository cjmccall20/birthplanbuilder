'use client'

import { createContext, useContext, useReducer, useCallback, useEffect, useRef, type ReactNode } from 'react'
import type {
  EditorState,
  EditorAction,
  EditorSectionId,
  PreferenceValue,
  CustomPreferenceItem,
  TemplateStyle,
  BirthType,
  BirthVenue,
  EditorSectionState,
} from './editorTypes'
import type { BirthTeam, BirthTeamField } from '@/types'
import { createDefaultBirthTeam, migrateBirthTeam } from '@/types'
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

  sections.csection.notes = 'We understand that in an emergency situation, it may not be possible to accommodate all preferences. If a C-section becomes necessary, the preferences we feel most strongly about include:'

  return {
    id: null,
    title: 'My Birth Plan',
    templateStyle: 'minimal',
    birthType: 'vaginal',
    birthVenue: null,
    birthTeam: createDefaultBirthTeam(),
    sections,
    isDirty: false,
    lastSaved: null,
    createdFromQuiz: false,
    disclaimerText: 'This birth plan represents my preferences for labor and delivery. I understand that circumstances may change and medical decisions may need to be made for the safety of myself and my baby. I trust my care team to keep us informed and involve us in any decisions when possible.',
    showAllDecisions: false,
    hiddenSections: [],
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

    case 'LOAD_STATE': {
      const loaded = action.payload
      return {
        ...loaded,
        birthTeam: migrateBirthTeam(loaded.birthTeam),
        birthType: loaded.birthType || 'vaginal',
        birthVenue: loaded.birthVenue ?? null,
        showAllDecisions: loaded.showAllDecisions ?? false,
        disclaimerText: loaded.disclaimerText || 'This birth plan represents my preferences for labor and delivery. I understand that circumstances may change and medical decisions may need to be made for the safety of myself and my baby. I trust my care team to keep us informed and involve us in any decisions when possible.',
        isDirty: false,
      }
    }

    case 'MARK_SAVED':
      return {
        ...state,
        id: action.payload.id,
        lastSaved: action.payload.savedAt,
        isDirty: false
      }

    case 'RESET':
      return createInitialState()

    case 'SET_SUBTITLE':
      return { ...state, subtitle: action.payload, isDirty: true }

    case 'SET_DISCLAIMER':
      return { ...state, disclaimerText: action.payload, isDirty: true }

    case 'SET_BIRTH_TEAM_FIELD': {
      const { fieldId, value } = action.payload
      // Map default field IDs to flat backward-compat property names
      const flatKeyMap: Record<string, string> = {
        mother: 'mother_name',
        partner: 'partner_name',
        provider: 'provider_name',
        hospital: 'hospital_name',
        doula: 'doula_name',
      }
      const flatKey = flatKeyMap[fieldId]
      return {
        ...state,
        birthTeam: {
          ...state.birthTeam,
          fields: state.birthTeam.fields.map(f =>
            f.id === fieldId ? { ...f, value } : f
          ),
          ...(flatKey ? { [flatKey]: value } : {}),
        },
        isDirty: true
      }
    }

    case 'ADD_BIRTH_TEAM_FIELD': {
      const newField: BirthTeamField = {
        id: crypto.randomUUID(),
        label: action.payload.label || 'New Field',
        value: '',
        isDefault: false,
        sortOrder: state.birthTeam.fields.length,
      }
      return {
        ...state,
        birthTeam: {
          ...state.birthTeam,
          fields: [...state.birthTeam.fields, newField]
        },
        isDirty: true
      }
    }

    case 'REMOVE_BIRTH_TEAM_FIELD': {
      return {
        ...state,
        birthTeam: {
          ...state.birthTeam,
          fields: state.birthTeam.fields.filter(f => f.id !== action.payload.fieldId)
        },
        isDirty: true
      }
    }

    case 'RENAME_BIRTH_TEAM_FIELD': {
      const { fieldId, label } = action.payload
      return {
        ...state,
        birthTeam: {
          ...state.birthTeam,
          fields: state.birthTeam.fields.map(f =>
            f.id === fieldId ? { ...f, label } : f
          )
        },
        isDirty: true
      }
    }

    case 'SET_STANCE': {
      const { sectionId, preferenceId, stance } = action.payload
      const section = state.sections[sectionId]
      const updatedPrefs = section.preferences.map(p =>
        p.preferenceId === preferenceId ? { ...p, stance } : p
      )
      return {
        ...state,
        sections: {
          ...state.sections,
          [sectionId]: { ...section, preferences: updatedPrefs }
        },
        isDirty: true
      }
    }

    case 'SET_CUSTOM_ICON': {
      const { sectionId, preferenceId, icon } = action.payload
      const section = state.sections[sectionId]
      const updatedPrefs = section.preferences.map(p =>
        p.preferenceId === preferenceId ? { ...p, customIcon: icon } : p
      )
      return {
        ...state,
        sections: {
          ...state.sections,
          [sectionId]: { ...section, preferences: updatedPrefs }
        },
        isDirty: true
      }
    }

    case 'SET_BIRTH_TYPE':
      return { ...state, birthType: action.payload, isDirty: true }

    case 'SET_BIRTH_VENUE':
      return { ...state, birthVenue: action.payload, isDirty: true }

    case 'TOGGLE_SHOW_ALL_DECISIONS':
      return { ...state, showAllDecisions: !state.showAllDecisions }

    case 'SET_BULLET_SYMBOL':
      return { ...state, customBulletSymbol: action.payload, isDirty: true }

    case 'TOGGLE_SECTION_VISIBILITY': {
      const { sectionId } = action.payload
      const hidden = state.hiddenSections || []
      const isHidden = hidden.includes(sectionId)
      return {
        ...state,
        hiddenSections: isHidden
          ? hidden.filter(id => id !== sectionId)
          : [...hidden, sectionId],
        isDirty: true,
      }
    }

    case 'SET_PHILOSOPHY':
      return { ...state, philosophyStatement: action.payload, isDirty: true }

    case 'TOGGLE_PHILOSOPHY_VISIBILITY':
      return { ...state, showPhilosophy: !(state.showPhilosophy !== false), isDirty: true }

    case 'SET_SECTION_TITLE': {
      const { sectionId, title } = action.payload
      return {
        ...state,
        customSectionTitles: {
          ...state.customSectionTitles,
          [sectionId]: title,
        },
        isDirty: true,
      }
    }

    default:
      return state
  }
}

// Undo/redo history
const HISTORY_LIMIT = 50
const NON_UNDOABLE_ACTIONS: EditorAction['type'][] = ['LOAD_STATE', 'MARK_SAVED', 'UNDO', 'REDO', 'TOGGLE_SHOW_ALL_DECISIONS']

interface HistoryState {
  past: EditorState[]
  present: EditorState
  future: EditorState[]
}

function historyReducer(history: HistoryState, action: EditorAction): HistoryState {
  const { past, present, future } = history

  if (action.type === 'UNDO') {
    if (past.length === 0) return history
    const previous = past[past.length - 1]
    return {
      past: past.slice(0, -1),
      present: previous,
      future: [present, ...future],
    }
  }

  if (action.type === 'REDO') {
    if (future.length === 0) return history
    const next = future[0]
    return {
      past: [...past, present],
      present: next,
      future: future.slice(1),
    }
  }

  const newPresent = editorReducer(present, action)

  // Skip history for non-undoable actions or if state didn't change
  if (NON_UNDOABLE_ACTIONS.includes(action.type) || newPresent === present) {
    return { ...history, present: newPresent }
  }

  return {
    past: [...past.slice(-(HISTORY_LIMIT - 1)), present],
    present: newPresent,
    future: [],
  }
}

// Context
interface EditorContextType {
  state: EditorState
  dispatch: React.Dispatch<EditorAction>
  // Convenience methods
  setTitle: (title: string) => void
  setSubtitle: (subtitle: string) => void
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
  setBirthTeamField: (fieldId: string, value: string) => void
  addBirthTeamField: (label: string) => void
  removeBirthTeamField: (fieldId: string) => void
  renameBirthTeamField: (fieldId: string, label: string) => void
  setStance: (sectionId: EditorSectionId, preferenceId: string, stance: 'desired' | 'declined' | 'cautious' | null) => void
  setCustomIcon: (sectionId: EditorSectionId, preferenceId: string, icon: string) => void
  setBirthType: (birthType: BirthType) => void
  setBirthVenue: (venue: BirthVenue | null) => void
  toggleShowAllDecisions: () => void
  toggleSectionVisibility: (sectionId: string) => void
  setDisclaimer: (text: string) => void
  setBulletSymbol: (symbol: string | undefined) => void
  setPhilosophy: (text: string) => void
  togglePhilosophyVisibility: () => void
  setSectionTitle: (sectionId: EditorSectionId, title: string) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export function EditorProvider({ children, initialState, presetToApply, unsurePreferenceIds = [] }: { children: ReactNode; initialState?: Partial<EditorState>; presetToApply?: Record<string, string>; unsurePreferenceIds?: string[] }) {
  const [history, dispatch] = useReducer(
    historyReducer,
    {
      past: [],
      present: initialState
        ? { ...createInitialState(), ...initialState, birthTeam: migrateBirthTeam(initialState.birthTeam || createDefaultBirthTeam()) }
        : createInitialState(),
      future: [],
    }
  )
  const state = history.present

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

  const setSubtitle = useCallback((subtitle: string) =>
    dispatch({ type: 'SET_SUBTITLE', payload: subtitle }), [])

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

  const setBirthTeamField = useCallback((fieldId: string, value: string) =>
    dispatch({ type: 'SET_BIRTH_TEAM_FIELD', payload: { fieldId, value } }), [])

  const addBirthTeamField = useCallback((label: string) =>
    dispatch({ type: 'ADD_BIRTH_TEAM_FIELD', payload: { label } }), [])

  const removeBirthTeamField = useCallback((fieldId: string) =>
    dispatch({ type: 'REMOVE_BIRTH_TEAM_FIELD', payload: { fieldId } }), [])

  const renameBirthTeamField = useCallback((fieldId: string, label: string) =>
    dispatch({ type: 'RENAME_BIRTH_TEAM_FIELD', payload: { fieldId, label } }), [])

  const setStance = useCallback((sectionId: EditorSectionId, preferenceId: string, stance: 'desired' | 'declined' | 'cautious' | null) =>
    dispatch({ type: 'SET_STANCE', payload: { sectionId, preferenceId, stance } }), [])

  const setCustomIcon = useCallback((sectionId: EditorSectionId, preferenceId: string, icon: string) =>
    dispatch({ type: 'SET_CUSTOM_ICON', payload: { sectionId, preferenceId, icon } }), [])

  const setBirthType = useCallback((birthType: BirthType) =>
    dispatch({ type: 'SET_BIRTH_TYPE', payload: birthType }), [])

  const setBirthVenue = useCallback((venue: BirthVenue | null) =>
    dispatch({ type: 'SET_BIRTH_VENUE', payload: venue }), [])

  const toggleShowAllDecisions = useCallback(() =>
    dispatch({ type: 'TOGGLE_SHOW_ALL_DECISIONS' }), [])

  const toggleSectionVisibility = useCallback((sectionId: string) =>
    dispatch({ type: 'TOGGLE_SECTION_VISIBILITY', payload: { sectionId } }), [])

  const setDisclaimer = useCallback((text: string) =>
    dispatch({ type: 'SET_DISCLAIMER', payload: text }), [])

  const setBulletSymbol = useCallback((symbol: string | undefined) =>
    dispatch({ type: 'SET_BULLET_SYMBOL', payload: symbol }), [])

  const setPhilosophy = useCallback((text: string) =>
    dispatch({ type: 'SET_PHILOSOPHY', payload: text }), [])

  const togglePhilosophyVisibility = useCallback(() =>
    dispatch({ type: 'TOGGLE_PHILOSOPHY_VISIBILITY' }), [])

  const setSectionTitle = useCallback((sectionId: EditorSectionId, title: string) =>
    dispatch({ type: 'SET_SECTION_TITLE', payload: { sectionId, title } }), [])

  const undo = useCallback(() => dispatch({ type: 'UNDO' }), [])
  const redo = useCallback(() => dispatch({ type: 'REDO' }), [])
  const canUndo = history.past.length > 0
  const canRedo = history.future.length > 0

  return (
    <EditorContext.Provider value={{
      state,
      dispatch,
      setTitle,
      setSubtitle,
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
      setBirthTeamField,
      addBirthTeamField,
      removeBirthTeamField,
      renameBirthTeamField,
      setStance,
      setCustomIcon,
      setBirthType,
      setBirthVenue,
      toggleShowAllDecisions,
      toggleSectionVisibility,
      setDisclaimer,
      setBulletSymbol,
      setPhilosophy,
      togglePhilosophyVisibility,
      setSectionTitle,
      undo,
      redo,
      canUndo,
      canRedo,
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
