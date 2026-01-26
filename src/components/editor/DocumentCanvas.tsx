'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useEditor } from '@/lib/editor/context'
import { getPreferenceById } from '@/lib/editor/preferences'
import { EDITOR_SECTIONS } from '@/lib/editor/sections'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { templateStyles } from '@/types'
import { Download, Mail, Settings, ChevronRight } from 'lucide-react'
import * as Icons from 'lucide-react'
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
  baseIcon?: string
  optionIcon?: string
}

// Helper to get Lucide icon component by name
function getLucideIcon(iconName?: string) {
  if (!iconName) return null
  const IconComponent = (Icons as any)[iconName]
  return IconComponent || null
}

// Component to display an icon with an overlay badge
function IconWithOverlay({
  baseIcon,
  overlayIcon,
  color
}: {
  baseIcon?: string
  overlayIcon?: string
  color: string
}) {
  const BaseIcon = getLucideIcon(baseIcon)
  const OverlayIcon = getLucideIcon(overlayIcon)

  if (!BaseIcon) return null

  return (
    <div className="relative flex-shrink-0" style={{ width: '20px', height: '20px' }}>
      <BaseIcon className="w-5 h-5" style={{ color }} />
      {OverlayIcon && (
        <div
          className="absolute -bottom-1 -right-1 bg-white rounded-full flex items-center justify-center"
          style={{
            width: '12px',
            height: '12px',
            border: `1px solid ${color}`
          }}
        >
          <OverlayIcon className="w-2.5 h-2.5" style={{ color }} />
        </div>
      )}
    </div>
  )
}

interface DocumentCanvasProps {
  onItemSelect?: (sectionId: EditorSectionId, preferenceId: string) => void
  selectedPreferenceId?: string | null
  onDownload?: () => void
  onEmail?: () => void
  onToggleSettings?: () => void
}

