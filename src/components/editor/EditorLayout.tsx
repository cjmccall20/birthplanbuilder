'use client'

import { useState, useMemo } from 'react'
import { useEditor } from '@/lib/editor/context'
import { useAuth } from '@/components/auth/AuthProvider'
import { useAutoSave } from '@/lib/editor/useAutoSave'
import { DecisionChecklist } from './DecisionChecklist'
import { DocumentCanvas } from './DocumentCanvas'
import { ActionBar } from './ActionBar'
import { MobileItemSheet } from './MobileItemSheet'
import { MobileDecisionSheet } from './MobileDecisionSheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ListChecks, PanelRightClose, PanelRightOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { pdf } from '@react-pdf/renderer'
import { editorStateToPDFData } from '@/lib/editor/editorToPdf'
import { MinimalTemplate } from '@/lib/pdf/templates/minimal'
import { FloralTemplate } from '@/lib/pdf/templates/floral'
import { ProfessionalTemplate } from '@/lib/pdf/templates/professional'
import { ElegantTemplate } from '@/lib/pdf/templates/elegant'
import { RusticTemplate } from '@/lib/pdf/templates/rustic'
import { EmailPdfModal } from './EmailPdfModal'
import { PREFERENCES, getPreferencesBySection } from '@/lib/editor/preferences'
import { EDITOR_SECTIONS } from '@/lib/editor/sections'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

const templateMap = {
  minimal: MinimalTemplate,
  floral: FloralTemplate,
  professional: ProfessionalTemplate,
  elegant: ElegantTemplate,
  rustic: RusticTemplate,
} as const

export function EditorLayout() {
  const { state, setTitle, setTemplate, dispatch, setBirthTeam } = useEditor()
  const { user, isLoading: isAuthLoading } = useAuth()
  const { isSaving, lastSaved, error, savedLocally } = useAutoSave({
    state,
    dispatch,
    user,
    isLoading: isAuthLoading,
  })
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false)
  const [selectedPreferenceId, setSelectedPreferenceId] = useState<string | null>(null)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showMobileChecklist, setShowMobileChecklist] = useState(false)
  const [mobileItemEdit, setMobileItemEdit] = useState<{ sectionId: EditorSectionId; preferenceId: string } | null>(null)

  // Compute progress stats
  const { decisionsIncluded, totalDecisions } = useMemo(() => {
    let included = 0
    const total = PREFERENCES.length
    EDITOR_SECTIONS.forEach(section => {
      const sectionState = state.sections[section.id]
      const prefs = getPreferencesBySection(section.id)
      prefs.forEach(p => {
        const value = sectionState?.preferences.find(pv => pv.preferenceId === p.id)
        if (!value?.isOmitted) included++
      })
    })
    return { decisionsIncluded: included, totalDecisions: total }
  }, [state.sections])

  // Handle selecting a preference from the canvas (double-click)
  const handleItemSelect = (sectionId: EditorSectionId, preferenceId: string) => {
    setSelectedPreferenceId(preferenceId)
    if (isRightPanelCollapsed) {
      setIsRightPanelCollapsed(false)
    }
    // On mobile, open the checklist
    setShowMobileChecklist(true)
  }

  // Handle PDF download
  const handleDownload = async () => {
    try {
      const pdfData = editorStateToPDFData(state)
      const Template = templateMap[state.templateStyle] || MinimalTemplate
      const document = Template(pdfData)
      const blob = await pdf(document).toBlob()
      const url = URL.createObjectURL(blob)
      const a = window.document.createElement('a')
      a.href = url
      a.download = `${state.title || 'birth-plan'}.pdf`
      window.document.body.appendChild(a)
      a.click()
      window.document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('PDF generation error:', err)
    }
  }

  const handleEmail = () => {
    setShowEmailModal(true)
  }

  return (
    <div className="pb-16">
      {/* Header with title */}
      <div className="container py-4 sm:py-6 max-w-7xl px-4 overflow-x-hidden">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="My Birth Plan"
              className="min-h-[44px] text-lg font-semibold border-0 border-b rounded-none focus:ring-0 px-0"
              value={state.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/* Mobile Layout: Canvas + FAB + Drawers */}
        <div className="md:hidden">
          <Card className="overflow-hidden">
            <DocumentCanvas
              onItemSelect={(sectionId, preferenceId) => {
                setMobileItemEdit({ sectionId, preferenceId })
              }}
              selectedPreferenceId={selectedPreferenceId}
            />
          </Card>

          {/* FAB for decision checklist */}
          <button
            onClick={() => setShowMobileChecklist(true)}
            className="fixed bottom-20 right-4 z-30 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
            aria-label="Open decisions"
          >
            <ListChecks className="h-6 w-6" />
          </button>

          {/* Mobile item editor drawer */}
          <MobileItemSheet
            preferenceId={mobileItemEdit?.preferenceId ?? null}
            sectionId={mobileItemEdit?.sectionId ?? null}
            isOpen={!!mobileItemEdit}
            onClose={() => setMobileItemEdit(null)}
          />

          {/* Mobile full decision checklist drawer */}
          <MobileDecisionSheet
            isOpen={showMobileChecklist}
            onClose={() => setShowMobileChecklist(false)}
            selectedPreferenceId={selectedPreferenceId}
            onClearSelection={() => setSelectedPreferenceId(null)}
          />
        </div>

        {/* Desktop Layout: Canvas LEFT, Decisions RIGHT */}
        <div className="hidden md:flex gap-4">
          {/* Left Panel: Document Canvas */}
          <div className={cn(
            'transition-all duration-300',
            isRightPanelCollapsed ? 'flex-1' : 'flex-1 min-w-0'
          )}>
            <Card className="overflow-hidden">
              <DocumentCanvas
                onItemSelect={handleItemSelect}
                selectedPreferenceId={selectedPreferenceId}
              />
            </Card>
          </div>

          {/* Right Panel: Decision Checklist (Collapsible) */}
          <div className={cn(
            'transition-all duration-300 flex-shrink-0',
            isRightPanelCollapsed ? 'w-12' : 'w-[400px]'
          )}>
            {isRightPanelCollapsed ? (
              <div className="h-full bg-white border rounded-lg flex flex-col items-center py-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRightPanelCollapsed(false)}
                  className="mb-4"
                >
                  <PanelRightOpen className="h-5 w-5" />
                </Button>
                <div className="writing-mode-vertical text-xs text-muted-foreground font-medium tracking-wider">
                  OPTIONS
                </div>
              </div>
            ) : (
              <div className="bg-white border rounded-lg overflow-hidden h-full max-h-[calc(100vh-140px)] flex flex-col">
                <div className="flex items-center justify-between p-3 border-b bg-muted/30">
                  <h3 className="font-medium text-sm">Birth Plan Decisions</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsRightPanelCollapsed(true)}
                    title="Collapse panel"
                  >
                    <PanelRightClose className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <DecisionChecklist
                    selectedPreferenceId={selectedPreferenceId}
                    onClearSelection={() => setSelectedPreferenceId(null)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <ActionBar
        decisionsIncluded={decisionsIncluded}
        totalDecisions={totalDecisions}
        isSaving={isSaving}
        lastSaved={lastSaved}
        isLoggedIn={!!user}
        onDownload={handleDownload}
        onEmail={handleEmail}
        saveError={error}
        savedLocally={savedLocally}
      />

      {/* Email PDF Modal */}
      <EmailPdfModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        editorState={state}
      />
    </div>
  )
}
