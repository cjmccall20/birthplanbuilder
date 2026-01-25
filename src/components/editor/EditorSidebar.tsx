'use client'

import { useState } from 'react'
import { useEditor } from '@/lib/editor/context'
import { EDITOR_SECTIONS } from '@/lib/editor/sections'
import type { EditorSectionId } from '@/lib/editor/editorTypes'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Home,
  Activity,
  Baby,
  Stethoscope,
  Building,
  Heart,
  ChevronDown,
  ChevronUp,
  Plus,
  GripVertical,
} from 'lucide-react'

// Map section icon names to lucide-react components
const ICON_MAP = {
  Home,
  Activity,
  Baby,
  Stethoscope,
  Building,
  Heart,
} as const

function CollapsibleSection({
  title,
  icon,
  preferenceCount,
  isOpen,
  onToggle,
  children,
}: {
  title: string
  icon: React.ReactNode
  preferenceCount: number
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <Card className="overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left transition-colors hover:bg-muted/50 min-h-[44px]"
      >
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <div className="flex items-center gap-3">
            <div className="text-primary">{icon}</div>
            <div>
              <CardTitle className="text-base font-medium">{title}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {preferenceCount} {preferenceCount === 1 ? 'preference' : 'preferences'}
              </p>
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </CardHeader>
      </button>
      {isOpen && <CardContent className="px-4 pb-4 pt-0">{children}</CardContent>}
    </Card>
  )
}

export function EditorSidebar() {
  const { state, setBirthTeam, addCustomItem } = useEditor()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    pre_hospital: true,
  })
  const [isBirthTeamOpen, setIsBirthTeamOpen] = useState(false)

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const handleAddCustomItem = (sectionId: EditorSectionId) => {
    const title = prompt('Enter a title for your custom preference:')
    if (!title) return
    const text = prompt('Enter the details:')
    if (!text) return
    addCustomItem(sectionId, title, text)
  }

  return (
    <div className="space-y-4 pb-8">
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl font-bold mb-1">Customize Your Birth Plan</h2>
        <p className="text-sm text-muted-foreground">
          Add preferences for each section below
        </p>
      </div>

      {/* Scrollable sections container */}
      <div className="space-y-3 max-h-none md:max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
        {EDITOR_SECTIONS.map((section) => {
          const sectionState = state.sections[section.id]
          const preferenceCount =
            sectionState.preferences.length + sectionState.customItems.length
          const IconComponent = ICON_MAP[section.icon as keyof typeof ICON_MAP]

          return (
            <CollapsibleSection
              key={section.id}
              title={section.title}
              icon={IconComponent ? <IconComponent className="h-5 w-5" /> : null}
              preferenceCount={preferenceCount}
              isOpen={openSections[section.id] || false}
              onToggle={() => toggleSection(section.id)}
            >
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{section.description}</p>

                {/* Placeholder for preferences list */}
                {sectionState.preferences.length === 0 &&
                  sectionState.customItems.length === 0 && (
                    <p className="text-sm text-muted-foreground italic py-4 text-center">
                      No preferences added yet
                    </p>
                  )}

                {/* Custom items list */}
                {sectionState.customItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}

                {/* Add Custom Item Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full min-h-[44px]"
                  onClick={() => handleAddCustomItem(section.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Item
                </Button>
              </div>
            </CollapsibleSection>
          )
        })}

        {/* Birth Team Section */}
        <CollapsibleSection
          title="Birth Team"
          icon={<Heart className="h-5 w-5" />}
          preferenceCount={0}
          isOpen={isBirthTeamOpen}
          onToggle={() => setIsBirthTeamOpen(!isBirthTeamOpen)}
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Add your birth team information to personalize your plan
            </p>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="mother_name">Your Name</Label>
                <Input
                  id="mother_name"
                  placeholder="Your name"
                  className="min-h-[44px] text-base"
                  value={state.birthTeam.mother_name || ''}
                  onChange={(e) => setBirthTeam({ mother_name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partner_name">Partner's Name</Label>
                <Input
                  id="partner_name"
                  placeholder="Partner's name (optional)"
                  className="min-h-[44px] text-base"
                  value={state.birthTeam.partner_name || ''}
                  onChange={(e) => setBirthTeam({ partner_name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider_name">Provider Name</Label>
                <Input
                  id="provider_name"
                  placeholder="Dr. Smith / Midwife Jane"
                  className="min-h-[44px] text-base"
                  value={state.birthTeam.provider_name || ''}
                  onChange={(e) => setBirthTeam({ provider_name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="due_date">Due Date</Label>
                <Input
                  id="due_date"
                  type="date"
                  className="min-h-[44px] text-base"
                  value={state.birthTeam.due_date || ''}
                  onChange={(e) => setBirthTeam({ due_date: e.target.value })}
                />
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  )
}
