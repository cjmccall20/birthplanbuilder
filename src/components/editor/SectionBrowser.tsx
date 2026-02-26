'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useEditor } from '@/lib/editor/context'
import { getPreferencesBySection } from '@/lib/editor/preferences'
import { EDITOR_SECTIONS } from '@/lib/editor/sections'
import { getSectionsForBirthType } from '@/lib/editor/sections'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Plus, Trash2, Eye, EyeOff, FileText, ChevronDown, ChevronUp, MessageSquare, Sparkles } from 'lucide-react'
import { getIconComponent } from './IconPicker'
import { cn } from '@/lib/utils'
import type { EditorSectionId, PreferenceDefinition } from '@/lib/editor/editorTypes'

interface SectionBrowserProps {
  onSelectPreference: (sectionId: EditorSectionId, preferenceId: string) => void
  onSelectCustomItem?: (sectionId: EditorSectionId, customItemId: string) => void
  selectedPreferenceId?: string | null
  expandSection?: EditorSectionId | null
}

const PHILOSOPHY_SAMPLES = [
  { label: 'Informed & Flexible', icon: 'BookOpen', text: 'Thank you for being part of our birth team. We have educated ourselves and have preferences, but we understand birth is unpredictable. We ask that you explain any changes to our plan and include us in decision-making.' },
  { label: 'Natural Birth Focused', icon: 'Leaf', text: 'Thank you for supporting our birth experience. We are planning for a natural birth with minimal interventions. Please support us in this goal, and discuss any interventions with us before proceeding.' },
  { label: 'Trust the Team', icon: 'HeartHandshake', text: 'Thank you for taking care of us. We trust our medical team and are open to your guidance. These preferences reflect our hopes, but we defer to your expertise when needed.' },
  { label: 'Bradley Method', icon: 'HeartHandshake', text: 'We have prepared using the Bradley Method, emphasizing partner-coached natural childbirth. We prefer to avoid medication and unnecessary interventions, relying on deep relaxation, breathing, and my partner\'s trained support. Please direct questions and updates to my partner when I am focused inward.' },
  { label: 'Hypnobirthing', icon: 'Wind', text: 'We have trained in hypnobirthing techniques and ask that the birth environment support this approach: calm voices, dim lighting, and minimal disruption. We use the language of "surges" rather than "contractions." Please avoid offering pain medication unless we specifically ask.' },
  { label: 'Lamaze', icon: 'Leaf', text: 'We have prepared using Lamaze principles and value freedom of movement, continuous support, and informed decision-making throughout labor. We ask to be included in all decisions and given time to consider options. A healthy birth is our priority, and we trust our preparation to guide us.' },
]

