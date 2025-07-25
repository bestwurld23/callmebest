/**
 * Zod validation schemas for solar quote forms
 * Defines type-safe validation rules for multi-step quote process
 */
import { z } from 'zod'

export const personalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
})

export const propertyInfoSchema = z.object({
  address: z.string().min(5, 'Please enter a complete address'),
  property_type: z.enum(['house', 'apartment', 'townhouse', 'commercial'], {
    required_error: 'Please select a property type',
  }),
  roof_type: z.enum(['tile', 'metal', 'flat', 'slate', 'other'], {
    required_error: 'Please select a roof type',
  }),
})

export const energyInfoSchema = z.object({
  energy_bill: z.number().min(0, 'Energy bill must be a positive number'),
  timeline: z.enum(['immediate', '3_months', '6_months', '12_months'], {
    required_error: 'Please select a timeline',
  }),
  additional_info: z.string().optional(),
})

export const completeQuoteSchema = personalInfoSchema
  .merge(propertyInfoSchema)
  .merge(energyInfoSchema)

export type PersonalInfo = z.infer<typeof personalInfoSchema>
export type PropertyInfo = z.infer<typeof propertyInfoSchema>
export type EnergyInfo = z.infer<typeof energyInfoSchema>
export type CompleteQuote = z.infer<typeof completeQuoteSchema>