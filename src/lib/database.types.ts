export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: number
          title: string
          price: number
          location: string
          type: string
          surface: number
          rooms: number
          bathrooms: number
          description: string
          features: string[]
          images: string[]
          hasLive: boolean
          liveDate: string | null
          created_at: string
          updated_at: string
          agent_id: string
        }
        Insert: {
          id?: number
          title: string
          price: number
          location: string
          type: string
          surface: number
          rooms: number
          bathrooms: number
          description: string
          features: string[]
          images: string[]
          hasLive?: boolean
          liveDate?: string | null
          created_at?: string
          updated_at?: string
          agent_id: string
        }
        Update: {
          id?: number
          title?: string
          price?: number
          location?: string
          type?: string
          surface?: number
          rooms?: number
          bathrooms?: number
          description?: string
          features?: string[]
          images?: string[]
          hasLive?: boolean
          liveDate?: string | null
          created_at?: string
          updated_at?: string
          agent_id?: string
        }
      }
      lives: {
        Row: {
          id: number
          property_id: number
          start_time: string
          end_time: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          property_id: number
          start_time: string
          end_time: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          property_id?: number
          start_time?: string
          end_time?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      live_registrations: {
        Row: {
          id: number
          live_id: number
          user_id: string
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          live_id: number
          user_id: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          live_id?: number
          user_id?: string
          status?: string
          created_at?: string
        }
      }
      offers: {
        Row: {
          id: number
          property_id: number
          user_id: string
          amount: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          property_id: number
          user_id: string
          amount: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          property_id?: number
          user_id?: string
          amount?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Enums: {
      property_type: 'Villa' | 'Appartement' | 'Bureau' | 'Riad'
      live_status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
      offer_status: 'pending' | 'accepted' | 'rejected'
    }
  }
}