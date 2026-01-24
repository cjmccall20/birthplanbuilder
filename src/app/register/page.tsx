'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QuizProvider, useQuiz } from '@/lib/quiz/context'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Mail, ArrowLeft, Loader2 } from 'lucide-react'

function RegisterContent() {
  const { state, unsureTopics } = useQuiz()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [name, setName] = useState(state.birthTeam.mother_name || '')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/birth-plan/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          dueDate: state.birthTeam.due_date || null,
          marketingConsent,
          sessionId: state.sessionId,
          answers: state.answers,
          customNotes: state.customNotes,
          birthTeam: {
            ...state.birthTeam,
            mother_name: name,
          },
          templateStyle: state.templateStyle,
          unsureTopics,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create birth plan')
      }

      // Store the birth plan ID for the success page
      localStorage.setItem('birthplan_id', data.birthPlanId)
      localStorage.setItem('birthplan_email', email)

      router.push('/success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-6 sm:py-8 max-w-lg px-4">
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">Almost Done!</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Enter your email and we'll send your personalized birth plan PDF.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Where should we send your birth plan?</CardTitle>
          <CardDescription>
            We'll email you a beautiful PDF you can print or share with your care team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                className="min-h-[44px] text-base"
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
                className="min-h-[44px] text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="marketing"
                checked={marketingConsent}
                onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
              />
              <label
                htmlFor="marketing"
                className="text-sm text-muted-foreground leading-tight cursor-pointer"
              >
                Send me helpful tips and resources for my pregnancy journey
              </label>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full min-h-[44px]"
              size="lg"
              disabled={isSubmitting || !email || !name}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating your birth plan...
                </>
              ) : (
                'Send Me My Birth Plan'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-4 text-center">
        <Button
          variant="ghost"
          onClick={() => router.push('/preview')}
          className="min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to preview
        </Button>
      </div>

      <p className="mt-8 text-xs text-center text-muted-foreground">
        By submitting, you agree to our{' '}
        <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>
        {' '}and{' '}
        <a href="/terms" className="underline hover:text-foreground">Terms of Service</a>.
        We'll never share your email.
      </p>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <QuizProvider>
          <RegisterContent />
        </QuizProvider>
      </main>
    </div>
  )
}
