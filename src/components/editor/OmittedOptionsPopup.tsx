'use client'

import { useMemo } from 'react'
import { useEditor } from '@/lib/editor/context'
import { getPreferenceById, getPreferencesBySection } from '@/lib/editor/preferences'
import { getSectionsForBirthType } from '@/lib/editor/sections'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface OmittedOption {
  sectionId: string
  sectionTitle: string
  preferenceId: string
  preferenceTitle: string
}

interface OmittedOptionsPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function OmittedOptionsPopup({ isOpen, onClose }: OmittedOptionsPopupProps) {
  const { state, setPreference } = useEditor()

  const omittedBySection = useMemo(() => {
    const result: Record<string, OmittedOption[]> = {}
    const visibleSections = getSectionsForBirthType(state.birthType, state.birthVenue)

    visibleSections.forEach(section => {
      const sectionState = state.sections[section.id]
      if (!sectionState) return

      const visiblePrefs = getPreferencesBySection(section.id, state.birthType, state.birthVenue)
      const visiblePrefIds = new Set(visiblePrefs.map(p => p.id))

      sectionState.preferences.forEach(prefValue => {
        if (!prefValue.isOmitted) return
        if (!visiblePrefIds.has(prefValue.preferenceId)) return

        const prefDef = getPreferenceById(prefValue.preferenceId)
        if (!prefDef) return

        if (!result[section.displayTitle]) {
          result[section.displayTitle] = []
        }

        result[section.displayTitle].push({
          sectionId: section.id,
          sectionTitle: section.displayTitle,
          preferenceId: prefValue.preferenceId,
          preferenceTitle: prefValue.customTitle || prefDef.title,
        })
      })
    })

    return result
  }, [state.sections, state.birthType])

  const totalOmitted = Object.values(omittedBySection).reduce(
    (sum, items) => sum + items.length,
    0
  )

  const handleInclude = (sectionId: string, preferenceId: string) => {
    setPreference(sectionId as any, preferenceId, { isOmitted: false })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Omitted Decisions</DialogTitle>
          <DialogDescription>
            {totalOmitted === 0
              ? 'All decisions are included in your plan.'
              : `${totalOmitted} decision${totalOmitted === 1 ? '' : 's'} removed from your plan. Click "Include" to add any back.`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-2">
          {totalOmitted === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <p>Every decision is already in your birth plan.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {Object.entries(omittedBySection).map(([sectionTitle, items]) => (
                <div key={sectionTitle}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {sectionTitle}
                  </h4>
                  <div className="space-y-1.5">
                    {items.map(item => (
                      <div
                        key={item.preferenceId}
                        className="flex items-center justify-between gap-3 py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <span className="text-sm">{item.preferenceTitle}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs gap-1 flex-shrink-0 text-primary hover:text-primary"
                          onClick={() => handleInclude(item.sectionId, item.preferenceId)}
                        >
                          <Plus className="h-3 w-3" />
                          Include
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
