'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useEditor } from '@/lib/editor/context'
import { getPreferencesBySection } from '@/lib/editor/preferences'
import { EDITOR_SECTIONS } from '@/lib/editor/sections'
import { getSectionsForBirthType } from '@/lib/editor/sections'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Plus, Trash2 } from 'lucide-react'
import { getIconComponent } from './IconPicker'
import { cn } from '@/lib/utils'
import type { EditorSectionId, PreferenceDefinition } from '@/lib/editor/editorTypes'

interface SectionBrowserProps {
  onSelectPreference: (sectionId: EditorSectionId, preferenceId: string) => void
  onSelectCustomItem?: (sectionId: EditorSectionId, customItemId: string) => void
  selectedPreferenceId?: string | null
  expandSection?: EditorSectionId | null
}

export function SectionBrowser({ onSelectPreference, onSelectCustomItem, selectedPreferenceId, expandSection }: SectionBrowserProps) {
  const { state, setPreference, addCustomItem, removeCustomItem } = useEditor()
  const visibleSections = getSectionsForBirthType(state.birthType)
  const [activeSection, setActiveSection] = useState<EditorSectionId>('pre_hospital')
  const [searchQuery, setSearchQuery] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  // When expandSection changes (from "Add decision" on canvas), switch to that section
  useEffect(() => {
    if (expandSection) {
      setActiveSection(expandSection)
    }
  }, [expandSection])

  // When selected preference changes, switch to its section
  useEffect(() => {
    if (selectedPreferenceId) {
      for (const section of EDITOR_SECTIONS) {
        const prefs = getPreferencesBySection(section.id)
        if (prefs.some(p => p.id === selectedPreferenceId)) {
          setActiveSection(section.id)
          break
        }
        // Check if it's a custom item
        const sectionState = state.sections[section.id]
        if (sectionState?.customItems.some(ci => `custom_${ci.id}` === selectedPreferenceId)) {
          setActiveSection(section.id)
          break
        }
      }
    }
  }, [selectedPreferenceId, state.sections])

  // Get preferences for active section (filtered by birth type)
  const activePrefs = useMemo(() => {
    const prefs = getPreferencesBySection(activeSection, state.birthType)
    if (!searchQuery) return prefs
    const q = searchQuery.toLowerCase()
    return prefs.filter((p: PreferenceDefinition) =>
      p.title.toLowerCase().includes(q) ||
      (p.description?.toLowerCase().includes(q) ?? false)
    )
  }, [activeSection, searchQuery, state.birthType])

  // Get custom items for active section
  const customItems = state.sections[activeSection]?.customItems || []

  const handleAddCustom = () => {
    addCustomItem(activeSection, 'My custom preference', '')
  }

  return (
    <div className="space-y-3">
      {/* Section tab buttons */}
      <div className="flex flex-wrap gap-1.5">
        {visibleSections.map(section => {
          const sectionState = state.sections[section.id]
          const prefs = getPreferencesBySection(section.id, state.birthType)
          const includedCount = prefs.filter(p => {
            const val = sectionState?.preferences.find(pv => pv.preferenceId === p.id)
            return !val?.isOmitted
          }).length + (sectionState?.customItems.length || 0)
          const isActive = activeSection === section.id
          const SectionIcon = getIconComponent(section.icon)

          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border',
                isActive
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-white hover:bg-muted/50 border-border text-muted-foreground'
              )}
            >
              <SectionIcon className="h-3 w-3" />
              <span className="hidden lg:inline">{section.displayTitle}</span>
              <span className="lg:hidden">{section.displayTitle.split(' ')[0]}</span>
              <span className={cn(
                'text-[10px] px-1 rounded-full min-w-[18px] text-center',
                isActive ? 'bg-white/20' : 'bg-muted'
              )}>
                {includedCount}
              </span>
            </button>
          )
        })}
      </div>

      {/* Search within section */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search decisions..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-9 min-h-[36px] text-sm"
        />
      </div>

      {/* Decision list for active section */}
      <div ref={listRef} className="border rounded-lg overflow-hidden">
        {activePrefs.map(pref => (
          <PreferenceRow
            key={pref.id}
            preference={pref}
            sectionId={activeSection}
            isSelected={selectedPreferenceId === pref.id}
            onSelect={() => onSelectPreference(activeSection, pref.id)}
          />
        ))}

        {/* Custom items */}
        {customItems.map(item => (
          <div
            key={item.id}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 border-b last:border-b-0 transition-colors bg-white',
              selectedPreferenceId === `custom_${item.id}` && 'bg-primary/5'
            )}
          >
            <button
              onClick={() => onSelectCustomItem?.(activeSection, item.id)}
              className="flex items-center gap-3 flex-1 min-w-0 text-left hover:bg-muted/30 -m-1 p-1 rounded transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                {(() => {
                  const Icon = getIconComponent(item.customIcon || 'Circle')
                  return <Icon className="h-3.5 w-3.5" />
                })()}
              </div>
              <div className="min-w-0">
                <span className="text-sm font-medium truncate block">
                  {item.title || 'Custom decision'}
                </span>
                {item.text && (
                  <p className="text-xs text-muted-foreground truncate">{item.text}</p>
                )}
              </div>
            </button>
            <button
              onClick={() => removeCustomItem(activeSection, item.id)}
              className="p-1 text-muted-foreground hover:text-red-500 transition-colors flex-shrink-0"
              title="Delete custom decision"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {/* Add custom decision */}
        <button
          onClick={handleAddCustom}
          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-muted/30 transition-colors border-t"
        >
          <Plus className="h-3.5 w-3.5" />
          Add custom decision
        </button>
      </div>

      {activePrefs.length === 0 && customItems.length === 0 && (
        <div className="text-center py-4 text-muted-foreground text-sm">
          No decisions match your search.
        </div>
      )}
    </div>
  )
}

