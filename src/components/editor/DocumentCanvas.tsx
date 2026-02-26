'use client'

import { useCallback, useState, useRef, useEffect } from 'react'
import { useEditor } from '@/lib/editor/context'
import { getPreferenceById, getPreferencesBySection } from '@/lib/editor/preferences'
import { getSectionsForBirthType } from '@/lib/editor/sections'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { templateStyles } from '@/types'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, AlertTriangle, StickyNote, Plus, EyeOff, Trash2, HelpCircle, GripVertical, FileText, AtSign } from 'lucide-react'
import { getIconComponent, IconPicker, IconGrid } from './IconPicker'
import { cn } from '@/lib/utils'
import type { EditorSectionId } from '@/lib/editor/editorTypes'
import { canvasThemes } from '@/lib/editor/canvasThemes'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SortableBulletItem } from './SortableBulletItem'

// Bullet symbol options for the customizer
const BULLET_OPTIONS = [
  { symbol: '\u2665', label: 'Heart' },
  { symbol: '\u2740', label: 'Flower' },
  { symbol: '\u2022', label: 'Bullet' },
  { symbol: '\u2726', label: 'Star' },
  { symbol: '\u2618', label: 'Leaf' },
  { symbol: '\u223C', label: 'Wave' },
  { symbol: '\u2605', label: 'Star (filled)' },
  { symbol: '\u2666', label: 'Diamond' },
  { symbol: '\u25CF', label: 'Circle' },
  { symbol: '\u2764', label: 'Red Heart' },
]

interface CanvasItem {
  sectionId: EditorSectionId
  preferenceId: string
  title: string
  birthPlanText: string
  isCustomItem?: boolean
  customItemId?: string
  icon?: string
  stance?: 'desired' | 'declined' | 'cautious' | null
  isUndecided?: boolean
  assignedTo?: string
}

interface CanvasSection {
  sectionId: EditorSectionId
  title: string
  items: CanvasItem[]
  notes: string
}

interface DocumentCanvasProps {
  onItemSelect?: (sectionId: EditorSectionId, preferenceId: string) => void
  onAddDecision?: (sectionId: EditorSectionId) => void
  selectedPreferenceId?: string | null
  readOnly?: boolean
}

// Sortable preference card wrapper for section-level reordering
function SortablePreferenceCard({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-1 group/drag">
      <div className="flex-1 min-w-0">{children}</div>
      <button
        {...attributes}
        {...listeners}
        className="flex-shrink-0 mt-1 p-0.5 opacity-0 group-hover/drag:opacity-40 hover:!opacity-100 cursor-grab active:cursor-grabbing transition-opacity"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  )
}

function bulletId(line: string, index: number): string {
  let hash = 0
  for (let i = 0; i < line.length; i++) {
    hash = ((hash << 5) - hash) + line.charCodeAt(i)
    hash |= 0
  }
  return `bullet-${hash}-${index}`
}

