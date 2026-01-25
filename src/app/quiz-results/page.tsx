'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { QuizProvider, useQuiz } from '@/lib/quiz/context'
import { quizQuestions } from '@/lib/quiz/questions'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  FileText,
  Clock,
  UserPlus,
  Mail,
  Loader2,
} from 'lucide-react'

function QuizResultsContent() {
  const { state, unsureTopics, setBirthTeam } = useQuiz()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState(state.birthTeam.mother_name || '')
  const [dueDate, setDueDate] = useState(state.birthTeam.due_date || '')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Get unsure question details
  const unsureQuestions = quizQuestions.filter(q => unsureTopics.includes(q.id))
  const hasUnsureTopics = unsureQuestions.length > 0

  // Count answered questions
  const answeredCount = Object.keys(state.answers).length
  const totalQuestions = quizQuestions.length

  // Update quiz state when name/dueDate changes (auto-saves via context)
  useEffect(() => {
    if (name !== state.birthTeam.mother_name || dueDate !== state.birthTeam.due_date) {
      setBirthTeam({ mother_name: name, due_date: dueDate })
    }
  }, [name, dueDate, setBirthTeam, state.birthTeam.mother_name, state.birthTeam.due_date])

  const handleContinueToEditor = () => {
    // The quiz context already saves to localStorage, so just navigate
    router.push('/editor?from=quiz')
  }

  const handleGetPdfNow = async () => {
    if (!email || !name) return

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/birth-plan/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          dueDate: dueDate || null,
          marketingConsent,
          sessionId: state.sessionId,
          answers: state.answers,
          customNotes: state.customNotes,
          birthTeam: {
            ...state.birthTeam,
            mother_name: name,
            due_date: dueDate,
          },
          templateStyle: state.templateStyle,
          unsureTopics,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email')
      }

      localStorage.setItem('birthplan_email', email)
      router.push('/success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-6 sm:py-8 max-w-4xl px-4">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          Your Birth Plan is Ready!
        </h1>
        <p className="text-muted-foreground">
          You answered {answeredCount} of {totalQuestions} questions
        </p>
      </div>

      {/* Upsell Section - Only show if they have unsure topics */}
      {hasUnsureTopics && (
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardHeader className="pb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-amber-900">
                  Still Researching {unsureQuestions.length} Decision{unsureQuestions.length > 1 ? 's' : ''}?
                </CardTitle>
                <CardDescription className="text-amber-800">
                  You marked these topics as needing more research:
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {/* List of unsure topics */}
            <ul className="space-y-2 mb-6">
              {unsureQuestions.map((q) => (
                <li key={q.id} className="flex items-center gap-2 text-sm text-amber-900">
                  <HelpCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span>{q.title}</span>
                </li>
              ))}
            </ul>

            {/* Research Guide Pitch */}
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-12 h-12 rounded-lg bg-primary/10 items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    Birth Decision Research Guide
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get balanced pros and cons for each decision, with citations to medical research.
                    No need to read the studies yourself — we've done the work so you can make informed choices confidently.
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Evidence-based insights</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>All {quizQuestions.length} decisions covered</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Save hours of research</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Written at your level</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <Button asChild size="lg" className="min-h-[44px]">
                      <a href="https://birthplanbuilder.com/guide" target="_blank" rel="noopener noreferrer">
                        Get the Research Guide - $39
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      Instant PDF download
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email Entry Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Get Your Birth Plan
          </CardTitle>
          <CardDescription>
            Enter your details to receive your personalized birth plan PDF
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                placeholder="Your name"
                className="min-h-[44px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="min-h-[44px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="due_date">Due Date (optional)</Label>
              <Input
                id="due_date"
                type="date"
                className="min-h-[44px] max-w-xs"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-start space-x-2 mt-4">
            <Checkbox
              id="marketing"
              checked={marketingConsent}
              onCheckedChange={(checked) => setMarketingConsent(checked === true)}
            />
            <label
              htmlFor="marketing"
              className="text-sm text-muted-foreground leading-tight cursor-pointer"
            >
              Send me helpful tips for my pregnancy journey
            </label>
          </div>

          {error && (
            <p className="text-sm text-destructive mt-4">{error}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              onClick={handleGetPdfNow}
              disabled={!email || !name || isSubmitting}
              className="min-h-[44px] flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Email My Birth Plan
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleContinueToEditor}
              className="min-h-[44px] flex-1"
            >
              <FileText className="mr-2 h-4 w-4" />
              Edit in Visual Editor First
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Account CTA */}
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Want to Save & Edit Later?</h3>
              <p className="text-sm text-muted-foreground">
                Create a <strong>free account</strong> to save your birth plan and come back to edit it anytime.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                100% Free - No Credit Card Required
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/auth/login?redirect=/editor?from=quiz')}
              className="min-h-[44px] whitespace-nowrap"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Create Free Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function QuizResultsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <QuizProvider>
          <QuizResultsContent />
        </QuizProvider>
      </main>
    </div>
  )
}
