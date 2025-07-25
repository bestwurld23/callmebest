/**
 * Supabase client configuration
 * Provides singleton instance for database operations and authentication
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      solar_quotes: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string
          address: string
          property_type: string
          roof_type: string
          energy_bill: number
          timeline: string
          additional_info: string | null
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          address: string
          property_type: string
          roof_type: string
          energy_bill: number
          timeline: string
          additional_info?: string | null
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          address?: string
          property_type?: string
          roof_type?: string
          energy_bill?: number
          timeline?: string
          additional_info?: string | null
          status?: string
        }
      }
      workshops: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          instructor: string
          duration: string
          price: number
          max_participants: number
          start_date: string
          end_date: string
          image_url: string | null
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          instructor: string
          duration: string
          price: number
          max_participants: number
          start_date: string
          end_date: string
          image_url?: string | null
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          instructor?: string
          duration?: string
          price?: number
          max_participants?: number
          start_date?: string
          end_date?: string
          image_url?: string | null
          status?: string
        }
      }
    }
  }
}