export function DocumentCanvas({
  onItemSelect,
  onAddDecision,
  selectedPreferenceId,
  readOnly = false,
}: DocumentCanvasProps) {
  const { state, dispatch, setTemplate, setBirthType, setBirthVenue, setBirthTeam, setBirthTeamField, addBirthTeamField, removeBirthTeamField, renameBirthTeamField, setTitle, setSubtitle, setDisclaimer, setPreference, setSectionNotes, updateCustomItem, removeCustomItem, setStance, setCustomIcon, setBulletSymbol, toggleSectionVisibility, setAssignment } = useEditor()
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set())
  const titleInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-focus title when editing starts
  useEffect(() => {
    if (editingItemId && titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }, [editingItemId])

  // DnD sensors for preference-level reorder
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // Get visible sections for the current birth type
  const visibleSections = getSectionsForBirthType(state.birthType)
  // Set of preference IDs visible for this birth type and venue
  const visiblePrefIds = new Set(
    visibleSections.flatMap(s => getPreferencesBySection(s.id, state.birthType, state.birthVenue).map(p => p.id))
  )

  // Process editor state into canvas sections with items and notes
  const sections = useCallback((): CanvasSection[] => {
    const result: CanvasSection[] = []
    const showAll = state.showAllDecisions

    visibleSections.forEach(section => {
      const sectionState = state.sections[section.id]
      if (!sectionState) return

      const items: CanvasItem[] = []

      // Process preferences (filter by birth type visibility)
      const sortedPreferences = [...sectionState.preferences]
        .filter(pref => {
          if (!visiblePrefIds.has(pref.preferenceId)) return false
          if (showAll) return true
          return !pref.isOmitted
        })
        .sort((a, b) => a.sortOrder - b.sortOrder)

      sortedPreferences.forEach(prefValue => {
        const prefDef = getPreferenceById(prefValue.preferenceId)
        if (!prefDef) return

        const isUndecided = prefValue.isOmitted || !prefValue.selectedOption

        if (isUndecided) {
          // Undecided placeholder item
          items.push({
            sectionId: section.id,
            preferenceId: prefValue.preferenceId,
            title: prefValue.customTitle || prefDef.title,
            birthPlanText: '',
            icon: prefDef.icon,
            isUndecided: true,
          })
          return
        }

        const selectedOption = prefDef.options.find(
          opt => opt.value === prefValue.selectedOption
        )

        let birthPlanText = selectedOption?.birthPlanText || ''
        if (prefValue.customText) {
          birthPlanText = prefValue.customText
        }

        if (!birthPlanText) return

        items.push({
          sectionId: section.id,
          preferenceId: prefValue.preferenceId,
          title: prefValue.customTitle || prefDef.title,
          birthPlanText,
          icon: prefValue.customIcon || prefDef.icon,
          stance: prefValue.stance,
          assignedTo: prefValue.assignedTo,
        })
      })

      // Process custom items
      sectionState.customItems
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .forEach(item => {
          items.push({
            sectionId: section.id,
            preferenceId: `custom_${item.id}`,
            title: item.title || 'Custom decision',
            birthPlanText: item.text,
            isCustomItem: true,
            customItemId: item.id,
            icon: item.customIcon,
            stance: item.stance,
            assignedTo: item.assignedTo,
          })
        })

      // Skip hidden sections
      if ((state.hiddenSections || []).includes(section.id)) return

      // Always show all active sections (empty ones get a placeholder)
      result.push({
        sectionId: section.id,
        title: section.displayTitle,
        items,
        notes: sectionState.notes || '',
      })
    })

    return result
  }, [state.sections, state.birthType, state.showAllDecisions, state.hiddenSections, visibleSections, visiblePrefIds])

  const canvasSections = sections()
  const theme = canvasThemes[state.templateStyle]
  const bulletSymbol = state.customBulletSymbol || theme.bulletSymbol || '\u2022'

  // Click to start inline editing + open sidebar
  const handleItemClick = (item: CanvasItem) => {
    setEditingItemId(item.preferenceId)
    if (onItemSelect) {
      onItemSelect(item.sectionId, item.preferenceId)
    }
  }

  // Click away to stop editing
  const handleCanvasClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    // Don't deselect if clicking inside an editable item
    if (target.closest('[data-canvas-item]')) return
    setEditingItemId(null)
  }

  // Handle inline title edit
  const handleTitleEdit = (item: CanvasItem, newTitle: string) => {
    if (item.isCustomItem && item.customItemId) {
      updateCustomItem(item.sectionId, item.customItemId, { title: newTitle })
    } else {
      setPreference(item.sectionId, item.preferenceId, { customTitle: newTitle })
    }
  }

  // Handle inline text edit
  const handleTextEdit = (item: CanvasItem, newText: string) => {
    if (item.isCustomItem && item.customItemId) {
      updateCustomItem(item.sectionId, item.customItemId, { text: newText })
    } else {
      setPreference(item.sectionId, item.preferenceId, { customText: newText })
    }
  }

  // Toggle include/omit (hide for standard, delete for custom)
  const handleToggleOmit = (item: CanvasItem) => {
    if (item.isCustomItem && item.customItemId) {
      removeCustomItem(item.sectionId, item.customItemId)
    } else {
      setPreference(item.sectionId, item.preferenceId, { isOmitted: true })
    }
    setEditingItemId(null)
  }

  // Handle icon change from picker - special stance logic for CheckCircle2/XCircle
  const handleIconChange = (item: CanvasItem, iconName: string) => {
    if (iconName === 'CheckCircle2') {
      // Set stance to desired, clear customIcon
      if (item.isCustomItem && item.customItemId) {
        updateCustomItem(item.sectionId, item.customItemId, { stance: 'desired', customIcon: undefined })
      } else {
        setStance(item.sectionId, item.preferenceId, 'desired')
        setCustomIcon(item.sectionId, item.preferenceId, '')
      }
    } else if (iconName === 'XCircle') {
      // Set stance to declined, clear customIcon
      if (item.isCustomItem && item.customItemId) {
        updateCustomItem(item.sectionId, item.customItemId, { stance: 'declined', customIcon: undefined })
      } else {
        setStance(item.sectionId, item.preferenceId, 'declined')
        setCustomIcon(item.sectionId, item.preferenceId, '')
      }
    } else if (iconName === 'AlertTriangle') {
      // Set stance to cautious, clear customIcon
      if (item.isCustomItem && item.customItemId) {
        updateCustomItem(item.sectionId, item.customItemId, { stance: 'cautious', customIcon: undefined })
      } else {
        setStance(item.sectionId, item.preferenceId, 'cautious')
        setCustomIcon(item.sectionId, item.preferenceId, '')
      }
    } else {
      // Set customIcon, clear stance
      if (item.isCustomItem && item.customItemId) {
        updateCustomItem(item.sectionId, item.customItemId, { customIcon: iconName, stance: null })
      } else {
        setCustomIcon(item.sectionId, item.preferenceId, iconName)
        setStance(item.sectionId, item.preferenceId, null)
      }
    }
  }

  // Handle preference-level drag end within a section
  const handlePreferenceDragEnd = (sectionId: EditorSectionId, event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const sectionState = state.sections[sectionId]
    const sortedPrefs = [...sectionState.preferences].sort((a, b) => a.sortOrder - b.sortOrder)
    const oldIndex = sortedPrefs.findIndex(p => p.preferenceId === active.id)
    const newIndex = sortedPrefs.findIndex(p => p.preferenceId === over.id)

    if (oldIndex === -1 || newIndex === -1) return

    const newOrder = [...sortedPrefs]
    const [moved] = newOrder.splice(oldIndex, 1)
    newOrder.splice(newIndex, 0, moved)

    dispatch({
      type: 'REORDER_PREFERENCES',
      payload: { sectionId, preferenceIds: newOrder.map(p => p.preferenceId) },
    })
  }

  // Handle bullet-level reorder within a preference's multi-line text
  const handleBulletReorder = (item: CanvasItem, lines: string[], oldIndex: number, newIndex: number) => {
    const newLines = [...lines]
    const [moved] = newLines.splice(oldIndex, 1)
    newLines.splice(newIndex, 0, moved)
    handleTextEdit(item, newLines.join('\n'))
  }

  // Read-only rendering: no interactive elements, no drag handles, no toolbar
  if (readOnly) {
    // Filter out undecided items in readOnly mode
    const readOnlySections = canvasSections
      .map(section => ({
        ...section,
        items: section.items.filter(item => !item.isUndecided && item.birthPlanText),
      }))
      .filter(section => section.items.length > 0 || section.notes)

    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8 pb-32 md:pb-8">
          <div
            className="max-w-[650px] mx-auto shadow-lg rounded-sm relative overflow-hidden"
            style={{
              backgroundColor: theme.backgroundColor,
              backgroundImage: theme.backgroundPattern || undefined,
            }}
          >
            {/* Decorative corner SVGs */}
            {theme.cornerSvg?.topLeft && (
              <div className="absolute top-0 left-0 pointer-events-none" dangerouslySetInnerHTML={{ __html: theme.cornerSvg.topLeft }} />
            )}
            {theme.cornerSvg?.topRight && (
              <div className="absolute top-0 right-0 pointer-events-none" dangerouslySetInnerHTML={{ __html: theme.cornerSvg.topRight }} />
            )}
            {theme.cornerSvg?.bottomLeft && (
              <div className="absolute bottom-0 left-0 pointer-events-none" dangerouslySetInnerHTML={{ __html: theme.cornerSvg.bottomLeft }} />
            )}
            {theme.cornerSvg?.bottomRight && (
              <div className="absolute bottom-0 right-0 pointer-events-none" dangerouslySetInnerHTML={{ __html: theme.cornerSvg.bottomRight }} />
            )}
            <div
              className="p-8 md:p-12"
              style={{ fontFamily: theme.fontFamily, color: theme.textColor }}
            >
              {/* Header */}
              <div
                className="text-center pb-6 mb-8 border-b-2"
                style={{ borderColor: theme.borderColor }}
              >
                <h1 className="text-2xl md:text-3xl font-bold">
                  {state.title || 'Birth Plan'}
                </h1>
                {state.subtitle && (
                  <p className="text-sm md:text-base mt-1" style={{ opacity: 0.65 }}>
                    {state.subtitle}
                  </p>
                )}
                {state.birthTeam.fields.length > 0 && state.birthTeam.fields[0].value && (
                  <p className="text-base text-muted-foreground mt-1">
                    {state.birthTeam.fields[0].value}
                  </p>
                )}

                {/* Birth team info */}
                {state.birthTeam.fields.slice(1).some(f => f.value) && (
                  <div
                    className="mt-4 p-4 rounded-md text-sm text-left space-y-1"
                    style={{ backgroundColor: theme.sectionHeaderBg }}
                  >
                    {state.birthTeam.fields.slice(1).filter(f => f.id !== 'medical_notes').map(field => (
                      field.value ? (
                        <div key={field.id} className="flex gap-2">
                          <span className="font-semibold text-xs uppercase tracking-wide" style={{ opacity: 0.5 }}>
                            {field.label}
                          </span>
                          <span>{field.value}</span>
                        </div>
                      ) : null
                    ))}
                    {state.birthTeam.due_date && (
                      <div className="flex gap-2">
                        <span className="font-semibold text-xs uppercase tracking-wide" style={{ opacity: 0.5 }}>
                          Due date
                        </span>
                        <span>{state.birthTeam.due_date}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Philosophy Statement */}
              {(state.showPhilosophy !== false) && state.philosophyStatement && (
                <div className="mb-6" style={{ fontFamily: theme.fontFamily }}>
                  <p className="text-sm italic leading-relaxed" style={{ color: theme.textColor, opacity: 0.85 }}>
                    {state.philosophyStatement}
                  </p>
                </div>
              )}

              {/* Medical Notes - after philosophy */}
              {(() => {
                const medField = state.birthTeam.fields.find(f => f.id === 'medical_notes')
                if (!medField || !medField.value) return null
                return (
                  <div className="mb-6">
                    <div className="space-y-1">
                      <span className="font-semibold text-xs uppercase tracking-wide" style={{ opacity: 0.5 }}>
                        Medical Notes
                      </span>
                      <p className="text-sm" style={{ opacity: 0.85 }}>{medField.value}</p>
                    </div>
                  </div>
                )
              })()}

              {/* Content Sections */}
              {readOnlySections.map((section) => (
                <div key={section.sectionId} className="mb-8">
                  <h2
                    className="text-lg font-semibold pb-2 mb-4 border-b px-1"
                    style={{ color: theme.primaryColor, borderColor: theme.borderColor, backgroundColor: theme.sectionHeaderBg }}
                  >
                    {state.customSectionTitles?.[section.sectionId] || section.title}
                  </h2>

                  <div className="space-y-4">
                    {section.items.map((item) => {
                      const ItemIcon = getIconComponent(item.icon || 'Circle')
                      const lines = item.birthPlanText.split('\n').filter(Boolean)
                      const isMultiLine = lines.length > 1

                      return (
                        <div key={item.preferenceId} className="pl-3 border-l-2 border-transparent">
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5 flex-shrink-0">
                              {item.stance === 'desired' ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : item.stance === 'declined' ? (
                                <XCircle className="w-5 h-5 text-red-500" />
                              ) : item.stance === 'cautious' ? (
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                              ) : (
                                <ItemIcon className="w-5 h-5" style={{ color: theme.primaryColor }} />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <p className="font-semibold text-sm" style={{ color: theme.textColor }}>
                                  {item.title}
                                </p>
                                {item.assignedTo && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                                    @{item.assignedTo}
                                  </span>
                                )}
                              </div>
                              {isMultiLine ? (
                                <ul className="list-none space-y-0.5 pl-0">
                                  {lines.map((line, i) => (
                                    <li key={i} className="text-sm leading-relaxed flex items-start gap-1.5">
                                      <span className="flex-shrink-0 mt-0.5" style={{ color: theme.primaryColor }}>
                                        {bulletSymbol}
                                      </span>
                                      <span style={{ color: theme.textColor, opacity: 0.85 }}>{line}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm leading-relaxed" style={{ color: theme.textColor, opacity: 0.85 }}>
                                  {item.birthPlanText}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Section notes */}
                  {section.notes && (
                    <div
                      className="mt-2 rounded-lg border border-dashed p-3 flex items-start gap-2"
                      style={{ borderColor: `${theme.primaryColor}30`, backgroundColor: theme.sectionHeaderBg }}
                    >
                      <StickyNote className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: theme.primaryColor, opacity: 0.5 }} />
                      <p className="text-sm" style={{ color: theme.textColor, opacity: 0.75 }}>
                        {section.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Empty State */}
              {readOnlySections.length === 0 && (
                <div className="text-center py-12" style={{ color: theme.textColor, opacity: 0.6 }}>
                  <p>Your birth plan is empty.</p>
                  <p className="text-sm mt-1">Add decisions to see a preview.</p>
                </div>
              )}

              {/* Disclaimer */}
              {state.disclaimerText && (
                <div
                  className="mt-8 p-4 rounded-md text-xs leading-relaxed"
                  style={{ backgroundColor: theme.sectionHeaderBg, opacity: 0.8 }}
                >
                  {state.disclaimerText}
                </div>
              )}

              {/* Footer */}
              <div className="mt-6 text-center text-xs" style={{ color: theme.textColor, opacity: 0.5 }}>
                Created with Birth Plan Builder | birthplanbuilder.com
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Canvas Header - theme selector + birth type toggle */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-3 p-3 border-b bg-white/95 backdrop-blur">
        {/* Theme selector - desktop: button row */}
        <div className="hidden md:flex items-center gap-1.5 flex-wrap">
          {templateStyles.map((t) => {
            const themeColor = canvasThemes[t.id]?.primaryColor
            return (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-md transition-all text-[10px] leading-tight',
                  state.templateStyle === t.id
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'hover:bg-gray-100'
                )}
              >
                <span
                  className="w-4 h-4 rounded-full border border-black/10"
                  style={{ backgroundColor: themeColor }}
                />
                <span className="text-muted-foreground">{t.name}</span>
              </button>
            )
          })}
        </div>

        {/* Theme selector - mobile: dropdown */}
        <div className="md:hidden">
          <Select value={state.templateStyle} onValueChange={setTemplate}>
            <SelectTrigger className="w-[140px] min-h-[36px] text-sm">
              <SelectValue placeholder="Template" />
            </SelectTrigger>
            <SelectContent>
              {templateStyles.map((t) => {
                const themeColor = canvasThemes[t.id]?.primaryColor
                return (
                  <SelectItem key={t.id} value={t.id}>
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                        style={{ backgroundColor: themeColor }}
                      />
                      {t.name}
                    </span>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Bullet symbol picker */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                'h-8 w-8 rounded-md border flex items-center justify-center text-base transition-colors',
                'hover:bg-gray-100 border-gray-200'
              )}
              title="Bullet symbol"
            >
              {bulletSymbol}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <p className="text-xs font-medium text-muted-foreground mb-2">Bullet symbol</p>
            <div className="grid grid-cols-5 gap-1">
              {BULLET_OPTIONS.map(({ symbol, label }) => (
                <button
                  key={symbol}
                  onClick={() => setBulletSymbol(symbol === (theme.bulletSymbol || '\u2022') ? undefined : symbol)}
                  className={cn(
                    'h-8 w-8 rounded flex items-center justify-center text-base transition-colors',
                    'hover:bg-muted',
                    bulletSymbol === symbol && 'bg-primary/10 ring-1 ring-primary'
                  )}
                  title={label}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Separator */}
        <div className="hidden md:block w-px h-6 bg-gray-200" />

        {/* Birth type toggle */}
        <div className="flex items-center gap-1.5">
          <Button
            variant={state.birthType === 'vaginal' ? 'default' : 'outline'}
            className="h-8 text-xs px-3"
            onClick={() => setBirthType('vaginal')}
          >
            Vaginal Birth
          </Button>
          <Button
            variant={state.birthType === 'planned_csection' ? 'default' : 'outline'}
            className="h-8 text-xs px-3"
            onClick={() => setBirthType('planned_csection')}
          >
            C-Section
          </Button>
        </div>

        {/* Venue sub-selector - only when vaginal */}
        {state.birthType === 'vaginal' && (
          <div className="flex items-center gap-1">
            {([
              { value: 'hospital', label: 'Hospital' },
              { value: 'birth_center', label: 'Birth Center' },
              { value: 'home', label: 'Home' },
            ] as const).map((venue) => (
              <button
                key={venue.value}
                onClick={() => setBirthVenue(venue.value)}
                className={cn(
                  'h-7 px-2.5 text-xs rounded-full border transition-colors',
                  state.birthVenue === venue.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-white text-muted-foreground border-gray-200 hover:border-gray-300 hover:text-foreground'
                )}
              >
                {venue.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Document Canvas */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8 pb-32 md:pb-8" onClick={handleCanvasClick}>
        <div
          className="max-w-[650px] mx-auto shadow-lg rounded-sm relative overflow-hidden"
          style={{
            backgroundColor: theme.backgroundColor,
            backgroundImage: theme.backgroundPattern || undefined,
          }}
        >
          {/* Decorative corner SVGs */}
          {theme.cornerSvg?.topLeft && (
            <div className="absolute top-0 left-0 pointer-events-none" dangerouslySetInnerHTML={{ __html: theme.cornerSvg.topLeft }} />
          )}
          {theme.cornerSvg?.topRight && (
            <div className="absolute top-0 right-0 pointer-events-none" dangerouslySetInnerHTML={{ __html: theme.cornerSvg.topRight }} />
          )}
          {theme.cornerSvg?.bottomLeft && (
            <div className="absolute bottom-0 left-0 pointer-events-none" dangerouslySetInnerHTML={{ __html: theme.cornerSvg.bottomLeft }} />
          )}
          {theme.cornerSvg?.bottomRight && (
            <div className="absolute bottom-0 right-0 pointer-events-none" dangerouslySetInnerHTML={{ __html: theme.cornerSvg.bottomRight }} />
          )}
          {/* Document Content */}
          <div
            className="p-8 md:p-12"
            style={{
              fontFamily: theme.fontFamily,
              color: theme.textColor
            }}
          >
            {/* Header */}
            <div
              className="text-center pb-6 mb-8 border-b-2"
              style={{ borderColor: theme.borderColor }}
            >
              {/* Editable Title */}
              <Input
                value={state.title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl md:text-3xl font-bold text-center border-0 bg-transparent focus:ring-0 focus:bg-gray-50 rounded"
                placeholder="Birth Plan"
              />

              {/* Subtitle */}
              <Input
                value={state.subtitle || ''}
                onChange={(e) => setSubtitle(e.target.value)}
                className="text-sm md:text-base text-center border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                style={{ fontFamily: theme.fontFamily, color: theme.textColor, opacity: 0.65 }}
                placeholder="Subtitle (optional)"
              />

              {/* Primary name from first birth team field */}
              {state.birthTeam.fields.length > 0 && (
                <Input
                  value={state.birthTeam.fields[0].value}
                  onChange={(e) => setBirthTeamField(state.birthTeam.fields[0].id, e.target.value)}
                  className="text-base text-center text-muted-foreground border-0 bg-transparent focus:ring-0 focus:bg-gray-50 rounded mt-1"
                  placeholder={state.birthTeam.fields[0].label}
                />
              )}

              {/* Dynamic Birth Team fields */}
              <div
                className="mt-4 p-4 rounded-md text-sm text-left space-y-2"
                style={{ backgroundColor: theme.sectionHeaderBg }}
              >
                {state.birthTeam.fields.slice(1).filter(f => f.id !== 'medical_notes').map(field => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input
                      value={field.label}
                      onChange={(e) => renameBirthTeamField(field.id, e.target.value)}
                      className="h-6 w-20 flex-shrink-0 text-xs uppercase tracking-wide font-semibold border-0 bg-transparent focus:ring-0 focus:bg-white/50 rounded px-0"
                      style={{ color: theme.textColor, opacity: 0.5 }}
                    />
                    <Input
                      value={field.value}
                      onChange={(e) => setBirthTeamField(field.id, e.target.value)}
                      className="h-8 text-sm border-0 bg-transparent focus:ring-0 focus:bg-white/50 rounded px-2"
                      placeholder={`${field.label}'s name`}
                      style={{ color: theme.textColor }}
                    />
                    <button
                      onClick={() => removeBirthTeamField(field.id)}
                      className="text-xs text-muted-foreground hover:text-red-500 transition-colors px-1"
                      title="Remove field"
                    >
                      x
                    </button>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <span className="font-semibold w-20 flex-shrink-0 text-xs uppercase tracking-wide" style={{ color: theme.textColor, opacity: 0.5 }}>Due date</span>
                  <Input
                    type="date"
                    value={state.birthTeam.due_date || ''}
                    onChange={(e) => setBirthTeam({ due_date: e.target.value })}
                    className="h-8 text-sm border-0 bg-transparent focus:ring-0 focus:bg-white/50 rounded px-2"
                    style={{ color: theme.textColor }}
                  />
                </div>
                <button
                  onClick={() => addBirthTeamField('New Field')}
                  className="text-xs text-primary hover:text-primary/80 transition-colors mt-1"
                >
                  + Add field
                </button>
              </div>
            </div>

            {/* Philosophy Statement - Restore button */}
            {(!state.philosophyStatement || state.showPhilosophy === false) && (
              <button
                onClick={() => {
                  if (!state.philosophyStatement) {
                    dispatch({ type: 'SET_PHILOSOPHY', payload: 'Add your philosophy statement here...' })
                  }
                  if (state.showPhilosophy === false) {
                    dispatch({ type: 'TOGGLE_PHILOSOPHY_VISIBILITY' })
                  }
                }}
                className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors py-1"
              >
                <FileText className="w-3.5 h-3.5" />
                Add philosophy statement
              </button>
            )}

            {/* Philosophy Statement */}
            {(state.showPhilosophy !== false) && state.philosophyStatement && (
              <div className="mb-6 relative group" style={{ fontFamily: theme.fontFamily }}>
                <textarea
                  value={state.philosophyStatement}
                  onChange={(e) => dispatch({ type: 'SET_PHILOSOPHY', payload: e.target.value })}
                  className="w-full text-sm italic leading-relaxed bg-transparent border border-dashed rounded-lg p-3 focus:outline-none focus:border-primary resize-none"
                  style={{ color: theme.textColor, borderColor: `${theme.primaryColor}30`, opacity: 0.85 }}
                  rows={3}
                />
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_PHILOSOPHY_VISIBILITY' })}
                  className="absolute top-1 right-1 p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Hide philosophy statement"
                >
                  <EyeOff className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Medical Notes - collapsible, after philosophy */}
            {(() => {
              const medField = state.birthTeam.fields.find(f => f.id === 'medical_notes')
              if (!medField) return null
              const hasContent = !!medField.value
              return (
                <div className="mt-4 mb-6">
                  {!hasContent ? (
                    <button
                      onClick={() => {
                        setBirthTeamField('medical_notes', ' ')
                      }}
                      className="text-xs flex items-center gap-1.5 transition-opacity"
                      style={{ color: theme.primaryColor, opacity: 0.5 }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
                    >
                      <StickyNote className="w-3.5 h-3.5" /> + Add medical notes
                    </button>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs uppercase tracking-wide" style={{ color: theme.textColor, opacity: 0.5 }}>
                          Medical Notes
                        </span>
                        <button
                          onClick={() => setBirthTeamField('medical_notes', '')}
                          className="text-xs text-muted-foreground hover:text-red-500 transition-colors"
                          title="Remove medical notes"
                        >
                          x
                        </button>
                      </div>
                      <textarea
                        value={medField.value.trim() ? medField.value : ''}
                        onChange={(e) => setBirthTeamField('medical_notes', e.target.value)}
                        className="w-full text-sm bg-transparent border border-dashed rounded-lg p-2 focus:outline-none focus:border-primary resize-none"
                        style={{ color: theme.textColor, borderColor: `${theme.primaryColor}30` }}
                        placeholder="Medical conditions, allergies, or important notes for your care team..."
                        rows={Math.min(Math.max(Math.ceil((medField.value || '').length / 60), 2), 6)}
                      />
                    </div>
                  )}
                </div>
              )
            })()}

            {/* Content Sections */}
            {canvasSections.map((section) => {
              // Build the list of sortable IDs for this section (preference IDs only, not custom)
              const sortableItemIds = section.items
                .filter(item => !item.isCustomItem)
                .map(item => item.preferenceId)

              return (
                <div key={section.sectionId} className="mb-8">
                  <input
                    type="text"
                    value={state.customSectionTitles?.[section.sectionId] || section.title}
                    onChange={(e) => dispatch({ type: 'SET_SECTION_TITLE', payload: { sectionId: section.sectionId, title: e.target.value } })}
                    onBlur={(e) => {
                      if (!e.target.value.trim()) dispatch({ type: 'SET_SECTION_TITLE', payload: { sectionId: section.sectionId, title: e.target.value || section.title } })
                    }}
                    className="text-lg font-semibold pb-2 mb-4 border-b w-full bg-transparent focus:outline-none focus:bg-white/50 rounded px-1"
                    style={{ color: theme.primaryColor, borderColor: theme.borderColor, backgroundColor: theme.sectionHeaderBg }}
                  />

                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(event) => handlePreferenceDragEnd(section.sectionId, event)}
                  >
                    <SortableContext
                      items={sortableItemIds}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-4">
                        {section.items.length === 0 && !section.notes && (
                          <div
                            className="relative text-center py-6 border border-dashed rounded-lg"
                            style={{ borderColor: `${theme.primaryColor}25`, color: theme.textColor, opacity: 0.5 }}
                          >
                            <button
                              onClick={() => toggleSectionVisibility(section.sectionId)}
                              className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 transition-colors"
                              title="Hide this section"
                            >
                              <EyeOff className="w-3.5 h-3.5" />
                            </button>
                            <p className="text-sm">No decisions made yet</p>
                            <p className="text-xs mt-1">Take the quiz or add preferences from the sidebar</p>
                          </div>
                        )}
                        {section.items.map((item) => {
                          const ItemIcon = getIconComponent(item.icon || 'Circle')
                          const isEditing = editingItemId === item.preferenceId
                          const lines = item.birthPlanText ? item.birthPlanText.split('\n').filter(Boolean) : []
                          const isMultiLine = lines.length > 1

                          // Undecided items get a distinct placeholder appearance
                          if (item.isUndecided) {
                            return (
                              <SortablePreferenceCard key={item.preferenceId} id={item.preferenceId}>
                                <div
                                  data-canvas-item
                                  className={cn(
                                    'group pl-3 border-l-2 border-dashed transition-all cursor-pointer',
                                    selectedPreferenceId === item.preferenceId
                                      ? 'py-1'
                                      : ''
                                  )}
                                  style={{
                                    borderColor: selectedPreferenceId === item.preferenceId
                                      ? `${theme.primaryColor}80`
                                      : `${theme.primaryColor}25`,
                                    opacity: 0.55,
                                  }}
                                  onClick={() => handleItemClick(item)}
                                >
                                  <div className="flex items-start gap-2">
                                    <div className="mt-0.5 flex-shrink-0">
                                      <HelpCircle className="w-5 h-5" style={{ color: theme.primaryColor }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-sm" style={{ color: theme.textColor }}>
                                        {item.title}
                                      </p>
                                      <p className="text-xs italic" style={{ color: theme.textColor, opacity: 0.6 }}>
                                        Click to set your preference
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </SortablePreferenceCard>
                            )
                          }

                          // Render the icon portion - with Popover for editing mode
                          const iconElement = (
                            <div className="mt-0.5 flex-shrink-0">
                              {item.stance === 'desired' ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : item.stance === 'declined' ? (
                                <XCircle className="w-5 h-5 text-red-500" />
                              ) : item.stance === 'cautious' ? (
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                              ) : (
                                <ItemIcon className="w-5 h-5" style={{ color: theme.primaryColor }} />
                              )}
                            </div>
                          )

                          const cardContent = (
                            <div
                              data-canvas-item
                              className={cn(
                                'group pl-3 border-l-2 transition-all cursor-pointer relative min-h-[48px]',
                                isEditing
                                  ? 'py-1'
                                  : selectedPreferenceId === item.preferenceId
                                    ? 'py-1'
                                    : 'border-transparent'
                              )}
                              style={{
                                borderColor: isEditing || selectedPreferenceId === item.preferenceId
                                  ? `${theme.primaryColor}80`
                                  : 'transparent',
                                backgroundColor: isEditing || selectedPreferenceId === item.preferenceId
                                  ? theme.sectionHeaderBg
                                  : 'transparent'
                              }}
                              onClick={() => handleItemClick(item)}
                            >
                              {/* Omit/remove button - visible when editing */}
                              {isEditing && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleToggleOmit(item) }}
                                  className="absolute -right-1 top-0 p-1.5 rounded bg-white shadow-sm border text-muted-foreground hover:text-red-500 transition-colors z-10"
                                  title={item.isCustomItem ? 'Delete custom decision' : 'Remove from plan'}
                                >
                                  {item.isCustomItem ? <Trash2 className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                              )}

                              <div className="flex items-start gap-2">
                                {/* Stance indicator or icon - clickable in edit mode */}
                                {isEditing ? (
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <button
                                        className="cursor-pointer hover:scale-110 transition-transform"
                                      >
                                        {iconElement}
                                      </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[280px] p-3" onClick={(e) => e.stopPropagation()}>
                                      <IconGrid value={item.icon} onChange={(iconName) => handleIconChange(item, iconName)} />
                                    </PopoverContent>
                                  </Popover>
                                ) : (
                                  iconElement
                                )}

                                <div className="flex-1 min-w-0">
                                  {isEditing ? (
                                    <>
                                      <div className="flex items-center gap-1.5 mb-1">
                                        <input
                                          ref={titleInputRef}
                                          type="text"
                                          value={item.title}
                                          onChange={(e) => handleTitleEdit(item, e.target.value)}
                                          onClick={(e) => e.stopPropagation()}
                                          className="flex-1 min-w-0 font-semibold text-sm bg-transparent border-0 border-b border-dashed border-gray-300 focus:border-primary focus:outline-none rounded-none px-0 py-0.5"
                                          style={{ color: theme.textColor }}
                                          placeholder={item.isCustomItem ? 'Decision title' : undefined}
                                        />
                                        {item.assignedTo && (
                                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium flex-shrink-0">
                                            @{item.assignedTo}
                                          </span>
                                        )}
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <button
                                              onClick={(e) => e.stopPropagation()}
                                              className="flex-shrink-0 p-0.5 rounded hover:bg-gray-100 transition-opacity opacity-60 hover:opacity-100"
                                              title="Assign to team member"
                                            >
                                              <AtSign className="w-3 h-3 text-muted-foreground" />
                                            </button>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-48 p-1" align="end" onClick={(e) => e.stopPropagation()}>
                                            <p className="text-xs font-medium text-muted-foreground px-2 py-1.5">Assign to</p>
                                            {state.birthTeam.fields
                                              .filter(f => f.value.trim())
                                              .map(f => (
                                                <button
                                                  key={f.id}
                                                  onClick={() => setAssignment(
                                                    item.sectionId,
                                                    item.isCustomItem && item.customItemId ? item.customItemId : item.preferenceId,
                                                    f.label,
                                                    item.isCustomItem
                                                  )}
                                                  className={cn(
                                                    'w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted transition-colors',
                                                    item.assignedTo === f.label && 'bg-primary/5 text-primary'
                                                  )}
                                                >
                                                  {f.value} <span className="text-muted-foreground text-xs">({f.label})</span>
                                                </button>
                                              ))
                                            }
                                            {item.assignedTo && (
                                              <>
                                                <div className="border-t my-1" />
                                                <button
                                                  onClick={() => setAssignment(
                                                    item.sectionId,
                                                    item.isCustomItem && item.customItemId ? item.customItemId : item.preferenceId,
                                                    null,
                                                    item.isCustomItem
                                                  )}
                                                  className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted transition-colors text-red-500"
                                                >
                                                  Remove assignment
                                                </button>
                                              </>
                                            )}
                                          </PopoverContent>
                                        </Popover>
                                      </div>
                                      {isMultiLine ? (
                                        <div className="space-y-1">
                                          <DndContext
                                            key={item.birthPlanText}
                                            sensors={sensors}
                                            collisionDetection={closestCenter}
                                            onDragEnd={(event) => {
                                              const { active, over } = event
                                              if (!over || active.id === over.id) return
                                              const oldIdx = lines.findIndex((line, i) => bulletId(line, i) === active.id)
                                              const newIdx = lines.findIndex((line, i) => bulletId(line, i) === over.id)
                                              if (oldIdx !== -1 && newIdx !== -1) {
                                                handleBulletReorder(item, lines, oldIdx, newIdx)
                                              }
                                            }}
                                          >
                                            <SortableContext
                                              items={lines.map((line, i) => bulletId(line, i))}
                                              strategy={verticalListSortingStrategy}
                                            >
                                              {lines.map((line, i) => (
                                                <SortableBulletItem key={bulletId(line, i)} id={bulletId(line, i)}>
                                                  <div className="flex items-center gap-1.5">
                                                    <span className="flex-shrink-0" style={{ color: theme.primaryColor }}>
                                                      {bulletSymbol}
                                                    </span>
                                                    <input
                                                      type="text"
                                                      value={line}
                                                      onChange={(e) => {
                                                        const newLines = [...lines]
                                                        newLines[i] = e.target.value
                                                        handleTextEdit(item, newLines.join('\n'))
                                                      }}
                                                      onClick={(e) => e.stopPropagation()}
                                                      className="flex-1 text-sm bg-transparent border-0 border-b border-dashed border-muted-foreground/30 p-0 focus:outline-none focus:border-primary"
                                                      style={{ fontFamily: theme.fontFamily, color: theme.textColor }}
                                                    />
                                                  </div>
                                                </SortableBulletItem>
                                              ))}
                                            </SortableContext>
                                          </DndContext>
                                          {/* Add new bullet button */}
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              handleTextEdit(item, [...lines, 'New item'].join('\n'))
                                            }}
                                            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 ml-5"
                                          >
                                            + Add bullet point
                                          </button>
                                        </div>
                                      ) : (
                                        <textarea
                                          ref={textareaRef}
                                          value={item.birthPlanText}
                                          onChange={(e) => handleTextEdit(item, e.target.value)}
                                          onClick={(e) => e.stopPropagation()}
                                          className="w-full text-sm leading-relaxed bg-transparent border-0 border-b border-dashed border-gray-300 focus:border-primary focus:outline-none resize-none rounded-none px-0 py-0.5 min-h-[40px]"
                                          style={{ color: theme.textColor, opacity: 0.85 }}
                                          rows={2}
                                          placeholder={item.isCustomItem ? 'What would you like your birth plan to say?' : undefined}
                                        />
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <div className="flex items-center gap-1.5 mb-0.5">
                                        <p
                                          className="font-semibold text-sm"
                                          style={{ color: theme.textColor }}
                                        >
                                          {item.title}
                                        </p>
                                        {item.assignedTo && (
                                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                                            @{item.assignedTo}
                                          </span>
                                        )}
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <button
                                              onClick={(e) => e.stopPropagation()}
                                              className={cn(
                                                'ml-auto flex-shrink-0 p-0.5 rounded hover:bg-gray-100 transition-opacity',
                                                item.assignedTo ? 'opacity-60 hover:opacity-100' : 'opacity-0 group-hover:opacity-100'
                                              )}
                                              title="Assign to team member"
                                            >
                                              <AtSign className="w-3 h-3 text-muted-foreground" />
                                            </button>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-48 p-1" align="end" onClick={(e) => e.stopPropagation()}>
                                            <p className="text-xs font-medium text-muted-foreground px-2 py-1.5">Assign to</p>
                                            {state.birthTeam.fields
                                              .filter(f => f.value.trim())
                                              .map(f => (
                                                <button
                                                  key={f.id}
                                                  onClick={() => setAssignment(
                                                    item.sectionId,
                                                    item.isCustomItem && item.customItemId ? item.customItemId : item.preferenceId,
                                                    f.label,
                                                    item.isCustomItem
                                                  )}
                                                  className={cn(
                                                    'w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted transition-colors',
                                                    item.assignedTo === f.label && 'bg-primary/5 text-primary'
                                                  )}
                                                >
                                                  {f.value} <span className="text-muted-foreground text-xs">({f.label})</span>
                                                </button>
                                              ))
                                            }
                                            {item.assignedTo && (
                                              <>
                                                <div className="border-t my-1" />
                                                <button
                                                  onClick={() => setAssignment(
                                                    item.sectionId,
                                                    item.isCustomItem && item.customItemId ? item.customItemId : item.preferenceId,
                                                    null,
                                                    item.isCustomItem
                                                  )}
                                                  className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted transition-colors text-red-500"
                                                >
                                                  Remove assignment
                                                </button>
                                              </>
                                            )}
                                          </PopoverContent>
                                        </Popover>
                                      </div>
                                      {item.birthPlanText && (
                                        isMultiLine ? (
                                          <ul className="list-none space-y-0.5 pl-0">
                                            {lines.map((line, i) => (
                                              <li key={i} className="text-sm leading-relaxed flex items-start gap-1.5">
                                                <span className="flex-shrink-0 mt-0.5" style={{ color: theme.primaryColor }}>
                                                  {bulletSymbol}
                                                </span>
                                                <span style={{ color: theme.textColor, opacity: 0.85 }}>{line}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        ) : (
                                          <p className="text-sm leading-relaxed" style={{ color: theme.textColor, opacity: 0.85 }}>
                                            {item.birthPlanText}
                                          </p>
                                        )
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          )

                          // Wrap in sortable container (only standard prefs are sortable at section level)
                          if (!item.isCustomItem) {
                            return (
                              <SortablePreferenceCard key={item.preferenceId} id={item.preferenceId}>
                                {cardContent}
                              </SortablePreferenceCard>
                            )
                          }

                          return <div key={item.preferenceId}>{cardContent}</div>
                        })}
                      </div>
                    </SortableContext>
                  </DndContext>

                  {/* Add decision button */}
                  {onAddDecision && (
                    <button
                      onClick={() => onAddDecision(section.sectionId)}
                      className="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add decision
                    </button>
                  )}

                  {/* Section notes - hidden by default, shown when expanded or has content */}
                  {(section.notes || expandedNotes.has(section.sectionId)) ? (
                    <div
                      className="mt-2 rounded-lg border border-dashed p-3 flex items-start gap-2"
                      style={{ borderColor: `${theme.primaryColor}30`, backgroundColor: `${theme.sectionHeaderBg}` }}
                      data-canvas-item
                    >
                      <StickyNote className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: theme.primaryColor, opacity: 0.5 }} />
                      <textarea
                        value={section.notes}
                        onChange={(e) => setSectionNotes(section.sectionId, e.target.value)}
                        className="w-full text-sm bg-transparent border-0 resize-none focus:ring-0 focus:outline-none min-h-[24px]"
                        style={{ color: theme.textColor, opacity: 0.75 }}
                        placeholder="Add notes for this section..."
                        rows={2}
                        autoFocus={!section.notes}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement
                          target.style.height = 'auto'
                          target.style.height = target.scrollHeight + 'px'
                        }}
                        onBlur={() => {
                          if (!section.notes) {
                            setExpandedNotes(prev => {
                              const next = new Set(prev)
                              next.delete(section.sectionId)
                              return next
                            })
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => setExpandedNotes(prev => {
                        const next = new Set(prev)
                        next.add(section.sectionId)
                        return next
                      })}
                      className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      <StickyNote className="w-3.5 h-3.5" />
                      Add note
                    </button>
                  )}
                </div>
              )
            })}

            {/* Empty State */}
            {canvasSections.length === 0 && (
              <div className="text-center py-12" style={{ color: theme.textColor, opacity: 0.6 }}>
                <p>Your birth plan is empty.</p>
                <p className="text-sm mt-1">Use the options panel to add decisions.</p>
              </div>
            )}

            {/* Editable Disclaimer */}
            <div
              className="mt-8 p-4 rounded-md"
              style={{
                backgroundColor: theme.sectionHeaderBg,
              }}
            >
              <textarea
                value={state.disclaimerText}
                onChange={(e) => setDisclaimer(e.target.value)}
                className="w-full text-xs leading-relaxed bg-transparent border-0 resize-none focus:ring-0 focus:outline-none min-h-[60px]"
                style={{ color: theme.textColor, opacity: 0.8 }}
                placeholder="Add a disclaimer or note for your care team..."
              />
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-xs" style={{ color: theme.textColor, opacity: 0.5 }}>
              Created with Birth Plan Builder | birthplanbuilder.com
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
