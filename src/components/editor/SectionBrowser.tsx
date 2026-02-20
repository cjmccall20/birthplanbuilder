'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useEditor } from '@/lib/editor/context'
import { getPreferencesBySection } from '@/lib/editor/preferences'
import { EDITOR_SECTIONS } from '@/lib/editor/sections'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight, Search, Plus } from 'lucide-react'
import { getIconComponent } from './IconPicker'
import { cn } from '@/lib/utils'
import type { EditorSectionId, PreferenceDefinition } from '@/lib/editor/editorTypes'

interface SectionBrowserProps {
  onSelectPreference: (sectionId: EditorSectionId, preferenceId: string) => void
  selectedPreferenceId?: string | null
  expandSection?: EditorSectionId | null
}

export function SectionBrowser({ onSelectPreference, selectedPreferenceId, expandSection }: SectionBrowserProps) {
  const { state, setPreference, addCustomItem } = useEditor()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['pre_hospital']))
  const [searchQuery, setSearchQuery] = useState('')
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const setSectionRef = useCallback((sectionId: string, el: HTMLDivElement | null) => {
    sectionRefs.current[sectionId] = el
  }, [])

  // Auto-expand section from "Add decision" button on canvas + scroll to it
  useEffect(() => {
    if (expandSection) {
      setExpandedSections(prev => {
        const next = new Set(prev)
        next.add(expandSection)
        return next
      })
      // Scroll to the section after a brief delay for DOM update
      requestAnimationFrame(() => {
        const el = sectionRefs.current[expandSection]
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    }
  }, [expandSection])

  // Auto-expand section containing selected preference
  useEffect(() => {
    if (selectedPreferenceId) {
      for (const section of EDITOR_SECTIONS) {
        const prefs = getPreferencesBySection(section.id)
        if (prefs.some(p => p.id === selectedPreferenceId)) {
          setExpandedSections(prev => {
            const next = new Set(prev)
            next.add(section.id)
            return next
          })
          break
        }
      }
    }
  }, [selectedPreferenceId])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }

  const filteredSections = useMemo(() => {
    return EDITOR_SECTIONS.map((section) => {
      const prefs = getPreferencesBySection(section.id)
      const filtered: PreferenceDefinition[] = searchQuery
        ? prefs.filter((p: PreferenceDefinition) => {
            const q = searchQuery.toLowerCase()
            return p.title.toLowerCase().includes(q) ||
              (p.description?.toLowerCase().includes(q) ?? false)
          })
        : prefs
      return { ...section, preferences: filtered }
    }).filter(s => s.preferences.length > 0)
  }, [searchQuery])

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search decisions..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-9 min-h-[40px] text-sm"
        />
      </div>

      {/* Sections */}
      <div className="space-y-2">
        {filteredSections.map(section => {
          const isExpanded = expandedSections.has(section.id)
          const sectionState = state.sections[section.id]
          const prefs = section.preferences
          const includedCount = prefs.filter(p => {
            const val = sectionState?.preferences.find(pv => pv.preferenceId === p.id)
            return !val?.isOmitted
          }).length

          const SectionIcon = getIconComponent(section.icon)

          return (
            <div
              key={section.id}
              ref={(el) => setSectionRef(section.id, el)}
              className={cn(
                'border rounded-lg overflow-hidden',
                expandSection === section.id && 'ring-2 ring-primary/30'
              )}
            >
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <SectionIcon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{section.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {includedCount} of {prefs.length} included
                  </p>
                </div>
                <Badge variant="outline" className="text-xs mr-1">
                  {includedCount}/{prefs.length}
                </Badge>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {/* Decision list */}
              {isExpanded && (
                <div className="border-t">
                  {prefs.map(pref => (
                    <PreferenceRow
                      key={pref.id}
                      preference={pref}
                      sectionId={section.id}
                      onSelect={() => onSelectPreference(section.id, pref.id)}
                    />
                  ))}
                  {/* Add custom decision */}
                  <button
                    onClick={() => addCustomItem(section.id, '', 'My custom preference')}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-muted/30 transition-colors border-t"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add custom decision
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredSections.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No decisions match your search.
        </div>
      )}
    </div>
  )
}

function PreferenceRow({
  preference,
  sectionId,
  onSelect,
}: {
  preference: PreferenceDefinition
  sectionId: EditorSectionId
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
        isIncluded ? 'bg-white' : 'bg-muted/20 opacity-60'
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
