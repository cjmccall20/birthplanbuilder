'use client'

import { useMemo } from 'react'
import { useEditor } from '@/lib/editor/context'
import { getPreferenceById } from '@/lib/editor/preferences'
import { getIconComponent, IconPicker } from './IconPicker'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer'
import {
  Check,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Circle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

interface MobilePreferenceSheetProps {
  sectionId: EditorSectionId | null
  preferenceId: string | null
  isOpen: boolean
  onClose: () => void
}

export function MobilePreferenceSheet({ sectionId, preferenceId, isOpen, onClose }: MobilePreferenceSheetProps) {
  const { state, setPreference, setStance, setCustomIcon } = useEditor()

  const prefDef = preferenceId ? getPreferenceById(preferenceId) : null

  const section = sectionId ? state.sections[sectionId] : null
  const value = section?.preferences.find(p => p.preferenceId === preferenceId)
  const isIncluded = !value?.isOmitted
  const selectedOption = prefDef?.options.find(o => o.value === value?.selectedOption)
  const defaultBirthPlanText = selectedOption?.birthPlanText || ''
  const currentBirthPlanText = value?.customText || defaultBirthPlanText
  const hasCustomText = value?.customText && value.customText !== defaultBirthPlanText
  const currentStance = value?.stance ?? null
  const currentIcon = value?.customIcon || prefDef?.icon || 'Circle'

  // Detect multi-select state (same pattern as DecisionDetail)
  const multiSelectLines = useMemo(() => {
    if (!value?.customText || !prefDef) return null
    const lines = value.customText.split('\n').filter(Boolean)
    if (lines.length <= 1) return null
    const matchCount = lines.filter(line =>
      prefDef.options.some(opt => opt.birthPlanText === line)
    ).length
    if (matchCount >= 2) return lines
    return null
  }, [value?.customText, prefDef])

  if (!prefDef || !sectionId || !preferenceId) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="max-h-[85vh]">
          <div className="p-4" />
        </DrawerContent>
      </Drawer>
    )
  }

  const PrefIcon = getIconComponent(currentIcon)

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

  const handleMultiToggle = (optionBirthPlanText: string, optionValue: string) => {
    if (!multiSelectLines) return
    let newLines: string[]
    const isChecked = multiSelectLines.includes(optionBirthPlanText)
    if (isChecked) {
      newLines = multiSelectLines.filter(l => l !== optionBirthPlanText)
    } else {
      newLines = [...multiSelectLines, optionBirthPlanText]
    }
    if (newLines.length === 0) {
      setPreference(sectionId, prefDef.id, {
        selectedOption: optionValue,
        customText: undefined,
        isOmitted: false,
      })
    } else {
      const firstCheckedOpt = prefDef.options.find(o =>
        newLines.includes(o.birthPlanText)
      )
      setPreference(sectionId, prefDef.id, {
        selectedOption: firstCheckedOpt?.value || value?.selectedOption,
        customText: newLines.join('\n'),
      })
    }
  }

  const handleCustomTextChange = (text: string) => {
    setPreference(sectionId, preferenceId, { customText: text || undefined })
  }

  const handleResetToDefault = () => {
    setPreference(sectionId, preferenceId, { customText: undefined })
  }

  const handleStanceChange = (stance: 'desired' | 'declined' | 'cautious' | null) => {
    setStance(sectionId, preferenceId, stance)
  }

  const handleIconChange = (icon: string) => {
    setCustomIcon(sectionId, preferenceId, icon)
  }

  const handleEnableMultiSelect = () => {
    const currentOpt = prefDef.options.find(o => o.value === value?.selectedOption)
    if (currentOpt?.birthPlanText) {
      setPreference(sectionId, prefDef.id, {
        customText: currentOpt.birthPlanText,
      })
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-left pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <PrefIcon className="h-5 w-5 text-primary" />
            </div>
            <DrawerTitle className="text-base flex-1">{prefDef.title}</DrawerTitle>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
          {/* Include/Omit toggle */}
          <div className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-lg">
            <span className="text-sm font-medium">
              {isIncluded ? 'Included in plan' : 'Hidden from plan'}
            </span>
            <Switch
              checked={isIncluded}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          {/* Stance toggle */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Stance:</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleStanceChange(currentStance === 'desired' ? null : 'desired')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm transition-colors',
                  currentStance === 'desired'
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'border-border hover:bg-muted/50'
                )}
              >
                <CheckCircle2 className="h-4 w-4" />
                Desired
              </button>
              <button
                onClick={() => handleStanceChange(currentStance === 'cautious' ? null : 'cautious')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm transition-colors',
                  currentStance === 'cautious'
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'border-border hover:bg-muted/50'
                )}
              >
                <AlertTriangle className="h-4 w-4" />
                Cautious
              </button>
              <button
                onClick={() => handleStanceChange(currentStance === 'declined' ? null : 'declined')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm transition-colors',
                  currentStance === 'declined'
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'border-border hover:bg-muted/50'
                )}
              >
                <XCircle className="h-4 w-4" />
                Declined
              </button>
              <button
                onClick={() => handleStanceChange(null)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm transition-colors',
                  currentStance === null
                    ? 'bg-muted border-border'
                    : 'border-border hover:bg-muted/50'
                )}
              >
                <Circle className="h-3.5 w-3.5" />
                Neutral
              </button>
            </div>
          </div>

          {/* Option selection */}
          <div>
            {multiSelectLines ? (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Toggle options to add or remove:
                </p>
                {prefDef.options.filter(opt => opt.birthPlanText).map(option => {
                  const isChecked = multiSelectLines.includes(option.birthPlanText)
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleMultiToggle(option.birthPlanText, option.value)}
                      className={cn(
                        'w-full text-left p-3 rounded-lg border transition-all min-h-[48px]',
                        'active:scale-[0.98]',
                        isChecked
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent bg-muted/20'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center',
                          isChecked ? 'bg-primary border-primary' : 'border-gray-300'
                        )}>
                          {isChecked && <Check className="h-3.5 w-3.5 text-white" />}
                        </div>
                        <div className="min-w-0">
                          <span className="font-medium text-sm">{option.label}</span>
                          {option.birthPlanText && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{option.birthPlanText}</p>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <>
                <p className="text-xs font-medium text-muted-foreground mb-2">Select an option:</p>
                <div className="grid gap-2">
                  {prefDef.options.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleSelectOption(option.value)}
                      className={cn(
                        'w-full text-left p-3 rounded-lg border transition-all min-h-[48px]',
                        'active:scale-[0.98]',
                        value?.selectedOption === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent bg-muted/20'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {value?.selectedOption === option.value ? (
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <span className="font-medium text-sm">{option.label}</span>
                          {option.birthPlanText && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{option.birthPlanText}</p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {prefDef.options.filter(o => o.birthPlanText).length > 2 && (
                  <button
                    onClick={handleEnableMultiSelect}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors mt-2"
                  >
                    Select multiple options
                  </button>
                )}
              </>
            )}
          </div>

          {/* Custom text editor */}
          {selectedOption && (
            <div className="space-y-2 pt-2 border-t">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">Customize birth plan text:</p>
                {hasCustomText && (
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={handleResetToDefault}>
                    Reset
                  </Button>
                )}
              </div>
              <textarea
                value={currentBirthPlanText}
                onChange={e => handleCustomTextChange(e.target.value)}
                placeholder={defaultBirthPlanText}
                className={cn(
                  'w-full min-h-[80px] p-3 rounded-lg border bg-white text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                  'placeholder:text-muted-foreground/50'
                )}
              />
            </div>
          )}

          {/* Custom icon */}
          <div className="flex items-center gap-3 pt-2 border-t">
            <p className="text-xs font-medium text-muted-foreground">Custom icon:</p>
            <IconPicker value={currentIcon} onChange={handleIconChange} />
          </div>
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
