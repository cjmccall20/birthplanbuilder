'use client'

import { useEditor } from '@/lib/editor/context'
import { Button } from '@/components/ui/button'
import { IconPicker, getIconComponent } from './IconPicker'
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Circle,
  Trash2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

interface CustomDecisionDetailProps {
  sectionId: EditorSectionId
  customItemId: string
  onBack: () => void
}

export function CustomDecisionDetail({ sectionId, customItemId, onBack }: CustomDecisionDetailProps) {
  const { state, updateCustomItem, removeCustomItem } = useEditor()

  const section = state.sections[sectionId]
  const item = section?.customItems.find(i => i.id === customItemId)
  if (!item) return null

  const currentStance = item.stance ?? null
  const currentIcon = item.customIcon || 'Circle'
  const ItemIcon = getIconComponent(currentIcon)

  const handleStanceChange = (stance: 'desired' | 'declined' | null) => {
    updateCustomItem(sectionId, customItemId, { stance })
  }

  const handleIconChange = (icon: string) => {
    updateCustomItem(sectionId, customItemId, { customIcon: icon })
  }

  const handleDelete = () => {
    removeCustomItem(sectionId, customItemId)
    onBack()
  }

  return (
    <div className="space-y-4">
      {/* Back button */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>

      {/* Header with icon */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <ItemIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base">Custom Decision</h3>
        </div>
      </div>

      {/* Title */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-1.5">Title:</p>
        <input
          type="text"
          value={item.title}
          onChange={e => updateCustomItem(sectionId, customItemId, { title: e.target.value })}
          placeholder="Decision title"
          className={cn(
            'w-full p-3 rounded-md border bg-white text-sm font-medium',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            'placeholder:text-muted-foreground/50'
          )}
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

      {/* Custom Icon */}
      <div className="flex items-center gap-3 pt-2 border-t">
        <p className="text-xs font-medium text-muted-foreground">Custom icon:</p>
        <IconPicker value={currentIcon} onChange={handleIconChange} />
      </div>

      {/* Text editor */}
      <div className="pt-2 border-t">
        <p className="text-xs font-medium text-muted-foreground mb-1.5">Birth plan text:</p>
        <textarea
          value={item.text}
          onChange={e => updateCustomItem(sectionId, customItemId, { text: e.target.value })}
          placeholder="What would you like your birth plan to say?"
          className={cn(
            'w-full min-h-[100px] p-3 rounded-md border bg-white text-sm',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            'placeholder:text-muted-foreground/50'
          )}
        />
        <p className="text-xs text-muted-foreground mt-1">
          This is the exact text that will appear in your birth plan PDF.
        </p>
      </div>

      {/* Delete */}
      <div className="pt-2 border-t">
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-1.5"
          onClick={handleDelete}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete custom decision
        </Button>
      </div>
    </div>
  )
}