function PreferenceRow({
  preference,
  sectionId,
  isSelected,
  onSelect,
}: {
  preference: PreferenceDefinition
  sectionId: EditorSectionId
  isSelected?: boolean
  onSelect: () => void
}) {
  const { state, setPreference, unsurePreferenceIds } = useEditor()
  const section = state.sections[sectionId]
  const value = section?.preferences.find(p => p.preferenceId === preference.id)
  const isIncluded = !value?.isOmitted
  const selectedOption = preference.options.find(o => o.value === value?.selectedOption)
  const needsAttention = unsurePreferenceIds.includes(preference.id)

  const PrefIcon = getIconComponent(value?.customIcon || preference.icon || 'Circle')

  const handleToggle = (checked: boolean) => {
    setPreference(sectionId, preference.id, { isOmitted: !checked })
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 border-b last:border-b-0 transition-colors',
        isIncluded ? 'bg-white' : 'bg-muted/20 opacity-60',
        isSelected && 'bg-primary/5'
      )}
    >
      {/* Clickable area for selecting */}
      <button
        onClick={onSelect}
        className="flex items-center gap-3 flex-1 min-w-0 text-left hover:bg-muted/30 -m-1 p-1 rounded transition-colors"
      >
        <div className={cn(
          'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
          isIncluded ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
        )}>
          <PrefIcon className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-medium truncate">{preference.title}</span>
            {needsAttention && (
              <Badge variant="outline" className="text-[10px] px-1 py-0 text-amber-600 border-amber-300 bg-amber-50">
                Unsure
              </Badge>
            )}
          </div>
          {selectedOption && isIncluded && (
            <p className="text-xs text-muted-foreground truncate">{selectedOption.label}</p>
          )}
        </div>
      </button>

      {/* Include toggle */}
      <Switch
        checked={isIncluded}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-primary flex-shrink-0"
      />
    </div>
  )
}
