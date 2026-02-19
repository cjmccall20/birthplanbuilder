'use client'

import { useState } from 'react'
import { useEditor } from '@/lib/editor/context'
import { getPreferenceById } from '@/lib/editor/preferences'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'
import { Check, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

interface MobileItemSheetProps {
  preferenceId: string | null
  sectionId: EditorSectionId | null
  isOpen: boolean
  onClose: () => void
}

export function MobileItemSheet({ preferenceId, sectionId, isOpen, onClose }: MobileItemSheetProps) {
  const { state, setPreference } = useEditor()
  const [showLearnMore, setShowLearnMore] = useState(false)

  if (!preferenceId || !sectionId) return null

  const prefDef = getPreferenceById(preferenceId)
  if (!prefDef) return null

  const section = state.sections[sectionId]
  const value = section?.preferences.find(p => p.preferenceId === preferenceId)
  const isIncluded = !value?.isOmitted
  const selectedOption = prefDef.options.find(o => o.value === value?.selectedOption)
  const defaultBirthPlanText = selectedOption?.birthPlanText || ''
  const currentBirthPlanText = value?.customText || defaultBirthPlanText
  const hasCustomText = value?.customText && value.customText !== defaultBirthPlanText

  const handleToggle = (checked: boolean) => {
    setPreference(sectionId, preferenceId, { isOmitted: !checked })
  }

  const handleSelectOption = (optionValue: string) => {
    setPreference(sectionId, preferenceId, {
      selectedOption: optionValue,
      customText: undefined,
      isOmitted: false,
    })
  }

  const handleCustomTextChange = (text: string) => {
    setPreference(sectionId, preferenceId, { customText: text || undefined })
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-left pb-2">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-base">{prefDef.title}</DrawerTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {isIncluded ? 'Included' : 'Omitted'}
              </span>
              <Switch
                checked={isIncluded}
                onCheckedChange={handleToggle}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
          {selectedOption && isIncluded && (
            <DrawerDescription className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">{selectedOption.label}</Badge>
              {hasCustomText && (
                <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">Customized</Badge>
              )}
            </DrawerDescription>
          )}
        </DrawerHeader>

        <div className="px-4 pb-6 overflow-y-auto space-y-4">
          {/* Option Selection */}
          <div className="grid gap-2">
            {prefDef.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option.value)}
                className={cn(
                  'w-full text-left p-3 rounded-lg border transition-all min-h-[44px]',
                  value?.selectedOption === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white hover:bg-muted/50'
                )}
              >
                <div className="flex items-center gap-2">
                  {value?.selectedOption === option.value && (
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  )}
                  <div className={value?.selectedOption === option.value ? '' : 'ml-6'}>
                    <span className="font-medium text-sm">{option.label}</span>
                    {option.birthPlanText && (
                      <p className="text-xs text-muted-foreground mt-0.5">{option.birthPlanText}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Learn More */}
          {prefDef.description && prefDef.description.length > 100 && (
            <div className="pt-2 border-t">
              <button
                onClick={() => setShowLearnMore(!showLearnMore)}
                className="flex items-center gap-2 text-sm text-primary"
              >
                <span className="font-medium">Learn more</span>
                {showLearnMore ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              {showLearnMore && (
                <p className="mt-2 p-3 bg-muted/30 rounded-md text-sm text-muted-foreground leading-relaxed">
                  {prefDef.description}
                </p>
              )}
            </div>
          )}

          {/* Custom Text */}
          {selectedOption && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground">Customize text:</p>
                {hasCustomText && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => handleCustomTextChange('')}
                  >
                    Reset
                  </Button>
                )}
              </div>
              <textarea
                value={currentBirthPlanText}
                onChange={(e) => handleCustomTextChange(e.target.value)}
                className="w-full min-h-[80px] p-3 rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
