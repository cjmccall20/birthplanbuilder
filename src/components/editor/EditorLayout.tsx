'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { useEditor } from '@/lib/editor/context'
import { useAuth } from '@/components/auth/AuthProvider'
import { useAutoSave } from '@/lib/editor/useAutoSave'
import { EditorSidebar } from './EditorSidebar'
import { DocumentCanvas } from './DocumentCanvas'
import { ActionBar } from './ActionBar'
import { MobileHeaderCard } from './MobileHeaderCard'
import { MobileSectionCard } from './MobileSectionCard'
import { MobileToolbar } from './MobileToolbar'
import { MobilePreferenceSheet } from './MobilePreferenceSheet'
import { MobileDecisionSheet } from './MobileDecisionSheet'
import { MobileSectionSheet } from './MobileSectionSheet'
import { MobileHeaderSheet } from './MobileHeaderSheet'
import { MobilePreviewSheet } from './MobilePreviewSheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { PanelRightClose, PanelRightOpen, Undo2, Redo2, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { pdf } from '@react-pdf/renderer'
import { editorStateToPDFData } from '@/lib/editor/editorToPdf'
import { MinimalTemplate } from '@/lib/pdf/templates/minimal'
import { FloralTemplate } from '@/lib/pdf/templates/floral'
import { ProfessionalTemplate } from '@/lib/pdf/templates/professional'
import { ElegantTemplate } from '@/lib/pdf/templates/elegant'
import { RusticTemplate } from '@/lib/pdf/templates/rustic'
import { EmailPdfModal } from './EmailPdfModal'
import { PreviewModal } from './PreviewModal'
import { OmittedOptionsPopup } from './OmittedOptionsPopup'
import { getPreferencesBySection } from '@/lib/editor/preferences'
import { getSectionsForBirthType } from '@/lib/editor/sections'
import type { EditorSectionId } from '@/lib/editor/editorTypes'

const templateMap = {
  minimal: MinimalTemplate,
  floral: FloralTemplate,
  professional: ProfessionalTemplate,
  elegant: ElegantTemplate,
  rustic: RusticTemplate,
  botanical: FloralTemplate,
  ocean: ProfessionalTemplate,
  boho: RusticTemplate,
  printer: MinimalTemplate,
} as const

