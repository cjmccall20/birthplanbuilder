'use client'

import { useMemo } from 'react'
import { useEditor } from '@/lib/editor/context'
import { EDITOR_SECTIONS } from '@/lib/editor/sections'
import { getPreferencesBySection, getPreferenceById } from '@/lib/editor/preferences'
import { getIconComponent } from './IconPicker'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer'
import {
  ChevronRight,
  StickyNote,
  EyeOff,
  Eye,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

interface MobileSectionSheetProps {
  sectionId: EditorSectionId | null
  isOpen: boolean
  onClose: () => void
  onEditPreference: (sectionId: EditorSectionId, preferenceId: string) => void
}

function getValueSummary(
  prefDef: { options: Array<{ value: string; label: string }> },
  value: { selectedOption: string | null; customText?: string } | undefined
): string {
  if (!value?.selectedOption && !value?.customText) return 'Not set'
  if (value.customText) {
    const lines = value.customText.split('\n').filter(Boolean)
    if (lines.length > 1) return `${lines.length} selected`
    return value.customText.length > 40
      ? value.customText.slice(0, 40) + '...'
      : value.customText
  }
  const opt = prefDef.options.find(o => o.value === value.selectedOption)
  if (!opt) return 'Not set'
  return opt.label.length > 40 ? opt.label.slice(0, 40) + '...' : opt.label
}

export function MobileSectionSheet({
  sectionId,
  isOpen,
  onClose,
  onEditPreference,
}: MobileSectionSheetProps) {
  const { state, dispatch, setSectionNotes, setPreference } = useEditor()

  const sectionDef = sectionId ? EDITOR_SECTIONS.find(s => s.id === sectionId) : null
  const sectionState = sectionId ? state.sections[sectionId] : null

  // All preferences for this section (filtered by birth type and venue)
  const allPrefs = useMemo(() => {
    if (!sectionId) return []
    return getPreferencesBySection(sectionId, state.birthType, state.birthVenue)
  }, [sectionId, state.birthType, state.birthVenue])

  // Separate included and omitted preferences
  const { includedPrefs, omittedPrefs } = useMemo(() => {
    const included: typeof allPrefs = []
    const omitted: typeof allPrefs = []
    allPrefs.forEach(pref => {
      const val = sectionState?.preferences.find(pv => pv.preferenceId === pref.id)
      if (val?.isOmitted) {
        omitted.push(pref)
      } else {
        included.push(pref)
      }
    })
    return { includedPrefs: included, omittedPrefs: omitted }
  }, [allPrefs, sectionState?.preferences])

  // Current section title (custom or default)
  const currentTitle = sectionId
    ? state.customSectionTitles?.[sectionId] || sectionDef?.title || ''
    : ''

  // Current section notes
  const currentNotes = sectionState?.notes || ''

  if (!sectionDef || !sectionId) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="max-h-[85vh]">
          <div className="p-4" />
        </DrawerContent>
      </Drawer>
    )
  }

  const SectionIcon = getIconComponent(sectionDef.icon)

  const handleTitleChange = (newTitle: string) => {
    dispatch({ type: 'SET_SECTION_TITLE', payload: { sectionId, title: newTitle } })
  }

  const handleNotesChange = (notes: string) => {
    setSectionNotes(sectionId, notes)
  }

  const handleRestorePreference = (preferenceId: string) => {
    setPreference(sectionId, preferenceId, { isOmitted: false })
  }

  const handleEditPreference = (preferenceId: string) => {
    onEditPreference(sectionId, preferenceId)
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-left pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <SectionIcon className="h-5 w-5 text-primary" />
            </div>
            <DrawerTitle className="text-base flex-1">Edit Section</DrawerTitle>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5">
          {/* Section title */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Section Title</label>
            <Input
              value={currentTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder={sectionDef.title}
              className="min-h-[44px]"
            />
          </div>

          {/* Section notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <StickyNote className="h-3.5 w-3.5" />
              Section Notes
            </label>
            <textarea
              value={currentNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Add notes for this section..."
              className={cn(
                'w-full min-h-[72px] p-3 rounded-lg border bg-white text-sm',
                'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                'placeholder:text-muted-foreground/50 resize-none'
              )}
            />
          </div>

          {/* Included preferences */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Decisions ({includedPrefs.length})
            </p>
            <div className="space-y-0.5">
              {includedPrefs.map(pref => {
                const value = sectionState?.preferences.find(pv => pv.preferenceId === pref.id)
                const iconName = value?.customIcon || pref.icon || 'Circle'
                const PrefIcon = getIconComponent(iconName)
                const summary = getValueSummary(pref, value)
                const hasValue = !!(value?.selectedOption || value?.customText)

                return (
                  <button
                    key={pref.id}
                    onClick={() => handleEditPreference(pref.id)}
                    className="w-full min-h-[48px] px-3 py-2.5 flex items-center gap-3 rounded-lg text-left active:bg-muted/30 transition-colors hover:bg-muted/20"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <PrefIcon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium block truncate">{pref.title}</span>
                      <span className={cn(
                        'text-xs truncate block max-w-[220px]',
                        hasValue ? 'text-muted-foreground' : 'text-muted-foreground/50 italic'
                      )}>
                        {summary}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Hidden/omitted preferences */}
          {omittedPrefs.length > 0 && (
            <div className="space-y-1 pt-2 border-t">
              <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                <EyeOff className="h-3.5 w-3.5" />
                Hidden Decisions ({omittedPrefs.length})
              </p>
              <div className="space-y-0.5">
                {omittedPrefs.map(pref => {
                  const iconName = pref.icon || 'Circle'
                  const PrefIcon = getIconComponent(iconName)

                  return (
                    <div
                      key={pref.id}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg opacity-60"
                    >
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <PrefIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <span className="text-sm flex-1 min-w-0 truncate">{pref.title}</span>
                      <button
                        onClick={() => handleRestorePreference(pref.id)}
                        className="flex items-center gap-1 text-xs text-primary font-medium px-2 py-1 rounded-md hover:bg-primary/5 transition-colors flex-shrink-0"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Show
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <DrawerFooter>
          <Button onClick={onClose} className="w-full">
            Done
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
