'use client'

import { useState } from 'react'
import { Leaf, FileText, Building2, Baby, Scissors } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BirthType } from '@/lib/editor/editorTypes'

export type StartingPoint = 'natural' | 'blank' | 'hospital'

interface StartingPointSelectorProps {
  onSelect: (point: StartingPoint, birthType: BirthType) => void
}

const birthTypeOptions: {
  id: BirthType
  title: string
  description: string
  icon: typeof Baby
  accent: string
  border: string
}[] = [
  {
    id: 'vaginal',
    title: 'Vaginal Birth',
    description: 'Planning a vaginal delivery. Your plan will include labor preferences, pushing positions, and a C-section contingency section.',
    icon: Baby,
    accent: 'text-rose-600',
    border: 'hover:border-rose-400 hover:bg-rose-50/50',
  },
  {
    id: 'planned_csection',
    title: 'Planned C-Section',
    description: 'Planning a cesarean delivery. Your plan will focus on C-section preferences, recovery, and skip the labor section.',
    icon: Scissors,
    accent: 'text-violet-600',
    border: 'hover:border-violet-400 hover:bg-violet-50/50',
  },
]

const presetOptions: {
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
    description: 'Pre-filled with typical hospital protocols. Standard procedures, provider-guided decisions.',
    icon: Building2,
    accent: 'text-blue-600',
    border: 'hover:border-blue-400 hover:bg-blue-50/50',
  },
]

export function StartingPointSelector({ onSelect }: StartingPointSelectorProps) {
  const [selectedBirthType, setSelectedBirthType] = useState<BirthType | null>(null)

  if (!selectedBirthType) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-serif font-semibold mb-2">
              What type of birth are you planning?
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
              This shapes which sections appear in your plan. You can always change this later.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {birthTypeOptions.map((opt) => {
              const Icon = opt.icon
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedBirthType(opt.id)}
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
                    opt.id === 'vaginal' && 'bg-rose-100',
                    opt.id === 'planned_csection' && 'bg-violet-100',
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

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <button
            onClick={() => setSelectedBirthType(null)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block"
          >
            &larr; Change birth type
          </button>
          <h1 className="text-2xl sm:text-3xl font-serif font-semibold mb-2">
            How would you like to start?
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            Pick a starting point - you can change every detail in the editor.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {presetOptions.map((opt) => {
            const Icon = opt.icon
            return (
              <button
                key={opt.id}
                onClick={() => onSelect(opt.id, selectedBirthType)}
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