export function EditorLayout() {
  const { state, setTitle, setTemplate, dispatch, setBirthTeam, undo, redo, canUndo, canRedo, toggleShowAllDecisions } = useEditor()
  const { user, isLoading: isAuthLoading } = useAuth()
  const { isSaving, lastSaved, error, savedLocally } = useAutoSave({
    state,
    dispatch,
    user,
    isLoading: isAuthLoading,
  })
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false)
  const [selectedPreferenceId, setSelectedPreferenceId] = useState<string | null>(null)
  const [selectedSectionId, setSelectedSectionId] = useState<EditorSectionId | null>(null)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [addDecisionSection, setAddDecisionSection] = useState<EditorSectionId | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showOmitted, setShowOmitted] = useState(false)

  // Mobile card-based editor state
  const [mobilePreferenceEdit, setMobilePreferenceEdit] = useState<{ sectionId: EditorSectionId; preferenceId: string } | null>(null)
  const [mobileSectionEdit, setMobileSectionEdit] = useState<EditorSectionId | null>(null)
  const [mobileHeaderEdit, setMobileHeaderEdit] = useState(false)
  const [showMobileDecisionSheet, setShowMobileDecisionSheet] = useState(false)
  const [showMobilePreview, setShowMobilePreview] = useState(false)

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        // Don't intercept when typing in inputs/textareas
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return

        e.preventDefault()
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  // Compute progress stats
  const { decisionsIncluded, totalDecisions, remainingCount } = useMemo(() => {
    let included = 0
    let total = 0
    const visibleSections = getSectionsForBirthType(state.birthType)
    visibleSections.forEach(section => {
      const sectionState = state.sections[section.id]
      const prefs = getPreferencesBySection(section.id, state.birthType, state.birthVenue)
      total += prefs.length
      prefs.forEach(p => {
        const value = sectionState?.preferences.find(pv => pv.preferenceId === p.id)
        if (!value?.isOmitted) included++
      })
    })
    return { decisionsIncluded: included, totalDecisions: total, remainingCount: total - included }
  }, [state.sections, state.birthType])

  // Visible sections for mobile card layout (filtered by birth type and hidden sections)
  const visibleSections = useMemo(() => {
    const sections = getSectionsForBirthType(state.birthType)
    const hidden = state.hiddenSections || []
    return sections.filter(s => !hidden.includes(s.id))
  }, [state.birthType, state.hiddenSections])

  // Handle selecting a preference from the canvas (single click)
  const handleItemSelect = (sectionId: EditorSectionId, preferenceId: string) => {
    setSelectedPreferenceId(preferenceId)
    setSelectedSectionId(sectionId)
    setAddDecisionSection(null)
    if (isRightPanelCollapsed) {
      setIsRightPanelCollapsed(false)
    }
  }

  // Handle "Add decision" button from canvas
  const handleAddDecision = (sectionId: EditorSectionId) => {
    setAddDecisionSection(sectionId)
    setSelectedPreferenceId(null)
    setSelectedSectionId(null)
    if (isRightPanelCollapsed) {
      setIsRightPanelCollapsed(false)
    }
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
      <div className="container py-4 sm:py-6 max-w-7xl px-4">
        <div className="mb-4 sm:mb-6 hidden md:flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="My Birth Plan"
              className="min-h-[44px] text-lg font-semibold border-0 border-b rounded-none focus:ring-0 px-0"
              value={state.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {remainingCount > 0 && (
              <Button
                variant={state.showAllDecisions ? 'secondary' : 'outline'}
                size="sm"
                onClick={toggleShowAllDecisions}
                className="gap-1.5 text-xs h-8"
              >
                {state.showAllDecisions ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
                {state.showAllDecisions ? 'Hide undecided' : `Show all (${remainingCount} remaining)`}
              </Button>
            )}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={undo}
                disabled={!canUndo}
                title="Undo (Cmd+Z)"
                className="h-8 w-8 p-0"
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
                title="Redo (Cmd+Shift+Z)"
                className="h-8 w-8 p-0"
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Layout: Card-based editor */}
        <div className="md:hidden flex flex-col min-h-[calc(100vh-120px)]">
          {/* Header card: title, birth team info */}
          <MobileHeaderCard onEdit={() => setMobileHeaderEdit(true)} />

          {/* Section cards */}
          <div className="flex-1 overflow-y-auto pt-3 pb-24 space-y-3">
            {visibleSections.map(section => (
              <MobileSectionCard
                key={section.id}
                sectionId={section.id}
                onEditPreference={(prefId) => setMobilePreferenceEdit({ sectionId: section.id, preferenceId: prefId })}
                onEditSection={() => setMobileSectionEdit(section.id)}
              />
            ))}
          </div>

          {/* Bottom toolbar */}
          <MobileToolbar
            onSections={() => setShowMobileDecisionSheet(true)}
            onAdd={() => setShowOmitted(true)}
            onPreview={() => setShowMobilePreview(true)}
            onMore={() => handleDownload()}
            decisionsIncluded={decisionsIncluded}
            totalDecisions={totalDecisions}
          />

          {/* Preference edit sheet */}
          <MobilePreferenceSheet
            sectionId={mobilePreferenceEdit?.sectionId ?? null}
            preferenceId={mobilePreferenceEdit?.preferenceId ?? null}
            isOpen={!!mobilePreferenceEdit}
            onClose={() => setMobilePreferenceEdit(null)}
          />

          {/* Full decision browser sheet (from toolbar "Sections" button) */}
          <MobileDecisionSheet
            isOpen={showMobileDecisionSheet}
            onClose={() => setShowMobileDecisionSheet(false)}
            selectedPreferenceId={selectedPreferenceId}
            onClearSelection={() => setSelectedPreferenceId(null)}
          />

          {/* Section edit sheet */}
          <MobileSectionSheet
            sectionId={mobileSectionEdit}
            isOpen={!!mobileSectionEdit}
            onClose={() => setMobileSectionEdit(null)}
            onEditPreference={(sectionId, preferenceId) => {
              setMobileSectionEdit(null)
              setMobilePreferenceEdit({ sectionId, preferenceId })
            }}
          />

          {/* Header edit sheet */}
          <MobileHeaderSheet
            isOpen={mobileHeaderEdit}
            onClose={() => setMobileHeaderEdit(false)}
          />

          {/* Mobile preview sheet */}
          <MobilePreviewSheet
            isOpen={showMobilePreview}
            onClose={() => setShowMobilePreview(false)}
            onEmail={handleEmail}
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
                onAddDecision={handleAddDecision}
                selectedPreferenceId={selectedPreferenceId}
              />
            </Card>
          </div>

          {/* Right Panel: Decision Checklist (Collapsible, Sticky) */}
          <div className={cn(
            'transition-all duration-300 flex-shrink-0',
            isRightPanelCollapsed ? 'w-12' : 'w-[400px]'
          )}>
            <div className="sticky top-[72px] h-[calc(100vh-72px-64px)]">
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
                <div className="bg-white border rounded-lg overflow-hidden h-full flex flex-col">
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
                    <EditorSidebar
                      selectedPreferenceId={selectedPreferenceId}
                      selectedSectionId={selectedSectionId}
                      filterToSection={addDecisionSection}
                      onClearSelection={() => {
                        setSelectedPreferenceId(null)
                        setSelectedSectionId(null)
                        setAddDecisionSection(null)
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Bar (desktop only - MobileToolbar replaces on mobile) */}
      <ActionBar
        decisionsIncluded={decisionsIncluded}
        totalDecisions={totalDecisions}
        isSaving={isSaving}
        lastSaved={lastSaved}
        isLoggedIn={!!user}
        onDownload={handleDownload}
        onEmail={handleEmail}
        onPreview={() => setShowPreview(true)}
        onShowOmitted={() => setShowOmitted(true)}
        saveError={error}
        savedLocally={savedLocally}
      />

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onDownload={handleDownload}
      />

      {/* Omitted Options Popup */}
      <OmittedOptionsPopup
        isOpen={showOmitted}
        onClose={() => setShowOmitted(false)}
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
