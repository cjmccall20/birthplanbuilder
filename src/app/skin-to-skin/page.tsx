import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, AlertCircle, HelpCircle, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Skin-to-Skin Contact: Golden Hour Benefits & How to Ask | Birth Plan Builder',
  description: 'Learn about immediate skin-to-skin contact after birth - benefits of the golden hour, how to request it, and what to include in your birth plan.',
  keywords: 'skin to skin, golden hour birth, immediate skin contact, skin to skin after birth, skin to skin benefits, kangaroo care',
}

export default function SkinToSkinPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl mb-6">
                Skin-to-Skin Contact: Golden Hour Benefits & How to Ask
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Understanding the science behind immediate skin-to-skin contact and how to protect this critical bonding time in your birth plan.
              </p>
            </div>
          </div>
        </section>

        {/* What It Is */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl prose prose-lg">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">What Is Skin-to-Skin Contact?</h2>
              <p className="text-muted-foreground mb-4">
                Skin-to-skin contact (also called kangaroo care) means placing your naked baby directly on your bare chest immediately after birth, covered with a warm blanket. This practice is recommended for at least the first hour after delivery - often called the "golden hour."
              </p>
              <p className="text-muted-foreground mb-4">
                During skin-to-skin, the baby is placed on the mother's chest (or father's/partner's chest) wearing only a diaper, allowing direct skin contact. This triggers powerful biological and emotional responses in both parent and baby.
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
                      <Heart className="h-5 w-5 text-primary fill-primary/20" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Many baby-friendly hospitals now promote immediate skin-to-skin contact as standard practice for healthy newborns after vaginal birth. However, practices vary significantly between facilities and individual providers.
                      </p>
                      <p className="text-muted-foreground mb-4">
                        <strong>Best-case scenario:</strong> Baby is placed directly on your chest immediately after birth, and routine procedures (weighing, measuring, Apgar scores) are delayed for at least 1-2 hours or performed while baby remains on your chest.
                      </p>
                      <p className="text-muted-foreground mb-4">
                        <strong>Common scenario:</strong> Baby is placed on your chest briefly, then taken to a warmer for weighing, measuring, and assessments within 10-20 minutes, then returned to you.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>After cesarean:</strong> Skin-to-skin in the OR is becoming more common but may require advance discussion with your surgical team. Some hospitals routinely offer it, others need special requests.
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
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8">Benefits of Immediate Skin-to-Skin Contact</h2>

              <div className="space-y-6">
                <Card className="border-primary/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-4">For Baby</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Temperature regulation:</strong> Mother's chest naturally adjusts temperature to keep baby warm (more effective than warming lamps)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Stabilizes heart rate and breathing:</strong> Baby's vital signs stabilize faster with skin-to-skin</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Blood sugar regulation:</strong> Helps prevent hypoglycemia in newborns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Reduces stress and crying:</strong> Lower cortisol levels, calmer baby</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Colonization with mother's healthy bacteria:</strong> Supports immune system development</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Supports breastfeeding:</strong> Babies are more alert and successful at latching when placed skin-to-skin immediately after birth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Facilitates "breast crawl":</strong> Newborns can often crawl to the breast and self-attach when given uninterrupted skin-to-skin time</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-4">For Mother</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Oxytocin release:</strong> The "love hormone" promotes bonding and helps uterus contract, reducing bleeding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Promotes milk production:</strong> Stimulates breastfeeding hormones and earlier milk coming in</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Reduces postpartum depression risk:</strong> Immediate bonding and hormone release support maternal mental health</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Enhances maternal confidence:</strong> Mothers who have uninterrupted skin-to-skin time report feeling more confident in caring for their babies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span><strong>Lower stress levels:</strong> Reduced anxiety and cortisol in new mothers</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-4">Long-Term Benefits</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Improved parent-infant bonding and attachment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Higher breastfeeding success rates and duration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Better neurodevelopmental outcomes for premature babies</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* The Golden Hour */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">What Is the "Golden Hour"?</h2>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    The "golden hour" refers to the first 60-120 minutes after birth when skin-to-skin contact is especially important. During this time, babies go through predictable behavioral stages and are in an optimal state for bonding and breastfeeding.
                  </p>

                  <h4 className="font-semibold mb-3">Baby's Stages During the Golden Hour:</h4>
                  <div className="space-y-3 text-sm text-muted-foreground mb-4">
                    <div className="flex gap-3">
                      <span className="font-semibold min-w-[120px]">0-2 minutes:</span>
                      <span>Crying and initial adjustment</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold min-w-[120px]">2-8 minutes:</span>
                      <span>Relaxation phase (baby becomes calm)</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold min-w-[120px]">8-20 minutes:</span>
                      <span>Awakening (increased alertness, eye opening)</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold min-w-[120px]">20-45 minutes:</span>
                      <span>Activity (rooting, hand-to-mouth movements, crawling toward breast)</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold min-w-[120px]">45-60 minutes:</span>
                      <span>First feeding attempt (many babies self-attach)</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold min-w-[120px]">60+ minutes:</span>
                      <span>Sleep phase</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Why it matters:</strong> Interrupting this sequence with routine procedures can disrupt these natural bonding and feeding behaviors, potentially making breastfeeding more challenging.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* When It's Not Possible */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">When Immediate Skin-to-Skin Might Not Be Possible</h2>

              <Card className="border-orange-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                    <h3 className="font-semibold text-lg">Medical Situations</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground mb-4">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                      <span>Baby needs immediate medical attention or resuscitation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                      <span>Mother has medical complications requiring urgent care</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                      <span>Some cesarean sections (though skin-to-skin in the OR is increasingly common)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                      <span>Premature babies requiring NICU care (though skin-to-skin can often still happen with medical support)</span>
                    </li>
                  </ul>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-900">
                      <strong>Alternative:</strong> If mother cannot do skin-to-skin immediately, a partner or support person can provide skin-to-skin contact until mother is able. Research shows partners also benefit from and can provide effective skin-to-skin care.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How to Request */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">How to Request Uninterrupted Skin-to-Skin</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Include It in Your Birth Plan</h3>
                    <p className="text-muted-foreground mb-3">
                      Specify that you want:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Immediate skin-to-skin contact (baby placed directly on your chest after birth)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Uninterrupted skin-to-skin for at least 1-2 hours (golden hour)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>All routine procedures delayed until after the first feeding (weighing, measuring, bathing, vitamin K, eye ointment)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Apgar scores and assessments performed while baby remains on your chest</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>If cesarean: skin-to-skin in the operating room if possible, or with partner if mother is unable</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Discuss with Your Provider in Advance</h3>
                    <p className="text-muted-foreground">
                      Not all hospitals or providers are equally supportive of delayed procedures. Have a conversation during your prenatal visits to understand your facility's policies and whether they can accommodate your wishes. If skin-to-skin is important to you and your provider seems resistant, consider whether this is the right birth location for you.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Have Your Partner Advocate</h3>
                    <p className="text-muted-foreground">
                      Labor and delivery can be overwhelming. Designate your partner or support person to advocate for uninterrupted skin-to-skin time and remind staff of your wishes if needed.
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
                      'Does your facility support immediate skin-to-skin contact as standard practice?',
                      'Can routine procedures (weighing, measuring, bathing) be delayed for at least 1-2 hours?',
                      'Will Apgar scores and assessments be done while baby remains on my chest?',
                      'If I have a cesarean, can I still do skin-to-skin in the operating room?',
                      'If I\'m unable to do skin-to-skin immediately, can my partner do it instead?',
                      'What circumstances would require separating me from my baby?',
                      'Is your hospital Baby-Friendly certified? (This designation requires supporting skin-to-skin)',
                      'Can I continue skin-to-skin while receiving stitches or during postpartum monitoring?',
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
                Our comprehensive Birth Decision Research Guide includes peer-reviewed studies, hospital advocacy tips, and evidence-based information on skin-to-skin and 15+ other birth decisions.
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
                Document your skin-to-skin preferences and 20+ other birth decisions in a beautiful, professional PDF to share with your care team.
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
                <strong>Medical Disclaimer:</strong> This information is for educational purposes only and does not constitute medical advice. Skin-to-skin contact is widely recommended by medical organizations including WHO and AAP. Always discuss your specific birth situation with your healthcare provider.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
