'use client'

import { LayoutList, PlusCircle, Eye, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileToolbarProps {
  onSections: () => void
  onAdd: () => void
  onPreview: () => void
  onMore: () => void
  decisionsIncluded: number
  totalDecisions: number
}

interface ToolbarButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  badge?: string
}

function ToolbarButton({ icon, label, onClick, badge }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 active:opacity-70 transition-opacity relative"
    >
      <div className="relative">
        {icon}
        {badge && (
          <span className="absolute -top-1.5 -right-3 text-[9px] font-medium bg-primary text-primary-foreground px-1 rounded-full min-w-[16px] text-center leading-[16px]">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] text-muted-foreground font-medium">{label}</span>
    </button>
  )
}

export function MobileToolbar({
  onSections,
  onAdd,
  onPreview,
  onMore,
  decisionsIncluded,
  totalDecisions,
}: MobileToolbarProps) {
  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 z-40',
      'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80',
      'border-t shadow-[0_-2px_10px_rgba(0,0,0,0.06)]'
    )}>
      <div className="flex items-center h-[60px]">
        <ToolbarButton
          icon={<LayoutList className="h-5 w-5 text-foreground" />}
          label="Sections"
          onClick={onSections}
          badge={`${decisionsIncluded}/${totalDecisions}`}
        />
        <ToolbarButton
          icon={<PlusCircle className="h-5 w-5 text-foreground" />}
          label="Add"
          onClick={onAdd}
        />
        <ToolbarButton
          icon={<Eye className="h-5 w-5 text-foreground" />}
          label="Preview"
          onClick={onPreview}
        />
        <ToolbarButton
          icon={<MoreHorizontal className="h-5 w-5 text-foreground" />}
          label="More"
          onClick={onMore}
        />
      </div>
      {/* Safe area bottom padding */}
      <div className="pb-[env(safe-area-inset-bottom)]" />
    </div>
  )
}
