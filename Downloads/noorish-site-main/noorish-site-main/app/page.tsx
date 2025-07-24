/**
 * Home page component
 * Features hero section with dual CTAs for solar quotes and AI workshops
 */
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sun, Zap, Users, TrendingUp, ArrowRight, Lightbulb } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-yellow-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                Maximize Your Solar with
                <span className="text-orange-500 block">Professional Panel Cleaning</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Keep your solar panels operating at peak efficiency with our advanced drone and human cleaning services. 
                Join thousands of solar owners maximizing their energy production and ROI.
              </p>
            </div>
            
            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                <Link href="/quote">
                  <Sun className="mr-2 h-5 w-5" />
                  Get Cleaning Quote
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-3">
                <Link href="/workshops">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Book AI Workshop
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Why Choose Noorish?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine advanced drone technology with expert human cleaning to maximize your solar panel efficiency and energy production.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle>Advanced Drone Cleaning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our state-of-the-art drones provide precision cleaning for hard-to-reach panels, ensuring maximum efficiency and safety without ladders or scaffolding.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Proven Results</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Increase your solar panel efficiency by up to 25% with regular professional cleaning. Clean panels generate more energy and save you more money.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Expert Human Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our trained technicians provide meticulous hand cleaning for delicate panels and detailed inspection services to ensure optimal performance.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Ready to Maximize Your Solar Performance?
          </h2>
          <p className="text-xl text-gray-600">
            Get a personalized cleaning quote in minutes or learn how AI can transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link href="/quote">
                Get Free Cleaning Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/workshops">
                Explore Workshops
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}