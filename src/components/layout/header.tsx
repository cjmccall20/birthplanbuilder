'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary/20" />
          <span className="font-serif text-xl font-semibold">Birth Plan Builder</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/quiz" className="text-sm font-medium hover:text-primary transition-colors">
            Start Your Plan
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="#templates" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Templates
          </Link>
        </nav>
      </div>
    </header>
  )
}
