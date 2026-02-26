'use client'

import { Download, Mail, CheckCircle2, Loader2, LogIn, HardDrive, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useRouter } from 'next/navigation'

interface ActionBarProps {
  decisionsIncluded: number
  totalDecisions: number
  isSaving: boolean
  lastSaved: string | null
  isLoggedIn: boolean
  onDownload: () => void
  onEmail: () => void
  onPreview: () => void
  onShowOmitted?: () => void
  saveError: string | null
  savedLocally?: boolean
}

export function ActionBar({
  decisionsIncluded,
  totalDecisions,
  isSaving,
  lastSaved,
  isLoggedIn,
  onDownload,
  onEmail,
  onPreview,
  onShowOmitted,
  saveError,
  savedLocally,
}: ActionBarProps) {
  const router = useRouter()
  const progressPercent = totalDecisions > 0
    ? Math.round((decisionsIncluded / totalDecisions) * 100)
    : 0

  return (
    <div className="hidden md:block fixed bottom-0 left-0 right-0 z-40 border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Progress */}
        <div className="hidden sm:flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-1 max-w-48">
            <Progress value={progressPercent} className="h-2" />
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {decisionsIncluded} of {totalDecisions} in plan
          </span>
          {totalDecisions - decisionsIncluded > 0 && onShowOmitted && (
            <button
              onClick={onShowOmitted}
              className="text-xs text-primary hover:text-primary/80 hover:underline transition-colors whitespace-nowrap"
            >
              {totalDecisions - decisionsIncluded} omitted
            </button>
          )}
        </div>

        {/* Mobile: compact progress */}
        <div className="sm:hidden flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {decisionsIncluded}/{totalDecisions}
          </span>
          {totalDecisions - decisionsIncluded > 0 && onShowOmitted && (
            <button
              onClick={onShowOmitted}
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              +{totalDecisions - decisionsIncluded}
            </button>
          )}
        </div>

        {/* Save Status */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {isLoggedIn ? (
            <div className="flex items-center gap-1.5 text-sm">
              {isSaving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  <span className="hidden sm:inline text-muted-foreground">Saving...</span>
                </>
              ) : saveError ? (
                <span className="text-destructive text-xs">Save error</span>
              ) : lastSaved ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  <span className="hidden sm:inline text-green-600">Saved</span>
                </>
              ) : null}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {savedLocally && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <HardDrive className="h-3 w-3" />
                  <span className="hidden sm:inline">Saved locally</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-xs gap-1.5 text-primary"
                onClick={() => router.push('/auth/login?redirect=/editor')}
              >
                <LogIn className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Create free account to save</span>
                <span className="sm:hidden">Save</span>
              </Button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="outline" size="sm" onClick={onPreview} className="gap-1.5">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Preview</span>
          </Button>
          <Button variant="outline" size="sm" onClick={onEmail} className="gap-1.5">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </Button>
          <Button size="sm" onClick={onDownload} className="gap-1.5">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
