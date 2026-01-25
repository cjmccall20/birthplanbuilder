'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Mail, Loader2, CheckCircle2, UserPlus } from 'lucide-react'
import type { EditorState } from '@/lib/editor/editorTypes'

interface EmailPdfModalProps {
  isOpen: boolean
  onClose: () => void
  editorState: EditorState
}

type ModalStep = 'form' | 'success'

export function EmailPdfModal({ isOpen, onClose, editorState }: EmailPdfModalProps) {
  const router = useRouter()
  const [step, setStep] = useState<ModalStep>('form')
  const [email, setEmail] = useState('')
  const [name, setName] = useState(editorState.birthTeam.mother_name || '')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/editor/email-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          marketingConsent,
          editorState: {
            ...editorState,
            birthTeam: {
              ...editorState.birthTeam,
              mother_name: name,
            },
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email')
      }

      // Store email for future reference
      localStorage.setItem('birthplan_email', email)
      setStep('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateAccount = () => {
    // Store email to pre-fill registration
    localStorage.setItem('birthplan_email', email)
    router.push(`/auth/login?email=${encodeURIComponent(email)}&redirect=/editor`)
  }

  const handleClose = () => {
    setStep('form')
    setError('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 'form' ? (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <DialogTitle className="text-center">Get Your Birth Plan</DialogTitle>
              <DialogDescription className="text-center">
                Enter your email and we&apos;ll send you a beautiful PDF you can print or share.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="min-h-[44px]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="min-h-[44px]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="marketing"
                  checked={marketingConsent}
                  onCheckedChange={(checked) => setMarketingConsent(checked === true)}
                />
                <Label htmlFor="marketing" className="text-sm text-muted-foreground leading-tight">
                  Send me helpful tips about preparing for birth
                </Label>
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full min-h-[44px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Email My Birth Plan
                  </>
                )}
              </Button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <DialogTitle className="text-center">Check Your Email!</DialogTitle>
              <DialogDescription className="text-center">
                We&apos;ve sent your birth plan to <strong>{email}</strong>
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <h3 className="font-semibold mb-2 flex items-center justify-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  Want to Save & Edit Later?
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Create a <strong>free account</strong> to save your birth plan and come back to edit it anytime.
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  100% Free - No Credit Card Required
                </p>
                <Button
                  onClick={handleCreateAccount}
                  className="w-full min-h-[44px]"
                  variant="default"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Free Account
                </Button>
              </div>

              <Button
                onClick={handleClose}
                variant="ghost"
                className="w-full"
              >
                Maybe Later
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