export function SectionBrowser({ onSelectPreference, onSelectCustomItem, selectedPreferenceId, expandSection }: SectionBrowserProps) {
  const { state, setPreference, addCustomItem, removeCustomItem, toggleSectionVisibility, setPhilosophy, togglePhilosophyVisibility, setDisclaimer } = useEditor()
  const visibleSections = getSectionsForBirthType(state.birthType)
  const [activeSection, setActiveSection] = useState<EditorSectionId>('pre_hospital')
  const [searchQuery, setSearchQuery] = useState('')
  const [statementsOpen, setStatementsOpen] = useState(false)
  const [showSamples, setShowSamples] = useState(false)
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
        const prefs = getPreferencesBySection(section.id, state.birthType, state.birthVenue)
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

  // Get preferences for active section (filtered by birth type and venue)
  const activePrefs = useMemo(() => {
    const prefs = getPreferencesBySection(activeSection, state.birthType, state.birthVenue)
    if (!searchQuery) return prefs
    const q = searchQuery.toLowerCase()
    return prefs.filter((p: PreferenceDefinition) =>
      p.title.toLowerCase().includes(q) ||
      (p.description?.toLowerCase().includes(q) ?? false)
    )
  }, [activeSection, searchQuery, state.birthType, state.birthVenue])

  // Cross-section search when query is non-empty
  const crossSectionResults = useMemo(() => {
    if (!searchQuery) return null
    const q = searchQuery.toLowerCase()
    const results: { sectionId: EditorSectionId; pref: PreferenceDefinition }[] = []
    for (const section of visibleSections) {
      const prefs = getPreferencesBySection(section.id, state.birthType, state.birthVenue)
      for (const p of prefs) {
        if (p.title.toLowerCase().includes(q) || (p.description?.toLowerCase().includes(q) ?? false)) {
          results.push({ sectionId: section.id, pref: p })
        }
      }
    }
    return results
  }, [searchQuery, visibleSections, state.birthType, state.birthVenue])

  // Get custom items for active section
  const customItems = state.sections[activeSection]?.customItems || []

  const handleAddCustom = () => {
    addCustomItem(activeSection, 'My custom preference', '')
  }

  return (
    <div className="space-y-3">
      {/* Statements panel */}
      <div className="border rounded-lg overflow-hidden">
        <button
          onClick={() => setStatementsOpen(!statementsOpen)}
          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium hover:bg-muted/30 transition-colors"
        >
          <FileText className="h-4 w-4 text-primary" />
          <span>Statements</span>
          {statementsOpen ? (
            <ChevronUp className="h-3.5 w-3.5 ml-auto text-muted-foreground" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 ml-auto text-muted-foreground" />
          )}
        </button>

        {statementsOpen && (
          <div className="border-t px-3 py-3 space-y-4">
            {/* Philosophy Statement */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Philosophy Statement</span>
                <button
                  onClick={() => togglePhilosophyVisibility()}
                  className={cn(
                    'p-1 rounded transition-colors',
                    state.showPhilosophy !== false
                      ? 'text-primary hover:text-primary/80'
                      : 'text-muted-foreground/40 hover:text-primary'
                  )}
                  title={state.showPhilosophy !== false ? 'Hide from birth plan' : 'Show in birth plan'}
                >
                  {state.showPhilosophy !== false ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
              </div>
              <textarea
                value={state.philosophyStatement || ''}
                onChange={(e) => setPhilosophy(e.target.value)}
                placeholder="Add a philosophy statement to introduce your birth plan..."
                className="w-full text-sm bg-muted/30 border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary resize-none leading-relaxed"
                rows={3}
              />
              {/* Sample statements */}
              <button
                onClick={() => setShowSamples(!showSamples)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Sparkles className="h-3 w-3" />
                {showSamples ? 'Hide samples' : 'Browse sample statements'}
              </button>
              {showSamples && (
                <div className="space-y-2">
                  {PHILOSOPHY_SAMPLES.map((sample) => (
                    <div key={sample.label} className="border rounded-md p-2 bg-white">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground">{sample.label}</span>
                        <button
                          onClick={() => {
                            setPhilosophy(sample.text)
                            if (state.showPhilosophy === false) togglePhilosophyVisibility()
                            setShowSamples(false)
                          }}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                        >
                          Use this
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed italic">{sample.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Closing Statement */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Closing Statement</span>
              <textarea
                value={state.disclaimerText || ''}
                onChange={(e) => setDisclaimer(e.target.value)}
                placeholder="Add a closing statement for your birth plan..."
                className="w-full text-sm bg-muted/30 border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary resize-none leading-relaxed"
                rows={3}
              />
            </div>
          </div>
        )}
      </div>

      {/* Section tab buttons - hidden during search */}
      {!crossSectionResults && <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
        {visibleSections.map(section => {
          const sectionState = state.sections[section.id]
          const prefs = getPreferencesBySection(section.id, state.birthType, state.birthVenue)
          const includedCount = prefs.filter(p => {
            const val = sectionState?.preferences.find(pv => pv.preferenceId === p.id)
            return !val?.isOmitted
          }).length + (sectionState?.customItems.length || 0)
          const isActive = activeSection === section.id
          const isHidden = (state.hiddenSections || []).includes(section.id)
          const SectionIcon = getIconComponent(section.icon)

          return (
            <div key={section.id} className="flex-shrink-0 flex items-center gap-0.5">
              <button
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border',
                  isHidden && 'opacity-40',
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-white hover:bg-muted/50 border-border text-muted-foreground'
                )}
              >
                <SectionIcon className="h-3 w-3" />
                <span className="whitespace-nowrap">{section.displayTitle}</span>
                <span className={cn(
                  'text-[10px] px-1 rounded-full min-w-[18px] text-center',
                  isActive ? 'bg-white/20' : 'bg-muted'
                )}>
                  {includedCount}
                </span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  // Confirm if section has active preferences
                  if (!isHidden && includedCount > 0) {
                    const confirmed = window.confirm(
                      `This section has ${includedCount} active preference${includedCount > 1 ? 's' : ''}. Hiding it will remove them from your birth plan PDF. You can re-show it anytime. Continue?`
                    )
                    if (!confirmed) return
                  }
                  toggleSectionVisibility(section.id)
                }}
                className={cn(
                  'p-1 rounded transition-colors',
                  isHidden
                    ? 'text-muted-foreground/40 hover:text-primary'
                    : 'text-muted-foreground/60 hover:text-muted-foreground'
                )}
                title={isHidden ? 'Show section' : 'Hide section'}
              >
                {isHidden ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </button>
            </div>
          )
        })}
      </div>}

      {/* Search across all sections */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search decisions..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-9 min-h-[36px] text-base"
        />
      </div>

      {/* Decision list */}
      {crossSectionResults ? (
        <div className="border rounded-lg overflow-hidden">
          {crossSectionResults.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No decisions found for &ldquo;{searchQuery}&rdquo;</p>
          ) : (
            crossSectionResults.map(({ sectionId, pref }) => {
              const section = visibleSections.find(s => s.id === sectionId)
              return (
                <div key={`${sectionId}-${pref.id}`}>
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70 font-medium px-3 pt-1.5 block">
                    {section?.displayTitle ?? section?.title}
                  </span>
                  <PreferenceRow
                    preference={pref}
                    sectionId={sectionId}
                    isSelected={selectedPreferenceId === pref.id}
                    onSelect={() => onSelectPreference(sectionId, pref.id)}
                  />
                </div>
              )
            })
          )}
        </div>
      ) : (
        <>
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
        </>
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
            {value?.assignedTo && (
              <span className="text-[10px] px-1.5 py-0 rounded-full bg-primary/10 text-primary font-medium">
                @{value.assignedTo}
              </span>
            )}
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
