'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { QuizProvider, useQuiz } from '@/lib/quiz/context'
import { quizQuestions } from '@/lib/quiz/questions'
import { templateStyles, type TemplateStyle } from '@/types'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FileText, ArrowLeft, ArrowRight, Edit2 } from 'lucide-react'
import { cn } from '@/lib/utils'

function PreviewContent() {
  const { state, setBirthTeam, setTemplateStyle, goToStep } = useQuiz()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'preview' | 'style' | 'details'>('preview')

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
    <div className="container py-8 max-w-4xl">
      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b">
        {[
          { id: 'preview', label: 'Review Answers' },
          { id: 'style', label: 'Choose Style' },
          { id: 'details', label: 'Birth Team' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
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
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Review Your Birth Plan</h1>
            <p className="text-muted-foreground">
              Review your answers below. Click edit to change any response.
            </p>
          </div>

          {Object.entries(groupedAnswers).map(([category, questions]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions.map((q) => (
                  <div key={q.id} className="flex items-start justify-between gap-4 py-2 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{q.title}</p>
                      <p className="text-sm text-primary">{q.answerLabel}</p>
                      {q.customNote && (
                        <p className="text-xs text-muted-foreground mt-1 italic">
                          Note: {q.customNote}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
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
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Choose Your Template</h1>
            <p className="text-muted-foreground">
              Select a design style for your birth plan PDF.
            </p>
          </div>

          <RadioGroup
            value={state.templateStyle}
            onValueChange={setTemplateStyle}
            className="grid gap-4 md:grid-cols-3 lg:grid-cols-5"
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
                    "flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-all",
                    "hover:bg-muted/50 hover:border-primary/50",
                    state.templateStyle === template.id
                      ? "border-primary bg-primary/5"
                      : "border-muted"
                  )}
                >
                  <div className="w-full aspect-[8.5/11] bg-muted rounded mb-3 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <span className="font-semibold">{template.name}</span>
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
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Add Your Birth Team</h1>
            <p className="text-muted-foreground">
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
                    value={state.birthTeam.mother_name || ''}
                    onChange={(e) => setBirthTeam({ mother_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partner_name">Partner's Name</Label>
                  <Input
                    id="partner_name"
                    placeholder="Partner's name (optional)"
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
                    value={state.birthTeam.provider_name || ''}
                    onChange={(e) => setBirthTeam({ provider_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider_type">Provider Type</Label>
                  <Input
                    id="provider_type"
                    placeholder="OB-GYN / Midwife / CNM"
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
                    value={state.birthTeam.doula_name || ''}
                    onChange={(e) => setBirthTeam({ doula_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospital_name">Birth Location</Label>
                  <Input
                    id="hospital_name"
                    placeholder="Hospital / Birth center name"
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
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleContinue}>
          {activeTab === 'details' ? 'Get My Birth Plan' : 'Continue'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
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
