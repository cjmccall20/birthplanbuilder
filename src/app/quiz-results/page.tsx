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
  FileText,
  UserPlus,
  Mail,
  Loader2,
  Heart,
  Baby,
  Shield,
  Stethoscope,
  Home,
  Clock,
  Syringe,
  Activity,
  Scissors,
  AlertTriangle,
  Quote,
} from 'lucide-react'

// Topics covered in the guide - comprehensive journey from provider selection to coming home
const guideTopics = [
  { icon: Home, title: 'Choosing Your Birth Setting', desc: 'Hospital vs. birth center vs. home' },
  { icon: Stethoscope, title: 'Understanding Birth Modes', desc: 'Vaginal birth vs. cesarean section' },
  { icon: Heart, title: 'Pain Management Options', desc: 'From natural techniques to epidurals' },
  { icon: Clock, title: 'When to Go to the Hospital', desc: 'Timing your arrival perfectly' },
  { icon: Activity, title: 'Fetal Monitoring', desc: 'Continuous vs. intermittent monitoring' },
  { icon: Shield, title: 'GBS & Antibiotics', desc: 'Group B Strep testing and treatment' },
  { icon: Baby, title: 'Skin-to-Skin & Golden Hour', desc: 'The critical first 60 minutes' },
  { icon: Scissors, title: 'Cord Clamping Timing', desc: 'When to clamp and why it matters' },
  { icon: Syringe, title: 'Vitamin K & Eye Ointment', desc: 'Newborn procedures explained' },
  { icon: Shield, title: 'Hepatitis B Vaccine', desc: 'Birth dose considerations' },
  { icon: Baby, title: 'Circumcision (for boys)', desc: 'The research and considerations' },
]

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

      {/* Research Guide Upsell - Always show, but personalize if they have unsure topics */}
      <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-amber-50/50 overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl sm:text-2xl text-foreground mb-1">
                The Birth Decisions Research Guide
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                What They Don&apos;t Tell You at the Hospital
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personalized message if they have unsure topics */}
          {hasUnsureTopics && (
            <div className="bg-amber-100/50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-900 mb-2">
                    You marked {unsureQuestions.length} decision{unsureQuestions.length > 1 ? 's' : ''} as needing more research:
                  </p>
                  <ul className="space-y-1">
                    {unsureQuestions.map((q) => (
                      <li key={q.id} className="flex items-center gap-2 text-sm text-amber-800">
                        <HelpCircle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                        <span>{q.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Introduction quote */}
          <div className="relative pl-4 border-l-4 border-primary/30">
            <Quote className="absolute -left-3 -top-2 h-6 w-6 text-primary/20" />
            <p className="text-muted-foreground italic">
              &quot;Your decisions matter. The choices you make during pregnancy and childbirth <em>do</em> lead to different outcomes.
              Different approaches carry different risks, different benefits, different trade-offs. This isn&apos;t about blame—it&apos;s about information.
              It&apos;s about going into one of the most significant experiences of your life with your eyes open.&quot;
            </p>
          </div>

          {/* What the guide offers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">What You&apos;ll Get</h3>
            <div className="grid gap-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Both sides of every decision</span>
                  <span className="text-muted-foreground"> — what your doctor will likely recommend AND what they often don&apos;t mention</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Research citations you can verify</span>
                  <span className="text-muted-foreground"> — bring them to your provider for an informed conversation</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Written at your level</span>
                  <span className="text-muted-foreground"> — no need to read medical studies yourself (unless you want to)</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">The BRAIN framework</span>
                  <span className="text-muted-foreground"> — how to evaluate any intervention in the moment (Benefits, Risks, Alternatives, Intuition, Nothing/wait)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Topics covered */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your Complete Journey — From Provider Selection to Coming Home</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {guideTopics.map((topic, i) => (
                <div key={i} className="flex items-center gap-2 text-sm bg-white/50 rounded-lg p-2">
                  <topic.icon className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-medium">{topic.title}</span>
                    {topic.desc && (
                      <span className="text-muted-foreground hidden sm:inline"> — {topic.desc}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The goal */}
          <div className="bg-white/70 rounded-lg p-4 border border-primary/10">
            <p className="text-center">
              <span className="font-semibold">The goal—the only goal that really matters—is a healthy baby and a healthy mom.</span>
              <br />
              <span className="text-muted-foreground text-sm">
                But &quot;healthy&quot; means more than survival. It means a mother who feels respected and heard.
                A baby who gets the gentlest possible entry into the world. A family that emerges feeling empowered rather than traumatized.
              </span>
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-2">
            <Button asChild size="lg" className="min-h-[52px] text-base px-8">
              <a href="https://birthplanbuilder.com/guide" target="_blank" rel="noopener noreferrer">
                Get the Research Guide — $39
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium">Instant PDF Download</p>
              <p className="text-xs text-muted-foreground">Save hours of research</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
                Create a <strong>free account</strong> to save your birth plan and come back to edit it anytime as your preferences evolve.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                100% Free — No Credit Card Required
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
