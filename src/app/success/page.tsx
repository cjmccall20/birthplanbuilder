'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Mail, Download, Share2, BookOpen, ArrowRight } from 'lucide-react'

export default function SuccessPage() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    const storedEmail = localStorage.getItem('birthplan_email')
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            {/* Success Message */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="font-serif text-4xl font-bold mb-4">
                Your Birth Plan is on the Way!
              </h1>
              <p className="text-lg text-muted-foreground">
                We've sent your personalized birth plan to{' '}
                <span className="font-medium text-foreground">{email || 'your email'}</span>.
                Check your inbox (and spam folder, just in case).
              </p>
            </div>

            {/* Next Steps */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  What's Next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Check your email</p>
                      <p className="text-sm text-muted-foreground">
                        Your PDF is attached to the email we just sent.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Print a few copies</p>
                      <p className="text-sm text-muted-foreground">
                        Keep one in your hospital bag and give one to your support person.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Share with your care team</p>
                      <p className="text-sm text-muted-foreground">
                        Discuss your preferences at your next prenatal visit.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Upsell Section */}
            <Card className="border-primary/30 bg-primary/5">
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

            {/* Social Share */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Know someone who could use a birth plan?
              </p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
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
