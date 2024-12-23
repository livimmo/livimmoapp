export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_audit_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_audit_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_profiles: {
        Row: {
          created_at: string | null
          id: string
          last_login: string | null
          permissions: Json | null
          role: Database["public"]["Enums"]["admin_role"]
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          last_login?: string | null
          permissions?: Json | null
          role?: Database["public"]["Enums"]["admin_role"]
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_login?: string | null
          permissions?: Json | null
          role?: Database["public"]["Enums"]["admin_role"]
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          property_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      live_registrations: {
        Row: {
          created_at: string | null
          id: string
          live_session_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          live_session_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          live_session_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "live_registrations_live_session_id_fkey"
            columns: ["live_session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      live_sessions: {
        Row: {
          agent_id: string | null
          created_at: string | null
          current_participants: number | null
          description: string | null
          duration: number | null
          id: string
          max_participants: number | null
          platform: string | null
          property_id: string | null
          recording_url: string | null
          scheduled_date: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          created_at?: string | null
          current_participants?: number | null
          description?: string | null
          duration?: number | null
          id?: string
          max_participants?: number | null
          platform?: string | null
          property_id?: string | null
          recording_url?: string | null
          scheduled_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          created_at?: string | null
          current_participants?: number | null
          description?: string | null
          duration?: number | null
          id?: string
          max_participants?: number | null
          platform?: string | null
          property_id?: string | null
          recording_url?: string | null
          scheduled_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "live_sessions_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          amount: number
          buyer_id: string | null
          created_at: string | null
          id: string
          message: string | null
          property_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string | null
          description: string | null
          full_name: string | null
          id: string
          location: string | null
          phone: string | null
          rating: number | null
          role: string | null
          social_links: Json | null
          specialties: string[] | null
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          description?: string | null
          full_name?: string | null
          id: string
          location?: string | null
          phone?: string | null
          rating?: number | null
          role?: string | null
          social_links?: Json | null
          specialties?: string[] | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          description?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          rating?: number | null
          role?: string | null
          social_links?: Json | null
          specialties?: string[] | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          agent_id: string | null
          bathrooms: number
          coordinates: Json | null
          created_at: string | null
          description: string | null
          features: string[] | null
          has_live: boolean | null
          has_scheduled_live: boolean | null
          id: string
          images: string[] | null
          is_live_now: boolean | null
          is_replay: boolean | null
          live_date: string | null
          location: string
          price: number
          private_notes: Json | null
          remaining_seats: number | null
          rooms: number
          status: string | null
          surface: number
          tags: string[] | null
          title: string
          transaction_type: string
          type: string
          updated_at: string | null
          viewers: number | null
          virtual_tour: Json | null
        }
        Insert: {
          agent_id?: string | null
          bathrooms: number
          coordinates?: Json | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          has_live?: boolean | null
          has_scheduled_live?: boolean | null
          id?: string
          images?: string[] | null
          is_live_now?: boolean | null
          is_replay?: boolean | null
          live_date?: string | null
          location: string
          price: number
          private_notes?: Json | null
          remaining_seats?: number | null
          rooms: number
          status?: string | null
          surface: number
          tags?: string[] | null
          title: string
          transaction_type: string
          type: string
          updated_at?: string | null
          viewers?: number | null
          virtual_tour?: Json | null
        }
        Update: {
          agent_id?: string | null
          bathrooms?: number
          coordinates?: Json | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          has_live?: boolean | null
          has_scheduled_live?: boolean | null
          id?: string
          images?: string[] | null
          is_live_now?: boolean | null
          is_replay?: boolean | null
          live_date?: string | null
          location?: string
          price?: number
          private_notes?: Json | null
          remaining_seats?: number | null
          rooms?: number
          status?: string | null
          surface?: number
          tags?: string[] | null
          title?: string
          transaction_type?: string
          type?: string
          updated_at?: string | null
          viewers?: number | null
          virtual_tour?: Json | null
        }
        Relationships: []
      }
      visits: {
        Row: {
          created_at: string | null
          date: string | null
          id: string
          notes: string | null
          property_id: string | null
          status: string | null
          time: string | null
          type: string | null
          updated_at: string | null
          visitor_id: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: string
          notes?: string | null
          property_id?: string | null
          status?: string | null
          time?: string | null
          type?: string | null
          updated_at?: string | null
          visitor_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: string
          notes?: string | null
          property_id?: string | null
          status?: string | null
          time?: string | null
          type?: string | null
          updated_at?: string | null
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visits_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_admin_role: {
        Args: {
          user_id: string
        }
        Returns: Database["public"]["Enums"]["admin_role"]
      }
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      admin_role: "super_admin" | "admin" | "moderator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
