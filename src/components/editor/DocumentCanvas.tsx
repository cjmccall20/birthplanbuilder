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
import { templateStyles } from '@/types'
import { CheckCircle2, XCircle, StickyNote, Plus, EyeOff, Trash2, HelpCircle } from 'lucide-react'
import { getIconComponent } from './IconPicker'
import { cn } from '@/lib/utils'
import type { EditorSectionId } from '@/lib/editor/editorTypes'
import { canvasThemes } from '@/lib/editor/canvasThemes'

interface CanvasItem {
  sectionId: EditorSectionId
  preferenceId: string
  title: string
  birthPlanText: string
  isCustomItem?: boolean
  customItemId?: string
  icon?: string
  stance?: 'desired' | 'declined' | null
  isUndecided?: boolean
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
}

export function DocumentCanvas({
  onItemSelect,
  onAddDecision,
  selectedPreferenceId,
}: DocumentCanvasProps) {
  const { state, setTemplate, setBirthTeam, setBirthTeamField, addBirthTeamField, removeBirthTeamField, renameBirthTeamField, setTitle, setDisclaimer, setPreference, setSectionNotes, updateCustomItem, removeCustomItem } = useEditor()
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

  // Get visible sections for the current birth type
  const visibleSections = getSectionsForBirthType(state.birthType)
  // Set of preference IDs visible for this birth type
  const visiblePrefIds = new Set(
    visibleSections.flatMap(s => getPreferencesBySection(s.id, state.birthType).map(p => p.id))
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
          })
        })

      // Show section if it has items, custom items, notes, or we're in show-all mode
      if (items.length > 0 || sectionState.customItems.length > 0 || sectionState.notes) {
        result.push({
          sectionId: section.id,
          title: section.displayTitle,
          items,
          notes: sectionState.notes || '',
        })
      }
    })

    return result
  }, [state.sections, state.birthType, state.showAllDecisions, visibleSections, visiblePrefIds])

  const canvasSections = sections()
  const theme = canvasThemes[state.templateStyle]

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

  return (
    <div className="flex flex-col h-full">
      {/* Canvas Header - template selector */}
      <div className="sticky top-0 z-10 flex items-center gap-3 p-3 border-b bg-white/95 backdrop-blur">
        <Select value={state.templateStyle} onValueChange={setTemplate}>
          <SelectTrigger className="w-[140px] min-h-[36px] text-sm">
            <SelectValue placeholder="Template" />
          </SelectTrigger>
          <SelectContent>
            {templateStyles.map((t) => (
              <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Document Canvas */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8" onClick={handleCanvasClick}>
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
                {state.birthTeam.fields.slice(1).map(field => (
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

            {/* Content Sections */}
            {canvasSections.map((section) => (
              <div key={section.sectionId} className="mb-8">
                <h2
                  className="text-lg font-semibold pb-2 mb-4 border-b"
                  style={{
                    color: theme.primaryColor,
                    borderColor: theme.borderColor,
                    backgroundColor: theme.sectionHeaderBg
                  }}
                >
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item) => {
                    const ItemIcon = getIconComponent(item.icon || 'Circle')
                    const isEditing = editingItemId === item.preferenceId

                    // Undecided items get a distinct placeholder appearance
                    if (item.isUndecided) {
                      return (
                        <div
                          key={item.preferenceId}
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
                      )
                    }

                    return (
                      <div
                        key={item.preferenceId}
                        data-canvas-item
                        className={cn(
                          'group pl-3 border-l-2 transition-all cursor-pointer relative',
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
                          {/* Stance indicator or icon */}
                          <div className="mt-0.5 flex-shrink-0">
                            {item.stance === 'desired' ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : item.stance === 'declined' ? (
                              <XCircle className="w-5 h-5 text-red-500" />
                            ) : (
                              <ItemIcon className="w-5 h-5" style={{ color: theme.primaryColor }} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            {isEditing ? (
                              <>
                                <input
                                  ref={titleInputRef}
                                  type="text"
                                  value={item.title}
                                  onChange={(e) => handleTitleEdit(item, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-full font-semibold text-sm mb-1 bg-transparent border-0 border-b border-dashed border-gray-300 focus:border-primary focus:outline-none rounded-none px-0 py-0.5"
                                  style={{ color: theme.textColor }}
                                  placeholder={item.isCustomItem ? 'Decision title' : undefined}
                                />
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
                              </>
                            ) : (
                              <>
                                <p
                                  className="font-semibold text-sm mb-0.5"
                                  style={{ color: theme.textColor }}
                                >
                                  {item.title}
                                </p>
                                {item.birthPlanText && (
                                  <p className="text-sm leading-relaxed" style={{ color: theme.textColor, opacity: 0.85 }}>
                                    {item.birthPlanText}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

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
            ))}

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
