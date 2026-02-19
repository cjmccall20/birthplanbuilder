'use client'

import { DecisionChecklist } from './DecisionChecklist'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'

interface MobileDecisionSheetProps {
  isOpen: boolean
  onClose: () => void
  selectedPreferenceId?: string | null
  onClearSelection?: () => void
}

export function MobileDecisionSheet({
  isOpen,
  onClose,
  selectedPreferenceId,
  onClearSelection,
}: MobileDecisionSheetProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="flex flex-row items-center justify-between pb-2">
          <DrawerTitle className="text-base">Birth Plan Decisions</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="sm">
              Done
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <DecisionChecklist
            selectedPreferenceId={selectedPreferenceId}
            onClearSelection={onClearSelection}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