export function DocumentCanvas({
  onItemSelect,
  selectedPreferenceId,
  onDownload,
  onEmail,
  onToggleSettings,
}: DocumentCanvasProps) {
  const { state, setPreference, setTemplate, setBirthTeam, setTitle } = useEditor()
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [editingTitle, setEditingTitle] = useState<string | null>(null)
  const [editTitleText, setEditTitleText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)

  // Process editor state into canvas items grouped by section
  const groupedContent = useCallback(() => {
    const result: Record<string, CanvasItem[]> = {}

    EDITOR_SECTIONS.forEach(section => {
      const sectionState = state.sections[section.id]
      if (!sectionState) return

      const items: CanvasItem[] = []

      // Process preferences
      const sortedPreferences = [...sectionState.preferences]
        .filter(pref => !pref.isOmitted)
        .sort((a, b) => a.sortOrder - b.sortOrder)

      sortedPreferences.forEach(prefValue => {
        const prefDef = getPreferenceById(prefValue.preferenceId)
        if (!prefDef) return

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
          baseIcon: prefDef.icon,
          optionIcon: selectedOption?.icon,
        })
      })

      // Process custom items
      sectionState.customItems
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .forEach(item => {
          if (!item.text) return
          items.push({
            sectionId: section.id,
            preferenceId: `custom_${item.id}`,
            title: item.title,
            birthPlanText: item.text,
            isCustomItem: true,
            customItemId: item.id,
          })
        })

      if (items.length > 0) {
        result[section.title] = items
      }
    })

    return result
  }, [state.sections])

  const content = groupedContent()
  const theme = canvasThemes[state.templateStyle]

  // Handle click on item to edit
  const handleItemClick = (item: CanvasItem) => {
    setEditingItem(item.preferenceId)
    setEditText(item.birthPlanText)
  }

  // Handle double-click to open in decision panel
  const handleItemDoubleClick = (item: CanvasItem) => {
    if (!item.isCustomItem && onItemSelect) {
      onItemSelect(item.sectionId, item.preferenceId)
    }
  }

  // Save edit and close
  const handleSaveEdit = (item: CanvasItem) => {
    if (!item.isCustomItem) {
      setPreference(item.sectionId, item.preferenceId, {
        customText: editText || undefined
      })
    }
    setEditingItem(null)
  }

  // Handle key press in edit mode
  const handleKeyDown = (e: React.KeyboardEvent, item: CanvasItem) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSaveEdit(item)
    }
    if (e.key === 'Escape') {
      setEditingItem(null)
    }
  }

  // Handle title click to edit
  const handleTitleClick = (item: CanvasItem, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingTitle(item.preferenceId)
    setEditTitleText(item.title)
  }

  // Save title edit
  const handleSaveTitleEdit = (item: CanvasItem) => {
    if (!item.isCustomItem) {
      setPreference(item.sectionId, item.preferenceId, {
        customTitle: editTitleText || undefined
      })
    }
    setEditingTitle(null)
  }

  // Handle title key press
  const handleTitleKeyDown = (e: React.KeyboardEvent, item: CanvasItem) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSaveTitleEdit(item)
    }
    if (e.key === 'Escape') {
      setEditingTitle(null)
    }
  }

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (editingItem && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.select()
    }
  }, [editingItem])

  // Focus title input when entering title edit mode
  useEffect(() => {
    if (editingTitle && titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.select()
    }
  }, [editingTitle])

  // Format due date
  const formattedDueDate = state.birthTeam.due_date
    ? new Date(state.birthTeam.due_date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <div className="flex flex-col h-full">
      {/* Canvas Header */}
      <div className="flex items-center justify-between gap-4 p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <Select value={state.templateStyle} onValueChange={setTemplate}>
            <SelectTrigger className="w-[140px] min-h-[40px]">
              <SelectValue placeholder="Template" />
            </SelectTrigger>
            <SelectContent>
              {templateStyles.map((t) => (
                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {onToggleSettings && (
            <Button variant="ghost" size="sm" onClick={onToggleSettings}>
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onEmail && (
            <Button variant="outline" size="sm" onClick={onEmail}>
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
          )}
          {onDownload && (
            <Button variant="default" size="sm" onClick={onDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          )}
        </div>
      </div>

      {/* Document Canvas */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8">
        <div
          className="max-w-[650px] mx-auto shadow-lg rounded-sm"
          style={{ backgroundColor: theme.backgroundColor }}
        >
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

              {/* Editable Name */}
              <Input
                value={state.birthTeam.mother_name || ''}
                onChange={(e) => setBirthTeam({ mother_name: e.target.value })}
                className="text-base text-center text-muted-foreground border-0 bg-transparent focus:ring-0 focus:bg-gray-50 rounded mt-1"
                placeholder="Your Name"
              />

              {formattedDueDate && (
                <p className="text-sm mt-2" style={{ color: theme.textColor, opacity: 0.7 }}>
                  Due Date: {formattedDueDate}
                </p>
              )}

              {/* Birth Team Info */}
              {(state.birthTeam.partner_name || state.birthTeam.provider_name ||
                state.birthTeam.hospital_name || state.birthTeam.doula_name) && (
                <div
                  className="mt-4 p-4 rounded-md text-sm text-left"
                  style={{ backgroundColor: theme.sectionHeaderBg }}
                >
                  {state.birthTeam.partner_name && (
                    <div className="flex gap-2">
                      <span className="font-semibold w-24" style={{ color: theme.textColor, opacity: 0.7 }}>Partner:</span>
                      <span style={{ color: theme.textColor }}>{state.birthTeam.partner_name}</span>
                    </div>
                  )}
                  {state.birthTeam.provider_name && (
                    <div className="flex gap-2">
                      <span className="font-semibold w-24" style={{ color: theme.textColor, opacity: 0.7 }}>Provider:</span>
                      <span style={{ color: theme.textColor }}>{state.birthTeam.provider_name}</span>
                    </div>
                  )}
                  {state.birthTeam.hospital_name && (
                    <div className="flex gap-2">
                      <span className="font-semibold w-24" style={{ color: theme.textColor, opacity: 0.7 }}>Location:</span>
                      <span style={{ color: theme.textColor }}>{state.birthTeam.hospital_name}</span>
                    </div>
                  )}
                  {state.birthTeam.doula_name && (
                    <div className="flex gap-2">
                      <span className="font-semibold w-24" style={{ color: theme.textColor, opacity: 0.7 }}>Doula:</span>
                      <span style={{ color: theme.textColor }}>{state.birthTeam.doula_name}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Content Sections */}
            {Object.entries(content).map(([category, items]) => (
              <div key={category} className="mb-8">
                <h2
                  className="text-lg font-semibold pb-2 mb-4 border-b"
                  style={{
                    color: theme.primaryColor,
                    borderColor: theme.borderColor,
                    backgroundColor: theme.sectionHeaderBg
                  }}
                >
                  {category}
                </h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.preferenceId}
                      className={cn(
                        'group pl-3 border-l-2 transition-all cursor-pointer',
                        editingItem === item.preferenceId
                          ? 'py-2 px-3 -mx-3 rounded-r'
                          : selectedPreferenceId === item.preferenceId
                          ? 'py-1'
                          : 'border-transparent'
                      )}
                      style={{
                        borderColor: editingItem === item.preferenceId
                          ? theme.primaryColor
                          : selectedPreferenceId === item.preferenceId
                          ? `${theme.primaryColor}80`
                          : 'transparent',
                        backgroundColor: editingItem === item.preferenceId || selectedPreferenceId === item.preferenceId
                          ? theme.sectionHeaderBg
                          : 'transparent'
                      }}
                      onClick={() => editingItem !== item.preferenceId && handleItemClick(item)}
                      onDoubleClick={() => handleItemDoubleClick(item)}
                    >
                      <div className="flex items-start gap-2">
                        {/* Icon with overlay */}
                        {(item.baseIcon || item.optionIcon) && (
                          <div className="mt-0.5">
                            <IconWithOverlay
                              baseIcon={item.baseIcon}
                              overlayIcon={item.optionIcon}
                              color={theme.primaryColor}
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          {editingTitle === item.preferenceId ? (
                            <input
                              ref={titleInputRef}
                              value={editTitleText}
                              onChange={(e) => setEditTitleText(e.target.value)}
                              onBlur={() => handleSaveTitleEdit(item)}
                              onKeyDown={(e) => handleTitleKeyDown(e, item)}
                              className="w-full font-semibold text-sm mb-0.5 p-1 border rounded focus:ring-2"
                              style={{
                                color: theme.textColor,
                                borderColor: theme.borderColor,
                                backgroundColor: 'transparent'
                              }}
                              placeholder="Enter title..."
                            />
                          ) : (
                            <p
                              className="font-semibold text-sm mb-0.5 cursor-text hover:bg-gray-50 rounded px-1 py-0.5 -mx-1"
                              style={{ color: theme.textColor }}
                              onClick={(e) => handleTitleClick(item, e)}
                            >
                              {item.title}
                            </p>
                          )}
                          {editingItem === item.preferenceId ? (
                            <textarea
                              ref={textareaRef}
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              onBlur={() => handleSaveEdit(item)}
                              onKeyDown={(e) => handleKeyDown(e, item)}
                              className="w-full min-h-[60px] p-2 text-sm border rounded-md focus:ring-2 resize-none"
                              style={{
                                color: theme.textColor,
                                borderColor: theme.borderColor
                              }}
                              placeholder="Enter your preference..."
                            />
                          ) : (
                            <p className="text-sm leading-relaxed" style={{ color: theme.textColor, opacity: 0.85 }}>
                              {item.birthPlanText}
                            </p>
                          )}
                        </div>
                        {!item.isCustomItem && editingItem !== item.preferenceId && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 h-10 w-10 p-0 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleItemDoubleClick(item)
                            }}
                            title="Edit options"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                      {editingItem === item.preferenceId && (
                        <p className="text-xs mt-1" style={{ color: theme.textColor, opacity: 0.6 }}>
                          Press Enter to save, Escape to cancel
                        </p>
                      )}
                      {editingTitle === item.preferenceId && (
                        <p className="text-xs mt-1" style={{ color: theme.textColor, opacity: 0.6 }}>
                          Press Enter to save, Escape to cancel
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {Object.keys(content).length === 0 && (
              <div className="text-center py-12" style={{ color: theme.textColor, opacity: 0.6 }}>
                <p>Your birth plan is empty.</p>
                <p className="text-sm mt-1">Use the options panel to add decisions.</p>
              </div>
            )}

            {/* Disclaimer */}
            <div
              className="mt-8 p-4 rounded-md text-xs leading-relaxed"
              style={{
                backgroundColor: theme.sectionHeaderBg,
                color: theme.textColor,
                opacity: 0.8
              }}
            >
              This birth plan represents my preferences for labor and delivery. I understand
              that circumstances may change and medical decisions may need to be made for
              the safety of myself and my baby. I trust my care team to keep us informed
              and involve us in any decisions when possible.
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
