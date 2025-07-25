/**
 * Multi-step solar quote form component
 * Handles progressive data collection with validation
 */
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import {
  personalInfoSchema,
  propertyInfoSchema,
  energyInfoSchema,
  completeQuoteSchema,
  type PersonalInfo,
  type PropertyInfo,
  type EnergyInfo,
  type CompleteQuote,
} from '@/lib/validations/quote'
import { submitQuote, calculateEstimatedSavings } from '@/lib/utils/quote'

const steps = [
  { title: 'Personal Information', description: 'Tell us about yourself' },
  { title: 'Property Details', description: 'Information about your property' },
  { title: 'Energy Usage', description: 'Your current energy situation' },
  { title: 'Review & Submit', description: 'Confirm your details' },
]

export function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<CompleteQuote>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const personalForm = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData,
  })

  const propertyForm = useForm<PropertyInfo>({
    resolver: zodResolver(propertyInfoSchema),
    defaultValues: formData,
  })

  const energyForm = useForm<EnergyInfo>({
    resolver: zodResolver(energyInfoSchema),
    defaultValues: formData,
  })

  const handleNext = async () => {
    let isValid = false
    let stepData = {}

    switch (currentStep) {
      case 0:
        isValid = await personalForm.trigger()
        if (isValid) {
          stepData = personalForm.getValues()
        }
        break
      case 1:
        isValid = await propertyForm.trigger()
        if (isValid) {
          stepData = propertyForm.getValues()
        }
        break
      case 2:
        isValid = await energyForm.trigger()
        if (isValid) {
          stepData = energyForm.getValues()
        }
        break
    }

    if (isValid) {
      setFormData(prev => ({ ...prev, ...stepData }))
      setCurrentStep(prev => prev + 1)
      setError(null)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
    setError(null)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const completeData = { ...formData } as CompleteQuote
      const result = completeQuoteSchema.parse(completeData)
      
      await submitQuote(result)
      setIsComplete(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit quote')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isComplete) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Quote Submitted Successfully!</h2>
            <p className="text-gray-600">
              Thank you for your interest in solar energy. We'll review your information and get back to you within 24 hours with a personalized quote.
            </p>
            <Button asChild>
              <a href="/">Return Home</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...personalForm.register('name')}
                  placeholder="Enter your full name"
                />
                {personalForm.formState.errors.name && (
                  <p className="text-sm text-red-600">{personalForm.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...personalForm.register('email')}
                  placeholder="Enter your email address"
                />
                {personalForm.formState.errors.email && (
                  <p className="text-sm text-red-600">{personalForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...personalForm.register('phone')}
                  placeholder="Enter your phone number"
                />
                {personalForm.formState.errors.phone && (
                  <p className="text-sm text-red-600">{personalForm.formState.errors.phone.message}</p>
                )}
              </div>
            </form>
          )}

          {currentStep === 1 && (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Property Address</Label>
                <Textarea
                  id="address"
                  {...propertyForm.register('address')}
                  placeholder="Enter your complete address"
                  rows={3}
                />
                {propertyForm.formState.errors.address && (
                  <p className="text-sm text-red-600">{propertyForm.formState.errors.address.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="property_type">Property Type</Label>
                <Select onValueChange={(value) => propertyForm.setValue('property_type', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="commercial">Commercial Property</SelectItem>
                  </SelectContent>
                </Select>
                {propertyForm.formState.errors.property_type && (
                  <p className="text-sm text-red-600">{propertyForm.formState.errors.property_type.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="roof_type">Roof Type</Label>
                <Select onValueChange={(value) => propertyForm.setValue('roof_type', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select roof type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tile">Tile Roof</SelectItem>
                    <SelectItem value="metal">Metal Roof</SelectItem>
                    <SelectItem value="flat">Flat Roof</SelectItem>
                    <SelectItem value="slate">Slate Roof</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {propertyForm.formState.errors.roof_type && (
                  <p className="text-sm text-red-600">{propertyForm.formState.errors.roof_type.message}</p>
                )}
              </div>
            </form>
          )}

          {currentStep === 2 && (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="energy_bill">Monthly Energy Bill ($)</Label>
                <Input
                  id="energy_bill"
                  type="number"
                  {...energyForm.register('energy_bill', { valueAsNumber: true })}
                  placeholder="Enter your average monthly energy bill"
                />
                {energyForm.formState.errors.energy_bill && (
                  <p className="text-sm text-red-600">{energyForm.formState.errors.energy_bill.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Installation Timeline</Label>
                <Select onValueChange={(value) => energyForm.setValue('timeline', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="When would you like to install?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">As soon as possible</SelectItem>
                    <SelectItem value="3_months">Within 3 months</SelectItem>
                    <SelectItem value="6_months">Within 6 months</SelectItem>
                    <SelectItem value="12_months">Within 12 months</SelectItem>
                  </SelectContent>
                </Select>
                {energyForm.formState.errors.timeline && (
                  <p className="text-sm text-red-600">{energyForm.formState.errors.timeline.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional_info">Additional Information (Optional)</Label>
                <Textarea
                  id="additional_info"
                  {...energyForm.register('additional_info')}
                  placeholder="Any additional details or questions?"
                  rows={3}
                />
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Estimated Annual Savings</h3>
                <p className="text-2xl font-bold text-green-600">
                  ${formData.energy_bill ? calculateEstimatedSavings(formData.energy_bill * 12) : 0}
                </p>
                <p className="text-sm text-green-700">Based on your current energy bill</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Review Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Name:</p>
                    <p className="text-gray-600">{formData.name}</p>
                  </div>
                  <div>
                    <p className="font-medium">Email:</p>
                    <p className="text-gray-600">{formData.email}</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone:</p>
                    <p className="text-gray-600">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium">Property Type:</p>
                    <p className="text-gray-600">{formData.property_type}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="font-medium">Address:</p>
                    <p className="text-gray-600">{formData.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {currentStep < 3 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Submit Quote
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}