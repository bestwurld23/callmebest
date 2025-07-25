/**
 * Individual workshop card component
 * Displays workshop information in a card format
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Users, DollarSign } from 'lucide-react'
import { Database } from '@/lib/supabase'

type Workshop = Database['public']['Tables']['workshops']['Row']

interface WorkshopCardProps {
  workshop: Workshop
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const startDate = new Date(workshop.start_date)
  const endDate = new Date(workshop.end_date)
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Card className="h-full flex flex-col">
      {workshop.image_url && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img
            src={workshop.image_url}
            alt={workshop.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{workshop.title}</CardTitle>
          <Badge variant={workshop.status === 'active' ? 'default' : 'secondary'}>
            {workshop.status}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {workshop.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(startDate)} - {formatDate(endDate)}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {workshop.duration}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            Max {workshop.max_participants} participants
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            ${workshop.price}
          </div>
          
          <p className="text-sm text-gray-600">
            <span className="font-medium">Instructor:</span> {workshop.instructor}
          </p>
        </div>
        
        <Button className="w-full" disabled={workshop.status !== 'active'}>
          {workshop.status === 'active' ? 'Book Workshop' : 'Not Available'}
        </Button>
      </CardContent>
    </Card>
  )
}