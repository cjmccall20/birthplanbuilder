'use client'

import { useEditor } from '@/lib/editor/context'
import { useAuth } from '@/components/auth/AuthProvider'
import { useAutoSave } from '@/lib/editor/useAutoSave'
import { EditorSidebar } from './EditorSidebar'
import { PreviewPanel } from './PreviewPanel'
import { SaveStatus } from './SaveStatus'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { templateStyles } from '@/types'
import { Card } from '@/components/ui/card'

export function EditorLayout() {
  const { state, setTitle, setTemplate, dispatch } = useEditor()
  const { user, isLoading: isAuthLoading } = useAuth()
  const { isSaving, lastSaved, error } = useAutoSave({
    state,
    dispatch,
    user,
    isLoading: isAuthLoading,
  })

  return (
    <div className="container py-6 max-w-7xl px-4 overflow-x-hidden">
      {/* Header with title, template selector, and save status */}
      <div className="mb-6 space-y-4">
        <div className="flex justify-end">
          <SaveStatus
            isSaving={isSaving}
            lastSaved={lastSaved}
            error={error}
            isLoggedIn={!!user}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="plan-title">Birth Plan Title</Label>
            <Input
              id="plan-title"
              placeholder="My Birth Plan"
              className="min-h-[44px] text-base"
              value={state.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="template-style">Template Style</Label>
            <Select value={state.templateStyle} onValueChange={setTemplate}>
              <SelectTrigger id="template-style" className="min-h-[44px] text-base">
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                {templateStyles.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name} - {template.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Layout: Side-by-side panels */}
      <div className="grid gap-6 md:grid-cols-[45%_55%]">
        {/* Left Panel: Editor Sidebar */}
        <div className="order-2 md:order-1">
          <EditorSidebar />
        </div>

        {/* Right Panel: PDF Preview */}
        <div className="order-1 md:order-2">
          <Card className="md:sticky md:top-6 overflow-hidden min-h-[600px] max-h-[800px]">
            <PreviewPanel />
          </Card>
        </div>
      </div>
    </div>
  )
}
