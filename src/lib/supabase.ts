import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Atria] Supabase credentials missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---------- Database Types ----------

export type ProjectCategory =
  | 'villa'
  | 'residential'
  | 'commercial'
  | 'interior'
  | 'cultural'
  | 'renovation'
  | 'adaptive-reuse';

export type ProjectStatus = 'Completed' | 'Under Construction' | 'Concept';

export type ConsultationStatus = 'pending' | 'contacted' | 'archived';

export interface DbProject {
  id: string;
  slug: string;
  title_en: string;
  title_fa: string;
  category: ProjectCategory;
  category_en: string | null;
  category_fa: string | null;
  location_en: string | null;
  location_fa: string | null;
  year: number | null;
  area_sqm: number | null;
  status: ProjectStatus;
  tagline_en: string | null;
  tagline_fa: string | null;
  description_en: string | null;
  description_fa: string | null;
  architectural_philosophy_en: string | null;
  architectural_philosophy_fa: string | null;
  lead_architect_en: string | null;
  lead_architect_fa: string | null;
  hero_image: string | null;
  gallery_images: string[];
  floor_plan_image: string | null;
  materials: { name: string; nameFa: string; origin: string; type: string }[];
  key_features_en: string[];
  key_features_fa: string[];
  awards_en: string[];
  awards_fa: string[];
  sustainability_rating: string | null;
  climate_approach_en: string | null;
  climate_approach_fa: string | null;
  is_featured: boolean;
  coordinates: { lat: number; lng: number } | null;
  region_name_en: string | null;
  region_name_fa: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbConsultationRequest {
  id: string;
  client_name: string;
  phone_email: string;
  project_type: string | null;
  estimated_budget: string | null;
  location: string | null;
  notes: string | null;
  status: ConsultationStatus;
  created_at: string;
}

export interface DbAiConsultation {
  id: string;
  project_type: string | null;
  land_area: number | null;
  budget_level: string | null;
  generated_concept: Record<string, unknown> | null;
  created_at: string;
}
