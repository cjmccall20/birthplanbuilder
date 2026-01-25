'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PreferenceDefinition, PreferenceValue } from '@/lib/editor/editorTypes'

interface PreferenceItemProps {
  preference: PreferenceDefinition
  value: PreferenceValue | undefined
  onUpdate: (value: Partial<PreferenceValue>) => void
}

export function PreferenceItem({ preference, value, onUpdate }: PreferenceItemProps) {
  const [showCustom, setShowCustom] = useState(false)
  const [customText, setCustomText] = useState(value?.customText || '')

  const isOmitted = value?.isOmitted || false
  const selectedOption = value?.selectedOption || null

  const handleOptionSelect = (optionValue: string) => {
    onUpdate({ selectedOption: optionValue, isOmitted: false })
  }

  const handleOmit = () => {
    onUpdate({ isOmitted: !isOmitted })
  }

  const handleCustomSubmit = () => {
    if (customText.trim()) {
      onUpdate({ customText: customText.trim(), selectedOption: null, isOmitted: false })
      setShowCustom(false)
    }
  }

  return (
    <Card className={cn(
      'transition-opacity',
      isOmitted && 'opacity-50 border-dashed'
    )}>
      <CardContent className="pt-4 pb-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-medium text-sm">{preference.title}</h4>
              {preference.description && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {preference.description}
                </p>
              )}
            </div>
            <Button
              variant={isOmitted ? 'outline' : 'ghost'}
              size="sm"
              onClick={handleOmit}
              className="shrink-0"
            >
              {isOmitted ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Include
                </>
              ) : (
                <>
                  <X className="h-3 w-3 mr-1" />
                  Omit
                </>
              )}
            </Button>
          </div>

          {!isOmitted && (
            <>
              <RadioGroup
                value={selectedOption || ''}
                onValueChange={handleOptionSelect}
                className="space-y-2"
              >
                {preference.options.map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      'flex items-start space-x-2 p-2 rounded-md transition-colors',
                      selectedOption === option.value && 'bg-muted'
                    )}
                  >
                    <RadioGroupItem value={option.value} id={`${preference.id}-${option.value}`} />
                    <Label
                      htmlFor={`${preference.id}-${option.value}`}
                      className="flex-1 cursor-pointer text-sm font-normal leading-relaxed"
                    >
                      <span className="font-medium">{option.label}</span>
                      {option.birthPlanText && (
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {option.birthPlanText}
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {preference.allowCustom && (
                <div className="pt-2 border-t">
                  {showCustom ? (
                    <div className="space-y-2">
                      <Label htmlFor={`${preference.id}-custom`} className="text-xs">
                        Custom preference
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id={`${preference.id}-custom`}
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value)}
                          placeholder="Enter your custom preference..."
                          className="text-sm"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleCustomSubmit()
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={handleCustomSubmit}
                          disabled={!customText.trim()}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setShowCustom(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {value?.customText ? (
                        <div className="bg-muted p-2 rounded-md">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm">{value.customText}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setCustomText(value.customText || '')
                                setShowCustom(true)
                              }}
                              className="shrink-0 h-auto py-1"
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowCustom(true)}
                          className="w-full text-xs"
                        >
                          Add custom option
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
