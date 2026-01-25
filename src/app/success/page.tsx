'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Mail, Download, Share2, BookOpen, ArrowRight, Printer, Link2, CheckCircle, Sparkles } from 'lucide-react'
import { quizQuestions } from '@/lib/quiz/questions'

// Helper function to get initial email from localStorage
function getInitialEmail(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('birthplan_email') || ''
}

// Helper function to get initial unsure topics from localStorage
function getInitialUnsureTopics(): string[] {
  if (typeof window === 'undefined') return []
  const savedState = localStorage.getItem('birthplan_quiz_state')
  if (!savedState) return []
  try {
    const state = JSON.parse(savedState)
    return Object.entries(state.answers)
      .filter(([, answer]) => answer === 'unsure')
      .map(([questionId]) => {
        const question = quizQuestions.find(q => q.id === questionId)
        return question ? question.title : questionId
      })
  } catch {
    return []
  }
}

export default function SuccessPage() {
  const [email] = useState(getInitialEmail)
  const [unsureTopics] = useState(getInitialUnsureTopics)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    const url = window.location.origin
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-24">
          <div className="container max-w-3xl px-4">
            {/* Success Message */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Congratulations! Your Birth Plan is Ready
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-6">
                We've sent your personalized birth plan to{' '}
                <span className="font-medium text-foreground">{email || 'your email'}</span>.
              </p>
              <p className="text-sm text-muted-foreground">
                Check your inbox (and spam folder, just in case).
              </p>
            </div>

            {/* Quick Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Access and share your birth plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`mailto:${email}`}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF from Email
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handlePrint}>
                    <Printer className="h-4 w-4 mr-2" />
                    Print Birth Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start sm:col-span-2"
                    onClick={handleCopyLink}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Link Copied!
                      </>
                    ) : (
                      <>
                        <Link2 className="h-4 w-4 mr-2" />
                        Copy Link to Share with Partner
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Personalized Research Guide Upsell */}
            {unsureTopics.length > 0 && (
              <Card className="border-primary/40 bg-gradient-to-br from-primary/10 via-primary/5 to-background mb-8 shadow-lg">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        Still Have Questions? We Can Help
                      </CardTitle>
                      <CardDescription className="text-base">
                        You marked {unsureTopics.length} decision{unsureTopics.length !== 1 ? 's' : ''} as needing more research
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-background/80 border border-primary/20">
                    <p className="font-medium mb-2 text-sm text-muted-foreground">Topics you want to learn more about:</p>
                    <ul className="space-y-1.5">
                      {unsureTopics.map((topic) => (
                        <li key={topic} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="font-medium">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-base mb-4">
                      The <strong>Birth Plan Research Guide</strong> gives you exactly what you need: balanced pros and cons, medical evidence, and real citations for every birth decision.
                    </p>

                    <div className="space-y-2 mb-6">
                      <p className="font-medium text-sm">What's included:</p>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {[
                          'Evidence-based research on every topic',
                          'Medical citations you can verify',
                          'Balanced pros and cons',
                          'Questions to ask your provider',
                          'Up-to-date clinical guidelines',
                          'Alternative options explained',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <Button asChild size="lg" className="w-full text-base shadow-md">
                        <Link href="/guide">
                          Get the Research Guide - $39
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </Link>
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Make informed decisions with confidence
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Generic Upsell for users with no unsure topics */}
            {unsureTopics.length === 0 && (
              <Card className="border-primary/30 bg-primary/5 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Want to Dive Deeper?
                  </CardTitle>
                  <CardDescription>
                    Make informed decisions with our comprehensive research guide
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The <strong>Birth Plan Research Guide</strong> gives you balanced pros
                    and cons for every decision, with citations to medical research so you
                    can have informed conversations with your care team.
                  </p>

                  <ul className="grid gap-2 md:grid-cols-2">
                    {[
                      'Vitamin K shot research',
                      'Hepatitis B vaccine timing',
                      'GBS antibiotics alternatives',
                      'Cord clamping evidence',
                      'Pain management options',
                      'Newborn procedure research',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <Link href="/guide">
                        Get the Research Guide - $39
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Next Steps Checklist */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Next Steps
                </CardTitle>
                <CardDescription>
                  Here's how to make the most of your birth plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Print copies for your hospital bag</p>
                      <p className="text-sm text-muted-foreground">
                        Bring 2-3 copies to give to your nurses, doctor, and support person.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Share with your partner and birth team</p>
                      <p className="text-sm text-muted-foreground">
                        Make sure everyone knows your preferences and can advocate for you.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Discuss with your care provider</p>
                      <p className="text-sm text-muted-foreground">
                        Review your birth plan at your next prenatal visit to ensure alignment.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Review and update as needed</p>
                      <p className="text-sm text-muted-foreground">
                        Your preferences may evolve. Feel free to create an updated version anytime.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Social Share */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Know someone who could use a birth plan?
              </p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" size="sm" onClick={handleCopyLink}>
                  <Share2 className="h-4 w-4 mr-2" />
                  {copied ? 'Copied!' : 'Share Birth Plan Builder'}
                </Button>
              </div>
            </div>

            {/* Create Another */}
            <div className="mt-12 text-center">
              <Button asChild variant="ghost">
                <Link href="/quiz">Create another birth plan</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
