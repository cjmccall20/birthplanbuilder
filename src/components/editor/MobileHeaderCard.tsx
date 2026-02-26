'use client'

import { useEditor } from '@/lib/editor/context'
import { FileText, Calendar, Building, User, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileHeaderCardProps {
  onEdit: () => void
}

export function MobileHeaderCard({ onEdit }: MobileHeaderCardProps) {
  const { state } = useEditor()

  const motherName = state.birthTeam.fields.find(f => f.id === 'mother')?.value || ''
  const dueDate = state.birthTeam.due_date || ''
  const hospital = state.birthTeam.fields.find(f => f.id === 'hospital')?.value || ''

  // Build a concise info line from available fields
  const infoItems: string[] = []
  if (motherName) infoItems.push(motherName)
  if (dueDate) infoItems.push(`Due: ${dueDate}`)
  if (hospital) infoItems.push(hospital)

  return (
    <button
      onClick={onEdit}
      className="w-full bg-white rounded-xl border shadow-sm p-4 flex items-center gap-3 text-left active:bg-muted/30 transition-colors"
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <FileText className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="font-semibold text-base truncate">
          {state.title || 'My Birth Plan'}
        </h2>
        {infoItems.length > 0 ? (
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {infoItems.join(' - ')}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground mt-0.5">
            Tap to edit plan details
          </p>
        )}
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    </button>
  )
}
