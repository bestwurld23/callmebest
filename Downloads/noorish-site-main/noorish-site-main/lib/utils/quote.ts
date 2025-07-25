/**
 * Utility functions for solar quote calculations and processing
 * Handles quote data transformation and business logic
 */
import { CompleteQuote } from '@/lib/validations/quote'
import { supabase } from '@/lib/supabase'

export function calculateEstimatedSavings(energyBill: number): number {
  // Simple calculation: assume 70% savings on energy bill
  return Math.round(energyBill * 0.7)
}

export function getTimelineLabel(timeline: string): string {
  const labels = {
    immediate: 'As soon as possible',
    '3_months': 'Within 3 months',
    '6_months': 'Within 6 months',
    '12_months': 'Within 12 months',
  }
  return labels[timeline as keyof typeof labels] || timeline
}

export function getPropertyTypeLabel(propertyType: string): string {
  const labels = {
    house: 'House',
    apartment: 'Apartment',
    townhouse: 'Townhouse',
    commercial: 'Commercial Property',
  }
  return labels[propertyType as keyof typeof labels] || propertyType
}

export function getRoofTypeLabel(roofType: string): string {
  const labels = {
    tile: 'Tile Roof',
    metal: 'Metal Roof',
    flat: 'Flat Roof',
    slate: 'Slate Roof',
    other: 'Other',
  }
  return labels[roofType as keyof typeof labels] || roofType
}

export async function submitQuote(quoteData: CompleteQuote) {
  const { data, error } = await supabase
    .from('solar_quotes')
    .insert([{
      ...quoteData,
      status: 'pending'
    }])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to submit quote: ${error.message}`)
  }

  return data
}

export function validateQuoteStep(step: number, data: any): boolean {
  switch (step) {
    case 1:
      return !!(data.name && data.email && data.phone)
    case 2:
      return !!(data.address && data.property_type && data.roof_type)
    case 3:
      return !!(data.energy_bill && data.timeline)
    default:
      return false
  }
}