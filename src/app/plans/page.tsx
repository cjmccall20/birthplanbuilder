'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, FileText, PlusCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface BirthPlan {
  id: string
  title: string
  template_style: string
  updated_at: string
  created_at: string
}

export default function MyPlansPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [plans, setPlans] = useState<BirthPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !user) {
      router.push('/auth/login')
      return
    }

    // Fetch plans when user is authenticated
    if (user) {
      fetchPlans()
    }
  }, [user, authLoading, router])

  const fetchPlans = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/editor/list')

      if (!response.ok) {
        throw new Error('Failed to fetch plans')
      }

      const data = await response.json()

      if (data.success && data.birthPlans) {
        setPlans(data.birthPlans)
      }
    } catch (err) {
      console.error('Error fetching plans:', err)
      setError('Failed to load your birth plans. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Format template style for display
  const formatTemplateStyle = (style: string) => {
    return style
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </main>
      </div>
    )
  }

  // Don't render if user is not authenticated (will redirect)
  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">My Birth Plans</h1>
            <p className="text-muted-foreground">
              View and manage all your saved birth plans
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading your plans...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <Card className="border-destructive">
              <CardContent className="pt-6">
                <p className="text-destructive text-center">{error}</p>
                <div className="flex justify-center mt-4">
                  <Button onClick={fetchPlans} variant="outline">
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {!isLoading && !error && plans.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No birth plans yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Get started by creating your first birth plan. Our guided process
                  makes it easy to communicate your preferences to your care team.
                </p>
                <Button asChild size="lg">
                  <Link href="/quiz">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Your First Plan
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Plans Grid */}
          {!isLoading && !error && plans.length > 0 && (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => (
                  <Card key={plan.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-lg line-clamp-2">
                          {plan.title}
                        </CardTitle>
                        <Badge variant="secondary" className="shrink-0">
                          {formatTemplateStyle(plan.template_style)}
                        </Badge>
                      </div>
                      <CardDescription>
                        Updated {formatDistanceToNow(new Date(plan.updated_at), { addSuffix: true })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link href={`/editor?id=${plan.id}`}>
                          Edit Plan
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Create New Plan Button */}
              <div className="mt-8 flex justify-center">
                <Button asChild variant="outline" size="lg">
                  <Link href="/quiz">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Another Plan
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
