import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, AlertCircle, HelpCircle, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vitamin K Shot for Newborns: Pros, Cons & Alternatives | Birth Plan Builder',
  description: 'Everything you need to know about the vitamin K shot for newborns. Learn about benefits, risks, oral drops vs injection, and what to include in your birth plan.',
  keywords: 'vitamin K shot, newborn vitamin K, vitamin K drops, vitamin K injection, vitamin K risks, vitamin K benefits, oral vitamin K, skip vitamin K',
}

export default function VitaminKPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl mb-6">
                Vitamin K Shot for Newborns: Pros, Cons & Alternatives
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Understanding your options for vitamin K administration at birth - from the standard injection to oral drops or declining the treatment.
              </p>
            </div>
          </div>
        </section>

        {/* What It Is */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl prose prose-lg">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">What Is the Vitamin K Shot?</h2>
              <p className="text-muted-foreground mb-4">
                Shortly after birth, hospitals routinely offer a vitamin K injection (phytonadione) to newborns. This single intramuscular shot is given in the baby's thigh within the first few hours of life.
              </p>
              <p className="text-muted-foreground mb-4">
                Babies are born with low levels of vitamin K, which is essential for blood clotting. Without adequate vitamin K, newborns are at risk for vitamin K deficiency bleeding (VKDB), a serious condition that can cause bleeding in the brain or other organs.
              </p>
            </div>
          </div>
        </section>

        {/* What Hospitals Typically Do */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">What Hospitals Typically Do</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-4">
                        In the United States, the American Academy of Pediatrics (AAP) strongly recommends that all newborns receive a vitamin K injection at birth. Most hospitals administer this as standard practice within the first hour after delivery.
                      </p>
                      <p className="text-muted-foreground">
                        The standard dose is 0.5-1mg given as an intramuscular injection in the baby's thigh. Parents are typically asked for consent before administration, though the process is often presented as routine rather than optional.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-center">Benefits & Concerns</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Benefits */}
                <Card className="border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                      <h3 className="font-semibold text-xl">Benefits of Vitamin K</h3>
                    </div>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Prevents vitamin K deficiency bleeding (VKDB), which can be life-threatening</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Single injection provides immediate, reliable protection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Strongly recommended by AAP and CDC based on decades of evidence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>VKDB is rare (1.5-1.7% without prophylaxis) but devastating when it occurs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Most effective at preventing late VKDB (2-12 weeks after birth)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Concerns */}
                <Card className="border-orange-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="h-6 w-6 text-orange-600" />
                      <h3 className="font-semibold text-xl">Common Concerns</h3>
                    </div>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span>Some parents prefer to avoid early interventions or injections</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span>Brief pain/discomfort from the injection (can be done during skin-to-skin)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span>Concerns about synthetic ingredients or preservatives in the injection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span>Debunked 1990s study linking vitamin K to childhood cancer (thoroughly refuted)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span>Preference for "natural" birth with minimal medical interventions</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Alternatives */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Alternatives to the Injection</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Oral Vitamin K Drops</h3>
                    <p className="text-muted-foreground mb-3">
                      Some countries (like the UK and Netherlands) offer oral vitamin K as an alternative to injection. However, oral dosing requires multiple doses over several weeks and may not be as protective against late VKDB.
                    </p>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-sm text-orange-900">
                        <strong>Important:</strong> Oral vitamin K is not FDA-approved in the US and is not typically available at hospitals. Parents choosing this option would need to source it independently and ensure proper dosing schedule, which can be challenging.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Declining Vitamin K</h3>
                    <p className="text-muted-foreground mb-3">
                      Parents have the right to decline vitamin K administration. However, this significantly increases the risk of VKDB, particularly late VKDB which can occur 2-12 weeks after birth and may present as life-threatening bleeding in the brain.
                    </p>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-red-900">
                        <strong>Medical consensus:</strong> The AAP, CDC, and medical community strongly advise against declining vitamin K prophylaxis due to the serious risk of VKDB. Babies who are exclusively breastfed are at higher risk if vitamin K is declined.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Delayed Administration</h3>
                    <p className="text-muted-foreground">
                      Some parents request to delay the vitamin K shot for a few hours to prioritize immediate skin-to-skin contact and bonding. Most providers will accommodate this request, though administration within the first 6 hours is recommended for optimal protection.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Questions to Ask */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Questions to Ask Your Provider</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {[
                      'What brand of vitamin K does your hospital use, and what ingredients does it contain?',
                      'Can the vitamin K shot be given during skin-to-skin contact to minimize disruption?',
                      'Is oral vitamin K available at your facility, or would I need to source it myself?',
                      'What are the specific risks of VKDB if we decline vitamin K?',
                      'Can we delay the shot for a few hours after birth while we bond with the baby?',
                      'What signs of VKDB should we watch for if we choose an alternative approach?',
                    ].map((question, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{question}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Research Guide Upsell */}
        <section className="py-12 md:py-16 bg-primary/5">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                Want Deeper Research on Birth Decisions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Our comprehensive Birth Decision Research Guide includes peer-reviewed studies, comparison charts, and evidence-based information on vitamin K and 15+ other birth decisions.
              </p>
              <Button size="lg" variant="outline" className="mb-4">
                Get the Research Guide - $29
              </Button>
              <p className="text-sm text-muted-foreground">
                Includes lifetime updates and citations from medical journals
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                Ready to Create Your Birth Plan?
              </h2>
              <p className="text-muted-foreground mb-8">
                Document your vitamin K preferences and 20+ other birth decisions in a beautiful, professional PDF to share with your care team.
              </p>
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/quiz">Start My Free Birth Plan</Link>
              </Button>
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  100% Free
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Takes 5 Minutes
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  No Account Needed
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <p className="text-xs text-center text-muted-foreground">
                <strong>Medical Disclaimer:</strong> This information is for educational purposes only and does not constitute medical advice. The vitamin K shot is strongly recommended by the American Academy of Pediatrics and medical community. Always discuss your specific situation with your healthcare provider before making decisions about your baby's care.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
