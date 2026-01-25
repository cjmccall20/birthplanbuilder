'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton'
import { LogIn, UserPlus, Loader2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, signUp, signInWithGoogle, user, isLoading } = useAuth()

  const redirect = searchParams.get('redirect') || '/editor'
  const urlError = searchParams.get('error')

  useEffect(() => {
    // If already logged in, redirect
    if (user && !isLoading) {
      router.push(redirect)
    }
  }, [user, isLoading, router, redirect])

  useEffect(() => {
    if (urlError === 'auth_failed') {
      setError('Authentication failed. Please try again.')
      toast.error('Authentication failed', {
        description: 'Please try signing in again.',
      })
    }
  }, [urlError])

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setIsSubmitting(false)
          return
        }

        if (password.length < 6) {
          setError('Password must be at least 6 characters')
          setIsSubmitting(false)
          return
        }

        const { error: signUpError } = await signUp(email, password)

        if (signUpError) {
          setError(signUpError.message)
          toast.error('Sign up failed', {
            description: signUpError.message,
          })
        } else {
          setSuccessMessage('Account created! Please check your email to confirm your account.')
          toast.success('Account created!', {
            description: 'Please check your email to confirm your account.',
            duration: 6000,
          })
          setEmail('')
          setPassword('')
          setConfirmPassword('')
        }
      } else {
        const { error: signInError } = await signIn(email, password)

        if (signInError) {
          setError(signInError.message)
          toast.error('Sign in failed', {
            description: signInError.message,
          })
        } else {
          toast.success('Signed in successfully!', {
            description: 'Redirecting to your birth plan...',
          })
          router.push(redirect)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in with Google'
      setError(errorMessage)
      toast.error('Google sign in failed', {
        description: errorMessage,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-muted/20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="container py-6 sm:py-8 max-w-lg px-4">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              {isSignUp ? (
                <UserPlus className="h-8 w-8 text-primary" />
              ) : (
                <LogIn className="h-8 w-8 text-primary" />
              )}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {isSignUp
                ? 'Sign up to save and access your birth plans'
                : 'Sign in to access your saved birth plans'}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{isSignUp ? 'Sign Up' : 'Sign In'}</CardTitle>
              <CardDescription>
                {isSignUp
                  ? 'Create an account to save your birth plan preferences'
                  : 'Enter your credentials to access your account'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="min-h-[44px] text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={isSignUp ? 'At least 6 characters' : 'Enter your password'}
                    className="min-h-[44px] text-base"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter your password"
                      className="min-h-[44px] text-base"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                )}

                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 text-destructive">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {successMessage && (
                  <div className="flex items-start gap-2 p-3 rounded-md bg-primary/10 text-primary">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <p className="text-sm">{successMessage}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full min-h-[44px]"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {isSignUp ? 'Creating account...' : 'Signing in...'}
                    </>
                  ) : (
                    <>{isSignUp ? 'Create Account' : 'Sign In'}</>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <GoogleLoginButton onClick={handleGoogleSignIn} disabled={isSubmitting} />

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp)
                      setError('')
                      setSuccessMessage('')
                    }}
                    className="text-sm text-primary hover:underline"
                    disabled={isSubmitting}
                  >
                    {isSignUp
                      ? 'Already have an account? Sign in'
                      : "Don't have an account? Sign up"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              onClick={() => router.push('/quiz')}
              className="min-h-[44px]"
            >
              Continue without account
            </Button>
          </div>

          <p className="mt-8 text-xs text-center text-muted-foreground">
            By signing up, you agree to our{' '}
            <a href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" className="underline hover:text-foreground">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 bg-muted/20 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </main>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
