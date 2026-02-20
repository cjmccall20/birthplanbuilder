'use client'

import { useCallback } from 'react'
import { useEditor } from '@/lib/editor/context'
import { getPreferenceById } from '@/lib/editor/preferences'
import { EDITOR_SECTIONS } from '@/lib/editor/sections'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { templateStyles } from '@/types'
import { CheckCircle2, XCircle } from 'lucide-react'
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
}

interface DocumentCanvasProps {
  onItemSelect?: (sectionId: EditorSectionId, preferenceId: string) => void
  selectedPreferenceId?: string | null
}

export function DocumentCanvas({
  onItemSelect,
  selectedPreferenceId,
}: DocumentCanvasProps) {
  const { state, setTemplate, setBirthTeam, setBirthTeamField, addBirthTeamField, removeBirthTeamField, renameBirthTeamField, setTitle, setDisclaimer } = useEditor()

  // Process editor state into canvas sections with items and notes
  const sections = useCallback(() => {
    const result: { title: string; items: CanvasItem[]; notes: string }[] = []

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
          icon: prefValue.customIcon || prefDef.icon,
          stance: prefValue.stance,
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

      if (items.length > 0 || sectionState.notes) {
        result.push({
          title: section.title,
          items,
          notes: sectionState.notes || '',
        })
      }
    })

    return result
  }, [state.sections])

  const canvasSections = sections()
  const theme = canvasThemes[state.templateStyle]

  // Single click to open sidebar detail
  const handleItemClick = (item: CanvasItem) => {
    if (!item.isCustomItem && onItemSelect) {
      onItemSelect(item.sectionId, item.preferenceId)
    }
  }

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
      {/* Canvas Header — template selector */}
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
                    {field.isDefault ? (
                      <span className="font-semibold w-20 flex-shrink-0 text-xs uppercase tracking-wide" style={{ color: theme.textColor, opacity: 0.5 }}>
                        {field.label}
                      </span>
                    ) : (
                      <Input
                        value={field.label}
                        onChange={(e) => renameBirthTeamField(field.id, e.target.value)}
                        className="h-6 w-20 flex-shrink-0 text-xs uppercase tracking-wide font-semibold border-0 bg-transparent focus:ring-0 focus:bg-white/50 rounded px-0"
                        style={{ color: theme.textColor, opacity: 0.5 }}
                      />
                    )}
                    <Input
                      value={field.value}
                      onChange={(e) => setBirthTeamField(field.id, e.target.value)}
                      className="h-8 text-sm border-0 bg-transparent focus:ring-0 focus:bg-white/50 rounded px-2"
                      placeholder={`${field.label}'s name`}
                      style={{ color: theme.textColor }}
                    />
                    {!field.isDefault && (
                      <button
                        onClick={() => removeBirthTeamField(field.id)}
                        className="text-xs text-muted-foreground hover:text-red-500 transition-colors px-1"
                        title="Remove field"
                      >
                        x
                      </button>
                    )}
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
              <div key={section.title} className="mb-8">
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
                    return (
                      <div
                        key={item.preferenceId}
                        className={cn(
                          'group pl-3 border-l-2 transition-all cursor-pointer',
                          selectedPreferenceId === item.preferenceId
                            ? 'py-1'
                            : 'border-transparent'
                        )}
                        style={{
                          borderColor: selectedPreferenceId === item.preferenceId
                            ? `${theme.primaryColor}80`
                            : 'transparent',
                          backgroundColor: selectedPreferenceId === item.preferenceId
                            ? theme.sectionHeaderBg
                            : 'transparent'
                        }}
                        onClick={() => handleItemClick(item)}
                      >
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
                          <div className="flex-1">
                            <p
                              className="font-semibold text-sm mb-0.5"
                              style={{ color: theme.textColor }}
                            >
                              {item.title}
                            </p>
                            <p className="text-sm leading-relaxed" style={{ color: theme.textColor, opacity: 0.85 }}>
                              {item.birthPlanText}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Section notes */}
                {section.notes && (
                  <div
                    className="mt-3 p-3 rounded text-sm italic"
                    style={{ backgroundColor: theme.sectionHeaderBg, color: theme.textColor, opacity: 0.75 }}
                  >
                    {section.notes}
                  </div>
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
