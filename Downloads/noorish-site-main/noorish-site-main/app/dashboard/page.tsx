/**
 * Admin dashboard page
 * Protected route for administrators to manage quotes and workshops
 */
'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, FileText, Users, TrendingUp, Calendar } from 'lucide-react'
import { AuthForm } from '@/components/auth/auth-form'

interface Quote {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  address: string
  property_type: string
  energy_bill: number
  status: string
}

interface Workshop {
  id: string
  title: string
  instructor: string
  start_date: string
  max_participants: number
  status: string
}

export default function DashboardPage() {
  const { user, loading, isAdmin } = useAuth()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user && isAdmin()) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    try {
      const [quotesResult, workshopsResult] = await Promise.all([
        supabase.from('solar_quotes').select('*').order('created_at', { ascending: false }),
        supabase.from('workshops').select('*').order('start_date', { ascending: true })
      ])

      if (quotesResult.error) throw quotesResult.error
      if (workshopsResult.error) throw workshopsResult.error

      setQuotes(quotesResult.data || [])
      setWorkshops(workshopsResult.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
    } finally {
      setLoadingData(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Please sign in to access the dashboard</p>
          </div>
          <AuthForm />
        </div>
      </div>
    )
  }

  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <Alert variant="destructive">
            <AlertDescription>
              You don't have permission to access this page. Admin access required.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  const pendingQuotes = quotes.filter(q => q.status === 'pending').length
  const totalQuotes = quotes.length
  const activeWorkshops = workshops.filter(w => w.status === 'active').length

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage quotes and workshops</p>
        </div>

        {error && (
          <Alert className="mb-8" variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Quotes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingQuotes}</div>
              <p className="text-xs text-muted-foreground">
                {totalQuotes} total quotes
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Workshops</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeWorkshops}</div>
              <p className="text-xs text-muted-foreground">
                {workshops.length} total workshops
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalQuotes > 0 ? Math.round((pendingQuotes / totalQuotes) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Quote to lead ratio
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="quotes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="quotes">Solar Quotes</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quotes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Quote Requests</CardTitle>
                <CardDescription>
                  Latest solar quote submissions from customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : quotes.length > 0 ? (
                  <div className="space-y-4">
                    {quotes.slice(0, 10).map((quote) => (
                      <div key={quote.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{quote.name}</p>
                          <p className="text-sm text-gray-600">{quote.email}</p>
                          <p className="text-sm text-gray-500">
                            {quote.property_type} • ${quote.energy_bill}/month
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge variant={quote.status === 'pending' ? 'default' : 'secondary'}>
                            {quote.status}
                          </Badge>
                          <p className="text-sm text-gray-500">
                            {new Date(quote.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No quotes yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="workshops" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Workshop Management</CardTitle>
                <CardDescription>
                  Manage AI workshops and training sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : workshops.length > 0 ? (
                  <div className="space-y-4">
                    {workshops.map((workshop) => (
                      <div key={workshop.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{workshop.title}</p>
                          <p className="text-sm text-gray-600">Instructor: {workshop.instructor}</p>
                          <p className="text-sm text-gray-500">
                            <Calendar className="inline h-3 w-3 mr-1" />
                            {new Date(workshop.start_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge variant={workshop.status === 'active' ? 'default' : 'secondary'}>
                            {workshop.status}
                          </Badge>
                          <p className="text-sm text-gray-500">
                            Max {workshop.max_participants} participants
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No workshops configured</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}