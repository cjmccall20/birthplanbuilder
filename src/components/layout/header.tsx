'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary fill-primary/20" />
          <span className="font-serif text-lg sm:text-xl font-semibold">Birth Plan Builder</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-6">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex text-sm font-medium">
            <Link href="#how-it-works">How It Works</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex text-sm font-medium">
            <Link href="#templates">Templates</Link>
          </Button>
          <Button asChild size="sm" className="min-h-[44px] text-sm font-medium">
            <Link href="/quiz">Start Plan</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
