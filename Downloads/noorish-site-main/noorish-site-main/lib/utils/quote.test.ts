/**
 * Unit tests for quote utility functions
 * Tests calculation logic and data transformation functions
 */
import { describe, it, expect } from 'vitest'
import {
  calculateEstimatedSavings,
  getTimelineLabel,
  getPropertyTypeLabel,
  getRoofTypeLabel,
  validateQuoteStep,
} from './quote'

describe('Quote Utilities', () => {
  describe('calculateEstimatedSavings', () => {
    it('should calculate 70% savings correctly', () => {
      expect(calculateEstimatedSavings(100)).toBe(70)
      expect(calculateEstimatedSavings(200)).toBe(140)
      expect(calculateEstimatedSavings(150)).toBe(105)
    })

    it('should handle zero energy bill', () => {
      expect(calculateEstimatedSavings(0)).toBe(0)
    })

    it('should round to nearest integer', () => {
      expect(calculateEstimatedSavings(143)).toBe(100) // 143 * 0.7 = 100.1
    })
  })

  describe('getTimelineLabel', () => {
    it('should return correct labels for valid timelines', () => {
      expect(getTimelineLabel('immediate')).toBe('As soon as possible')
      expect(getTimelineLabel('3_months')).toBe('Within 3 months')
      expect(getTimelineLabel('6_months')).toBe('Within 6 months')
      expect(getTimelineLabel('12_months')).toBe('Within 12 months')
    })

    it('should return original value for invalid timeline', () => {
      expect(getTimelineLabel('invalid')).toBe('invalid')
    })
  })

  describe('getPropertyTypeLabel', () => {
    it('should return correct labels for valid property types', () => {
      expect(getPropertyTypeLabel('house')).toBe('House')
      expect(getPropertyTypeLabel('apartment')).toBe('Apartment')
      expect(getPropertyTypeLabel('townhouse')).toBe('Townhouse')
      expect(getPropertyTypeLabel('commercial')).toBe('Commercial Property')
    })
  })

  describe('getRoofTypeLabel', () => {
    it('should return correct labels for valid roof types', () => {
      expect(getRoofTypeLabel('tile')).toBe('Tile Roof')
      expect(getRoofTypeLabel('metal')).toBe('Metal Roof')
      expect(getRoofTypeLabel('flat')).toBe('Flat Roof')
      expect(getRoofTypeLabel('slate')).toBe('Slate Roof')
      expect(getRoofTypeLabel('other')).toBe('Other')
    })
  })

  describe('validateQuoteStep', () => {
    it('should validate step 1 correctly', () => {
      const validData = { name: 'John', email: 'john@example.com', phone: '1234567890' }
      const invalidData = { name: 'John', email: '', phone: '1234567890' }
      
      expect(validateQuoteStep(1, validData)).toBe(true)
      expect(validateQuoteStep(1, invalidData)).toBe(false)
    })

    it('should validate step 2 correctly', () => {
      const validData = { address: '123 Main St', property_type: 'house', roof_type: 'tile' }
      const invalidData = { address: '123 Main St', property_type: '', roof_type: 'tile' }
      
      expect(validateQuoteStep(2, validData)).toBe(true)
      expect(validateQuoteStep(2, invalidData)).toBe(false)
    })

    it('should validate step 3 correctly', () => {
      const validData = { energy_bill: 200, timeline: 'immediate' }
      const invalidData = { energy_bill: 0, timeline: '' }
      
      expect(validateQuoteStep(3, validData)).toBe(true)
      expect(validateQuoteStep(3, invalidData)).toBe(false)
    })

    it('should return false for invalid step', () => {
      expect(validateQuoteStep(99, {})).toBe(false)
    })
  })
})