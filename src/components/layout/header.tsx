'use client'

import Link from 'next/link'
import { Heart, User, LogOut, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/auth/AuthProvider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const { user, signOut } = useAuth()

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

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline-block max-w-[150px] truncate">
                    {user.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/plans" className="flex items-center cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>My Birth Plans</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" size="sm" className="min-h-[44px] text-sm font-medium">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
