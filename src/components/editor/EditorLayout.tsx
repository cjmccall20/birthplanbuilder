'use client'

import { useState } from 'react'
import { useEditor } from '@/lib/editor/context'
import { useAuth } from '@/components/auth/AuthProvider'
import { useAutoSave } from '@/lib/editor/useAutoSave'
import { DecisionChecklist } from './DecisionChecklist'
import { PreviewPanel } from './PreviewPanel'
import { SaveStatus } from './SaveStatus'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { templateStyles } from '@/types'
import { Card } from '@/components/ui/card'
import { ListChecks, Eye, Settings } from 'lucide-react'

export function EditorLayout() {
  const { state, setTitle, setTemplate, dispatch, setBirthTeam } = useEditor()
  const { user, isLoading: isAuthLoading } = useAuth()
  const { isSaving, lastSaved, error } = useAutoSave({
    state,
    dispatch,
    user,
    isLoading: isAuthLoading,
  })
  const [activeTab, setActiveTab] = useState<'decisions' | 'preview' | 'settings'>('decisions')

  return (
    <div className="container py-4 sm:py-6 max-w-7xl px-4 overflow-x-hidden">
      {/* Header with title and save status */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="My Birth Plan"
            className="min-h-[44px] text-lg font-semibold border-0 border-b rounded-none focus:ring-0 px-0"
            value={state.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <SaveStatus
          isSaving={isSaving}
          lastSaved={lastSaved}
          error={error}
          isLoggedIn={!!user}
        />
      </div>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden mb-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="decisions" className="gap-1">
              <ListChecks className="h-4 w-4" />
              <span className="hidden sm:inline">Decisions</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-1">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="decisions" className="mt-4">
            <DecisionChecklist />
          </TabsContent>

          <TabsContent value="preview" className="mt-4">
            <Card className="overflow-hidden min-h-[500px]">
              <PreviewPanel />
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <SettingsPanel
              state={state}
              setTemplate={setTemplate}
              setBirthTeam={setBirthTeam}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop Layout: Side-by-side panels */}
      <div className="hidden md:grid gap-6 md:grid-cols-[55%_45%]">
        {/* Left Panel: Decision Checklist */}
        <div className="space-y-6">
          <DecisionChecklist />

          {/* Birth Team Info - Collapsed by default */}
          <SettingsPanel
            state={state}
            setTemplate={setTemplate}
            setBirthTeam={setBirthTeam}
            collapsible
          />
        </div>

        {/* Right Panel: PDF Preview */}
        <div>
          <Card className="md:sticky md:top-20 overflow-hidden min-h-[600px] max-h-[85vh]">
            <PreviewPanel />
          </Card>
        </div>
      </div>
    </div>
  )
}

// Settings Panel Component
interface SettingsPanelProps {
  state: ReturnType<typeof useEditor>['state']
  setTemplate: ReturnType<typeof useEditor>['setTemplate']
  setBirthTeam: ReturnType<typeof useEditor>['setBirthTeam']
  collapsible?: boolean
}

function SettingsPanel({ state, setTemplate, setBirthTeam, collapsible }: SettingsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(!collapsible)

  const content = (
    <div className="space-y-4">
      {/* Template Style */}
      <div className="space-y-2">
        <Label htmlFor="template-style">Template Style</Label>
        <Select value={state.templateStyle} onValueChange={setTemplate}>
          <SelectTrigger id="template-style" className="min-h-[44px]">
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

      {/* Birth Team Info */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="mother_name">Your Name</Label>
          <Input
            id="mother_name"
            placeholder="Your name"
            className="min-h-[44px]"
            value={state.birthTeam.mother_name || ''}
            onChange={(e) => setBirthTeam({ mother_name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="partner_name">Partner's Name</Label>
          <Input
            id="partner_name"
            placeholder="Partner's name (optional)"
            className="min-h-[44px]"
            value={state.birthTeam.partner_name || ''}
            onChange={(e) => setBirthTeam({ partner_name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="due_date">Due Date</Label>
          <Input
            id="due_date"
            type="date"
            className="min-h-[44px]"
            value={state.birthTeam.due_date || ''}
            onChange={(e) => setBirthTeam({ due_date: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hospital_name">Birth Location</Label>
          <Input
            id="hospital_name"
            placeholder="Hospital / Birth center"
            className="min-h-[44px]"
            value={state.birthTeam.hospital_name || ''}
            onChange={(e) => setBirthTeam({ hospital_name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="provider_name">Provider Name</Label>
          <Input
            id="provider_name"
            placeholder="Dr. / Midwife name"
            className="min-h-[44px]"
            value={state.birthTeam.provider_name || ''}
            onChange={(e) => setBirthTeam({ provider_name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="doula_name">Doula Name</Label>
          <Input
            id="doula_name"
            placeholder="Doula name (optional)"
            className="min-h-[44px]"
            value={state.birthTeam.doula_name || ''}
            onChange={(e) => setBirthTeam({ doula_name: e.target.value })}
          />
        </div>
      </div>
    </div>
  )

  if (collapsible) {
    return (
      <Card>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Birth Plan Settings & Details</span>
          </div>
          {isExpanded ? (
            <span className="text-xs text-muted-foreground">Click to collapse</span>
          ) : (
            <span className="text-xs text-muted-foreground">Click to expand</span>
          )}
        </button>
        {isExpanded && (
          <div className="p-4 pt-0 border-t">
            {content}
          </div>
        )}
      </Card>
    )
  }

  return (
    <Card className="p-4">
      {content}
    </Card>
  )
}
