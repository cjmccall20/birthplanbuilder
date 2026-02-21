'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { pdf } from '@react-pdf/renderer'
import { useEditor } from '@/lib/editor/context'
import { useAuth } from '@/components/auth/AuthProvider'
import { editorStateToPDFData } from '@/lib/editor/editorToPdf'
import { MinimalTemplate } from '@/lib/pdf/templates/minimal'
import { FloralTemplate } from '@/lib/pdf/templates/floral'
import { ProfessionalTemplate } from '@/lib/pdf/templates/professional'
import { ElegantTemplate } from '@/lib/pdf/templates/elegant'
import { RusticTemplate } from '@/lib/pdf/templates/rustic'
import { EmailPdfModal } from './EmailPdfModal'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, Download, RefreshCw, ZoomOut, Maximize, Mail } from 'lucide-react'
import type { TemplateStyle } from '@/types'

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

type ZoomLevel = 'fit-width' | '100%' | 'fit-page'

export function PreviewPanel() {
  const { state, setTemplate } = useEditor()
  const { user } = useAuth()
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('fit-width')
  const [isClient, setIsClient] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)

  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const previousUrlRef = useRef<string | null>(null)

  // SSR handling
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate PDF from editor state
  const generatePDF = useCallback(async () => {
    if (!isClient) return

    setIsGenerating(true)
    setError(null)

    try {
      // Convert editor state to PDF data format
      const pdfData = editorStateToPDFData(state)

      // Select the appropriate template
      const Template = templateMap[state.templateStyle] || MinimalTemplate

      // Generate the PDF document
      const document = Template(pdfData)

      // Create blob URL
      const blob = await pdf(document).toBlob()
      const url = URL.createObjectURL(blob)

      // Clean up previous URL
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current)
      }

      setPdfUrl(url)
      previousUrlRef.current = url
    } catch (err) {
      console.error('PDF generation error:', err)
      setError('Failed to generate PDF preview. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }, [state, isClient])

  // Debounced PDF generation when state changes
  useEffect(() => {
    if (!isClient) return

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new timer for 500ms debounce
    debounceTimerRef.current = setTimeout(() => {
      generatePDF()
    }, 500)

    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [state, generatePDF, isClient])

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current)
      }
    }
  }, [])

  // Handle template change
  const handleTemplateChange = (value: TemplateStyle) => {
    setTemplate(value)
  }

  // Handle download - for logged-in users only
  const handleDownload = async () => {
    if (!pdfUrl) return

    try {
      const response = await fetch(pdfUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${state.title || 'birth-plan'}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download error:', err)
      setError('Failed to download PDF. Please try again.')
    }
  }

  // Handle get PDF button click
  const handleGetPdf = () => {
    if (user) {
      // Logged in - direct download
      handleDownload()
    } else {
      // Not logged in - show email modal
      setShowEmailModal(true)
    }
  }

  // Handle manual regenerate
  const handleRegenerate = () => {
    generatePDF()
  }

  // Get iframe style based on zoom level
  const getIframeStyle = (): React.CSSProperties => {
    switch (zoomLevel) {
      case 'fit-width':
        return { width: '100%', height: '100%' }
      case '100%':
        return { width: '100%', height: '100%', transform: 'scale(1)' }
      case 'fit-page':
        return { width: '100%', height: '100%' }
      default:
        return { width: '100%', height: '100%' }
    }
  }

  if (!isClient) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white p-4 overflow-x-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Template Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="template-select" className="text-sm font-medium text-gray-700">
              Template:
            </label>
            <Select value={state.templateStyle} onValueChange={handleTemplateChange}>
              <SelectTrigger id="template-select" className="w-40 min-h-[44px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="floral">Floral</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="elegant">Elegant</SelectItem>
                <SelectItem value="rustic">Rustic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 border-r border-gray-200 pr-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoomLevel('fit-width')}
                className={`min-h-[44px] ${zoomLevel === 'fit-width' ? 'bg-gray-100' : ''}`}
                title="Fit width"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoomLevel('100%')}
                className={`min-h-[44px] ${zoomLevel === '100%' ? 'bg-gray-100' : ''}`}
                title="100%"
              >
                100%
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoomLevel('fit-page')}
                className={`min-h-[44px] ${zoomLevel === 'fit-page' ? 'bg-gray-100' : ''}`}
                title="Fit page"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>

            {/* Regenerate */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="min-h-[44px]"
            >
              <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span className="ml-2 hidden sm:inline">Regenerate</span>
            </Button>

            {/* Get/Download PDF */}
            <Button
              variant="default"
              size="sm"
              onClick={handleGetPdf}
              disabled={!pdfUrl || isGenerating}
              className="min-h-[44px]"
            >
              {user ? (
                <>
                  <Download className="h-4 w-4" />
                  <span className="ml-2">Download PDF</span>
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  <span className="ml-2">Get PDF</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Generating indicator */}
        {isGenerating && (
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>Updating preview...</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-2 rounded-md bg-red-50 p-2 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Preview Area */}
      <div className="relative flex-1 overflow-hidden bg-gray-100">
        {pdfUrl ? (
          <iframe
            ref={iframeRef}
            src={pdfUrl}
            style={getIframeStyle()}
            className="border-0"
            title="Birth Plan PDF Preview"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-gray-400" />
              <p className="mt-4 text-sm text-gray-600">Generating preview...</p>
            </div>
          </div>
        )}
      </div>

      {/* Email PDF Modal for anonymous users */}
      <EmailPdfModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        editorState={state}
      />
    </div>
  )
}
