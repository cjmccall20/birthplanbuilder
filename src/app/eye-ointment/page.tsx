import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, AlertCircle, HelpCircle, Eye } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Newborn Eye Ointment (Erythromycin): Required or Optional? | Birth Plan Builder',
  description: 'Learn about erythromycin eye ointment for newborns - why it\'s given, state laws, risks of declining, and alternatives. Evidence-based guide for your birth plan.',
  keywords: 'erythromycin eye ointment, newborn eye drops, eye prophylaxis, antibiotic eye ointment, decline eye ointment, newborn eye treatment',
}

export default function EyeOintmentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl mb-6">
                Newborn Eye Ointment (Erythromycin): Required or Optional?
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Understanding antibiotic eye prophylaxis for newborns - when it's necessary, state laws, and your rights to decline.
              </p>
            </div>
          </div>
        </section>

        {/* What It Is */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl prose prose-lg">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">What Is Newborn Eye Ointment?</h2>
              <p className="text-muted-foreground mb-4">
                Shortly after birth, hospitals apply erythromycin antibiotic ointment to newborns' eyes. This practice, called "eye prophylaxis," is intended to prevent serious eye infections that can be transmitted during vaginal birth.
              </p>
              <p className="text-muted-foreground mb-4">
                The ointment is applied as a small ribbon along the lower eyelid of each eye, typically within the first hour after birth (though many parents request delaying it to allow for better eye contact during initial bonding).
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
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Eye prophylaxis is mandated by law in most U.S. states, though the specifics vary. Some states require it unless parents formally decline, while others have stricter requirements.
                      </p>
                      <p className="text-muted-foreground mb-4">
                        Erythromycin replaced silver nitrate (which was more irritating) in the 1980s. It's applied routinely to all newborns, regardless of the mother's STI status or mode of delivery, as a preventive measure.
                      </p>
                      <p className="text-muted-foreground">
                        Many hospitals will allow you to delay the application for 1-2 hours after birth to allow for bonding and breastfeeding, but will still require it eventually unless you formally decline.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why It's Given */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8">Why Eye Ointment Is Given</h2>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4">Protection Against Gonorrhea and Chlamydia</h3>
                  <p className="text-muted-foreground mb-4">
                    The primary purpose of eye prophylaxis is to prevent ophthalmia neonatorum - serious eye infections caused by gonorrhea or chlamydia bacteria that can be transmitted during vaginal birth.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Gonorrhea:</strong> Without treatment, can cause severe eye infection leading to blindness. Now rare in developed countries due to routine screening and treatment during pregnancy.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Chlamydia:</strong> Can cause conjunctivitis and pneumonia in newborns. However, erythromycin ointment is not fully effective against chlamydia (oral antibiotics are more effective if baby is infected).</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4">Historical Context</h3>
                  <p className="text-muted-foreground">
                    Eye prophylaxis became universal in the late 1800s when gonorrhea was common and untreatable. It dramatically reduced blindness from neonatal gonorrhea. Today, prenatal screening and treatment have made these infections rare in pregnant women in developed countries, leading many parents to question whether the intervention is still necessary.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-center">Benefits & Concerns</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Benefits */}
                <Card className="border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                      <h3 className="font-semibold text-xl">Benefits</h3>
                    </div>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Prevents blindness from gonococcal eye infection (rare but serious)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Provides protection even if prenatal testing was false negative or if mother was exposed after testing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Low-risk intervention with minimal side effects</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Provides peace of mind for parents</span>
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
                        <span>Can cause temporary blurred vision and eye irritation for 24-48 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span>May interfere with early eye contact and bonding if applied immediately after birth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span>Not fully effective against chlamydia (the more common infection)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span>May be unnecessary if mother tested negative for STIs and is in a monogamous relationship</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <span>Rare allergic reactions (redness, swelling)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Can You Decline */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Can You Decline Eye Ointment?</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">State Laws Vary</h3>
                    <p className="text-muted-foreground mb-4">
                      Parents' ability to decline eye prophylaxis depends on state law:
                    </p>
                    <ul className="space-y-3 text-muted-foreground mb-4">
                      <li className="flex items-start gap-2">
                        <span className="font-semibold min-w-[140px]">Parental choice:</span>
                        <span>Some states allow parents to decline with written refusal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold min-w-[140px]">Required by law:</span>
                        <span>Other states mandate it for all newborns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold min-w-[140px]">Religious exemption:</span>
                        <span>Some states allow exemptions for religious reasons</span>
                      </li>
                    </ul>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <strong>Check your state's laws:</strong> Contact your hospital or birth provider to understand your state's specific requirements and whether you can legally decline.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Risk Assessment</h3>
                    <p className="text-muted-foreground mb-4">
                      Parents may feel comfortable declining if:
                    </p>
                    <ul className="space-y-3 text-muted-foreground mb-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Mother tested negative for gonorrhea and chlamydia during pregnancy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Mother and partner are in a mutually monogamous relationship</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>Cesarean birth (no exposure to vaginal bacteria)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>State law permits parental refusal</span>
                      </li>
                    </ul>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-sm text-orange-900">
                        <strong>Important:</strong> Even with low risk, there is still a small possibility of undetected infection. Discuss your specific situation with your healthcare provider.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Middle Ground: Delayed Application</h3>
                    <p className="text-muted-foreground">
                      If you're unsure about declining entirely, many hospitals will accommodate a request to delay the eye ointment for 1-2 hours after birth. This allows for uninterrupted skin-to-skin contact and eye contact during the critical first hour, while still providing the preventive treatment.
                    </p>
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
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Are There Alternatives?</h2>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    <strong>Short answer: Not really.</strong>
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Erythromycin is the standard antibiotic ointment used in the U.S. Some countries use other antibiotics (like tetracycline), but these are not available in American hospitals.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Povidone-iodine (Betadine) solution has been studied as an alternative and shows effectiveness, but it's not currently approved or used for this purpose in the U.S.
                  </p>
                  <p className="text-muted-foreground">
                    Your main options are: receive the erythromycin ointment (immediate or delayed), or decline treatment entirely (where legally permitted).
                  </p>
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
                      'What is our state\'s law regarding newborn eye prophylaxis? Can we legally decline?',
                      'Can we delay the eye ointment for 1-2 hours after birth to allow for bonding?',
                      'What are the actual risks of declining in our specific situation (given my test results)?',
                      'Will my baby still receive the ointment if we have a cesarean birth?',
                      'What brand/type of eye ointment does your hospital use?',
                      'What signs should we watch for if we decline and need to monitor for infection?',
                      'How long does the ointment typically affect the baby\'s vision?',
                      'If we decline, will we need to sign a waiver?',
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
                Our comprehensive Birth Decision Research Guide includes peer-reviewed studies, state-by-state laws, and evidence-based information on eye ointment and 15+ other birth decisions.
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
                Document your eye ointment preferences and 20+ other birth decisions in a beautiful, professional PDF to share with your care team.
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
                <strong>Medical Disclaimer:</strong> This information is for educational purposes only and does not constitute medical advice. Eye prophylaxis laws and recommendations vary by state. Always discuss your specific situation, test results, and state laws with your healthcare provider before making decisions.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
