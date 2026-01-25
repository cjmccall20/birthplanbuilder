import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, FileText, Mail, Sparkles, Clock, Shield } from 'lucide-react'

export default function HomePage() {
  // JSON-LD structured data for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a birth plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A birth plan is a written document that outlines your preferences for labor, delivery, and newborn care. It helps communicate your wishes to your medical team, covering topics like pain management, fetal monitoring, newborn procedures, and postpartum care. Our free birth plan template makes it easy to create a comprehensive plan."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a birth plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While not required, a birth plan is highly beneficial. It helps you research and understand your options, facilitates communication with your care team, and ensures your preferences are known if you're unable to communicate during labor. Studies show that parents who use birth plans feel more informed and empowered during delivery."
        }
      },
      {
        "@type": "Question",
        "name": "When should I create my birth plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The ideal time to create your birth plan is during your second or third trimester (around 28-36 weeks). This gives you time to research options, discuss preferences with your healthcare provider, and make any necessary revisions. Our natural birth plan generator takes just 5 minutes to complete whenever you're ready."
        }
      },
      {
        "@type": "Question",
        "name": "Can I change my birth plan during labor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Your birth plan is a guide, not a contract. Labor is unpredictable, and it's perfectly okay to change your mind about any preference. Medical circumstances may also require adjustments. Think of your birth plan as a starting point for communication with your care team, not a rigid set of rules."
        }
      },
      {
        "@type": "Question",
        "name": "How do I share my birth plan with my care team?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once you create your free birth plan template with our generator, you'll receive a professional PDF via email. Print several copies to bring to your hospital or birth center, and give one to your doctor or midwife at a prenatal appointment. Many parents also keep a digital copy on their phone and email it to their birth facility in advance."
        }
      }
    ]
  };

  // JSON-LD structured data for WebApplication
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Birth Plan Builder",
    "description": "Free natural birth plan generator that creates personalized, professional birth plan templates in minutes",
    "url": "https://birthplanbuilder.com",
    "applicationCategory": "HealthApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Free birth plan template generator",
      "5 professional PDF templates",
      "Guided questionnaire",
      "Instant PDF download via email",
      "Research-backed options",
      "No account required"
    ]
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container relative px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Create Your Free Birth Plan
                <span className="text-primary block mt-2">Natural Birth Plan Template Generator</span>
              </h1>
              <p className="mt-6 text-base text-muted-foreground sm:text-lg md:text-xl">
                Use our free birth plan template to create a personalized, professional document in minutes.
                Choose your path: take a quick guided quiz or jump straight into the full editor.
              </p>

              {/* Two Path Options */}
              <div className="mt-10 grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
                {/* Quiz Path */}
                <div className="bg-card border-2 border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                  <div className="mb-3">
                    <Clock className="h-8 w-8 text-primary mx-auto" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Guided Quiz</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Quick guided experience with simple questions. Perfect if you're just starting to explore your options.
                  </p>
                  <p className="text-xs text-muted-foreground mb-4 font-medium">Takes about 5 minutes</p>
                  <Button asChild size="lg" className="w-full min-h-[44px]">
                    <Link href="/quiz">Take the Quiz</Link>
                  </Button>
                </div>

                {/* Visual Editor Path */}
                <div className="bg-card border-2 border-muted rounded-lg p-6 text-center hover:border-muted-foreground/40 transition-colors">
                  <div className="mb-3">
                    <Sparkles className="h-8 w-8 text-primary mx-auto" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Visual Editor</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Full control to customize everything directly. Ideal if you know what you want.
                  </p>
                  <p className="text-xs text-muted-foreground mb-4 font-medium">Build at your own pace</p>
                  <Button asChild variant="outline" size="lg" className="w-full min-h-[44px]">
                    <Link href="/editor">Use Visual Editor</Link>
                  </Button>
                </div>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                100% free, no account required. Both options deliver a professional PDF via email.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20 bg-muted/30" id="features">
          <div className="container px-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-4">
              Why Use Our Free Birth Plan Template Generator?
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
              Our natural birth plan generator helps you create a professional document that clearly
              communicates your preferences to your care team.
            </p>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">Quick & Easy</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Complete in just 5 minutes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Guided questions for every preference</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Auto-save progress as you go</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">Professional Templates</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>5 gorgeous PDF designs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Easy for medical staff to read</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Print-ready and shareable</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">Research-Backed Options</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Evidence-based information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>"Learn More" for each option</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Make informed decisions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20" id="how-it-works">
          <div className="container px-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-4">
              How to Create Your Free Birth Plan Template
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
              Our natural birth plan generator makes it simple to create a personalized document in 4 easy steps.
            </p>
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="mb-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Answer Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Tell us your preferences for labor, delivery, and newborn care through our guided questionnaire.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Choose Template Style</h3>
                <p className="text-sm text-muted-foreground">
                  Select from 5 beautiful, professional birth plan templates.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Add Personal Details</h3>
                <p className="text-sm text-muted-foreground">
                  Include your birth team information and any special notes or preferences.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-xl font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Download Your PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Receive your customized birth plan PDF via email - ready to print and share.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Preview */}
        <section className="py-12 md:py-20 bg-muted/30" id="templates">
          <div className="container px-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-4">
              5 Free Birth Plan Template Designs
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
              Choose the birth plan template style that matches your personality. All templates are professionally
              designed, easy for medical staff to read, and completely free to use.
            </p>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 max-w-4xl mx-auto">
              {[
                { name: 'Minimal', desc: 'Clean & modern' },
                { name: 'Floral', desc: 'Soft & feminine' },
                { name: 'Professional', desc: 'Medical-style' },
                { name: 'Elegant', desc: 'Gold accents' },
                { name: 'Rustic', desc: 'Earth tones' },
              ].map((template) => (
                <Card key={template.name} className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="w-full aspect-[8.5/11] bg-muted rounded mb-3 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <h4 className="font-semibold">{template.name}</h4>
                    <p className="text-xs text-muted-foreground">{template.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What's Covered */}
        <section className="py-20">
          <div className="container px-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-12">
              What's Covered in Your Birth Plan
            </h2>
            <div className="grid gap-3 sm:gap-6 md:grid-cols-2 max-w-3xl mx-auto">
              {[
                'Newborn procedures (Vitamin K, Hep B, eye ointment)',
                'Cord clamping and cord blood banking',
                'Skin-to-skin contact and first bath timing',
                'Pain management preferences',
                'Fetal monitoring options',
                'IV and eating/drinking during labor',
                'Baby feeding preferences',
                'Circumcision (if applicable)',
                'Rooming in vs. nursery',
                'Placenta plans',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-20 bg-muted/30" id="faq">
          <div className="container px-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
              Everything you need to know about using our free birth plan template generator.
            </p>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">What is a birth plan?</h3>
                  <p className="text-muted-foreground">
                    A birth plan is a written document that outlines your preferences for labor, delivery, and newborn care.
                    It helps communicate your wishes to your medical team, covering topics like pain management, fetal monitoring,
                    newborn procedures, and postpartum care. Our free birth plan template makes it easy to create a comprehensive plan.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">Do I need a birth plan?</h3>
                  <p className="text-muted-foreground">
                    While not required, a birth plan is highly beneficial. It helps you research and understand your options,
                    facilitates communication with your care team, and ensures your preferences are known if you're unable to
                    communicate during labor. Studies show that parents who use birth plans feel more informed and empowered during delivery.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">When should I create my birth plan?</h3>
                  <p className="text-muted-foreground">
                    The ideal time to create your birth plan is during your second or third trimester (around 28-36 weeks).
                    This gives you time to research options, discuss preferences with your healthcare provider, and make any
                    necessary revisions. Our natural birth plan generator takes just 5 minutes to complete whenever you're ready.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">Can I change my birth plan during labor?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! Your birth plan is a guide, not a contract. Labor is unpredictable, and it's perfectly okay to change
                    your mind about any preference. Medical circumstances may also require adjustments. Think of your birth plan as a
                    starting point for communication with your care team, not a rigid set of rules.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">How do I share my birth plan with my care team?</h3>
                  <p className="text-muted-foreground">
                    Once you create your free birth plan template with our generator, you'll receive a professional PDF via email.
                    Print several copies to bring to your hospital or birth center, and give one to your doctor or midwife at a
                    prenatal appointment. Many parents also keep a digital copy on their phone and email it to their birth facility in advance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold mb-4">
                Ready to Create Your Free Birth Plan?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of expecting parents who've used our free natural birth plan generator to communicate
                their birth preferences clearly and confidently.
              </p>
              <Button asChild size="lg" className="min-h-[44px] text-base sm:text-lg px-6 sm:px-8">
                <Link href="/quiz">Start My Free Birth Plan Template</Link>
              </Button>
              <div className="mt-6 flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  100% Free
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  No Account Required
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  PDF via Email
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
