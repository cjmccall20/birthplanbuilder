'use client'

import { DecisionDetail } from './DecisionDetail'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

interface MobileItemSheetProps {
  preferenceId: string | null
  sectionId: EditorSectionId | null
  isOpen: boolean
  onClose: () => void
}

export function MobileItemSheet({ preferenceId, sectionId, isOpen, onClose }: MobileItemSheetProps) {
  if (!preferenceId || !sectionId) return null

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-left pb-2">
          <DrawerTitle className="text-base">Edit Decision</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-6 overflow-y-auto">
          <DecisionDetail
            sectionId={sectionId}
            preferenceId={preferenceId}
            onBack={onClose}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
