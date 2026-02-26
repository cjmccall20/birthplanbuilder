'use client'

import { useState } from 'react'
import { useEditor } from '@/lib/editor/context'
import { EDITOR_SECTIONS } from '@/lib/editor/sections'
import { getPreferencesBySection } from '@/lib/editor/preferences'
import { getIconComponent } from './IconPicker'
import { ChevronDown, ChevronRight, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

interface MobileSectionCardProps {
  sectionId: EditorSectionId
  onEditPreference: (preferenceId: string) => void
  onEditSection: () => void
}

function getValueSummary(
  prefDef: { options: Array<{ value: string; label: string }> },
  value: { selectedOption: string | null; customText?: string } | undefined
): string {
  if (!value?.selectedOption && !value?.customText) return ''
  if (value.customText) {
    const lines = value.customText.split('\n').filter(Boolean)
    if (lines.length > 1) return `${lines.length} selected`
    // Truncate long custom text
    return value.customText.length > 30
      ? value.customText.slice(0, 30) + '...'
      : value.customText
  }
  const opt = prefDef.options.find(o => o.value === value.selectedOption)
  if (!opt) return ''
  return opt.label.length > 30 ? opt.label.slice(0, 30) + '...' : opt.label
}

export function MobileSectionCard({ sectionId, onEditPreference, onEditSection }: MobileSectionCardProps) {
  const { state } = useEditor()
  const [expanded, setExpanded] = useState(false)

  const sectionDef = EDITOR_SECTIONS.find(s => s.id === sectionId)
  if (!sectionDef) return null

  const sectionState = state.sections[sectionId]
  const prefs = getPreferencesBySection(sectionId, state.birthType, state.birthVenue)

  // Use custom section title if set, otherwise default display title
  const displayTitle = state.customSectionTitles?.[sectionId] || sectionDef.title

  // Count included (non-omitted) preferences
  const includedCount = prefs.filter(p => {
    const val = sectionState?.preferences.find(pv => pv.preferenceId === p.id)
    return !val?.isOmitted
  }).length

  const SectionIcon = getIconComponent(sectionDef.icon)

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      {/* Header row - tap to expand/collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full h-14 px-4 flex items-center justify-between gap-3 active:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <SectionIcon className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium text-sm truncate">{displayTitle}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {includedCount}/{prefs.length}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEditSection()
            }}
            className="p-1.5 rounded-md hover:bg-muted/50 transition-colors"
            aria-label="Edit section"
          >
            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Preference rows - expanded state */}
      <div
        className={cn(
          'transition-all duration-200 overflow-hidden',
          expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {prefs.map(pref => {
          const value = sectionState?.preferences.find(pv => pv.preferenceId === pref.id)
          const isOmitted = value?.isOmitted ?? false
          const iconName = value?.customIcon || pref.icon || 'Circle'
          const PrefIcon = getIconComponent(iconName)
          const summary = getValueSummary(pref, value)

          return (
            <button
              key={pref.id}
              onClick={() => onEditPreference(pref.id)}
              className={cn(
                'w-full min-h-[48px] px-4 py-2.5 flex items-center gap-3 border-t text-left active:bg-muted/30 transition-colors',
                isOmitted && 'opacity-50'
              )}
            >
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
                isOmitted ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
              )}>
                <PrefIcon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium block truncate">{pref.title}</span>
                {summary && (
                  <span className="text-xs text-muted-foreground truncate block max-w-[180px]">
                    {summary}
                  </span>
                )}
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
