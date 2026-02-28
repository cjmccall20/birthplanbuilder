'use client'

import { useCallback } from 'react'
import { useEditor } from '@/lib/editor/context'
import { getPreferenceById, getPreferencesBySection } from '@/lib/editor/preferences'
import { getSectionsForBirthType } from '@/lib/editor/sections'
import { canvasThemes } from '@/lib/editor/canvasThemes'
import { Button } from '@/components/ui/button'
import { X, Download, CheckCircle2, XCircle } from 'lucide-react'
import { getIconComponent } from './IconPicker'

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  onDownload: () => void
}

export function PreviewModal({ isOpen, onClose, onDownload }: PreviewModalProps) {
  const { state } = useEditor()
  const theme = canvasThemes[state.templateStyle]

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  if (!isOpen) return null

  // Build preview sections (same logic as DocumentCanvas but read-only)
  const visibleSections = getSectionsForBirthType(state.birthType, state.birthVenue)
  const visiblePrefIds = new Set(
    visibleSections.flatMap(s => getPreferencesBySection(s.id, state.birthType, state.birthVenue).map(p => p.id))
  )
  const sections = visibleSections.map(section => {
    const sectionState = state.sections[section.id]
    if (!sectionState) return null

    const items: Array<{
      title: string
      text: string
      icon?: string
      stance?: 'desired' | 'declined' | 'cautious' | null
    }> = []

    const sortedPreferences = [...sectionState.preferences]
      .filter(pref => !pref.isOmitted && visiblePrefIds.has(pref.preferenceId))
      .sort((a, b) => a.sortOrder - b.sortOrder)

    sortedPreferences.forEach(prefValue => {
      const prefDef = getPreferenceById(prefValue.preferenceId)
      if (!prefDef) return

      const selectedOption = prefDef.options.find(opt => opt.value === prefValue.selectedOption)
      let text = selectedOption?.birthPlanText || ''
      if (prefValue.customText) text = prefValue.customText
      if (!text) return

      items.push({
        title: prefValue.customTitle || prefDef.title,
        text,
        icon: prefValue.customIcon || prefDef.icon,
        stance: prefValue.stance,
      })
    })

    sectionState.customItems
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .forEach(item => {
        if (!item.text) return
        items.push({
          title: item.title || 'Custom decision',
          text: item.text,
          icon: item.customIcon,
          stance: item.stance,
        })
      })

    const notes = sectionState.notes?.trim() || ''
    if (items.length === 0 && !notes) return null

    return { ...section, title: section.displayTitle, items, notes }
  }).filter(Boolean) as Array<{
    id: string
    title: string
    items: Array<{ title: string; text: string; icon?: string; stance?: 'desired' | 'declined' | 'cautious' | null }>
    notes: string
  }>

  return (
    <div
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      ref={el => el?.focus()}
    >
      {/* Toolbar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b shadow-sm">
        <div className="max-w-[700px] mx-auto px-6 py-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">Preview</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={onDownload} className="gap-1.5">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Preview content */}
      <div className="max-w-[700px] mx-auto px-6 py-8">
        <div
          className="shadow-lg rounded-sm relative overflow-hidden"
          style={{
            backgroundColor: theme.backgroundColor,
            backgroundImage: theme.backgroundPattern || undefined,
          }}
        >
          {/* Decorative corner SVGs */}
          {theme.cornerSvg?.topLeft && (
            <div className="absolute top-0 left-0 pointer-events-none" dangerouslySetInnerHTML={{ __html: theme.cornerSvg.topLeft }} />
          )}
          {theme.cornerSvg?.topRight && (
            <div className="absolute top-0 right-0 pointer-events-none" dangerouslySetInnerHTML={{ __html: theme.cornerSvg.topRight }} />
          )}
          {theme.cornerSvg?.bottomLeft && (
            <div className="absolute bottom-0 left-0 pointer-events-none" dangerouslySetInnerHTML={{ __html: theme.cornerSvg.bottomLeft }} />
          )}
          {theme.cornerSvg?.bottomRight && (
            <div className="absolute bottom-0 right-0 pointer-events-none" dangerouslySetInnerHTML={{ __html: theme.cornerSvg.bottomRight }} />
          )}
          <div
            className="p-8 md:p-12"
            style={{ fontFamily: theme.fontFamily, color: theme.textColor }}
          >
            {/* Header */}
            <div
              className="text-center pb-6 mb-8 border-b-2"
              style={{ borderColor: theme.borderColor }}
            >
              <h1 className="text-2xl md:text-3xl font-bold">
                {state.title || 'Birth Plan'}
              </h1>
              {state.birthTeam.fields.length > 0 && state.birthTeam.fields[0].value && (
                <p className="text-base text-muted-foreground mt-1">
                  {state.birthTeam.fields[0].value}
                </p>
              )}

              {/* Birth team info */}
              {state.birthTeam.fields.slice(1).some(f => f.value) && (
                <div
                  className="mt-4 p-4 rounded-md text-sm text-left space-y-1"
                  style={{ backgroundColor: theme.sectionHeaderBg }}
                >
                  {state.birthTeam.fields.slice(1).map(field => (
                    field.value ? (
                      <div key={field.id} className="flex gap-2">
                        <span className="font-semibold text-xs uppercase tracking-wide" style={{ opacity: 0.5 }}>
                          {field.label}
                        </span>
                        <span>{field.value}</span>
                      </div>
                    ) : null
                  ))}
                  {state.birthTeam.due_date && (
                    <div className="flex gap-2">
                      <span className="font-semibold text-xs uppercase tracking-wide" style={{ opacity: 0.5 }}>
                        Due date
                      </span>
                      <span>{state.birthTeam.due_date}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sections */}
            {sections.map((section, idx) => (
              <div key={section.id}>
                {idx > 0 && (
                  <div className="my-8 border-t border-dashed" style={{ borderColor: `${theme.primaryColor}30` }} />
                )}
                <div className="mb-8">
                  <h2
                    className="text-lg font-semibold pb-2 mb-4 border-b"
                    style={{
                      color: theme.primaryColor,
                      borderColor: theme.borderColor,
                      backgroundColor: theme.sectionHeaderBg,
                    }}
                  >
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.items.map((item, i) => {
                      const ItemIcon = getIconComponent(item.icon || 'Circle')
                      return (
                        <div key={i} className="pl-3 border-l-2 border-transparent">
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5 flex-shrink-0">
                              {item.stance === 'desired' ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : item.stance === 'declined' ? (
                                <XCircle className="w-5 h-5 text-red-500" />
                              ) : (
                                <ItemIcon className="w-5 h-5" style={{ color: theme.primaryColor }} />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-sm mb-0.5">{item.title}</p>
                              <p className="text-sm leading-relaxed" style={{ opacity: 0.85 }}>
                                {item.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {section.notes && (
                    <div
                      className="mt-4 rounded-lg p-3 text-sm italic"
                      style={{
                        backgroundColor: theme.sectionHeaderBg,
                        opacity: 0.8,
                      }}
                    >
                      {section.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Disclaimer */}
            {state.disclaimerText && (
              <div
                className="mt-8 p-4 rounded-md text-xs leading-relaxed"
                style={{ backgroundColor: theme.sectionHeaderBg, opacity: 0.8 }}
              >
                {state.disclaimerText}
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 text-center text-xs" style={{ opacity: 0.5 }}>
              Created with Birth Plan Builder | birthplanbuilder.com
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
