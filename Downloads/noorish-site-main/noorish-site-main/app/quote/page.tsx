/**
 * Solar quote request page
 * Contains multi-step form for collecting customer information
 */
import { QuoteForm } from '@/components/quote/quote-form'

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Book Your Drone Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional drone cleaning for your solar panels. FAA Part 107 certified, fully insured. Get 25% efficiency boost with our autonomous cleaning service.
          </p>
        </div>
        
        <QuoteForm />
      </div>
    </div>
  )
}