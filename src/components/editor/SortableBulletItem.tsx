'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

interface SortableBulletItemProps {
  id: string
  children: React.ReactNode
}

export function SortableBulletItem({ id, children }: SortableBulletItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-1 group">
      <div className="flex-1">{children}</div>
      <button
        {...attributes}
        {...listeners}
        className="flex-shrink-0 p-0.5 opacity-0 group-hover:opacity-50 hover:!opacity-100 cursor-grab active:cursor-grabbing transition-opacity"
        tabIndex={-1}
      >
        <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
    </div>
  )
}
