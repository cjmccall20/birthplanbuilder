'use client'

import { useEditor } from '@/lib/editor/context'
import { CheckCircle2, AlertTriangle, XCircle, EyeOff, Eye, Pencil, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

interface MobileContextBarProps {
  sectionId: EditorSectionId
  preferenceId: string
  onEditDetails: () => void
  onDismiss: () => void
}

export function MobileContextBar({ sectionId, preferenceId, onEditDetails, onDismiss }: MobileContextBarProps) {
  const { state, setStance, setPreference } = useEditor()

  const section = state.sections[sectionId]
  const prefValue = section?.preferences.find(p => p.preferenceId === preferenceId)
  const currentStance = prefValue?.stance ?? null
  const isOmitted = prefValue?.isOmitted ?? false

  const stanceOptions = [
    { value: 'desired' as const, label: 'Desired', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
    { value: 'cautious' as const, label: 'Cautious', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200' },
    { value: 'declined' as const, label: 'Declined', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50 border-red-200' },
  ]

  const handleStance = (stance: 'desired' | 'cautious' | 'declined') => {
    setStance(sectionId, preferenceId, currentStance === stance ? null : stance)
  }

  const handleToggleOmit = () => {
    setPreference(sectionId, preferenceId, { isOmitted: !isOmitted })
  }

  return (
    <div className={cn(
      'fixed left-0 right-0 z-40',
      'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80',
      'border-t shadow-[0_-2px_10px_rgba(0,0,0,0.06)]',
      'animate-in slide-in-from-bottom-2 duration-200',
      'bottom-[calc(60px+env(safe-area-inset-bottom))]'
    )}>
      <div className="flex items-center gap-1.5 px-3 h-[48px]">
        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="p-1.5 rounded-md hover:bg-gray-100 text-muted-foreground flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Stance pills */}
        <div className="flex items-center gap-1 flex-1 overflow-x-auto">
          {stanceOptions.map(({ value, label, icon: Icon, color, bg }) => (
            <button
              key={value}
              onClick={() => handleStance(value)}
              className={cn(
                'flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-colors flex-shrink-0',
                currentStance === value
                  ? bg
                  : 'border-gray-200 text-muted-foreground hover:bg-gray-50'
              )}
            >
              <Icon className={cn('h-3.5 w-3.5', currentStance === value ? color : '')} />
              {label}
            </button>
          ))}
        </div>

        {/* Omit toggle */}
        <button
          onClick={handleToggleOmit}
          className={cn(
            'p-2 rounded-md transition-colors flex-shrink-0',
            isOmitted ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100 text-muted-foreground'
          )}
          title={isOmitted ? 'Include in plan' : 'Hide from plan'}
        >
          {isOmitted ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </button>

        {/* Edit details button */}
        <button
          onClick={onEditDetails}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium flex-shrink-0"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>
      </div>
    </div>
  )
}
