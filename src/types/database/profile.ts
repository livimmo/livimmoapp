export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  company: string | null;
  phone: string | null;
  role: string | null;
  verified: boolean | null;
  rating: number | null;
  specialties: string[] | null;
  description: string | null;
  location: string | null;
  social_links: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  } | null;
  created_at: string;
  updated_at: string;
}