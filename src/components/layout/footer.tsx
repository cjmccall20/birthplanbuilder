import Link from 'next/link'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-primary fill-primary/20" />
              <span className="font-serif text-lg font-semibold">Birth Plan Builder</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Helping expecting parents make informed decisions about their baby's birth.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/quiz" className="hover:text-foreground transition-colors">
                  Start Your Birth Plan
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#templates" className="hover:text-foreground transition-colors">
                  View Templates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Birth Plan Builder. All rights reserved.
          </p>
          <p className="text-center text-xs text-muted-foreground mt-2">
            This tool is for informational purposes only and does not constitute medical advice.
            Always consult with your healthcare provider about your birth preferences.
          </p>
        </div>
      </div>
    </footer>
  )
}
