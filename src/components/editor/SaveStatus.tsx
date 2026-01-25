'use client'

import { CheckCircle2, Loader2, AlertCircle, LogIn } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

interface SaveStatusProps {
  isSaving: boolean
  lastSaved: string | null
  error: string | null
  isLoggedIn: boolean
}

export function SaveStatus({ isSaving, lastSaved, error, isLoggedIn }: SaveStatusProps) {
  const router = useRouter()

  // Show toast when there's an error
  useEffect(() => {
    if (error) {
      toast.error('Failed to save', {
        description: error,
        duration: 5000,
      })
    }
  }, [error])

  // Not logged in - encourage free account creation
  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <LogIn className="h-4 w-4" />
        <span className="hidden sm:inline">Create a free account to save & edit later</span>
        <span className="sm:hidden">Free account to save</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push('/auth/login?redirect=/editor')}
          className="h-8 px-3 text-primary border-primary hover:bg-primary/10"
        >
          Sign Up Free
        </Button>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm text-destructive">
        <AlertCircle className="h-4 w-4" />
        <span>Error: {error}</span>
      </div>
    )
  }

  // Saving state
  if (isSaving) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Saving...</span>
      </div>
    )
  }

  // Saved state
  if (lastSaved) {
    const timeAgo = formatDistanceToNow(new Date(lastSaved), { addSuffix: true })
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-500">
        <CheckCircle2 className="h-4 w-4" />
        <span>Saved {timeAgo}</span>
      </div>
    )
  }

  // No save yet
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Not saved yet</span>
    </div>
  )
}
