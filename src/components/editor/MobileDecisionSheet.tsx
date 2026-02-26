'use client'

import { useState } from 'react'
import { SectionBrowser } from './SectionBrowser'
import { DecisionDetail } from './DecisionDetail'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

interface MobileDecisionSheetProps {
  isOpen: boolean
  onClose: () => void
  selectedPreferenceId?: string | null
  onClearSelection?: () => void
  expandSection?: EditorSectionId | null
}

export function MobileDecisionSheet({
  isOpen,
  onClose,
  selectedPreferenceId,
  onClearSelection,
  expandSection,
}: MobileDecisionSheetProps) {
  const [detailView, setDetailView] = useState<{ sectionId: EditorSectionId; preferenceId: string } | null>(null)

  const handleSelectPreference = (sectionId: EditorSectionId, preferenceId: string) => {
    setDetailView({ sectionId, preferenceId })
  }

  const handleBack = () => {
    setDetailView(null)
    onClearSelection?.()
  }

  const handleClose = () => {
    setDetailView(null)
    onClose()
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="flex flex-row items-center justify-between pb-2">
          <DrawerTitle className="text-base">
            {detailView ? 'Decision Detail' : 'Birth Plan Decisions'}
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="sm">
              Done
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          {detailView ? (
            <DecisionDetail
              sectionId={detailView.sectionId}
              preferenceId={detailView.preferenceId}
              onBack={handleBack}
            />
          ) : (
            <SectionBrowser
              onSelectPreference={handleSelectPreference}
              selectedPreferenceId={selectedPreferenceId}
              expandSection={expandSection}
            />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
