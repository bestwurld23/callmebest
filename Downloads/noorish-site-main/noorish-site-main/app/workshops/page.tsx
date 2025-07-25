/**
 * AI workshops listing page
 * Displays available workshops from Supabase database
 */
import { supabase } from '@/lib/supabase'
import { WorkshopCard } from '@/components/workshops/workshop-card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Lightbulb } from 'lucide-react'

export default async function WorkshopsPage() {
  const { data: workshops, error } = await supabase
    .from('workshops')
    .select('*')
    .eq('status', 'active')
    .order('start_date', { ascending: true })

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <Lightbulb className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            AI Workshops & Training
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the power of artificial intelligence for your business. Join our expert-led workshops 
            and learn practical AI applications that drive real results.
          </p>
        </div>

        {error && (
          <Alert className="mb-8" variant="destructive">
            <AlertDescription>
              Unable to load workshops. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {workshops && workshops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No workshops are currently available. Check back soon for upcoming sessions!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}