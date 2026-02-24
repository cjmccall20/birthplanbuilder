'use client'

import { useMemo } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useEditor } from '@/lib/editor/context'
import { getPreferencesBySection } from '@/lib/editor/preferences'
import { DraggableItem } from './DraggableItem'
import { PreferenceItem } from './PreferenceItem'
import { CustomItemInput } from './CustomItemInput'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

interface SectionPanelProps {
  sectionId: EditorSectionId
}

export function SectionPanel({ sectionId }: SectionPanelProps) {
  const {
    state,
    setPreference,
    addCustomItem,
    removeCustomItem,
    setSectionNotes,
    reorderPreferences,
    reorderCustomItems,
  } = useEditor()

  const section = state.sections[sectionId]
  const preferenceDefinitions = useMemo(
    () => getPreferencesBySection(sectionId, state.birthType, state.birthVenue),
    [sectionId, state.birthType, state.birthVenue]
  )

  // Create sorted arrays of preference IDs and custom item IDs
  const sortedPreferences = useMemo(() => {
    const prefs = [...section.preferences].sort((a, b) => a.sortOrder - b.sortOrder)
    return prefs
  }, [section.preferences])

  const sortedCustomItems = useMemo(() => {
    const items = [...section.customItems].sort((a, b) => a.sortOrder - b.sortOrder)
    return items
  }, [section.customItems])

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handlePreferenceDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = sortedPreferences.findIndex((p) => p.preferenceId === active.id)
      const newIndex = sortedPreferences.findIndex((p) => p.preferenceId === over.id)

      const newOrder = [...sortedPreferences]
      const [moved] = newOrder.splice(oldIndex, 1)
      newOrder.splice(newIndex, 0, moved)

      reorderPreferences(
        sectionId,
        newOrder.map((p) => p.preferenceId)
      )
    }
  }

  const handleCustomItemDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = sortedCustomItems.findIndex((item) => item.id === active.id)
      const newIndex = sortedCustomItems.findIndex((item) => item.id === over.id)

      const newOrder = [...sortedCustomItems]
      const [moved] = newOrder.splice(oldIndex, 1)
      newOrder.splice(newIndex, 0, moved)

      reorderCustomItems(
        sectionId,
        newOrder.map((item) => item.id)
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Standard Preferences */}
      {preferenceDefinitions.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Standard Preferences
          </h3>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handlePreferenceDragEnd}
          >
            <SortableContext
              items={sortedPreferences.map((p) => p.preferenceId)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {preferenceDefinitions.map((prefDef) => {
                  const value = section.preferences.find(
                    (p) => p.preferenceId === prefDef.id
                  )

                  return (
                    <DraggableItem key={prefDef.id} id={prefDef.id}>
                      <PreferenceItem
                        preference={prefDef}
                        value={value}
                        onUpdate={(updates) =>
                          setPreference(sectionId, prefDef.id, updates)
                        }
                      />
                    </DraggableItem>
                  )
                })}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {/* Custom Items */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Custom Items
        </h3>

        {sortedCustomItems.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleCustomItemDragEnd}
          >
            <SortableContext
              items={sortedCustomItems.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {sortedCustomItems.map((item) => (
                  <DraggableItem key={item.id} id={item.id}>
                    <Card>
                      <CardContent className="pt-4 pb-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="font-medium text-sm">{item.title}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCustomItem(sectionId, item.id)}
                              className="shrink-0 h-auto p-1"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.text}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </DraggableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        <CustomItemInput
          onAdd={(title, text) => addCustomItem(sectionId, title, text)}
        />
      </div>

      {/* Section Notes */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Additional Notes
        </h3>
        <div className="space-y-2">
          <Label htmlFor={`${sectionId}-notes`} className="text-xs">
            Add any additional notes or preferences for this section
          </Label>
          <Textarea
            id={`${sectionId}-notes`}
            value={section.notes}
            onChange={(e) => setSectionNotes(sectionId, e.target.value)}
            placeholder="Optional: Add any additional notes or special requests..."
            rows={4}
            className="resize-none"
          />
        </div>
      </div>
    </div>
  )
}
