export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  surface: number;
  rooms: number;
  bathrooms: number;
  description: string | null;
  features: string[] | null;
  images: string[] | null;
  has_live: boolean;
  is_replay: boolean;
  has_scheduled_live: boolean;
  live_date: string | null;
  status: 'available' | 'pending' | 'sold' | 'rented';
  created_at: string;
  updated_at: string;
  agent_id: string | null;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  transaction_type: string;
  virtual_tour: {
    enabled: boolean;
    url?: string;
    platform?: "matterport" | "klapty";
    type: "360" | "video" | "live";
  } | null;
  private_notes: {
    ownerName?: string;
    location?: string;
    notes?: string;
  } | null;
}

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: Property;
        Insert: Omit<Property, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Property, 'id'>>;
      };
      agent_availability: {
        Row: {
          agent_id: string;
          created_at: string | null;
          day_of_week: number;
          end_time: string;
          id: string;
          start_time: string;
        };
        Insert: {
          agent_id: string;
          created_at?: string | null;
          day_of_week: number;
          end_time: string;
          id?: string;
          start_time: string;
        };
        Update: {
          agent_id?: string;
          created_at?: string | null;
          day_of_week?: number;
          end_time?: string;
          id?: string;
          start_time?: string;
        };
        Relationships: [];
      };
      chat_conversations: {
        Row: {
          agent_id: string;
          created_at: string | null;
          id: string;
          property_id: number;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          agent_id: string;
          created_at?: string | null;
          id?: string;
          property_id: number;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          agent_id?: string;
          created_at?: string | null;
          id?: string;
          property_id?: number;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      chat_messages: {
        Row: {
          content: string;
          conversation_id: string;
          created_at: string | null;
          file_url: string | null;
          id: string;
          message_type: Database["public"]["Enums"]["message_type"];
          metadata: Json | null;
          read_at: string | null;
          sender_id: string;
        };
        Insert: {
          content: string;
          conversation_id: string;
          created_at?: string | null;
          file_url?: string | null;
          id?: string;
          message_type?: Database["public"]["Enums"]["message_type"];
          metadata?: Json | null;
          read_at?: string | null;
          sender_id: string;
        };
        Update: {
          content?: string;
          conversation_id?: string;
          created_at?: string | null;
          file_url?: string | null;
          id?: string;
          message_type?: Database["public"]["Enums"]["message_type"];
          metadata?: Json | null;
          read_at?: string | null;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "chat_conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_conversation";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "chat_conversations";
            referencedColumns: ["id"];
          },
        ];
      };
      private_visits: {
        Row: {
          agent_id: string;
          created_at: string | null;
          id: string;
          message: string | null;
          property_id: number;
          requested_date: string;
          status: Database["public"]["Enums"]["visit_status"];
          updated_at: string | null;
          user_id: string;
          visit_type: Database["public"]["Enums"]["visit_type"];
        };
        Insert: {
          agent_id: string;
          created_at?: string | null;
          id?: string;
          message?: string | null;
          property_id: number;
          requested_date: string;
          status?: Database["public"]["Enums"]["visit_status"];
          updated_at?: string | null;
          user_id: string;
          visit_type?: Database["public"]["Enums"]["visit_type"];
        };
        Update: {
          agent_id?: string;
          created_at?: string | null;
          id?: string;
          message?: string | null;
          property_id?: number;
          requested_date?: string;
          status?: Database["public"]["Enums"]["visit_status"];
          updated_at?: string | null;
          user_id?: string;
          visit_type?: Database["public"]["Enums"]["visit_type"];
        };
        Relationships: [];
      };
      visit_ratings: {
        Row: {
          agent_id: string;
          category: Database["public"]["Enums"]["rating_category"];
          comment: string | null;
          created_at: string | null;
          id: string;
          rating: number;
          user_id: string;
          visit_id: string;
        };
        Insert: {
          agent_id: string;
          category: Database["public"]["Enums"]["rating_category"];
          comment?: string | null;
          created_at?: string | null;
          id?: string;
          rating: number;
          user_id: string;
          visit_id: string;
        };
        Update: {
          agent_id?: string;
          category?: Database["public"]["Enums"]["rating_category"];
          comment?: string | null;
          created_at?: string | null;
          id?: string;
          rating?: number;
          user_id?: string;
          visit_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "visit_ratings_visit_id_fkey";
            columns: ["visit_id"];
            isOneToOne: false;
            referencedRelation: "private_visits";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      agent_ratings: {
        Row: {
          agent_id: string | null;
          average_rating: number | null;
          category: Database["public"]["Enums"]["rating_category"] | null;
          total_ratings: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      // ... keep existing code (function definitions)
    };
    Enums: {
      message_type:
        | "text"
        | "link"
        | "file"
        | "visit_request"
        | "visit_confirmation";
      rating_category:
        | "communication"
        | "punctuality"
        | "professionalism"
        | "knowledge"
        | "overall";
      visit_status: "pending" | "accepted" | "rejected" | "cancelled";
      visit_type: "physical" | "virtual";
    };
  };
}
