'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { QuizProvider, useQuiz } from '@/lib/quiz/context'
import { quizQuestions } from '@/lib/quiz/questions'
import { templateStyles, type TemplateStyle } from '@/types'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FileText, ArrowLeft, ArrowRight, Edit2, Eye, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generatePDFPreview, revokePDFPreviewUrl } from '@/lib/pdf/client-preview'

function PreviewContent() {
  const { state, setBirthTeam, setTemplateStyle, goToStep } = useQuiz()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'preview' | 'style' | 'details'>('preview')

  // PDF Preview state
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)

  // Cleanup blob URL when modal closes or component unmounts
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        revokePDFPreviewUrl(pdfUrl)
      }
    }
  }, [pdfUrl])

  const handlePreviewPdf = useCallback(async () => {
    setIsGeneratingPdf(true)
    setPdfError(null)
    setIsPdfModalOpen(true)

    try {
      // Revoke old URL if exists
      if (pdfUrl) {
        revokePDFPreviewUrl(pdfUrl)
      }

      const url = await generatePDFPreview({
        answers: state.answers,
        customNotes: state.customNotes,
        birthTeam: state.birthTeam,
        templateStyle: state.templateStyle as TemplateStyle,
        questions: quizQuestions,
      })

      setPdfUrl(url)
    } catch (error) {
      console.error('Failed to generate PDF preview:', error)
      setPdfError('Failed to generate PDF preview. Please try again.')
    } finally {
      setIsGeneratingPdf(false)
    }
  }, [state.answers, state.customNotes, state.birthTeam, state.templateStyle, pdfUrl])

  const handleClosePdfModal = useCallback(() => {
    setIsPdfModalOpen(false)
    // Cleanup blob URL after modal close animation
    setTimeout(() => {
      if (pdfUrl) {
        revokePDFPreviewUrl(pdfUrl)
        setPdfUrl(null)
      }
      setPdfError(null)
    }, 300)
  }, [pdfUrl])

  // Get answered questions with their display text
  const answeredQuestions = quizQuestions
    .filter((q) => state.answers[q.id])
    .map((q) => {
      const answer = state.answers[q.id]
      const option = q.options.find((o) => o.value === answer)
      return {
        ...q,
        selectedAnswer: answer,
        answerLabel: option?.label || answer,
        birthPlanText: option?.birthPlanText || '',
        customNote: state.customNotes[q.id],
      }
    })

  // Group by category
  const groupedAnswers = answeredQuestions.reduce((acc, q) => {
    if (!acc[q.category]) acc[q.category] = []
    acc[q.category].push(q)
    return acc
  }, {} as Record<string, typeof answeredQuestions>)

  const handleContinue = () => {
    if (activeTab === 'preview') {
      setActiveTab('style')
    } else if (activeTab === 'style') {
      setActiveTab('details')
    } else {
      router.push('/register')
    }
  }

  const handleBack = () => {
    if (activeTab === 'style') {
      setActiveTab('preview')
    } else if (activeTab === 'details') {
      setActiveTab('style')
    } else {
      router.push('/quiz')
    }
  }

  return (
    <div className="container py-6 sm:py-8 max-w-4xl px-4">
      {/* Tabs */}
      <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 border-b overflow-x-auto">
        {[
          { id: 'preview', label: 'Review Answers' },
          { id: 'style', label: 'Choose Style' },
          { id: 'details', label: 'Birth Team' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              'px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap min-h-[44px]',
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">Review Your Birth Plan</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Review your answers below. Click edit to change any response.
            </p>
            <Button
              variant="outline"
              className="mt-4 min-h-[44px]"
              onClick={handlePreviewPdf}
              disabled={Object.keys(state.answers).length === 0}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview PDF
            </Button>
            <Button
              variant="default"
              className="mt-4 ml-2 min-h-[44px]"
              onClick={() => router.push('/editor?from=quiz')}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit in Visual Editor
            </Button>
          </div>

          {Object.entries(groupedAnswers).map(([category, questions]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {questions.map((q) => (
                  <div key={q.id} className="flex items-start justify-between gap-2 sm:gap-4 py-2 border-b last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs sm:text-sm">{q.title}</p>
                      <p className="text-xs sm:text-sm text-primary">{q.answerLabel}</p>
                      {q.customNote && (
                        <p className="text-xs text-muted-foreground mt-1 italic break-words">
                          Note: {q.customNote}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="min-h-[44px] min-w-[44px] flex-shrink-0"
                      onClick={() => {
                        const index = quizQuestions.findIndex((qq) => qq.id === q.id)
                        goToStep(index)
                        router.push('/quiz')
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Style Tab */}
      {activeTab === 'style' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">Choose Your Template</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Select a design style for your birth plan PDF.
            </p>
          </div>

          <RadioGroup
            value={state.templateStyle}
            onValueChange={setTemplateStyle}
            className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          >
            {templateStyles.map((template) => (
              <div key={template.id}>
                <RadioGroupItem
                  value={template.id}
                  id={template.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={template.id}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-lg border-2 p-3 sm:p-4 cursor-pointer transition-all min-h-[44px]",
                    "hover:bg-muted/50 hover:border-primary/50",
                    state.templateStyle === template.id
                      ? "border-primary bg-primary/5"
                      : "border-muted"
                  )}
                >
                  <div className="w-full aspect-[8.5/11] bg-muted rounded mb-2 sm:mb-3 flex items-center justify-center">
                    <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground/50" />
                  </div>
                  <span className="font-semibold text-sm sm:text-base">{template.name}</span>
                  <span className="text-xs text-muted-foreground text-center">
                    {template.description}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {/* Details Tab */}
      {activeTab === 'details' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">Add Your Birth Team</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Add the names of your care team to personalize your birth plan.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>This will appear at the top of your birth plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="mother_name">Your Name *</Label>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Care Team</CardTitle>
              <CardDescription>Optional - helps personalize your plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
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
                  <Label htmlFor="provider_type">Provider Type</Label>
                  <Input
                    id="provider_type"
                    placeholder="OB-GYN / Midwife / CNM"
                    className="min-h-[44px] text-base"
                    value={state.birthTeam.provider_type || ''}
                    onChange={(e) => setBirthTeam({ provider_type: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="doula_name">Doula Name</Label>
                  <Input
                    id="doula_name"
                    placeholder="Doula name (optional)"
                    className="min-h-[44px] text-base"
                    value={state.birthTeam.doula_name || ''}
                    onChange={(e) => setBirthTeam({ doula_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospital_name">Birth Location</Label>
                  <Input
                    id="hospital_name"
                    placeholder="Hospital / Birth center name"
                    className="min-h-[44px] text-base"
                    value={state.birthTeam.hospital_name || ''}
                    onChange={(e) => setBirthTeam({ hospital_name: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8">
        <Button variant="outline" onClick={handleBack} className="min-h-[44px] w-full sm:w-auto">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex flex-col sm:flex-row gap-3">
          {activeTab === 'details' && (
            <Button
              variant="outline"
              onClick={() => router.push('/editor?from=quiz')}
              className="min-h-[44px] w-full sm:w-auto"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit in Full Editor
            </Button>
          )}
          <Button onClick={handleContinue} className="min-h-[44px] w-full sm:w-auto">
            {activeTab === 'details' ? 'Get My Birth Plan' : 'Continue'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* PDF Preview Modal */}
      <Dialog open={isPdfModalOpen} onOpenChange={(open) => !open && handleClosePdfModal()}>
        <DialogContent className="max-w-4xl h-[90vh] w-[95vw] sm:w-full flex flex-col p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Birth Plan Preview</DialogTitle>
            <DialogDescription className="text-sm">
              Preview how your birth plan will look as a PDF document.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 min-h-0 relative">
            {isGeneratingPdf && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Generating PDF preview...</p>
                </div>
              </div>
            )}
            {pdfError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-destructive mb-4">{pdfError}</p>
                  <Button variant="outline" onClick={handlePreviewPdf}>
                    Try Again
                  </Button>
                </div>
              </div>
            )}
            {pdfUrl && !isGeneratingPdf && !pdfError && (
              <iframe
                src={pdfUrl}
                className="w-full h-full border rounded-lg"
                title="Birth Plan PDF Preview"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function PreviewPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <QuizProvider>
          <PreviewContent />
        </QuizProvider>
      </main>
    </div>
  )
}
