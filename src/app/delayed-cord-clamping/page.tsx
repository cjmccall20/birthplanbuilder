import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, AlertCircle, HelpCircle, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Delayed Cord Clamping: Benefits, Timing & What to Ask | Birth Plan Builder',
  description: 'Learn about delayed cord clamping benefits, optimal timing, and when it might not be recommended. Evidence-based guide for your birth plan.',
  keywords: 'delayed cord clamping, cord clamping benefits, when to clamp cord, umbilical cord clamping, immediate cord clamping, cord blood banking',
}

export default function DelayedCordClampingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl mb-6">
                Delayed Cord Clamping: Benefits, Timing & What to Ask
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Understanding when and why to delay umbilical cord clamping after birth, and how it affects your baby's health.
              </p>
            </div>
          </div>
        </section>

        {/* What It Is */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl prose prose-lg">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">What Is Delayed Cord Clamping?</h2>
              <p className="text-muted-foreground mb-4">
                Delayed cord clamping (DCC) means waiting to clamp and cut the umbilical cord after birth, rather than doing so immediately. During this time, blood continues to transfer from the placenta to the baby.
              </p>
              <p className="text-muted-foreground mb-4">
                Typically, delayed cord clamping means waiting 30-60 seconds to 2-3 minutes after birth before clamping the cord. Some parents request "optimal cord clamping" (waiting until the cord stops pulsating, which can take 3-5 minutes or longer).
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
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-4">
                        As of 2017, the American College of Obstetricians and Gynecologists (ACOG) recommends delayed cord clamping for at least 30-60 seconds for all healthy newborns. Many hospitals have adopted this as standard practice.
                      </p>
                      <p className="text-muted-foreground mb-4">
                        However, practices still vary. Some providers may clamp immediately out of habit, especially during busy deliveries or if there are concerns about the baby or mother. It's important to include your preference in your birth plan.
                      </p>
                      <p className="text-muted-foreground">
                        For premature babies, ACOG recommends waiting at least 30-60 seconds unless immediate resuscitation is needed.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8">Benefits of Delayed Cord Clamping</h2>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4">For Full-Term Babies</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Increased iron stores:</strong> Babies receive 80-100mL of blood, which increases iron stores and reduces anemia risk in the first year of life</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Higher hemoglobin levels:</strong> Better oxygen-carrying capacity in the blood</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Improved blood volume:</strong> Approximately 30% more blood volume transferred to baby</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Stem cell transfer:</strong> Placental blood contains valuable stem cells that support immune development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Developmental benefits:</strong> Some studies suggest improved fine motor and social skills at age 4</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4">For Premature Babies</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Reduced need for blood transfusions</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Lower risk of intraventricular hemorrhage</strong> (bleeding in the brain)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Decreased risk of necrotizing enterocolitis</strong> (serious intestinal condition)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Better transition to breathing</strong></span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Timing Options */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Timing Options</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Immediate Clamping (less than 30 seconds)</h3>
                    <p className="text-muted-foreground mb-3">
                      The cord is clamped and cut within 10-15 seconds of birth. This was standard practice for decades but is now only recommended in specific medical situations.
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      When it might be necessary: Severe maternal bleeding, placental abruption, or if baby needs immediate resuscitation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Standard Delayed Clamping (30-60 seconds)</h3>
                    <p className="text-muted-foreground mb-3">
                      The minimum recommended delay by ACOG. Provides most of the benefits while being practical for hospital workflows.
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      Most common practice at hospitals that follow current guidelines.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Extended Delay (1-3 minutes)</h3>
                    <p className="text-muted-foreground mb-3">
                      Allows more complete blood transfer. Some research suggests additional benefits beyond the 30-60 second minimum.
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      Easily accommodated if requested in your birth plan.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Optimal/Physiological Clamping (until pulsation stops)</h3>
                    <p className="text-muted-foreground mb-3">
                      Waiting until the cord stops pulsating (usually 3-10 minutes). This allows maximum blood transfer but may not always be practical in hospital settings.
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      More common in home births or birth center settings.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Concerns and Contraindications */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">When Delayed Clamping Might Not Be Recommended</h2>

              <Card className="border-orange-200 mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                    <h3 className="font-semibold text-lg">Medical Situations</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                      <span>Baby needs immediate resuscitation or medical attention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                      <span>Severe maternal bleeding or placental complications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                      <span>Placenta previa or placental abruption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                      <span>Abnormal fetal heart rate requiring immediate intervention</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">What About Jaundice?</h3>
                  <p className="text-muted-foreground mb-3">
                    A common concern is that delayed cord clamping increases the risk of newborn jaundice (yellowing of the skin due to bilirubin buildup). Research shows a small increase in jaundice requiring phototherapy (light treatment), but the overall risk is still low and considered acceptable given the benefits.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    The increased risk is approximately 2% compared to immediate clamping. Most cases of jaundice are mild and resolve with phototherapy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Cord Blood Banking */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Delayed Clamping vs. Cord Blood Banking</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    If you're planning to bank your baby's cord blood (for private storage or donation), you'll need to discuss timing with your provider. Delayed cord clamping reduces the volume of blood available for collection.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Some evidence suggests that a 30-60 second delay may still allow adequate collection, but longer delays (2-3+ minutes) significantly reduce the amount of cord blood that can be collected.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Consider:</strong> The immediate health benefits of delayed cord clamping are well-established, while the future benefit of cord blood banking is uncertain (cord blood is rarely used). Discuss your priorities with your provider.
                    </p>
                  </div>
                </CardContent>
              </Card>
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
                      'What is your standard practice for cord clamping timing?',
                      'Can we delay cord clamping for at least 60 seconds (or longer) if there are no complications?',
                      'Will delayed cord clamping be honored during a cesarean section?',
                      'If the baby needs medical attention, can the cord be clamped bedside while receiving care?',
                      'How do you balance delayed clamping with cord blood banking if we choose both?',
                      'Will the baby be placed on my chest during the delay, or held at a different level?',
                      'What would cause you to clamp the cord immediately instead of waiting?',
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
                Our comprehensive Birth Decision Research Guide includes peer-reviewed studies, comparison charts, and evidence-based information on delayed cord clamping and 15+ other birth decisions.
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
                Document your cord clamping preferences and 20+ other birth decisions in a beautiful, professional PDF to share with your care team.
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
                <strong>Medical Disclaimer:</strong> This information is for educational purposes only and does not constitute medical advice. Delayed cord clamping is recommended by ACOG for healthy newborns, but individual circumstances vary. Always discuss your specific situation with your healthcare provider.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
