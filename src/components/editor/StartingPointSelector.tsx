'use client'

import { Leaf, FileText, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type StartingPoint = 'natural' | 'blank' | 'hospital'

interface StartingPointSelectorProps {
  onSelect: (point: StartingPoint) => void
}

const options: {
  id: StartingPoint
  title: string
  description: string
  icon: typeof Leaf
  accent: string
  border: string
}[] = [
  {
    id: 'natural',
    title: 'Start Natural',
    description: 'Pre-filled with minimal-intervention preferences. Delayed cord clamping, immediate skin-to-skin, freedom of movement, and more.',
    icon: Leaf,
    accent: 'text-emerald-600',
    border: 'hover:border-emerald-400 hover:bg-emerald-50/50',
  },
  {
    id: 'blank',
    title: 'Start Blank',
    description: 'Empty slate. Build your birth plan from scratch, one decision at a time.',
    icon: FileText,
    accent: 'text-slate-600',
    border: 'hover:border-slate-400 hover:bg-slate-50/50',
  },
  {
    id: 'hospital',
    title: 'Standard Hospital',
    description: 'Pre-filled with typical hospital protocols. Continuous monitoring, standard procedures, provider-guided decisions.',
    icon: Building2,
    accent: 'text-blue-600',
    border: 'hover:border-blue-400 hover:bg-blue-50/50',
  },
]

export function StartingPointSelector({ onSelect }: StartingPointSelectorProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-semibold mb-2">
            How would you like to start?
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            Pick a starting point — you can change every detail in the editor.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {options.map((opt) => {
            const Icon = opt.icon
            return (
              <button
                key={opt.id}
                onClick={() => onSelect(opt.id)}
                className={cn(
                  'flex flex-col items-center text-center p-6 rounded-xl border-2 border-border bg-white',
                  'transition-all duration-200 cursor-pointer',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  opt.border
                )}
              >
                <div className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center mb-4',
                  opt.accent,
                  opt.id === 'natural' && 'bg-emerald-100',
                  opt.id === 'blank' && 'bg-slate-100',
                  opt.id === 'hospital' && 'bg-blue-100',
                )}>
                  <Icon className="w-7 h-7" />
                </div>
                <h2 className="font-semibold text-base mb-2">{opt.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {opt.description}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
