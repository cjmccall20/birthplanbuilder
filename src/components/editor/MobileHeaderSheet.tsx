'use client'

import { useEditor } from '@/lib/editor/context'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer'
import { FileText, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { templateStyles } from '@/types'
import { canvasThemes } from '@/lib/editor/canvasThemes'

interface MobileHeaderSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileHeaderSheet({ isOpen, onClose }: MobileHeaderSheetProps) {
  const {
    state,
    setTitle,
    setTemplate,
    setBirthTeam,
    setBirthTeamField,
    addBirthTeamField,
    removeBirthTeamField,
    renameBirthTeamField,
    setBirthType,
    setBirthVenue,
  } = useEditor()

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-left pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <DrawerTitle className="text-base flex-1">Plan Details</DrawerTitle>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5">
          {/* Plan title */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Plan Title</label>
            <Input
              value={state.title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Birth Plan"
              className="min-h-[44px] text-base font-semibold"
            />
          </div>

          {/* Birth type toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Birth Type</label>
            <div className="flex gap-2">
              <Button
                variant={state.birthType === 'vaginal' ? 'default' : 'outline'}
                className="flex-1 h-10 text-sm"
                onClick={() => setBirthType('vaginal')}
              >
                Vaginal Birth
              </Button>
              <Button
                variant={state.birthType === 'planned_csection' ? 'default' : 'outline'}
                className="flex-1 h-10 text-sm"
                onClick={() => setBirthType('planned_csection')}
              >
                C-Section
              </Button>
            </div>
          </div>

          {/* Birth venue (only for vaginal) */}
          {state.birthType === 'vaginal' && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Birth Venue</label>
              <div className="flex gap-2">
                {([
                  { value: 'hospital', label: 'Hospital' },
                  { value: 'birth_center', label: 'Birth Center' },
                  { value: 'home', label: 'Home' },
                ] as const).map((venue) => (
                  <button
                    key={venue.value}
                    onClick={() => setBirthVenue(venue.value)}
                    className={cn(
                      'flex-1 h-10 px-2 text-sm rounded-lg border transition-colors font-medium',
                      state.birthVenue === venue.value
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-white text-muted-foreground border-border hover:border-foreground/30'
                    )}
                  >
                    {venue.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Birth team fields */}
          <div className="space-y-3">
            <label className="text-xs font-medium text-muted-foreground">Birth Team</label>
            {state.birthTeam.fields.map(field => (
              <div key={field.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Input
                    value={field.label}
                    onChange={(e) => renameBirthTeamField(field.id, e.target.value)}
                    className="h-7 text-xs font-semibold uppercase tracking-wide text-muted-foreground w-24 flex-shrink-0 border-0 bg-transparent px-0 focus-visible:ring-0"
                  />
                  {!field.isDefault && (
                    <button
                      onClick={() => removeBirthTeamField(field.id)}
                      className="p-1 rounded hover:bg-muted/50 transition-colors text-muted-foreground hover:text-red-500 flex-shrink-0"
                      aria-label="Remove field"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <Input
                  value={field.value}
                  onChange={(e) => setBirthTeamField(field.id, e.target.value)}
                  placeholder={`${field.label}'s name`}
                  className="min-h-[44px]"
                />
              </div>
            ))}

            {/* Due date */}
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Due Date
              </span>
              <Input
                type="date"
                value={state.birthTeam.due_date || ''}
                onChange={(e) => setBirthTeam({ due_date: e.target.value })}
                className="min-h-[44px]"
              />
            </div>

            {/* Add field button */}
            <button
              onClick={() => addBirthTeamField('New Field')}
              className="flex items-center gap-1.5 text-xs text-primary font-medium hover:text-primary/80 transition-colors py-1"
            >
              <Plus className="h-3.5 w-3.5" />
              Add team member
            </button>
          </div>

          {/* Theme selector */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {templateStyles.map(t => {
                const themeColor = canvasThemes[t.id]?.primaryColor
                const isActive = state.templateStyle === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 p-2.5 rounded-lg border transition-all',
                      isActive
                        ? 'ring-2 ring-primary border-primary bg-primary/5'
                        : 'border-border hover:border-foreground/30'
                    )}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-black/10"
                      style={{ backgroundColor: themeColor }}
                    />
                    <span className="text-[11px] font-medium text-center leading-tight">
                      {t.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <DrawerFooter>
          <Button onClick={onClose} className="w-full">
            Done
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
