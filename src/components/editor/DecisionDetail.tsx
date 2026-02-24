'use client'

import { useState, useMemo } from 'react'
import { useEditor } from '@/lib/editor/context'
import { getPreferenceById } from '@/lib/editor/preferences'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { IconPicker, getIconComponent } from './IconPicker'
import {
  ArrowLeft,
  AlertTriangle,
  Check,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronRight,
  Circle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

interface DecisionDetailProps {
  sectionId: EditorSectionId
  preferenceId: string
  onBack: () => void
}

export function DecisionDetail({ sectionId, preferenceId, onBack }: DecisionDetailProps) {
  const { state, setPreference, setStance, setCustomIcon } = useEditor()
  const [showLearnMore, setShowLearnMore] = useState(false)

  const prefDef = getPreferenceById(preferenceId)
  if (!prefDef) return null

  const section = state.sections[sectionId]
  const value = section?.preferences.find(p => p.preferenceId === preferenceId)
  const isIncluded = !value?.isOmitted
  const selectedOption = prefDef.options.find(o => o.value === value?.selectedOption)
  const defaultBirthPlanText = selectedOption?.birthPlanText || ''
  const currentBirthPlanText = value?.customText || defaultBirthPlanText
  const hasCustomText = value?.customText && value.customText !== defaultBirthPlanText
  const currentStance = value?.stance ?? null
  const currentIcon = value?.customIcon || prefDef.icon || 'Circle'

  const multiSelectLines = useMemo(() => {
    if (!value?.customText) return null
    const lines = value.customText.split('\n').filter(Boolean)
    if (lines.length <= 1) return null

    // Count how many lines match known option birthPlanTexts
    const matchCount = lines.filter(line =>
      prefDef.options.some(opt => opt.birthPlanText === line)
    ).length

    // Consider it multi-select if at least 2 lines match options
    if (matchCount >= 2) return lines
    return null
  }, [value?.customText, prefDef.options])

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

  return (
    <div className="space-y-4">
      {/* Back button + title */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>

      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <PrefIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base">{prefDef.title}</h3>
          {selectedOption && (
            <Badge variant="secondary" className="text-xs mt-1">{selectedOption.label}</Badge>
          )}
        </div>
        <Switch
          checked={isIncluded}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-primary"
        />
      </div>

      {/* Stance Toggle */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Stance indicator (shows on birth plan):</p>
        <div className="flex gap-2">
          <button
            onClick={() => handleStanceChange(currentStance === 'desired' ? null : 'desired')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors',
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
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors',
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
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors',
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
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors',
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

      {/* Option Selection */}
      <div>
        {multiSelectLines ? (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Multiple options selected - toggle each to add or remove:
            </p>
            {prefDef.options.filter(opt => opt.birthPlanText).map(option => {
              const isChecked = multiSelectLines.includes(option.birthPlanText)
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    let newLines: string[]
                    if (isChecked) {
                      newLines = multiSelectLines.filter(l => l !== option.birthPlanText)
                    } else {
                      newLines = [...multiSelectLines, option.birthPlanText]
                    }
                    if (newLines.length === 0) {
                      // All unchecked - revert to single select with first option
                      setPreference(sectionId, prefDef.id, {
                        selectedOption: option.value,
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
                  }}
                  className={cn(
                    'w-full text-left p-3 rounded-md border transition-all',
                    'hover:bg-muted/50',
                    isChecked
                      ? 'border-primary bg-primary/5'
                      : 'border-transparent bg-muted/20'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      'w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center',
                      isChecked ? 'bg-primary border-primary' : 'border-gray-300'
                    )}>
                      {isChecked && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div>
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
                    'w-full text-left p-3 rounded-md border transition-all',
                    'hover:bg-muted/50',
                    value?.selectedOption === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-transparent bg-white'
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
            {prefDef.options.filter(o => o.birthPlanText).length > 2 && (
              <button
                onClick={() => {
                  const currentOpt = prefDef.options.find(o => o.value === value?.selectedOption)
                  if (currentOpt?.birthPlanText) {
                    setPreference(sectionId, prefDef.id, {
                      customText: currentOpt.birthPlanText,
                    })
                  }
                }}
                className="text-xs text-muted-foreground hover:text-primary transition-colors mt-2"
              >
                Select multiple options
              </button>
            )}
          </>
        )}
      </div>

      {/* Custom Icon */}
      <div className="flex items-center gap-3 pt-2 border-t">
        <p className="text-xs font-medium text-muted-foreground">Custom icon:</p>
        <IconPicker value={currentIcon} onChange={handleIconChange} />
      </div>

      {/* Learn More */}
      {prefDef.description && prefDef.description.length > 100 && (
        <div className="pt-2 border-t">
          <button
            onClick={() => setShowLearnMore(!showLearnMore)}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <span className="font-medium">Learn more</span>
            {showLearnMore ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          {showLearnMore && (
            <div className="mt-2 p-3 bg-muted/30 rounded-md">
              <p className="text-sm text-muted-foreground leading-relaxed">{prefDef.description}</p>
            </div>
          )}
        </div>
      )}

      {/* Custom Text Editor */}
      {selectedOption && (
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground">Customize the birth plan text:</p>
            {hasCustomText && (
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={handleResetToDefault}>
                Reset to default
              </Button>
            )}
          </div>
          <textarea
            value={currentBirthPlanText}
            onChange={e => handleCustomTextChange(e.target.value)}
            placeholder={defaultBirthPlanText}
            className={cn(
              'w-full min-h-[80px] p-3 rounded-md border bg-white text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
              'placeholder:text-muted-foreground/50'
            )}
          />
          <p className="text-xs text-muted-foreground mt-1">
            This is the exact text that will appear in your birth plan PDF.
          </p>
        </div>
      )}
    </div>
  )
}
