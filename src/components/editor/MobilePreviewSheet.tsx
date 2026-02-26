'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useEditor } from '@/lib/editor/context'
import { DocumentCanvas } from './DocumentCanvas'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
} from '@/components/ui/drawer'
import { X, Download, Mail } from 'lucide-react'
import { pdf } from '@react-pdf/renderer'
import { editorStateToPDFData } from '@/lib/editor/editorToPdf'
import { MinimalTemplate } from '@/lib/pdf/templates/minimal'
import { FloralTemplate } from '@/lib/pdf/templates/floral'
import { ProfessionalTemplate } from '@/lib/pdf/templates/professional'
import { ElegantTemplate } from '@/lib/pdf/templates/elegant'
import { RusticTemplate } from '@/lib/pdf/templates/rustic'

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

interface MobilePreviewSheetProps {
  isOpen: boolean
  onClose: () => void
  onEmail?: () => void
}

export function MobilePreviewSheet({ isOpen, onClose, onEmail }: MobilePreviewSheetProps) {
  const { state } = useEditor()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)

  // Measure container and compute scale
  useEffect(() => {
    if (!isOpen) return

    const measure = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 32 // Subtract padding (16px each side)
        const canvasWidth = 650
        const newScale = Math.min(containerWidth / canvasWidth, 1)
        setScale(newScale)
      }
    }

    // Delay measurement to ensure drawer is rendered
    const timer = setTimeout(measure, 100)
    window.addEventListener('resize', measure)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', measure)
    }
  }, [isOpen])

  const handleDownload = useCallback(async () => {
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
  }, [state])

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[95vh]">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0">
          <h2 className="text-sm font-medium text-muted-foreground">Preview</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrollable preview area */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4"
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: `${100 / scale}%`,
            }}
          >
            <DocumentCanvas readOnly />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 p-4 border-t flex-shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Button
            variant="outline"
            className="flex-1 gap-1.5"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          {onEmail && (
            <Button
              variant="outline"
              className="flex-1 gap-1.5"
              onClick={onEmail}
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
