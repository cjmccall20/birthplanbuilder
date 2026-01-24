import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, FileText, Mail, Sparkles, Clock, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-6xl">
                Create Your Perfect
                <span className="text-primary block mt-2">Birth Plan</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Answer simple questions about your birth preferences and receive a beautiful,
                professional PDF to share with your care team. 100% free.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/quiz">Start My Birth Plan</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link href="#templates">View Templates</Link>
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                No account required. Takes about 5 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30" id="features">
          <div className="container">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">
              Why Use Our Birth Plan Builder?
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Quick & Easy</h3>
                  <p className="text-muted-foreground">
                    Answer guided questions at your own pace. Your progress saves automatically.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Beautiful Templates</h3>
                  <p className="text-muted-foreground">
                    Choose from 5 gorgeous designs - from minimal to elegant floral.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Research-Backed</h3>
                  <p className="text-muted-foreground">
                    Learn about each option with our "Learn More" explanations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20" id="how-it-works">
          <div className="container">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-4 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="mb-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Answer Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Tell us your preferences for labor, delivery, and newborn care.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Choose Your Style</h3>
                <p className="text-sm text-muted-foreground">
                  Pick from 5 beautiful PDF templates.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Add Your Details</h3>
                <p className="text-sm text-muted-foreground">
                  Include your birth team and any special notes.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-xl font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Get Your PDF</h3>
                <p className="text-sm text-muted-foreground">
                  We'll email you a beautiful PDF to print or share.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Preview */}
        <section className="py-20 bg-muted/30" id="templates">
          <div className="container">
            <h2 className="font-serif text-3xl font-bold text-center mb-4">
              5 Beautiful Templates
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Choose the style that matches your personality. All templates are professionally
              designed and easy for medical staff to read.
            </p>
            <div className="grid gap-4 md:grid-cols-5 max-w-4xl mx-auto">
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
          <div className="container">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">
              What's Covered in Your Birth Plan
            </h2>
            <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
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
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold mb-4">
                Ready to Create Your Birth Plan?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of expecting parents who've used our tool to communicate
                their birth preferences clearly.
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
