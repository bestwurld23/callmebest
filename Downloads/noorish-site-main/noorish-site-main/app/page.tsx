/**
 * Home page component
 * Building America's Smartest Blocks - Smart community platform
 */
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plane, Lightbulb, ShoppingCart, ArrowRight, Zap, Users, Wrench, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-drone.png"
            alt="Autonomous drone cleaning solar panels"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                Building America's
                <span className="text-green-400 block">Smartest Blocks</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Autonomous drone services, community tech workshops, and innovative products for the neighborhoods of tomorrow.
              </p>
            </div>
            
            {/* Triple CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <Link href="/quote">
                  <Plane className="mr-2 h-5 w-5" />
                  Book Drone Service
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3">
                <Link href="/workshops">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Join Workshop
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3">
                <Link href="#merch">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Shop Merch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Drone Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Solar Panel Cleaning That Actually Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              25% efficiency boost from professional drone cleaning. Serving Chicago suburbs: Kane, McHenry, Will Counties.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Plane className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Residential Roofs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Professional drone cleaning for home solar installations. $10 per panel with bi-annual subscription options available.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Commercial Arrays</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Large-scale commercial solar cleaning with FAA Part 107 certified, fully insured drone operations.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Performance Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Detailed before/after efficiency reports with drone photography showing cleaning results and panel condition.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Workshops Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Learn. Build. Innovate. Together.
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Hands-on learning in your neighborhood. Build products that solve real problems and create local tech opportunities.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">AI for Beginners: Build Your First Chatbot</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">3D Printing Bootcamp</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Drone Operations & Programming</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Python for Community Solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Web Development for Local Business</span>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/workshops">
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Browse Workshops ($50-$150)
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/images/workshops.png"
                alt="Community tech workspace with diverse learners"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Merchandise Section */}
      <section id="merch" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/quadbike.png"
                alt="Electric community quad bike with GPS tracking"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Tomorrow's Tech, Available Today
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Limited quantities, maximum impact. All proceeds support local smart block development.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700"><strong>Community Quad Bikes:</strong> Electric, GPS-tracked, block-owned</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700"><strong>Smart Home Accessories:</strong> 3D printed, customizable</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700"><strong>Noorish Apparel:</strong> "Smarter Blocks" collection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700"><strong>Limited Edition Drops:</strong> Innovative novelty items</span>
                </div>
              </div>
              
              <div className="mt-8">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Shop Coming Soon
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-gray-600">
            Contact us at <a href="mailto:hello@noorish.xyz" className="text-blue-600 hover:underline">hello@noorish.xyz</a> or get started with our services.
          </p>
          <p className="text-gray-500">
            Service Areas: Chicago suburbs (Kane, McHenry, Will Counties) • Response time: Within 24 hours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/quote">
                <Plane className="mr-2 h-5 w-5" />
                Book Drone Service
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/workshops">
                <Lightbulb className="mr-2 h-5 w-5" />
                Join Workshop
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}