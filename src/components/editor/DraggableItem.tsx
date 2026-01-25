'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DraggableItemProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function DraggableItem({ id, children, className }: DraggableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-start gap-2 group',
        isDragging && 'opacity-50 z-50',
        className
      )}
    >
      <button
        type="button"
        className={cn(
          'mt-3 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors',
          'opacity-0 group-hover:opacity-100 focus-visible:opacity-100'
        )}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" />
      </button>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
